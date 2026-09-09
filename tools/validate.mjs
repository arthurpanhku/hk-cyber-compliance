/**
 * 数据完整性校验。CI 与提交 PR 前请运行：node tools/validate.mjs
 * 校验项：ID 唯一、出处存在、控制域存在、牌照/业务特征存在、交叉引用可解析、必填字段齐全。
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const HKCC = {
  baseLocale: 'zh-Hans',
  sources: {}, licenses: [], attributes: [], domains: [], controls: [], i18n: {},
  addSources(o) { Object.assign(this.sources, o); },
  addLicenses(a) { this.licenses.push(...a); },
  addAttributes(a) { this.attributes.push(...a); },
  addDomains(a) { this.domains.push(...a); },
  addControls(a) { this.controls.push(...a); },
  addI18n(loc, obj) {
    const b = this.i18n[loc] || (this.i18n[loc] = {});
    for (const [k, v] of Object.entries(obj)) Object.assign(b[k] || (b[k] = {}), v);
  }
};
globalThis.HKCC = HKCC;
globalThis.window = { HKCC };

const load = (p) => new Function('HKCC', readFileSync(join(root, p), 'utf8'))(HKCC);
load('data/sources.js');
load('data/taxonomy.js');
for (const f of readdirSync(join(root, 'data/controls')).filter(f => f.endsWith('.js')).sort()) {
  load(join('data/controls', f));
}
for (const f of readdirSync(join(root, 'data/i18n')).filter(f => f.endsWith('.js')).sort()) {
  load(join('data/i18n', f));
}

const errors = [];
const warn = [];
const licenseIds = new Set(HKCC.licenses.map(l => l.id));
const attrIds = new Set(HKCC.attributes.map(a => a.id));
const domainIds = new Set(HKCC.domains.map(d => d.id));
const sourceIds = new Set(Object.keys(HKCC.sources));
const controlIds = new Set();

for (const c of HKCC.controls) {
  const at = `控制点 ${c.id ?? '(缺少 id)'}`;
  for (const f of ['id', 'domain', 'title', 'requirement', 'sourceId', 'clause', 'applicability']) {
    if (!c[f]) errors.push(`${at}: 缺少必填字段 "${f}"`);
  }
  if (!c.id) continue;
  if (controlIds.has(c.id)) errors.push(`${at}: ID 重复`);
  controlIds.add(c.id);
  if (c.domain && !domainIds.has(c.domain)) errors.push(`${at}: 未知控制域 "${c.domain}"`);
  if (c.sourceId && !sourceIds.has(c.sourceId)) errors.push(`${at}: 未知出处 "${c.sourceId}"`);
  const ap = c.applicability || {};
  if (!ap.licenses?.length) errors.push(`${at}: applicability.licenses 不可为空`);
  for (const l of ap.licenses || []) if (!licenseIds.has(l)) errors.push(`${at}: 未知牌照 "${l}"`);
  for (const a of ap.attributes || []) if (!attrIds.has(a)) errors.push(`${at}: 未知业务特征 "${a}"`);
  if (c.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(c.deadline)) errors.push(`${at}: deadline 格式须为 YYYY-MM-DD`);
  if (!c.quote) warn.push(`${at}: 无英文原文引述`);
}

for (const c of HKCC.controls) {
  for (const r of c.crossRefs || []) {
    if (!controlIds.has(r)) errors.push(`控制点 ${c.id}: 交叉引用指向不存在的控制点 "${r}"`);
  }
}
for (const [id, s] of Object.entries(HKCC.sources)) {
  if (!s.url?.startsWith('http')) errors.push(`出处 ${id}: url 无效`);
  if (!HKCC.controls.some(c => c.sourceId === id) && s.status !== 'ref') {
    warn.push(`出处 ${id}: 没有任何控制点引用`);
  }
}

/* ---------- 多语言完整性 ----------
   基础数据即 zh-Hans，故只校验其余语言的覆盖层。
   漏译不会让页面出错（会回落到简体），但会让界面中英混杂，故列为错误。 */
const TRANSLATED = ['en', 'zh-Hant'];
const uiKeys = Object.keys(HKCC.i18n[HKCC.baseLocale]?.ui ?? {});
if (!uiKeys.length) errors.push('缺少 data/i18n/zh-Hans.js 的 ui 字符串表');

for (const loc of TRANSLATED) {
  const bucket = HKCC.i18n[loc];
  if (!bucket) { errors.push(`缺少语言层 "${loc}"`); continue; }

  const missingUi = uiKeys.filter(k => !bucket.ui?.[k]);
  if (missingUi.length) errors.push(`${loc}: 界面字符串缺 ${missingUi.length} 条 — ${missingUi.join(', ')}`);
  const extraUi = Object.keys(bucket.ui ?? {}).filter(k => !uiKeys.includes(k));
  if (extraUi.length) warn.push(`${loc}: 界面字符串多出 ${extraUi.join(', ')}（简体已删除？）`);

  const missingCtl = HKCC.controls.filter(c => {
    const o = bucket.controls?.[c.id];
    return !o || !o.title || !o.requirement;
  }).map(c => c.id);
  if (missingCtl.length) {
    errors.push(`${loc}: ${missingCtl.length} 条控制点缺 title/requirement — ${missingCtl.join(', ')}`);
  }
  const staleCtl = Object.keys(bucket.controls ?? {}).filter(id => !controlIds.has(id));
  if (staleCtl.length) warn.push(`${loc}: 译文指向已删除的控制点 ${staleCtl.join(', ')}`);

  // 有 note 的控制点，译文也须有 note，否则中英混排。
  const missingNote = HKCC.controls
    .filter(c => c.note && !bucket.controls?.[c.id]?.note).map(c => c.id);
  if (missingNote.length) errors.push(`${loc}: 控制点 note 未译 — ${missingNote.join(', ')}`);

  for (const [kind, list, fields] of [
    ['licenses', HKCC.licenses, ['label', 'group']],
    ['attributes', HKCC.attributes, ['label']],
    ['domains', HKCC.domains, ['label', 'desc']]
  ]) {
    const miss = list.filter(x => fields.some(f => !bucket[kind]?.[x.id]?.[f])).map(x => x.id);
    if (miss.length) errors.push(`${loc}: ${kind} 缺译 — ${miss.join(', ')}`);
  }
}

const byRegulator = {};
for (const c of HKCC.controls) {
  const r = HKCC.sources[c.sourceId]?.regulator ?? '?';
  byRegulator[r] = (byRegulator[r] || 0) + 1;
}

console.log(`控制点 ${HKCC.controls.length} · 出处 ${sourceIds.size} · 牌照 ${licenseIds.size} · 业务特征 ${attrIds.size} · 控制域 ${domainIds.size}`);
console.log('按监管机构:', byRegulator);
if (warn.length) console.log(`\n提示 (${warn.length}):\n  ` + warn.join('\n  '));
if (errors.length) {
  console.error(`\n错误 (${errors.length}):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log('\n校验通过。');
