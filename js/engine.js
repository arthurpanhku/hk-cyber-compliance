/* 香港網絡安全合規助手 —— 可在瀏覽器及 Node 測試中共用的純邏輯。 */
(function (root) {
  'use strict';

  const SCHEMA_VERSION = 2;
  const VALID_STATUSES = new Set(['done', 'partial', 'gap', 'na']);
  const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  const MAX_LENGTHS = {
    projectName: 200,
    owner: 200,
    implementationNote: 10000,
    evidenceRef: 10000
  };

  const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const asSet = value => value instanceof Set ? value : new Set(value || []);

  function validDate(value) {
    if (!DATE_RE.test(value || '')) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }

  function applies(control, licenses, attributes) {
    const selectedLicenses = asSet(licenses);
    const selectedAttributes = asSet(attributes);
    const applicability = control.applicability || {};
    if (!(applicability.licenses || []).some(id => selectedLicenses.has(id))) return false;
    return (applicability.attributes || []).every(id => selectedAttributes.has(id));
  }

  function cluster(controls, byId, merge) {
    const controlMap = byId instanceof Map ? byId : new Map(controls.map(c => [c.id, c]));
    const ids = new Set(controls.map(c => c.id));
    const parent = new Map([...ids].map(id => [id, id]));
    const find = id => {
      const current = parent.get(id);
      if (current === id) return id;
      const resolved = find(current);
      parent.set(id, resolved);
      return resolved;
    };

    if (merge) {
      for (const control of controls) {
        for (const ref of control.crossRefs || []) {
          if (!ids.has(ref)) continue;
          const other = controlMap.get(ref);
          if (!other || !(other.crossRefs || []).includes(control.id)) continue;
          const a = find(control.id);
          const b = find(ref);
          if (a !== b) parent.set(a, b);
        }
      }
    }

    const groups = new Map();
    for (const control of controls) {
      const key = find(control.id);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(control);
    }

    return [...groups.values()].map(group => group.sort((a, b) => {
      const pa = a.priority === 'baseline' ? 0 : 1;
      const pb = b.priority === 'baseline' ? 0 : 1;
      return pa - pb || a.id.localeCompare(b.id);
    }));
  }

  function pendingCount(group, assessments) {
    return group.filter(control => {
      const status = assessments[control.id]?.status;
      return status !== 'done' && status !== 'na';
    }).length;
  }

  function migrateV1(saved, controls) {
    if (!isObject(saved)) throw new Error('舊版狀態不是有效物件');
    const licenses = Array.isArray(saved.licenses) ? saved.licenses.filter(x => typeof x === 'string') : [];
    const attributes = Array.isArray(saved.attributes) ? saved.attributes.filter(x => typeof x === 'string') : [];
    const oldAssessments = isObject(saved.assessment) ? saved.assessment : {};
    const controlIds = new Set(controls.map(c => c.id));
    const assessments = Object.create(null);
    const unresolvedAssessments = Object.create(null);

    for (const [id, status] of Object.entries(oldAssessments)) {
      if (!VALID_STATUSES.has(status)) continue;
      if (controlIds.has(id)) assessments[id] = { status };
      else unresolvedAssessments[id] = { status };
    }

    if (saved.merge === true) {
      const active = controls.filter(c => applies(c, licenses, attributes));
      const groups = cluster(active, new Map(controls.map(c => [c.id, c])), true);
      for (const group of groups) {
        const groupHead = group[0]?.id;
        const headStatus = oldAssessments[groupHead];
        if (!VALID_STATUSES.has(headStatus)) continue;
        for (const control of group) {
          if (!Object.prototype.hasOwnProperty.call(oldAssessments, control.id)) {
            assessments[control.id] = { status: headStatus };
          }
        }
      }
    }

    return {
      schemaVersion: SCHEMA_VERSION,
      project: { name: '', asOfDate: '' },
      licenses,
      attributes,
      assessments,
      unresolvedAssessments,
      merge: saved.merge !== false
    };
  }

  function csvCell(value) {
    let text = String(value == null ? '' : value);
    if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  }

  function dueState(targetDate, asOfDate) {
    if (!validDate(targetDate) || !validDate(asOfDate)) return '';
    const target = Date.parse(targetDate + 'T00:00:00Z');
    const base = Date.parse(asOfDate + 'T00:00:00Z');
    const days = Math.round((target - base) / 86400000);
    if (days < 0) return 'overdue';
    if (days <= 30) return 'due-soon';
    return '';
  }

  function migrateProjectV1(input) {
    return {
      schemaVersion: SCHEMA_VERSION,
      controlDataVersion: typeof input.controlDataVersion === 'string' ? input.controlDataVersion : '',
      exportedAt: typeof input.exportedAt === 'string' ? input.exportedAt : '',
      project: isObject(input.project) ? input.project : { name: '', asOfDate: '' },
      scope: isObject(input.scope) ? input.scope : {
        licenses: Array.isArray(input.licenses) ? input.licenses : [],
        attributes: Array.isArray(input.attributes) ? input.attributes : []
      },
      assessments: isObject(input.assessments) ? input.assessments :
        (isObject(input.assessment) ? Object.fromEntries(
          Object.entries(input.assessment).map(([id, status]) => [id, { status }])
        ) : {}),
      unresolvedAssessments: isObject(input.unresolvedAssessments) ? input.unresolvedAssessments : {},
      preferences: isObject(input.preferences) ? input.preferences : { merge: input.merge !== false }
    };
  }

  function validateProject(input, definitions) {
    const errors = [];
    const warnings = [];
    if (!isObject(input)) return { ok: false, errors: ['項目檔案必須是 JSON 物件'], warnings };

    let candidate = input;
    const version = Number(candidate.schemaVersion || 1);
    if (!Number.isInteger(version) || version < 1) {
      return { ok: false, errors: ['schemaVersion 無效'], warnings };
    }
    if (version > SCHEMA_VERSION) {
      return { ok: false, errors: [`此項目使用較新的 schemaVersion ${version}`], warnings };
    }
    if (version < SCHEMA_VERSION) candidate = migrateProjectV1(candidate);

    const project = isObject(candidate.project) ? candidate.project : {};
    const scope = isObject(candidate.scope) ? candidate.scope : {};
    const rawAssessments = isObject(candidate.assessments) ? candidate.assessments : null;
    if (!rawAssessments) errors.push('assessments 必須是物件');
    if (!Array.isArray(scope.licenses)) errors.push('scope.licenses 必須是陣列');
    if (!Array.isArray(scope.attributes)) errors.push('scope.attributes 必須是陣列');

    const projectName = typeof project.name === 'string' ? project.name : '';
    const asOfDate = typeof project.asOfDate === 'string' ? project.asOfDate : '';
    if (project.name != null && typeof project.name !== 'string') errors.push('project.name 必須是文字');
    if (projectName.length > MAX_LENGTHS.projectName) errors.push('project.name 超過 200 字元');
    if (asOfDate && !validDate(asOfDate)) errors.push('project.asOfDate 日期格式無效');

    const controlIds = asSet(definitions.controlIds);
    const licenseIds = asSet(definitions.licenseIds);
    const attributeIds = asSet(definitions.attributeIds);
    const licenses = [];
    const attributes = [];
    for (const id of Array.isArray(scope.licenses) ? scope.licenses : []) {
      if (typeof id !== 'string') errors.push('牌照 ID 必須是文字');
      else if (licenseIds.has(id)) licenses.push(id);
      else warnings.push(`已略過未知牌照：${id}`);
    }
    for (const id of Array.isArray(scope.attributes) ? scope.attributes : []) {
      if (typeof id !== 'string') errors.push('業務特徵 ID 必須是文字');
      else if (attributeIds.has(id)) attributes.push(id);
      else warnings.push(`已略過未知業務特徵：${id}`);
    }

    const assessments = Object.create(null);
    const unresolvedAssessments = Object.create(null);
    const validateRecord = (id, record) => {
      if (!isObject(record)) {
        errors.push(`控制 ${id} 的評估記錄必須是物件`);
        return null;
      }
      const normalized = {};
      if (record.status != null && record.status !== '') {
        if (!VALID_STATUSES.has(record.status)) errors.push(`控制 ${id} 的狀態無效`);
        else normalized.status = record.status;
      }
      for (const [field, max] of [
        ['implementationNote', MAX_LENGTHS.implementationNote],
        ['evidenceRef', MAX_LENGTHS.evidenceRef],
        ['owner', MAX_LENGTHS.owner]
      ]) {
        if (record[field] == null || record[field] === '') continue;
        if (typeof record[field] !== 'string') errors.push(`控制 ${id} 的 ${field} 必須是文字`);
        else if (record[field].length > max) errors.push(`控制 ${id} 的 ${field} 過長`);
        else normalized[field] = record[field];
      }
      for (const field of ['targetDate', 'assessedAt']) {
        if (record[field] == null || record[field] === '') continue;
        if (typeof record[field] !== 'string' || !validDate(record[field])) {
          errors.push(`控制 ${id} 的 ${field} 日期格式無效`);
        } else normalized[field] = record[field];
      }
      return normalized;
    };

    for (const [id, record] of Object.entries(rawAssessments || {})) {
      const normalized = validateRecord(id, record);
      if (!normalized) continue;
      if (controlIds.has(id)) assessments[id] = normalized;
      else {
        unresolvedAssessments[id] = normalized;
        warnings.push(`未識別控制已保留：${id}`);
      }
    }
    if (isObject(candidate.unresolvedAssessments)) {
      for (const [id, record] of Object.entries(candidate.unresolvedAssessments)) {
        if (Object.prototype.hasOwnProperty.call(unresolvedAssessments, id)) continue;
        const normalized = validateRecord(id, record);
        if (!normalized) continue;
        if (controlIds.has(id) && !Object.prototype.hasOwnProperty.call(assessments, id)) {
          assessments[id] = normalized;
          warnings.push(`舊控制記錄已重新識別：${id}`);
        } else if (!controlIds.has(id)) unresolvedAssessments[id] = normalized;
      }
    }

    if (errors.length) return { ok: false, errors, warnings };
    return {
      ok: true,
      errors,
      warnings,
      data: {
        schemaVersion: SCHEMA_VERSION,
        controlDataVersion: typeof candidate.controlDataVersion === 'string' ? candidate.controlDataVersion : '',
        exportedAt: typeof candidate.exportedAt === 'string' ? candidate.exportedAt : '',
        project: { name: projectName, asOfDate },
        scope: { licenses: [...new Set(licenses)], attributes: [...new Set(attributes)] },
        assessments,
        unresolvedAssessments,
        preferences: { merge: candidate.preferences?.merge !== false }
      }
    };
  }

  root.HKCCEngine = {
    SCHEMA_VERSION,
    VALID_STATUSES,
    MAX_LENGTHS,
    applies,
    cluster,
    pendingCount,
    migrateV1,
    csvCell,
    validDate,
    dueState,
    validateProject
  };
})(typeof window !== 'undefined' ? window : globalThis);
