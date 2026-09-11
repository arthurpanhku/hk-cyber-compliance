/**
 * 全局注册表。所有 data/*.js 通过 HKCC.add* 注入数据。
 * 使用 .js 而非 .json 是为了让 index.html 在 file:// 下双击即可运行
 * （fetch() 读取本地 .json 会被浏览器 CORS 策略拦截）。
 * 每个数据文件的内容仍是纯 JSON 对象，便于按文件审阅与提交 PR。
 *
 * 多语言：基础数据以简体中文（zh-Hans）撰写，其余语言以覆盖层形式
 * 注入 HKCC.i18n。查字段一律走 HKCC.tr()／HKCC.t()，不要直接读 obj.label。
 */
window.HKCC = {
  meta: { version: '1.5.0' },

  /** 基础数据的撰写语言：这些字段本身即 zh-Hans，无需覆盖层。 */
  baseLocale: 'zh-Hans',
  /** 展示顺序即语言切换器的顺序。 */
  locales: [
    { id: 'en', label: 'English', html: 'en' },
    { id: 'zh-Hant', label: '繁體', html: 'zh-Hant' },
    { id: 'zh-Hans', label: '简体', html: 'zh-Hans' }
  ],
  defaultLocale: 'en',
  locale: 'en',

  sources: {},
  licenses: [],
  attributes: [],
  domains: [],
  controls: [],

  /** locale -> { ui:{}, licenses:{id:{...}}, attributes, domains, sources, controls } */
  i18n: {},

  addSources(obj) { Object.assign(this.sources, obj); },
  addLicenses(arr) { this.licenses.push(...arr); },
  addAttributes(arr) { this.attributes.push(...arr); },
  addDomains(arr) { this.domains.push(...arr); },
  addControls(arr) { this.controls.push(...arr); },

  /**
   * 对外声称的核验日期取各出处中**最早**的一个。
   * 条文发布年份跨 2001–2026，各份的复核节奏不同；以最弱的一环为准，
   * 才不会因为刚复核过一份就让整份清单显得比实际新。
   */
  verifiedOn() {
    const ds = Object.values(this.sources).map(s => s.verifiedOn).filter(Boolean).sort();
    return ds[0] || '—';
  },
  /** 最近一次复核；与 verifiedOn() 之差即各出处的相对陈旧程度。 */
  lastVerifiedOn() {
    const ds = Object.values(this.sources).map(s => s.verifiedOn).filter(Boolean).sort();
    return ds[ds.length - 1] || '—';
  },

  addI18n(locale, obj) {
    const bucket = this.i18n[locale] || (this.i18n[locale] = {});
    for (const [kind, entries] of Object.entries(obj)) {
      const target = bucket[kind] || (bucket[kind] = {});
      Object.assign(target, entries);
    }
  },

  /**
   * 取某条记录在当前语言下的字段。找不到译文时回落到基础数据（zh-Hans），
   * 使新增控制点在译文补齐前仍可显示，而不是留空。
   * @param {string} kind  licenses | attributes | domains | sources | controls
   * @param {string} id    记录 ID
   * @param {object} base  基础数据对象
   */
  tr(kind, id, base) {
    if (this.locale === this.baseLocale) return base;
    const bucket = this.i18n[this.locale];
    const over = bucket && bucket[kind] && bucket[kind][id];
    return over ? Object.assign({}, base, over) : base;
  },

  /**
   * 取界面字符串。{name} 形式的占位符由 vars 替换。
   * 缺失的键回落到 zh-Hans，再回落到键名本身，以便一眼看出漏译。
   */
  t(key, vars) {
    const at = loc => (this.i18n[loc] && this.i18n[loc].ui || {})[key];
    let s = at(this.locale);
    if (s == null) s = at(this.baseLocale);
    if (s == null) return key;
    return vars ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m)) : s;
  }
};
