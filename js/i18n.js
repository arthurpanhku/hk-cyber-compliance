/* 语言选择：解析、持久化与切换。须在 app.js 之前载入。 */
(function () {
  'use strict';

  const KEY = 'hkcc.locale';
  const ids = HKCC.locales.map(l => l.id);

  /** 把 navigator.language 之类的标签映射到本项目的三种语言。 */
  function normalize(tag) {
    if (!tag) return null;
    const t = String(tag).toLowerCase().replace(/_/g, '-');
    if (ids.includes(tag)) return tag;
    if (!t.startsWith('zh')) return t.split('-')[0] === 'en' ? 'en' : null;
    // zh-Hant / zh-TW / zh-HK / zh-MO 视为繁体；zh-Hans / zh-CN / zh-SG 视为简体。
    if (/hant|tw|hk|mo/.test(t)) return 'zh-Hant';
    if (/hans|cn|sg|my/.test(t)) return 'zh-Hans';
    return 'zh-Hant';   // 未标注地区的 zh：本项目面向香港，按繁体处理
  }

  function detect() {
    const q = normalize(new URLSearchParams(location.search).get('lang'));
    if (q) return q;
    try {
      const saved = normalize(localStorage.getItem(KEY));
      if (saved) return saved;
    } catch (e) { /* 隐私模式或站点数据被禁用时忽略 */ }
    for (const tag of (navigator.languages || [navigator.language])) {
      const m = normalize(tag);
      if (m) return m;
    }
    return HKCC.defaultLocale;
  }

  HKCC.locale = detect();

  HKCC.setLocale = function (id) {
    if (!ids.includes(id) || id === HKCC.locale) return;
    HKCC.locale = id;
    try { localStorage.setItem(KEY, id); } catch (e) { /* 同上 */ }
    applyDocumentLocale();
    document.dispatchEvent(new CustomEvent('hkcc:localechange'));
  };

  /** 同步 <html lang> 与 <title>，让浏览器与辅助技术用对语言。 */
  function applyDocumentLocale() {
    const def = HKCC.locales.find(l => l.id === HKCC.locale);
    document.documentElement.setAttribute('lang', def ? def.html : 'en');
    document.title = HKCC.t('appTitle');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', HKCC.t('metaDescription'));
  }
  HKCC.applyDocumentLocale = applyDocumentLocale;

  /**
   * 出处标题：英文界面用官方英文名，中文界面用中文译名。
   * 中文译名缺失时回落到英文名，避免出现空白链接。
   */
  HKCC.sourceTitle = function (id) {
    const s = HKCC.tr('sources', id, HKCC.sources[id]);
    if (HKCC.locale === 'en') return s.titleEn || s.titleZh;
    return s.titleZh || s.titleEn;
  };
})();
