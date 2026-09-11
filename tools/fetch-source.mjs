/**
 * 把某份出处的官方原文取回并转成纯文本，供撰写控制点时逐条对照。
 *
 *   node tools/fetch-source.mjs <出处 ID> [起始页-结束页]
 *   node tools/fetch-source.mjs sfc-vatp-guidelines 1-20
 *
 * 为什么需要这个：撰写控制点必须逐字对照官方原文（见 CONTRIBUTING），
 * 但受限的开发环境往往连不上监管机构网站——`www.sfc.hk`、`brdr.hkma.gov.hk`、
 * `occics.gov.hk` 在代理后常被整域拦掉。GitHub Actions 的 runner 没有这个限制
 * （已实测 20 份出处全部可达），所以取文这一步放到 CI 里跑：
 * `.github/workflows/fetch-source.yml` 手动触发，结果同时写进日志与构建产物。
 *
 * 只接受 data/sources.js 里已登记的出处 ID，不接受任意 URL：
 * 这个工具的用途是取回官方原文，不是做一个通用的对外抓取代理。
 *
 * 取回的原文**不提交进仓库**——版权属于各监管机构，本项目只以结构化形式
 * 引述条文并链接官方出处。产物仅供撰写与核对时阅读。
 */
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(root, 'out');

const HKCC = { sources: {}, addSources(o) { Object.assign(this.sources, o); } };
new Function('HKCC', readFileSync(join(root, 'data/sources.js'), 'utf8'))(HKCC);

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
           'Chrome/124.0 Safari/537.36 hk-cyber-compliance-fetch/1.0';

const [sourceId, pageRange] = process.argv.slice(2);

if (!sourceId) {
  console.error('用法：node tools/fetch-source.mjs <出处 ID> [起始页-结束页]\n');
  console.error('已登记的出处 ID：');
  for (const id of Object.keys(HKCC.sources).sort()) console.error(`  ${id}`);
  process.exit(2);
}

const source = HKCC.sources[sourceId];
if (!source) {
  console.error(`出处 "${sourceId}" 未登记在 data/sources.js。\n`);
  console.error('已登记的出处 ID：');
  for (const id of Object.keys(HKCC.sources).sort()) console.error(`  ${id}`);
  process.exit(2);
}

/** 页码范围只接受 `12` 或 `3-40`，直接拼进 pdftotext 的参数前必须先验。 */
function parsePages(value) {
  if (!value) return null;
  const m = /^(\d+)(?:-(\d+))?$/.exec(value.trim());
  if (!m) {
    console.error(`页码范围 "${value}" 格式无效，应为 12 或 3-40。`);
    process.exit(2);
  }
  const first = Number(m[1]);
  const last = m[2] ? Number(m[2]) : first;
  if (first < 1 || last < first) {
    console.error(`页码范围 "${value}" 无效。`);
    process.exit(2);
  }
  return { first, last };
}
const pages = parsePages(pageRange);

mkdirSync(OUT_DIR, { recursive: true });

console.log(`出处      ${sourceId}`);
console.log(`监管机构  ${source.regulator}`);
console.log(`标题      ${source.titleEn || source.titleZh}`);
console.log(`发布日期  ${source.issued}`);
console.log(`上次核验  ${source.verifiedOn}`);
console.log(`链接      ${source.url}\n`);

const rawPath = join(OUT_DIR, `${sourceId}.raw`);
let meta;
try {
  const { stdout } = await run('curl', [
    '-sS', '-L', '--fail', '--max-time', '120', '--retry', '2', '--retry-delay', '3',
    '-A', UA, '-o', rawPath,
    '-w', '%{http_code}\t%{content_type}\t%{size_download}\t%{url_effective}',
    source.url
  ], { maxBuffer: 1 << 20 });
  const [code, contentType, size, finalUrl] = stdout.trim().split('\t');
  meta = { code: Number(code), contentType: contentType || '', size: Number(size), finalUrl };
} catch (e) {
  console.error('取回失败：' + (e.stderr || e.message || '').trim());
  console.error('\n若是 403，多半是机器人防护（例如 ia.org.hk 全站启用 Cloudflare 验证），' +
    '须人手到官网下载。');
  process.exit(1);
}

const bytes = readFileSync(rawPath);
const sha256 = createHash('sha256').update(bytes).digest('hex');

console.log(`HTTP      ${meta.code}`);
console.log(`内容类型  ${meta.contentType}`);
console.log(`大小      ${meta.size} 字节`);
console.log(`sha256    ${sha256}`);
if (meta.finalUrl !== source.url) console.log(`最终地址  ${meta.finalUrl}`);
console.log('');

/** PDF 以魔数判断，不信任 content-type：监管机构的站点常把 PDF 标成 octet-stream。 */
const isPdf = bytes.subarray(0, 5).toString('latin1') === '%PDF-';
const textPath = join(OUT_DIR, `${sourceId}.txt`);
let text;

if (isPdf) {
  const args = ['-layout', '-enc', 'UTF-8'];
  if (pages) args.push('-f', String(pages.first), '-l', String(pages.last));
  args.push(rawPath, textPath);
  try {
    await run('pdftotext', args);
  } catch (e) {
    console.error('pdftotext 执行失败：' + (e.stderr || e.message || '').trim());
    console.error('需要 poppler-utils：sudo apt-get install -y poppler-utils');
    process.exit(1);
  }
  text = readFileSync(textPath, 'utf8');
} else {
  // 纯文本化只为方便逐条对照阅读，不追求还原排版；
  // 引述条文时仍须回到官方 PDF／网页确认原文与条款编号。
  text = bytes.toString('utf8')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<\/(p|div|li|tr|h[1-6]|section|article)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const { writeFileSync } = await import('node:fs');
  writeFileSync(textPath, text, 'utf8');
}

const lines = text.split('\n');
console.log(`已转为纯文本：out/${sourceId}.txt（${lines.length} 行、${text.length} 字符）`);
if (pages) console.log(`（只取第 ${pages.first}–${pages.last} 页）`);
if (!existsSync(textPath) || !text.trim()) {
  console.error('\n转出的文本为空——可能是扫描件 PDF，需要 OCR，或该页码范围无内容。');
  process.exit(1);
}

/* 日志是唯一不需要额外出网就能读到的通道（构建产物要另行下载），
   所以把正文也印进日志；超长时截断，用页码范围分次取。 */
const MAX_LOG_LINES = 1200;
console.log('\n' + '─'.repeat(72));
for (const line of lines.slice(0, MAX_LOG_LINES)) console.log(line);
console.log('─'.repeat(72));
if (lines.length > MAX_LOG_LINES) {
  console.log(`\n日志只印了前 ${MAX_LOG_LINES} 行，其余见构建产物 ${sourceId}-text，` +
    '或以页码范围分次取回。');
}
