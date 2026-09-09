/**
 * 检查 data/sources.js 中每份出处的官方链接是否仍然可达。
 *
 *   node tools/check-links.mjs
 *
 * 链接烂掉是这个工具最可能、也最难察觉的失效方式：页面照常渲染，
 * 只是点进去 404。监管机构改版频繁，故独立于数据校验单独跑。
 *
 * 退出码：只有确定失效（404 / 410 / 域名解析不了）才返回 1。
 * 403 / 429 多半是 Cloudflare 之类的机器人防护（例如 ia.org.hk 全站如此），
 * 5xx 与超时多半是暂时性的——这些只报告，不让 CI 变红，否则很快就没人看了。
 *
 * 用 curl 而非 fetch：它认 HTTPS_PROXY 等环境变量，在 CI 与代理后都能跑。
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const HKCC = { sources: {}, addSources(o) { Object.assign(this.sources, o); } };
new Function('HKCC', readFileSync(join(root, 'data/sources.js'), 'utf8'))(HKCC);

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
           'Chrome/124.0 Safari/537.36 hk-cyber-compliance-linkcheck/1.0';
const TIMEOUT = 25;
const CONCURRENCY = 4;

async function probe(url) {
  try {
    const { stdout } = await run('curl', [
      '-sS', '-o', '/dev/null', '-w', '%{http_code} %{url_effective}',
      '-L', '--max-time', String(TIMEOUT), '--retry', '1', '--retry-delay', '2',
      '-A', UA, url
    ], { maxBuffer: 1 << 20 });
    const [code, ...rest] = stdout.trim().split(' ');
    return { code: Number(code), finalUrl: rest.join(' ') };
  } catch (e) {
    return { code: 0, error: (e.stderr || e.message || '').trim().slice(0, 160) };
  }
}

/** 0 = 连不上；分类决定是否让 CI 变红。 */
function classify(code) {
  if (code >= 200 && code < 400) return 'ok';
  if (code === 404 || code === 410) return 'dead';
  if (code === 403 || code === 429) return 'blocked';
  if (code === 0) return 'unreachable';
  return 'other';
}

const entries = Object.entries(HKCC.sources);
const results = [];
let cursor = 0;

async function worker() {
  while (cursor < entries.length) {
    const [id, s] = entries[cursor++];
    const r = await probe(s.url);
    results.push({ id, url: s.url, verifiedOn: s.verifiedOn, ...r, kind: classify(r.code) });
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
results.sort((a, b) => a.id.localeCompare(b.id));

const ICON = { ok: '✓', dead: '✗', blocked: '⚠', unreachable: '⚠', other: '⚠' };
for (const r of results) {
  const detail = r.kind === 'ok' ? '' :
    r.error ? `  ${r.error}` : `  HTTP ${r.code}`;
  console.log(`${ICON[r.kind]} ${r.id.padEnd(24)} ${r.kind.padEnd(12)}${detail}`);
}

const by = k => results.filter(r => r.kind === k);
console.log(`\n共 ${results.length} 个链接：` +
  `可达 ${by('ok').length}、失效 ${by('dead').length}、` +
  `被防护拦截 ${by('blocked').length}、连不上 ${by('unreachable').length}、其他 ${by('other').length}`);

const dead = by('dead');
if (dead.length) {
  console.error('\n以下链接已失效，须到监管机构官网找回新地址，' +
    '并同步更新该出处的 verifiedOn：');
  for (const r of dead) console.error(`  ${r.id}  ${r.url}`);
  process.exit(1);
}
if (by('blocked').length || by('unreachable').length || by('other').length) {
  console.log('\n（没有确定失效的链接。上列告警多为机器人防护或暂时性故障，请人工抽查。）');
}
