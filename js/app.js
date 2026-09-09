/* 香港網絡安全合規助手 —— 評估工作台。無框架、無建構步驟。 */
(function () {
  'use strict';

  const E = window.HKCCEngine;
  const STORE_KEY = 'hkcc.state.v2';
  const LEGACY_STORE_KEY = 'hkcc.state.v1';
  const MAX_PROJECT_BYTES = 5 * 1024 * 1024;
  const STATUSES = [
    { id: 'none', label: '未評', cls: 's-none' },
    { id: 'done', label: '已實施', cls: 's-done' },
    { id: 'partial', label: '部分', cls: 's-partial' },
    { id: 'gap', label: '未實施', cls: 's-gap' },
    { id: 'na', label: '不適用', cls: 's-na' }
  ];
  const byId = new Map(HKCC.controls.map(c => [c.id, c]));
  const definitions = {
    controlIds: new Set(HKCC.controls.map(c => c.id)),
    licenseIds: new Set(HKCC.licenses.map(l => l.id)),
    attributeIds: new Set(HKCC.attributes.map(a => a.id))
  };

  const today = () => {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const state = {
    project: { name: '', asOfDate: today() },
    licenses: new Set(),
    attributes: new Set(),
    assessments: Object.create(null),
    unresolvedAssessments: Object.create(null),
    merge: true,
    gapsOnly: false,
    query: '',
    domain: '',
    storageAvailable: true
  };

  const $ = (selector, root) => (root || document).querySelector(selector);
  const el = (tag, cls, value) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value != null) node.textContent = value;
    return node;
  };
  const regKey = regulator => regulator === 'SFC' ? 'SFC' :
    regulator === 'HKMA' ? 'HKMA' : regulator === 'PCPD' ? 'PCPD' : 'CI';

  function projectData(includeExportTime) {
    return {
      schemaVersion: E.SCHEMA_VERSION,
      controlDataVersion: HKCC.meta.version,
      exportedAt: includeExportTime ? new Date().toISOString() : '',
      project: { ...state.project },
      scope: { licenses: [...state.licenses], attributes: [...state.attributes] },
      assessments: state.assessments,
      unresolvedAssessments: state.unresolvedAssessments,
      preferences: { merge: state.merge }
    };
  }

  function hydrate(data) {
    state.project = {
      name: data.project?.name || '',
      asOfDate: data.project?.asOfDate || today()
    };
    state.licenses = new Set(data.scope?.licenses || data.licenses || []);
    state.attributes = new Set(data.scope?.attributes || data.attributes || []);
    state.assessments = data.assessments || Object.create(null);
    state.unresolvedAssessments = data.unresolvedAssessments || Object.create(null);
    state.merge = data.preferences?.merge !== false && data.merge !== false;
  }

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(projectData(false)));
      state.storageAvailable = true;
    } catch (error) {
      state.storageAvailable = false;
    }
  }

  function load() {
    try {
      const current = localStorage.getItem(STORE_KEY);
      if (current) {
        const result = E.validateProject(JSON.parse(current), definitions);
        if (!result.ok) throw new Error(result.errors.join('；'));
        hydrate(result.data);
        return;
      }
      const legacy = localStorage.getItem(LEGACY_STORE_KEY);
      if (!legacy) return;
      const migrated = E.migrateV1(JSON.parse(legacy), HKCC.controls);
      hydrate({
        project: migrated.project,
        scope: { licenses: migrated.licenses, attributes: migrated.attributes },
        assessments: migrated.assessments,
        unresolvedAssessments: migrated.unresolvedAssessments,
        preferences: { merge: migrated.merge }
      });
      save();
    } catch (error) {
      state.storageAvailable = false;
    }
  }

  function assessment(id) {
    return state.assessments[id] || {};
  }

  function updateAssessment(id, field, value) {
    const record = { ...assessment(id) };
    if (value == null || value === '' || (field === 'status' && value === 'none')) delete record[field];
    else record[field] = value;
    if (field === 'status') record.assessedAt = value === 'none' ? undefined : today();
    for (const key of Object.keys(record)) if (record[key] == null || record[key] === '') delete record[key];
    if (Object.keys(record).length) state.assessments[id] = record;
    else delete state.assessments[id];
    save();
  }

  function applies(control) {
    return E.applies(control, state.licenses, state.attributes);
  }

  function matchesQuery(group) {
    if (!state.query) return true;
    const query = state.query.toLowerCase();
    return group.some(control => {
      const source = HKCC.sources[control.sourceId];
      const record = assessment(control.id);
      return [control.id, control.title, control.requirement, control.quote || '', control.clause,
        source.titleZh, source.titleEn, source.regulator, record.implementationNote || '',
        record.evidenceRef || '', record.owner || ''].join(' ').toLowerCase().includes(query);
    });
  }

  function renderSidebar() {
    const box = $('#sidebar');
    box.innerHTML = '';

    const project = el('div', 'field-group project-fields');
    project.appendChild(el('h2', null, '評估項目'));
    project.appendChild(field('項目／機構名稱', 'text', state.project.name, value => {
      state.project.name = value;
      save();
      updatePrintHeader();
    }, { maxlength: 200, placeholder: '例如：2026 年網絡安全評估' }));
    project.appendChild(field('評估基準日期', 'date', state.project.asOfDate, value => {
      state.project.asOfDate = value || today();
      save();
      render();
    }));
    box.appendChild(project);

    const licences = el('div', 'field-group');
    licences.appendChild(el('h2', null, '① 牌照／實體類型'));
    let lastGroup = null;
    for (const licence of HKCC.licenses) {
      if (licence.group !== lastGroup) {
        licences.appendChild(el('div', 'opt-group-label', licence.group));
        lastGroup = licence.group;
      }
      licences.appendChild(option(licence, state.licenses));
    }
    box.appendChild(licences);

    const attributes = el('div', 'field-group');
    attributes.appendChild(el('h2', null, '② 業務特徵'));
    for (const attribute of HKCC.attributes) attributes.appendChild(option(attribute, state.attributes));
    box.appendChild(attributes);
  }

  function field(labelText, type, value, onChange, options) {
    const label = el('label', 'stacked-field');
    label.appendChild(el('span', null, labelText));
    const input = el('input');
    input.type = type;
    input.value = value || '';
    if (options?.maxlength) input.maxLength = options.maxlength;
    if (options?.placeholder) input.placeholder = options.placeholder;
    input.addEventListener(type === 'date' ? 'change' : 'input', event => onChange(event.target.value));
    label.appendChild(input);
    return label;
  }

  function option(item, set) {
    const label = el('label', 'opt');
    const input = el('input');
    input.type = 'checkbox';
    input.checked = set.has(item.id);
    input.addEventListener('change', () => {
      input.checked ? set.add(item.id) : set.delete(item.id);
      save();
      render();
    });
    const text = el('div', 'opt-text');
    text.appendChild(el('div', 'opt-label', item.label));
    if (item.note) text.appendChild(el('div', 'opt-note', item.note));
    label.append(input, text);
    return label;
  }

  function render() {
    renderSidebar();
    updatePrintHeader();
    $('#merge').checked = state.merge;
    $('#gaps').checked = state.gapsOnly;
    $('#domain-filter').value = state.domain;

    const active = HKCC.controls.filter(applies);
    const allGroups = E.cluster(active, byId, state.merge);
    let visible = allGroups.filter(matchesQuery);
    if (state.domain) visible = visible.filter(group => group.some(c => c.domain === state.domain));
    if (state.gapsOnly) visible = visible.filter(group => E.pendingCount(group, state.assessments) > 0);
    visible.sort(compareGroups);
    currentVisibleGroups = visible;
    renderSummary(active, allGroups);

    const out = $('#results');
    out.innerHTML = '';
    if (!state.licenses.size) {
      out.appendChild(emptyState('請先在左側選擇牌照', '工具會按牌照及業務特徵列出適用控制要求。'));
      return;
    }
    if (!visible.length) {
      out.appendChild(emptyState('沒有符合條件的控制要求',
        state.gapsOnly ? '目前篩選下沒有未評、部分或未實施項目。' : '請調整搜尋字詞或篩選條件。'));
      return;
    }

    for (const domain of HKCC.domains) {
      const groups = visible.filter(group => group[0].domain === domain.id);
      if (!groups.length) continue;
      const section = el('section', 'domain');
      const heading = el('h2', null, domain.label);
      heading.appendChild(el('span', 'n', `${groups.length} 項`));
      section.append(heading, el('p', 'desc', domain.desc));
      for (const group of groups) section.appendChild(renderControl(group));
      out.appendChild(section);
    }
  }

  function compareGroups(a, b) {
    if (!state.gapsOnly) return 0;
    const firstDate = group => group
      .filter(c => !['done', 'na'].includes(assessment(c.id).status))
      .map(c => assessment(c.id).targetDate || '9999-12-31')
      .sort()[0];
    return firstDate(a).localeCompare(firstDate(b)) || a[0].title.localeCompare(b[0].title);
  }

  function emptyState(title, note) {
    const box = el('div', 'panel empty');
    box.appendChild(el('strong', null, title));
    box.appendChild(document.createTextNode(note));
    return box;
  }

  function renderControl(group) {
    const primary = group[0];
    const card = el('article', 'panel control');
    const head = el('div', 'control-head');
    const titleBox = el('div');
    titleBox.appendChild(el('h3', 'control-title', primary.title));
    titleBox.appendChild(el('div', 'control-ids', group.map(c => c.id).join('  ·  ')));
    head.appendChild(titleBox);
    const pending = E.pendingCount(group, state.assessments);
    head.appendChild(el('span', pending ? 'tag pending' : 'tag complete',
      pending ? `${pending} 項待處理` : '全部完成'));
    card.appendChild(head);

    card.appendChild(el('p', 'control-req', primary.requirement));
    for (const control of group.slice(1)) {
      const extra = el('p', 'control-req');
      extra.appendChild(el('strong', null, `${HKCC.sources[control.sourceId].regulator} 另有述明：`));
      extra.appendChild(document.createTextNode(control.requirement));
      card.appendChild(extra);
    }

    const members = el('div', 'assessment-members');
    for (const control of group) members.appendChild(renderMember(control));
    card.appendChild(members);

    const quoted = group.filter(c => c.quote);
    if (quoted.length) {
      const details = el('details', 'quote');
      details.appendChild(el('summary', null, '英文來源文字'));
      for (const control of quoted) {
        const label = control.quoteStatus === 'verbatim' ? '英文條文原文' :
          control.quoteStatus === 'excerpt' ? '英文條文節錄' : '英文來源說明';
        details.appendChild(el('div', 'quote-kind', label));
        const quote = el('blockquote', null, control.quote);
        quote.appendChild(el('footer', 'source-line',
          `— ${HKCC.sources[control.sourceId].titleEn}, ${control.clause}`));
        details.appendChild(quote);
      }
      card.appendChild(details);
    }

    const tags = el('div', 'tags');
    if (group.length > 1) tags.appendChild(el('span', 'tag merged', `跨監管合併 ${group.length} 條`));
    const licenceIds = new Set();
    const attributeIds = new Set();
    for (const control of group) {
      for (const id of control.applicability.licenses) if (state.licenses.has(id)) licenceIds.add(id);
      for (const id of control.applicability.attributes || []) if (state.attributes.has(id)) attributeIds.add(id);
      if (control.deadline) tags.appendChild(el('span', 'tag deadline', `監管限期 ${control.deadline}`));
    }
    for (const id of licenceIds) {
      const item = HKCC.licenses.find(x => x.id === id);
      if (item) tags.appendChild(el('span', 'tag', `適用：${item.label}`));
    }
    for (const id of attributeIds) {
      const item = HKCC.attributes.find(x => x.id === id);
      if (item) tags.appendChild(el('span', 'tag', `觸發：${item.label}`));
    }
    if (tags.childNodes.length) card.appendChild(tags);

    const notes = group.flatMap(c => [c.applicabilityNote, c.note]).filter(Boolean);
    for (const noteText of [...new Set(notes)]) card.appendChild(el('p', 'control-note', `註：${noteText}`));
    return card;
  }

  function renderMember(control) {
    const source = HKCC.sources[control.sourceId];
    const record = assessment(control.id);
    const member = el('section', 'assessment-member');
    const top = el('div', 'member-top');
    const sourceLine = el('div', 'source-line');
    sourceLine.appendChild(el('span', 'tag reg-' + regKey(source.regulator), source.regulator));
    const link = el('a', null, source.titleZh);
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    sourceLine.append(link, el('span', 'clause', control.clause));
    if (source.issued && source.issued !== '—') sourceLine.appendChild(el('span', 'clause', source.issued));
    top.append(sourceLine, renderAssess(control.id));
    member.appendChild(top);

    const details = el('details', 'work-record');
    if (record.implementationNote || record.evidenceRef || record.owner || record.targetDate) details.open = true;
    const summaryText = record.implementationNote || record.evidenceRef || record.owner || record.targetDate ?
      '評估記錄（已填寫）' : '填寫評估記錄';
    details.appendChild(el('summary', null, summaryText));
    const grid = el('div', 'record-grid');
    grid.appendChild(recordField(control.id,
      record.status === 'na' ? '不適用理由' : '實施說明', 'implementationNote', 'textarea', record.implementationNote,
      '說明實施情況或判斷依據', 10000));
    grid.appendChild(recordField(control.id, '證據引用', 'evidenceRef', 'textarea', record.evidenceRef,
      '例如：IAM Standard v3；SEC-241', 10000));
    grid.appendChild(recordField(control.id, '負責人', 'owner', 'text', record.owner,
      '部門或角色', 200));
    grid.appendChild(recordField(control.id, '目標完成日期', 'targetDate', 'date', record.targetDate));
    details.appendChild(grid);

    const due = E.dueState(record.targetDate, state.project.asOfDate);
    if (due) details.appendChild(el('span', `tag ${due}`, due === 'overdue' ? '已逾期' : '30 日內到期'));
    member.appendChild(details);
    return member;
  }

  function renderAssess(id) {
    const box = el('div', 'assess');
    const current = assessment(id).status || 'none';
    for (const status of STATUSES) {
      const label = el('label', status.cls);
      const input = el('input');
      input.type = 'radio';
      input.name = `as-${id}`;
      input.checked = current === status.id;
      input.addEventListener('change', () => {
        updateAssessment(id, 'status', status.id);
        render();
      });
      label.append(input, document.createTextNode(status.label));
      box.appendChild(label);
    }
    return box;
  }

  function recordField(id, labelText, key, type, value, placeholder, maxlength) {
    const label = el('label', 'record-field');
    label.appendChild(el('span', null, labelText));
    const input = el(type === 'textarea' ? 'textarea' : 'input');
    if (type !== 'textarea') input.type = type;
    input.value = value || '';
    if (placeholder) input.placeholder = placeholder;
    if (maxlength) input.maxLength = maxlength;
    input.addEventListener(type === 'date' ? 'change' : 'input', event => {
      updateAssessment(id, key, event.target.value);
      if (type === 'date') render();
    });
    label.appendChild(input);
    return label;
  }

  function renderSummary(active, groups) {
    const box = $('#summary');
    box.innerHTML = '';
    const top = el('div', 'summary-top');
    top.appendChild(el('span', 'summary-count', String(groups.length)));
    top.appendChild(el('span', 'summary-label', '項適用要求'));
    box.appendChild(top);
    const merged = active.length - groups.length;
    box.appendChild(el('div', 'summary-note', merged > 0 ?
      `源自 ${active.length} 條監管控制，其中 ${merged} 條經跨監管合併展示。` :
      `源自 ${active.length} 條監管控制。`));

    if (!state.storageAvailable) {
      box.appendChild(el('div', 'storage-warning', '瀏覽器無法自動儲存。請定期使用「匯出項目」備份。'));
    }
    if (Object.keys(state.unresolvedAssessments).length) {
      box.appendChild(el('div', 'storage-warning',
        `項目保留 ${Object.keys(state.unresolvedAssessments).length} 項未識別的舊控制記錄。`));
    }

    const counts = {};
    for (const control of active) {
      const regulator = HKCC.sources[control.sourceId].regulator;
      counts[regulator] = (counts[regulator] || 0) + 1;
    }
    const regulators = el('div', 'by-reg');
    for (const [regulator, count] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
      regulators.appendChild(el('span', 'tag reg-' + regKey(regulator), `${regulator} ${count}`));
    }
    if (regulators.childNodes.length) box.appendChild(regulators);

    if (active.length) {
      const tally = { done: 0, partial: 0, gap: 0, na: 0, none: 0 };
      for (const control of active) tally[assessment(control.id).status || 'none']++;
      const scored = active.length - tally.na;
      const pct = scored ? Math.round(((tally.done + tally.partial * 0.5) / scored) * 100) : 0;
      const wrap = el('div', 'progress-wrap');
      const progressHead = el('div', 'progress-head');
      progressHead.appendChild(el('span', null, `控制實施完成度 ${pct}%`));
      progressHead.appendChild(el('span', null,
        `已實施 ${tally.done} · 部分 ${tally.partial} · 未實施 ${tally.gap} · 未評 ${tally.none}`));
      const bar = el('div', 'progress');
      for (const [cls, count] of [['done', tally.done], ['partial', tally.partial], ['gap', tally.gap]]) {
        if (!count) continue;
        const segment = el('i', cls);
        segment.style.width = `${count / active.length * 100}%`;
        bar.appendChild(segment);
      }
      wrap.append(progressHead, bar,
        el('div', 'score-note', '部分實施按 50% 計算，只反映評估進度，不代表監管機構的合規認定。'));
      box.appendChild(wrap);
    }
  }

  let currentVisibleGroups = [];
  function statusLabel(status) {
    return STATUSES.find(item => item.id === (status || 'none'))?.label || '未評';
  }

  function applicabilityText(control) {
    const licences = control.applicability.licenses
      .filter(id => state.licenses.has(id))
      .map(id => HKCC.licenses.find(item => item.id === id)?.label)
      .filter(Boolean);
    const attributes = (control.applicability.attributes || [])
      .map(id => HKCC.attributes.find(item => item.id === id)?.label)
      .filter(Boolean);
    return [...licences, ...attributes].join('；');
  }

  function toCSV() {
    const rows = [['項目名稱', '評估基準日期', '控制點 ID', '控制域', '控制點', '要求', '適用原因',
      '監管機構', '出處', '條款', '發布日期', '監管限期', '原文連結', '英文來源類型', '英文來源文字',
      '自評狀態', '實施說明／不適用理由', '證據引用', '負責人', '目標完成日期', '到期狀態']];
    for (const group of currentVisibleGroups) {
      for (const control of group) {
        if (state.gapsOnly && ['done', 'na'].includes(assessment(control.id).status)) continue;
        const source = HKCC.sources[control.sourceId];
        const domain = HKCC.domains.find(item => item.id === control.domain);
        const record = assessment(control.id);
        const due = E.dueState(record.targetDate, state.project.asOfDate);
        const quoteType = control.quoteStatus === 'verbatim' ? '英文條文原文' :
          control.quoteStatus === 'excerpt' ? '英文條文節錄' : control.quote ? '英文來源說明' : '';
        rows.push([state.project.name, state.project.asOfDate, control.id, domain?.label || control.domain,
          control.title, control.requirement, applicabilityText(control), source.regulator, source.titleZh,
          control.clause, source.issued, control.deadline || '', source.url, quoteType, control.quote || '',
          statusLabel(record.status), record.implementationNote || '', record.evidenceRef || '', record.owner || '',
          record.targetDate || '', due === 'overdue' ? '已逾期' : due === 'due-soon' ? '30 日內到期' : '']);
      }
    }
    return '\ufeff' + rows.map(row => row.map(E.csvCell).join(',')).join('\r\n');
  }

  function download(name, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function safeFileName(value) {
    return (value || 'hk-compliance').trim().replace(/[^\p{L}\p{N}._-]+/gu, '-').slice(0, 80) || 'hk-compliance';
  }

  function exportProject() {
    const data = projectData(true);
    download(`${safeFileName(state.project.name)}-${today()}.hkcc.json`, JSON.stringify(data, null, 2),
      'application/json;charset=utf-8');
  }

  async function importProject(file) {
    if (!file) return;
    if (file.size > MAX_PROJECT_BYTES) {
      alert('項目檔案超過 5 MB，未有匯入。');
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(await file.text());
    } catch (error) {
      alert('項目檔案不是有效 JSON，現有資料未有變更。');
      return;
    }
    const result = E.validateProject(parsed, definitions);
    if (!result.ok) {
      alert(`項目檔案未通過檢查，現有資料未有變更：\n\n${result.errors.slice(0, 12).join('\n')}`);
      return;
    }
    const data = result.data;
    const known = Object.keys(data.assessments).length;
    const unresolved = Object.keys(data.unresolvedAssessments).length;
    const versionNote = data.controlDataVersion && data.controlDataVersion !== HKCC.meta.version ?
      `\n控制資料版本：${data.controlDataVersion}（目前 ${HKCC.meta.version}）` :
      `\n控制資料版本：${data.controlDataVersion || '未記錄'}`;
    const warningText = result.warnings.length ? `\n\n注意：\n${result.warnings.slice(0, 8).join('\n')}` : '';
    const confirmed = confirm(`匯入項目「${data.project.name || '未命名項目'}」？\n` +
      `匯出時間：${data.exportedAt || '未記錄'}${versionNote}\n有效記錄：${known}\n未識別記錄：${unresolved}` +
      `${warningText}\n\n確認後將取代目前項目。`);
    if (!confirmed) return;
    hydrate(data);
    save();
    render();
  }

  function updatePrintHeader() {
    const licences = [...state.licenses]
      .map(id => HKCC.licenses.find(item => item.id === id)?.label).filter(Boolean);
    const attributes = [...state.attributes]
      .map(id => HKCC.attributes.find(item => item.id === id)?.label).filter(Boolean);
    $('#ph-project').textContent = `項目：${state.project.name || '（未命名）'}`;
    $('#ph-scope').textContent = `牌照範圍：${licences.join('；') || '（未選擇）'}`;
    $('#ph-attrs').textContent = `業務特徵：${attributes.join('；') || '（未選擇）'}`;
    $('#ph-date').textContent = `評估基準日期：${state.project.asOfDate || today()}　·　` +
      `控制資料 v${HKCC.meta.version}　·　條文核驗日期：${HKCC.meta.verifiedOn}`;
  }

  function init() {
    load();
    const domainFilter = $('#domain-filter');
    for (const domain of HKCC.domains) {
      const option = el('option', null, domain.label);
      option.value = domain.id;
      domainFilter.appendChild(option);
    }
    $('#q').addEventListener('input', event => {
      state.query = event.target.value.trim();
      render();
    });
    $('#merge').addEventListener('change', event => {
      state.merge = event.target.checked;
      save();
      render();
    });
    $('#gaps').addEventListener('change', event => {
      state.gapsOnly = event.target.checked;
      render();
    });
    domainFilter.addEventListener('change', event => {
      state.domain = event.target.value;
      render();
    });
    $('#export-csv').addEventListener('click', () =>
      download(`${safeFileName(state.project.name)}-${today()}.csv`, toCSV(), 'text/csv;charset=utf-8'));
    $('#export-project').addEventListener('click', exportProject);
    const importInput = $('#import-file');
    $('#import-project').addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', async event => {
      const file = event.target.files?.[0];
      event.target.value = '';
      await importProject(file);
    });
    $('#print').addEventListener('click', () => {
      updatePrintHeader();
      window.print();
    });
    $('#reset').addEventListener('click', () => {
      if (!confirm('清除目前項目的所有選擇及評估記錄？建議先匯出項目備份。此操作無法復原。')) return;
      state.project = { name: '', asOfDate: today() };
      state.licenses.clear();
      state.attributes.clear();
      state.assessments = Object.create(null);
      state.unresolvedAssessments = Object.create(null);
      state.query = '';
      state.domain = '';
      state.gapsOnly = false;
      $('#q').value = '';
      save();
      render();
    });
    $('#theme').addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : current === 'light' ? '' : 'dark';
      if (next) document.documentElement.setAttribute('data-theme', next);
      else document.documentElement.removeAttribute('data-theme');
    });
    $('#version').textContent = `v${HKCC.meta.version} · 條文核驗於 ${HKCC.meta.verifiedOn}`;
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
