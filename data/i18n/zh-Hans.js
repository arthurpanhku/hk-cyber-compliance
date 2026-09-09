/**
 * 简体中文界面字符串。
 * 基础数据（taxonomy / sources / controls）本身即简体，故此处只有 ui。
 * 繁体版由 tools/gen-hant.py 从本文件与基础数据自动转换生成，请勿手改繁体文件。
 */
HKCC.addI18n('zh-Hans', {
  ui: {
    appTitle: '香港网络安全合规助手',
    metaDescription: '按牌照与业务特征生成 SFC、HKMA、PCPD 及关键基础设施条例的网络安全控制点要求，每条均标注官方条文出处。',
    printTitle: '香港网络安全合规控制点清单',
    versionLine: 'v{version} · 条文核验于 {date}',

    langLabel: '语言',
    btnExport: '导出 CSV',
    btnPrint: '打印 / 存为 PDF',
    btnReset: '重置',
    btnTheme: '主题',
    btnThemeTitle: '切换浅色 / 深色 / 跟随系统',

    searchPlaceholder: '搜索控制点、条文或关键词…',
    searchAria: '搜索控制点',
    optMerge: '合并跨监管重复项',
    optGaps: '只看未完成',

    secLicenses: '① 牌照 / 实体类型',
    secAttributes: '② 业务特征',

    emptyNoLicenseTitle: '请先在左侧选择牌照',
    emptyNoLicenseNote: '勾选贵公司持有的牌照与业务特征，工具会列出适用的控制点要求。',
    emptyNoMatchTitle: '没有符合条件的控制点',
    emptyNoMatchGaps: '当前筛选下所有控制点已标记为已实施或不适用。',
    emptyNoMatchQuery: '请调整搜索关键词或选项。',

    countItems: '{n} 项',
    alsoStates: '{regulator} 另有述明：',
    quoteSummary: '英文条文原文',
    notePrefix: '注：',
    tagMerged: '跨监管合并 {n} 条',
    tagDeadline: '限期 {date}',
    tagSeeAlso: '另见 {id}',

    summaryLabel: '项适用控制要求',
    summaryFrom: '源自 {total} 条监管条文。',
    summaryFromMerged: '源自 {total} 条监管条文，其中 {merged} 条经跨监管合并去重。',
    progressLabel: '自评合规度 {pct}%',
    progressTally: '已实施 {done} · 部分 {partial} · 未实施 {gap} · 未评 {none}',

    statusDone: '已实施',
    statusPartial: '部分',
    statusGap: '未实施',
    statusNa: '不适用',
    statusUnrated: '未评估',

    sourceMetaTip: '发布日期 {issued}　·　条文核验于 {verified}',
    verifiedRangeTip: '各出处的核验日期介乎 {from} 至 {to}；此处显示最早的一个。',

    phScope: '牌照范围：',
    phAttrs: '业务特征：',
    phNone: '（未选择）',
    phDate: '生成日期：{today}　·　条文核验日期：{verified}',

    confirmReset: '清除所有选择与自评记录？此操作无法撤销。',

    csvId: '控制点 ID',
    csvDomain: '控制域',
    csvTitle: '控制点',
    csvRequirement: '要求',
    csvRegulator: '监管机构',
    csvSource: '出处',
    csvClause: '条款',
    csvIssued: '发布日期',
    csvVerified: '条文核验日期',
    csvDeadline: '限期',
    csvUrl: '原文链接',
    csvQuote: '英文原文',
    csvStatus: '自评状态',

    disclaimerLabel: '免责声明：',
    disclaimerBody: '本工具为开源参考工具，不构成法律或合规意见。所列控制点为对公开监管条文的结构化整理，不能取代对条文原文的阅读，亦不能取代具备资格的法律或合规专业人士的判断。监管要求会持续更新，请以各监管机构官方网站发布的最新版本为准。',
    langNoteLabel: '关于条文语言：',
    langNoteBody: '控制点说明提供英文、繁体中文与简体中文三个版本，仅为便于阅读；条文引述一律保留监管机构发布的英文原文并附官方链接。如任何语言的说明与英文原文有出入，概以监管机构发布的原文为准。'
  }
});
