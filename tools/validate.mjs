/**
 * 資料完整性校驗。CI 與提交 PR 前請執行：node tools/validate.mjs
 * 校驗項：ID 唯一、出處存在、控制域存在、牌照/業務特徵存在、交叉引用可解析、必填欄位齊全。
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const HKCC = {
  sources: {}, licenses: [], attributes: [], domains: [], controls: [],
  addSources(o) { Object.assign(this.sources, o); },
  addLicenses(a) { this.licenses.push(...a); },
  addAttributes(a) { this.attributes.push(...a); },
  addDomains(a) { this.domains.push(...a); },
  addControls(a) { this.controls.push(...a); }
};
globalThis.HKCC = HKCC;
globalThis.window = { HKCC };

const load = (p) => new Function('HKCC', readFileSync(join(root, p), 'utf8'))(HKCC);
load('data/sources.js');
load('data/taxonomy.js');
for (const f of readdirSync(join(root, 'data/controls')).filter(f => f.endsWith('.js')).sort()) {
  load(join('data/controls', f));
}

const errors = [];
const warn = [];
const licenseIds = new Set(HKCC.licenses.map(l => l.id));
const attrIds = new Set(HKCC.attributes.map(a => a.id));
const domainIds = new Set(HKCC.domains.map(d => d.id));
const sourceIds = new Set(Object.keys(HKCC.sources));
const controlIds = new Set();
const quoteStatuses = new Set(['verbatim', 'excerpt', 'summary']);

for (const c of HKCC.controls) {
  const at = `控制點 ${c.id ?? '(缺少 id)'}`;
  for (const f of ['id', 'domain', 'title', 'requirement', 'sourceId', 'clause', 'applicability']) {
    if (!c[f]) errors.push(`${at}: 缺少必填欄位 "${f}"`);
  }
  if (!c.id) continue;
  if (controlIds.has(c.id)) errors.push(`${at}: ID 重複`);
  controlIds.add(c.id);
  if (c.domain && !domainIds.has(c.domain)) errors.push(`${at}: 未知控制域 "${c.domain}"`);
  if (c.sourceId && !sourceIds.has(c.sourceId)) errors.push(`${at}: 未知出處 "${c.sourceId}"`);
  const ap = c.applicability || {};
  if (!ap.licenses?.length) errors.push(`${at}: applicability.licenses 不可為空`);
  for (const l of ap.licenses || []) if (!licenseIds.has(l)) errors.push(`${at}: 未知牌照 "${l}"`);
  for (const a of ap.attributes || []) if (!attrIds.has(a)) errors.push(`${at}: 未知業務特徵 "${a}"`);
  if (c.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(c.deadline)) errors.push(`${at}: deadline 格式須為 YYYY-MM-DD`);
  if (!c.quote) warn.push(`${at}: 無英文來源文字`);
  if (c.quote && !quoteStatuses.has(c.quoteStatus)) {
    errors.push(`${at}: quoteStatus 必須為 verbatim、excerpt 或 summary`);
  }
  if (['verbatim', 'excerpt'].includes(c.quoteStatus) && !c.clause) {
    errors.push(`${at}: 原文或節錄必須提供 clause`);
  }
}

for (const c of HKCC.controls) {
  for (const r of c.crossRefs || []) {
    if (!controlIds.has(r)) errors.push(`控制點 ${c.id}: 交叉引用指向不存在的控制點 "${r}"`);
  }
}
for (const [id, s] of Object.entries(HKCC.sources)) {
  if (!s.url?.startsWith('http')) errors.push(`出處 ${id}: url 無效`);
  if (!HKCC.controls.some(c => c.sourceId === id) && s.status !== 'ref') {
    warn.push(`出處 ${id}: 沒有任何控制點引用`);
  }
}

for (const p of ['js/engine.js', 'js/app.js']) {
  const code = readFileSync(join(root, p), 'utf8');
  if (/\bfetch\s*\(|\bXMLHttpRequest\b/.test(code)) {
    errors.push(`${p}: 不得在執行時讀取本地資料，否則 file:// 模式會失效`);
  }
}
const html = readFileSync(join(root, 'index.html'), 'utf8');
if (/type=["']module["']/.test(html)) errors.push('index.html: 不得使用 ES module，須保持 file:// 相容');
if (!html.includes('<script src="js/engine.js"></script>')) errors.push('index.html: 缺少 js/engine.js');

const byRegulator = {};
for (const c of HKCC.controls) {
  const r = HKCC.sources[c.sourceId]?.regulator ?? '?';
  byRegulator[r] = (byRegulator[r] || 0) + 1;
}

console.log(`控制點 ${HKCC.controls.length} · 出處 ${sourceIds.size} · 牌照 ${licenseIds.size} · 業務特徵 ${attrIds.size} · 控制域 ${domainIds.size}`);
console.log('按監管機構:', byRegulator);
if (warn.length) console.log(`\n提示 (${warn.length}):\n  ` + warn.join('\n  '));
if (errors.length) {
  console.error(`\n錯誤 (${errors.length}):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log('\n校驗通過。');
