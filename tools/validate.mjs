/**
 * 数据完整性校验。CI 与提交 PR 前请运行：node tools/validate.mjs
 * 校验项：ID 唯一、出处存在、控制域存在、牌照/业务特征存在、交叉引用可解析、必填字段齐全。
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
