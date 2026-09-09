/**
 * 全局註冊表。所有 data/*.js 通過 HKCC.add* 注入資料。
 * 使用 .js 而非 .json 是為了讓 index.html 在 file:// 下雙擊即可執行
 * （fetch() 讀取本地 .json 會被瀏覽器 CORS 策略攔截）。
 * 每個資料文件的內容仍是純 JSON 對象，便於按文件審閲與提交 PR。
 */
window.HKCC = {
  meta: { version: '1.2.0', verifiedOn: '2026-09-08' },
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
