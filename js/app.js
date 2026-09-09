/* 香港网络安全合规助手 —— 筛选引擎与界面渲染。无框架、无构建步骤。
   所有面向用户的文字一律经 t() / tr() 取用，不在本文件内硬编码任何语言。 */
(function () {
  'use strict';

  const STORE_KEY = 'hkcc.state.v1';
  const STATUSES = [
    { id: 'done', key: 'statusDone', cls: 's-done' },
    { id: 'partial', key: 'statusPartial', cls: 's-partial' },
    { id: 'gap', key: 'statusGap', cls: 's-gap' },
    { id: 'na', key: 'statusNa', cls: 's-na' }
  ];

  const state = {
    licenses: new Set(),
    attributes: new Set(),
    assessment: {},      // controlId -> status id
    merge: true,
    gapsOnly: false,
    query: ''
  };

  const byId = new Map(HKCC.controls.map(c => [c.id, c]));
  const $ = (sel, root) => (root || document).querySelector(sel);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const regKey = (r) => r === 'SFC' ? 'SFC' : r === 'HKMA' ? 'HKMA' : r === 'PCPD' ? 'PCPD' : 'CI';

  /* ---------- 语言便捷函数 ---------- */
  const t = (k, v) => HKCC.t(k, v);
  const trControl = c => HKCC.tr('controls', c.id, c);
  const trSource = id => HKCC.tr('sources', id, HKCC.sources[id]);
  const trLicense = l => HKCC.tr('licenses', l.id, l);
  const trAttribute = a => HKCC.tr('attributes', a.id, a);
  const trDomain = d => HKCC.tr('domains', d.id, d);

  /* ---------- 持久化 ---------- */
  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        licenses: [...state.licenses], attributes: [...state.attributes],
        assessment: state.assessment, merge: state.merge
      }));
    } catch (e) { /* 隐私模式或站点数据被禁用时忽略 */ }
  }
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      (s.licenses || []).forEach(x => state.licenses.add(x));
      (s.attributes || []).forEach(x => state.attributes.add(x));
      state.assessment = s.assessment || {};
      if (typeof s.merge === 'boolean') state.merge = s.merge;
    } catch (e) { /* 读取失败时以空状态启动 */ }
  }

  /* ---------- 适用性判定 ----------
     牌照为「任一命中」；业务特征为「全部具备」。
     未勾选任何牌照时不显示任何控制点。 */
  function applies(c) {
    const ap = c.applicability;
    if (!ap.licenses.some(l => state.licenses.has(l))) return false;
    return (ap.attributes || []).every(a => state.attributes.has(a));
  }

  /* ---------- 合并聚类 ----------
     只合并「双向交叉引用」的控制点：A 引用 B 且 B 引用 A，才视为同一项要求。
     单向引用仅作「另见」，不合并，以免把范围不对等的条文错误等同。 */
  function cluster(list) {
    const ids = new Set(list.map(c => c.id));
    const parent = new Map([...ids].map(i => [i, i]));
    const find = x => parent.get(x) === x ? x : (parent.set(x, find(parent.get(x))), parent.get(x));
    if (state.merge) {
      for (const c of list) {
        for (const r of c.crossRefs || []) {
          if (!ids.has(r)) continue;
          if (!(byId.get(r).crossRefs || []).includes(c.id)) continue;  // 须双向
          const a = find(c.id), b = find(r);
          if (a !== b) parent.set(a, b);
        }
      }
    }
    const groups = new Map();
    for (const c of list) {
      const k = find(c.id);
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(c);
    }
    // 组内排序：基线条文优先作为标题（较后期的通函多为对基线的细化），
    // 其余按 ID 排序以保证呈现稳定。
    return [...groups.values()].map(g => g.sort((a, b) => {
      const pa = a.priority === 'baseline' ? 0 : 1;
      const pb = b.priority === 'baseline' ? 0 : 1;
      return pa - pb || a.id.localeCompare(b.id);
    }));
  }

  /* ---------- 搜索 ----------
     同时检索当前语言的译文与基础数据，让用户用任一语言的关键词都能命中。 */
  function matchesQuery(group) {
    if (!state.query) return true;
    const q = state.query.toLowerCase();
    return group.some(c => {
      const tc = trControl(c);
      const src = HKCC.sources[c.sourceId];
      const ts = trSource(c.sourceId);
      return [c.id, c.title, c.requirement, tc.title, tc.requirement, c.quote || '', c.clause,
              src.titleZh, src.titleEn, ts.titleZh, src.regulator]
        .join(' ').toLowerCase().includes(q);
    });
  }

  /* 一个合并组的自评状态以组内第一个控制点的 ID 为键 */
  const groupKey = g => g[0].id;

  /* ---------- 渲染：侧栏 ---------- */
  function renderSidebar() {
    const box = $('#sidebar');
    box.innerHTML = '';

    const lg = el('div', 'field-group');
    lg.appendChild(el('h2', null, t('secLicenses')));
    let lastGroup = null;
    for (const raw of HKCC.licenses) {
      const l = trLicense(raw);
      if (l.group !== lastGroup) {
        lg.appendChild(el('div', 'opt-group-label', l.group));
        lastGroup = l.group;
      }
      lg.appendChild(option(raw.id, l, state.licenses));
    }
    box.appendChild(lg);

    const ag = el('div', 'field-group');
    ag.appendChild(el('h2', null, t('secAttributes')));
    for (const raw of HKCC.attributes) ag.appendChild(option(raw.id, trAttribute(raw), state.attributes));
    box.appendChild(ag);
  }

  function option(id, item, set) {
    const label = el('label', 'opt');
    const input = el('input');
    input.type = 'checkbox';
    input.checked = set.has(id);
    input.addEventListener('change', () => {
      input.checked ? set.add(id) : set.delete(id);
      save(); render();
    });
    const text = el('div', 'opt-text');
    text.appendChild(el('div', 'opt-label', item.label));
    if (item.note) text.appendChild(el('div', 'opt-note', item.note));
    label.append(input, text);
    return label;
  }

  /* ---------- 渲染：结果 ---------- */
  function render() {
    renderSidebar();
    updatePrintHeader();
    const active = HKCC.controls.filter(applies);
    const groups = cluster(active).filter(matchesQuery);
    renderSummary(active, groups);

    const out = $('#results');
    out.innerHTML = '';

    if (!state.licenses.size) {
      out.appendChild(emptyState(t('emptyNoLicenseTitle'), t('emptyNoLicenseNote')));
      return;
    }
    const visible = state.gapsOnly
      ? groups.filter(g => { const s = state.assessment[groupKey(g)]; return s !== 'done' && s !== 'na'; })
      : groups;
    if (!visible.length) {
      out.appendChild(emptyState(t('emptyNoMatchTitle'),
        state.gapsOnly ? t('emptyNoMatchGaps') : t('emptyNoMatchQuery')));
      return;
    }

    for (const rawDomain of HKCC.domains) {
      const inDomain = visible.filter(g => g[0].domain === rawDomain.id);
      if (!inDomain.length) continue;
      const d = trDomain(rawDomain);
      const sec = el('section', 'domain');
      const h = el('h2', null, d.label);
      h.appendChild(el('span', 'n', t('countItems', { n: inDomain.length })));
      sec.append(h, el('p', 'desc', d.desc));
      for (const g of inDomain) sec.appendChild(renderControl(g));
      out.appendChild(sec);
    }
  }

  function emptyState(title, note) {
    const box = el('div', 'panel empty');
    box.appendChild(el('strong', null, title));
    box.appendChild(document.createTextNode(note));
    return box;
  }

  function renderControl(group) {
    const primary = trControl(group[0]);
    const key = groupKey(group);
    const card = el('article', 'panel control');

    const head = el('div', 'control-head');
    const titleBox = el('div');
    titleBox.appendChild(el('h3', 'control-title', primary.title));
    titleBox.appendChild(el('div', 'control-ids', group.map(c => c.id).join('  ·  ')));
    head.appendChild(titleBox);
    head.appendChild(renderAssess(key));
    card.appendChild(head);

    card.appendChild(el('p', 'control-req', primary.requirement));
    if (group.length > 1) {
      for (const c of group.slice(1)) {
        const extra = el('p', 'control-req');
        extra.appendChild(el('strong', null,
          t('alsoStates', { regulator: trSource(c.sourceId).regulator })));
        extra.appendChild(document.createTextNode(' ' + trControl(c).requirement));
        card.appendChild(extra);
      }
    }

    // 条文原文一律为监管机构发布的英文，任何语言下都不翻译。
    const quoted = group.filter(c => c.quote);
    if (quoted.length) {
      const det = el('details', 'quote');
      det.appendChild(el('summary', null, t('quoteSummary')));
      for (const c of quoted) {
        const bq = el('blockquote', null, c.quote);
        bq.appendChild(el('footer', 'source-line',
          `— ${HKCC.sources[c.sourceId].titleEn}, ${c.clause}`));
        det.appendChild(bq);
      }
      card.appendChild(det);
    }

    const srcBox = el('div', 'sources');
    for (const c of group) {
      const s = trSource(c.sourceId);
      const line = el('div', 'source-line');
      // 逐份出处各有自己的核验日期，悬停可见；避免与发布日期挤在同一行造成混淆。
      if (s.verifiedOn) line.title = t('sourceMetaTip', { issued: s.issued, verified: s.verifiedOn });
      const a = el('a', null, HKCC.sourceTitle(c.sourceId));
      a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      line.append(el('span', 'tag reg-' + regKey(HKCC.sources[c.sourceId].regulator), s.regulator), a,
        el('span', 'clause', trControl(c).clause || c.clause));
      if (s.issued && s.issued !== '—') line.appendChild(el('span', 'clause', s.issued));
      srcBox.appendChild(line);
    }
    card.appendChild(srcBox);

    if (primary.note) {
      const n = el('p', 'opt-note');
      n.style.marginTop = '9px';
      n.textContent = t('notePrefix') + primary.note;
      card.appendChild(n);
    }

    const tags = el('div', 'tags');
    if (group.length > 1) tags.appendChild(el('span', 'tag merged', t('tagMerged', { n: group.length })));
    for (const c of group) {
      if (c.deadline) tags.appendChild(el('span', 'tag deadline', t('tagDeadline', { date: c.deadline })));
    }
    const seeAlso = new Set();
    for (const c of group) {
      for (const r of c.crossRefs || []) {
        if (group.some(g => g.id === r)) continue;
        if (byId.has(r)) seeAlso.add(r);
      }
    }
    for (const r of seeAlso) tags.appendChild(el('span', 'tag', t('tagSeeAlso', { id: r })));
    const lics = new Set();
    for (const c of group) for (const l of c.applicability.licenses) if (state.licenses.has(l)) lics.add(l);
    for (const l of lics) {
      const def = HKCC.licenses.find(x => x.id === l);
      if (def) tags.appendChild(el('span', 'tag', trLicense(def).label));
    }
    if (tags.childNodes.length) card.appendChild(tags);
    return card;
  }

  function renderAssess(key) {
    const box = el('div', 'assess');
    for (const s of STATUSES) {
      const label = t(s.key);
      const lab = el('label', s.cls);
      const input = el('input');
      input.type = 'radio';
      input.name = 'as-' + key;
      input.checked = state.assessment[key] === s.id;
      input.addEventListener('change', () => {
        state.assessment[key] = s.id;
        save(); renderSummaryOnly();
        if (state.gapsOnly) render();
      });
      lab.append(input, document.createTextNode(label));
      lab.title = label;
      box.appendChild(lab);
    }
    return box;
  }

  /* ---------- 渲染：摘要 ---------- */
  let lastGroups = [];
  function renderSummary(active, groups) { lastGroups = groups; renderSummaryOnly(active); }

  function renderSummaryOnly(activeIn) {
    const active = activeIn || HKCC.controls.filter(applies);
    const box = $('#summary');
    box.innerHTML = '';

    const top = el('div', 'summary-top');
    top.appendChild(el('span', 'summary-count', String(lastGroups.length)));
    top.appendChild(el('span', 'summary-label', t('summaryLabel')));
    box.appendChild(top);

    const merged = active.length - lastGroups.length;
    box.appendChild(el('div', 'summary-note',
      merged > 0
        ? t('summaryFromMerged', { total: active.length, merged })
        : t('summaryFrom', { total: active.length })));

    const counts = {};
    for (const c of active) {
      const r = trSource(c.sourceId).regulator;
      counts[r] = (counts[r] || 0) + 1;
    }
    const reg = el('div', 'by-reg');
    for (const [r, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
      reg.appendChild(el('span', 'tag reg-' + regKey(r), `${r} ${n}`));
    }
    if (reg.childNodes.length) box.appendChild(reg);

    if (lastGroups.length) {
      const tally = { done: 0, partial: 0, gap: 0, na: 0, none: 0 };
      for (const g of lastGroups) tally[state.assessment[groupKey(g)] || 'none']++;
      const scored = lastGroups.length - tally.na;
      const pct = scored ? Math.round(((tally.done + tally.partial * 0.5) / scored) * 100) : 0;

      const wrap = el('div', 'progress-wrap');
      const head = el('div', 'progress-head');
      head.appendChild(el('span', null, t('progressLabel', { pct })));
      head.appendChild(el('span', null, t('progressTally', {
        done: tally.done, partial: tally.partial, gap: tally.gap, none: tally.none
      })));
      const bar = el('div', 'progress');
      const seg = (cls, n) => {
        if (!n) return;
        const i = el('i', cls);
        i.style.width = (n / lastGroups.length * 100) + '%';
        bar.appendChild(i);
      };
      seg('done', tally.done); seg('partial', tally.partial); seg('gap', tally.gap);
      wrap.append(head, bar);
      box.appendChild(wrap);
    }
  }

  /* ---------- 导出 ---------- */
  function toCSV() {
    const cell = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const rows = [[t('csvId'), t('csvDomain'), t('csvTitle'), t('csvRequirement'),
      t('csvRegulator'), t('csvSource'), t('csvClause'), t('csvIssued'), t('csvVerified'),
      t('csvDeadline'), t('csvUrl'), t('csvQuote'), t('csvStatus')]];
    const statusLabel = id => {
      const s = STATUSES.find(x => x.id === id);
      return s ? t(s.key) : t('statusUnrated');
    };
    for (const g of lastGroups) {
      const status = statusLabel(state.assessment[groupKey(g)]);
      for (const raw of g) {
        const c = trControl(raw);
        const s = trSource(raw.sourceId);
        const dRaw = HKCC.domains.find(x => x.id === raw.domain);
        const d = dRaw ? trDomain(dRaw) : null;
        rows.push([raw.id, d ? d.label : raw.domain, c.title, c.requirement, s.regulator,
          HKCC.sourceTitle(raw.sourceId), c.clause || raw.clause, s.issued, s.verifiedOn || '',
          raw.deadline || '', s.url, raw.quote || '', status]);
      }
    }
    // BOM：让 Excel 正确识别 UTF-8 中文
    return '﻿' + rows.map(r => r.map(cell).join(',')).join('\r\n');
  }

  function download(name, text, mime) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ---------- 打印抬头 ---------- */
  function updatePrintHeader() {
    const sep = HKCC.locale === 'en' ? '; ' : '；';
    const lics = [...state.licenses]
      .map(id => {
        const def = HKCC.licenses.find(l => l.id === id);
        return def ? trLicense(def).label : null;
      }).filter(Boolean);
    const attrs = [...state.attributes]
      .map(id => {
        const def = HKCC.attributes.find(a => a.id === id);
        return def ? trAttribute(def).label : null;
      }).filter(Boolean);
    $('#ph-title').textContent = t('printTitle');
    $('#ph-scope').textContent = t('phScope') + (lics.join(sep) || t('phNone'));
    $('#ph-attrs').textContent = t('phAttrs') + (attrs.join(sep) || t('phNone'));
    $('#ph-date').textContent = t('phDate', {
      today: new Date().toISOString().slice(0, 10), verified: HKCC.verifiedOn()
    });
  }

  /* ---------- 静态界面文字 ----------
     切换语言时一并刷新，避免只更新了结果区而按钮仍是旧语言。 */
  function renderChrome() {
    $('#app-title').textContent = t('appTitle');
    $('#export').textContent = t('btnExport');
    $('#print').textContent = t('btnPrint');
    $('#reset').textContent = t('btnReset');
    const theme = $('#theme');
    theme.textContent = t('btnTheme');
    theme.title = t('btnThemeTitle');
    const q = $('#q');
    q.placeholder = t('searchPlaceholder');
    q.setAttribute('aria-label', t('searchAria'));
    $('#merge-label').textContent = t('optMerge');
    $('#gaps-label').textContent = t('optGaps');
    $('#version').textContent =
      t('versionLine', { version: HKCC.meta.version, date: HKCC.verifiedOn() });
    // 各出处核验日期不一致时，页首显示最早的一个，并在悬停时说明区间。
    $('#version').title = HKCC.verifiedOn() === HKCC.lastVerifiedOn()
      ? '' : t('verifiedRangeTip', { from: HKCC.verifiedOn(), to: HKCC.lastVerifiedOn() });

    const foot = $('#disclaimer');
    foot.innerHTML = '';
    const p1 = el('p');
    p1.append(el('strong', null, t('disclaimerLabel')), document.createTextNode(t('disclaimerBody')));
    const p2 = el('p');
    p2.append(el('strong', null, t('langNoteLabel')), document.createTextNode(t('langNoteBody')));
    foot.append(p1, p2);

    for (const btn of document.querySelectorAll('#lang [data-lang]')) {
      const on = btn.dataset.lang === HKCC.locale;
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', String(on));
    }
    $('#lang').setAttribute('aria-label', t('langLabel'));
  }

  function renderAll() { renderChrome(); render(); }

  /* ---------- 初始化 ---------- */
  function init() {
    load();
    HKCC.applyDocumentLocale();

    $('#q').addEventListener('input', e => { state.query = e.target.value.trim(); render(); });
    const mergeBox = $('#merge');
    mergeBox.checked = state.merge;
    mergeBox.addEventListener('change', e => { state.merge = e.target.checked; save(); render(); });
    $('#gaps').addEventListener('change', e => { state.gapsOnly = e.target.checked; render(); });
    $('#export').addEventListener('click', () =>
      download(`hk-compliance-${HKCC.locale}-${new Date().toISOString().slice(0, 10)}.csv`,
        toCSV(), 'text/csv;charset=utf-8'));
    $('#print').addEventListener('click', () => { updatePrintHeader(); window.print(); });
    $('#reset').addEventListener('click', () => {
      if (!confirm(t('confirmReset'))) return;
      state.licenses.clear(); state.attributes.clear();
      state.assessment = {}; state.query = ''; state.gapsOnly = false;
      $('#q').value = ''; $('#gaps').checked = false;
      save(); render();
    });
    $('#theme').addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : cur === 'light' ? '' : 'dark';
      next ? document.documentElement.setAttribute('data-theme', next)
           : document.documentElement.removeAttribute('data-theme');
    });

    const lang = $('#lang');
    for (const def of HKCC.locales) {
      const b = el('button', 'lang-btn', def.label);
      b.type = 'button';
      b.dataset.lang = def.id;
      b.lang = def.html;
      b.addEventListener('click', () => HKCC.setLocale(def.id));
      lang.appendChild(b);
    }
    document.addEventListener('hkcc:localechange', renderAll);

    renderAll();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
