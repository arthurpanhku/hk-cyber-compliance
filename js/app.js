/* 香港网络安全合规助手 —— 筛选引擎与界面渲染。无框架、无构建步骤。 */
(function () {
  'use strict';

  const STORE_KEY = 'hkcc.state.v1';
  const STATUSES = [
    { id: 'done', label: '已实施', cls: 's-done' },
    { id: 'partial', label: '部分', cls: 's-partial' },
    { id: 'gap', label: '未实施', cls: 's-gap' },
    { id: 'na', label: '不适用', cls: 's-na' }
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

  /* ---------- 搜索 ---------- */
  function matchesQuery(group) {
    if (!state.query) return true;
    const q = state.query.toLowerCase();
    return group.some(c => {
      const src = HKCC.sources[c.sourceId];
      return [c.id, c.title, c.requirement, c.quote || '', c.clause,
              src.titleZh, src.titleEn, src.regulator]
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
    lg.appendChild(el('h2', null, '① 牌照 / 实体类型'));
    let lastGroup = null;
    for (const l of HKCC.licenses) {
      if (l.group !== lastGroup) {
        lg.appendChild(el('div', 'opt-group-label', l.group));
        lastGroup = l.group;
      }
      lg.appendChild(option('license', l, state.licenses));
    }
    box.appendChild(lg);

    const ag = el('div', 'field-group');
    ag.appendChild(el('h2', null, '② 业务特征'));
    for (const a of HKCC.attributes) ag.appendChild(option('attr', a, state.attributes));
    box.appendChild(ag);
  }

  function option(kind, item, set) {
    const label = el('label', 'opt');
    const input = el('input');
    input.type = 'checkbox';
    input.checked = set.has(item.id);
    input.addEventListener('change', () => {
      input.checked ? set.add(item.id) : set.delete(item.id);
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
      out.appendChild(emptyState('请先在左侧选择牌照',
        '勾选贵公司持有的牌照与业务特征，工具会列出适用的控制点要求。'));
      return;
    }
    const visible = state.gapsOnly
      ? groups.filter(g => { const s = state.assessment[groupKey(g)]; return s !== 'done' && s !== 'na'; })
      : groups;
    if (!visible.length) {
      out.appendChild(emptyState('没有符合条件的控制点',
        state.gapsOnly ? '当前筛选下所有控制点已标记为已实施或不适用。' : '请调整搜索关键词或选项。'));
      return;
    }

    for (const d of HKCC.domains) {
      const inDomain = visible.filter(g => g[0].domain === d.id);
      if (!inDomain.length) continue;
      const sec = el('section', 'domain');
      const h = el('h2', null, d.label);
      h.appendChild(el('span', 'n', `${inDomain.length} 项`));
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
    const primary = group[0];
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
        extra.appendChild(el('strong', null, `${HKCC.sources[c.sourceId].regulator} 另有述明：`));
        extra.appendChild(document.createTextNode(c.requirement));
        card.appendChild(extra);
      }
    }

    const quoted = group.filter(c => c.quote);
    if (quoted.length) {
      const det = el('details', 'quote');
      det.appendChild(el('summary', null, '英文条文原文'));
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
      const s = HKCC.sources[c.sourceId];
      const line = el('div', 'source-line');
      const a = el('a', null, s.titleZh);
      a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      line.append(el('span', 'tag reg-' + regKey(s.regulator), s.regulator), a,
        el('span', 'clause', c.clause));
      if (s.issued && s.issued !== '—') line.appendChild(el('span', 'clause', s.issued));
      srcBox.appendChild(line);
    }
    card.appendChild(srcBox);

    if (primary.note) {
      const n = el('p', 'opt-note');
      n.style.marginTop = '9px';
      n.textContent = '注：' + primary.note;
      card.appendChild(n);
    }

    const tags = el('div', 'tags');
    if (group.length > 1) tags.appendChild(el('span', 'tag merged', `跨监管合并 ${group.length} 条`));
    for (const c of group) {
      if (c.deadline) tags.appendChild(el('span', 'tag deadline', `限期 ${c.deadline}`));
    }
    const seeAlso = new Set();
    for (const c of group) {
      for (const r of c.crossRefs || []) {
        if (group.some(g => g.id === r)) continue;
        if (byId.has(r)) seeAlso.add(r);
      }
    }
    for (const r of seeAlso) tags.appendChild(el('span', 'tag', '另见 ' + r));
    const lics = new Set();
    for (const c of group) for (const l of c.applicability.licenses) if (state.licenses.has(l)) lics.add(l);
    for (const l of lics) {
      const def = HKCC.licenses.find(x => x.id === l);
      if (def) tags.appendChild(el('span', 'tag', def.label));
    }
    if (tags.childNodes.length) card.appendChild(tags);
    return card;
  }

  function renderAssess(key) {
    const box = el('div', 'assess');
    for (const s of STATUSES) {
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
      lab.append(input, document.createTextNode(s.label));
      lab.title = s.label;
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
    top.appendChild(el('span', 'summary-label', '项适用控制要求'));
    box.appendChild(top);

    const merged = active.length - lastGroups.length;
    box.appendChild(el('div', 'summary-note',
      merged > 0
        ? `源自 ${active.length} 条监管条文，其中 ${merged} 条经跨监管合并去重。`
        : `源自 ${active.length} 条监管条文。`));

    const counts = {};
    for (const c of active) {
      const r = HKCC.sources[c.sourceId].regulator;
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
      head.appendChild(el('span', null, `自评合规度 ${pct}%`));
      head.appendChild(el('span', null,
        `已实施 ${tally.done} · 部分 ${tally.partial} · 未实施 ${tally.gap} · 未评 ${tally.none}`));
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
    const rows = [['控制点 ID', '控制域', '控制点', '要求', '监管机构', '出处',
      '条款', '发布日期', '限期', '原文链接', '英文原文', '自评状态']];
    const statusLabel = id => (STATUSES.find(s => s.id === id) || {}).label || '未评估';
    for (const g of lastGroups) {
      const status = statusLabel(state.assessment[groupKey(g)]);
      for (const c of g) {
        const s = HKCC.sources[c.sourceId];
        const d = HKCC.domains.find(x => x.id === c.domain);
        rows.push([c.id, d ? d.label : c.domain, c.title, c.requirement, s.regulator,
          s.titleZh, c.clause, s.issued, c.deadline || '', s.url, c.quote || '', status]);
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
    const lics = [...state.licenses]
      .map(id => (HKCC.licenses.find(l => l.id === id) || {}).label).filter(Boolean);
    const attrs = [...state.attributes]
      .map(id => (HKCC.attributes.find(a => a.id === id) || {}).label).filter(Boolean);
    $('#ph-scope').textContent = '牌照范围：' + (lics.join('；') || '（未选择）');
    $('#ph-attrs').textContent = '业务特征：' + (attrs.join('；') || '（未选择）');
    $('#ph-date').textContent =
      `生成日期：${new Date().toISOString().slice(0, 10)}　·　条文核验日期：${HKCC.meta.verifiedOn}`;
  }

  /* ---------- 初始化 ---------- */
  function init() {
    load();
    $('#q').addEventListener('input', e => { state.query = e.target.value.trim(); render(); });
    const mergeBox = $('#merge');
    mergeBox.checked = state.merge;
    mergeBox.addEventListener('change', e => { state.merge = e.target.checked; save(); render(); });
    $('#gaps').addEventListener('change', e => { state.gapsOnly = e.target.checked; render(); });
    $('#export').addEventListener('click', () =>
      download(`hk-compliance-${new Date().toISOString().slice(0, 10)}.csv`, toCSV(), 'text/csv;charset=utf-8'));
    $('#print').addEventListener('click', () => { updatePrintHeader(); window.print(); });
    $('#reset').addEventListener('click', () => {
      if (!confirm('清除所有选择与自评记录？此操作无法撤销。')) return;
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
    $('#version').textContent = `v${HKCC.meta.version} · 条文核验于 ${HKCC.meta.verifiedOn}`;
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
