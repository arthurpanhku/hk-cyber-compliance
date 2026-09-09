<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
    <img src="assets/logo.svg" alt="香港网络安全合规助手" width="374">
  </picture>
  <p><strong>按牌照与业务特征，生成香港监管机构的网络安全控制点要求</strong></p>
  <p>
    <!-- lang-nav -->
    <a href="README.zh-Hant.md">繁體</a> · <strong>简体</strong> · <a href="README.md">English</a>
  </p>
  <p>
    <a href="https://github.com/arthurpanhku/hk-cyber-compliance/actions/workflows/ci.yml"><img src="https://github.com/arthurpanhku/hk-cyber-compliance/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-1d4ed8" alt="License: MIT"></a>
    <img src="https://img.shields.io/badge/version-1.3.0-0ea5e9" alt="Version 1.3.0">
    <img src="https://img.shields.io/badge/控制点-102-16a34a" alt="102 controls">
    <img src="https://img.shields.io/badge/条文出处-20-64748B" alt="20 sources">
    <img src="https://img.shields.io/badge/语言-EN%20%C2%B7%20%E7%B9%81%20%C2%B7%20%E7%AE%80-7c3aed" alt="Three languages">
    <img src="https://img.shields.io/badge/零依赖-双击即用-7c3aed" alt="Zero dependency">
    <img src="https://img.shields.io/badge/条文核验-2026--09--08-64748B" alt="Verified 2026-09-08">
  </p>
</div>

---

> ⚠️ **本工具不构成法律或合规意见。** 所列控制点是对公开监管条文的结构化整理，不能取代阅读条文原文，
> 亦不能取代具备资格的法律或合规专业人士的判断。监管要求持续更新，请以监管机构官网最新版本为准。

## 简介

香港的金融机构同时受多个监管机构的网络安全要求约束：证监会（SFC）、金管局（HKMA）、私隐专员公署（PCPD），
2026 年起还有《保护关键基础设施（电脑系统）条例》。条文散落在指引、通函、监管政策手册和实务守则中，
同一项控制往往被多个机构以不同措辞重复要求。

本工具把这些条文拆解为**可勾选的控制点**：选择贵公司持有的牌照与业务特征，即时得到适用的控制点清单，
每条都标注**来源法规、条款编号、发布日期与官方原文链接**，并可自评打分、导出底稿。

## 快速开始

不需要安装任何东西，也不需要构建步骤：

```bash
git clone https://github.com/arthurpanhku/hk-cyber-compliance.git
```

然后**双击 `index.html`** 即可在浏览器中使用。数据以 `.js` 形式加载而非 `.json`，正是为了让本地
`file://` 打开时不被浏览器 CORS 策略拦截——不需要起服务器。

也可直接部署到 GitHub Pages（仓库设置 → Pages → 从 `main` 分支根目录发布）。

## 功能

| 功能 | 说明 |
| --- | --- |
| **按牌照筛选** | 14 种牌照／实体类型（SFC 各类受规管活动、VASP、认可机构、储值支付工具、一般企业） |
| **按业务特征细分** | 6 项特征（互联网交易、电子银行、处理个人资料、关键基础设施指定、外判／云端、使用 AI 模型）决定同一牌照下条文是否适用 |
| **控制点去重与交叉映射** | 同一项要求被 SFC 与 HKMA 同时规定时合并为一张卡片，并逐一列出各自的条文出处与条款编号 |
| **条文可追溯** | 每条控制点附说明 + 英文条文原文引述 + 条款编号 + 发布日期 + 官方链接 |
| **自评与差距报告** | 每项可标记「已实施／部分／未实施／不适用」，实时计算合规度，支持「只看未完成」 |
| **三种语言** | 英文、繁体中文、简体中文，页首一键切换，导出的 CSV 亦随之切换 |
| **导出** | 一键导出 CSV（含 BOM，Excel 直接打开中文不乱码）或打印为 PDF（自动附牌照范围抬头） |
| **本地保存** | 选择与自评进度存于浏览器 localStorage，不上传任何数据 |

## 覆盖范围

v1.3.0 共 **102 条控制点**，来自 **20 份**官方文件。每份出处各有自己的 `verifiedOn`——
最近一次实际打开官网核对链接与版本的日期。条文发布跨 2001 至 2026 年、复核节奏各不相同，
用一个全局日期会让刚复核过的和多年没碰的看起来一样新。页首显示的是其中**最早**的一个，
即以最弱的一环为准；另有每周自动巡检全部链接的工作流。

### 证监会 SFC（42 条）

| 文件 | 日期 | 说明 |
| --- | --- | --- |
| [减低及缓减与互联网交易相关的黑客入侵风险指引](https://www.sfc.hk/-/media/EN/assets/components/codes/files-current/web/guidelines/guidelines-for-reducing-and-mitigating-hacking-risks-associated-with-internet-trading/guidelines-for-reducing-and-mitigating-hacking-risks-associated-with-internet-trading.pdf) | 2017-10-27 | 全部 20 项基线控制，逐条对应原文条款号 |
| [通函 26EC35：抗钓鱼认证与可疑活动监控](https://apps.sfc.hk/edistributionWeb/gateway/EN/circular/intermediaries/supervision/doc?refNo=26EC35) | 2026-07-09 | OTP 不再获接受；passkey／设备绑定；**限期 2027-07-08** |
| [通函 26EC32：应对 AI 驱动网络攻击](https://apps.sfc.hk/edistributionWeb/gateway/EN/circular/intermediaries/supervision/doc?refNo=26EC32) | 2026-06-02 | 资产清单、加速补丁、最小权限、微分段、不可信输入处理 |
| 《操守准则》第 18 段及附表 7 | — | 互联网交易的上位规定 |

### 金管局 HKMA — 认可机构（24 条）

| 文件 | 日期 | 说明 |
| --- | --- | --- |
| [SPM TM-C-1 网络风险管理的监管方针](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20241202-2-EN) | 2024-11-29 | 法定指引；C-RAF 的现行依据 |
| [SPM TM-E-1 电子银行风险管理（第 4 版）](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/TM-E-1) | 2024-10-25 | 法定指引 |
| [SPM TM-G-1 科技风险管理一般原则](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/TM-G-1) | 2003-06-24 | |
| [SPM OR-2 营运韧性](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/OR-2) | 2022-05-31 | |
| [SPM SA-2 外判](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/SA-2) | 2001-12-28 | |
| [通函：网络安全强化计划 2.0（C-RAF 2.0）](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20201103-1-EN) | 2020-11-03 | 固有风险评估、成熟度评估、iCAST |
| [通函：AI 驱动网络威胁下的网络韧性](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20260529-8-EN) | 2026-06-02 | |

### 金管局 HKMA — 储值支付工具持牌人（15 条）

| 文件 | 日期 | 说明 |
| --- | --- | --- |
| [储值支付工具持牌人监管指引（G.N. 5043）](https://www.hkma.gov.hk/media/eng/doc/key-functions/financial-infrastructure/Guidelines-on-supervision-of-SVF-licensees_Eng.pdf) | 2016-09 | 《支付系统及储值支付工具条例》第 54(1A)(b) 条；第 7.2／7.3／7.4 节的科技风险、支付保安与业务连续性要求 |
| [储值支付工具持牌人监管实务备考](https://www.hkma.gov.hk/media/eng/doc/key-functions/financial-infrastructure/PN_on_supervision_of_SVF_licensees_eng.pdf) | 2025-10 | 逐段说明达标方式，含反诈骗要求：**讯息不得嵌入超连结** |
| [SVF 界别关键基础设施实务守则](https://www.occics.gov.hk/filemanager/en/content_19/SCoP_SVF_Licensees_en.pdf) | 2026-06-12 | 适用于被指定为 CI 营运者的 SVF 持牌人 |

### 关键基础设施（13 条）

| 文件 | 日期 | 说明 |
| --- | --- | --- |
| [《保护关键基础设施（电脑系统）条例》实务守则（通用版）](https://www.occics.gov.hk/filemanager/en/content_19/CoP_en_v1.0.pdf) | 2026-01-01 | 三类法定责任；严重事故 **12 小时**、其他 **48 小时**通报，书面报告 **14 日** |
| [金管专员发出的银行界别实务守则](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20260527-25-EN) | 2026-06-02 | 适用于被指定为 CI 营运者的认可机构 |

### 私隐专员公署 PCPD（8 条）

| 文件 | 说明 |
| --- | --- |
| [《个人资料（私隐）条例》（第 486 章）六项保障资料原则](https://www.pcpd.org.hk/english/data_privacy_law/6_data_protection_principles/principles.html) | 以 DPP4 资料保安原则为核心 |

## 适用性判定规则

每条控制点的 `applicability` 由两部分组成：

- **`licenses`（任一命中）** —— 勾选的牌照中只要有一个在列表内即适用
- **`attributes`（全部具备）** —— 列出的业务特征必须**全部**勾选才适用

例如 SFC 黑客风险指引的控制点适用于 `第 1、2、3、9 类` 及 `VASP`，但**必须**同时勾选「提供互联网交易设施」——
这与指引第 3 段的适用范围一致（第 3 类仅限持牌杠杆式外汇交易商；第 9 类仅限透过自身互联网交易设施分销基金）。

## 关于「合并跨监管重复项」

合并只在**双向交叉引用**时发生：控制点 A 引用 B **且** B 也引用 A，才视为同一项要求并合并为一张卡片。
单向引用只显示为「另见」标签，不合并。

这条规则是刻意保守的。若采用引用关系的传递闭包，会把范围不对等的条文错误等同——
例如把「每日离线备份」和「在严重情景下测试关键业务交付能力」合并，或把强制的 12 小时法定事故通报
与《私隐条例》下的自愿通报合并。两者性质不同，合并会造成合规误读。

在勾选全部牌照与业务特征的最大范围下，102 条条文合并为 **82 项**独立要求。

> **部署注意**：仓库根目录的 `.nojekyll` 不可删除。GitHub Pages 默认以 Jekyll 处理站点，
> 而 Jekyll 会忽略以下划线开头的路径，导致 `data/_registry.js` 返回 404、整个应用无法启动。

## 多语言

界面、控制点说明与导出的 CSV 均提供英文、繁体中文、简体中文三个版本。语言按
`?lang=` 参数 → 已保存的偏好 → 浏览器 `Accept-Language` 的顺序判定，最后回落到英文；
页首可随时切换，选择会被记住。

条文引述**一律不翻译**，永远保留监管机构发布的英文原文并附官方链接。
如任何语言的说明与英文原文有出入，概以监管机构发布的原文为准。

```
data/i18n/
├── zh-Hans.js     简体界面字符串（基础数据本身即简体）
├── zh-Hant.js     繁体层 —— 自动生成，请勿手改
└── en.js          英文层 —— 界面字符串与全部控制点文字
```

基础数据以简体中文撰写。繁体层由 OpenCC 的 `s2hk` 模式生成，因此用词是香港的
（網絡／軟件／私隱，而非台湾的網路／軟體），并以一张覆盖表把字形改回香港法例与
金管局、证监会文件的写法（戶／說／啟／群／溫／閱，而非教育局字形表的 户／説／啓／羣／温／閲）。

改动任何中文文字后，重新生成繁体层：

```bash
pip install opencc-python-reimplemented
python3 tools/gen-hant.py
```

英文层不是从中文翻译，而是对照监管机构的英文原始文件撰写——SFC 通函、HKMA 监管政策手册
及各实务守则本身即以英文发布，因此英文措辞与读者在原文中看到的一致。

## 数据结构

```
.nojekyll                 关闭 GitHub Pages 的 Jekyll 处理（必需，勿删）
data/
├── _registry.js          全局注册表与语言查找
├── sources.js            20 份条文出处（标题、日期、法律地位、官方链接）
├── taxonomy.js           14 种牌照 · 6 项业务特征 · 10 个控制域
├── i18n/
│   ├── zh-Hans.js        简体界面字符串
│   ├── zh-Hant.js        繁体层（生成）
│   └── en.js             英文层
└── controls/
    ├── sfc-internet-trading.js    SFC 黑客风险指引 20 项 + 操守准则
    ├── sfc-circulars-2026.js      SFC 2026 年两份通函
    ├── hkma.js                    TM-G-1 / TM-E-1 / TM-C-1 / OR-2 / SA-2 / C-RAF
    ├── svf.js                     储值支付工具指引与实务备考
    ├── pdpo.js                    六项保障资料原则
    └── critical-infrastructure.js 关键基础设施条例三类责任
```

单条控制点的形态（以简体撰写，其余语言由 `data/i18n/` 的覆盖层提供）：

```js
{
  id: 'SFC-IT-1.1',
  domain: 'identity',                  // 控制域，见 taxonomy.js
  priority: 'baseline',                // baseline | enhanced
  sourceId: 'sfc-hacking',             // 指向 sources.js
  clause: '1.1',                       // 条文中的条款编号
  title: '客户账户登录须实施双重认证',
  requirement: '……',                   // 中文说明
  quote: 'A licensed or registered person should implement …',  // 英文原文，任何语言下都不翻译
  applicability: { licenses: [...], attributes: [...] },
  deadline: '2027-07-08',              // 可选：合规限期
  crossRefs: ['SFC-PH-A1', 'HKMA-TME1-4.1']
}
```

## 已知缺口

**保险业监管局（IA）的网络安全指引尚未纳入。** `ia.org.hk` 全站启用了 Cloudflare 机器人验证，
自动化工具无法取得原文 PDF。本项目不接受凭记忆撰写的条文，因此在取得官方原文前不会加入 IA 相关控制点，
牌照选项中亦暂未列出保险中介人／授权保险人。欢迎以 PR 形式补充（请附官方 PDF 出处与条款编号）。

## 贡献

欢迎补充条文、修正措辞、更新监管变化。提交前请运行校验：

```bash
node tools/validate.mjs
```

校验项包括：ID 唯一、出处存在、控制域／牌照／业务特征有效、交叉引用可解析、必填字段齐全、
每份出处都有 `verifiedOn`，**以及英文层与繁体层是否完整**——新增控制点若未补译，校验会失败。
超过 180 天未复核的出处会出现提示。

`.github/workflows/ci.yml` 会在每个 PR 上自动运行以上校验，并确认繁体生成物是最新的。
另有每周一次的链接巡检：

```bash
node tools/check-links.mjs
```

只有确定失效（404／410／域名解析不了）才会失败；403／429 多为机器人防护，5xx 与超时多为暂时性
故障，只报告不失败——长期红着的检查很快就没人看了。详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 授权

[MIT](LICENSE)。条文原文的版权归各监管机构所有，本项目仅作结构化引用并链接至官方来源。
