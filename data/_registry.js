/**
 * 全局注册表。所有 data/*.js 通过 HKCC.add* 注入数据。
 * 使用 .js 而非 .json 是为了让 index.html 在 file:// 下双击即可运行
 * （fetch() 读取本地 .json 会被浏览器 CORS 策略拦截）。
 * 每个数据文件的内容仍是纯 JSON 对象，便于按文件审阅与提交 PR。
 */
window.HKCC = {
  meta: { version: '1.0.0', verifiedOn: '2026-09-08' },
  sources: {},
  licenses: [],
  attributes: [],
  domains: [],
  controls: [],
  addSources(obj) { Object.assign(this.sources, obj); },
  addLicenses(arr) { this.licenses.push(...arr); },
  addAttributes(arr) { this.attributes.push(...arr); },
  addDomains(arr) { this.domains.push(...arr); },
  addControls(arr) { this.controls.push(...arr); }
};
