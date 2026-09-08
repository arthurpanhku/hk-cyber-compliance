<div align="center">
  <img src="assets/logo.svg" alt="香港网络安全合规助手" width="460">
  <p><strong>按牌照与业务特征，生成香港监管机构的网络安全控制点要求</strong></p>
  <p>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-1d4ed8" alt="License: MIT"></a>
    <img src="https://img.shields.io/badge/version-1.0.0-0ea5e9" alt="Version 1.0.0">
    <img src="https://img.shields.io/badge/控制点-87-16a34a" alt="87 controls">
    <img src="https://img.shields.io/badge/条文出处-17-64748B" alt="17 sources">
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
git clone https://github.com/arthurpanhku/hk-cyber-compliance-assistant.git
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
| **条文可追溯** | 每条控制点附中文说明 + 英文条文原文引述 + 条款编号 + 发布日期 + 官方链接 |
| **自评与差距报告** | 每项可标记「已实施／部分／未实施／不适用」，实时计算合规度，支持「只看未完成」 |
| **导出** | 一键导出 CSV（含 BOM，Excel 直接打开中文不乱码）或打印为 PDF（自动附牌照范围抬头） |
| **本地保存** | 选择与自评进度存于浏览器 localStorage，不上传任何数据 |

## 覆盖范围

v1.0.0 共 **87 条控制点**，来自 **17 份**官方文件（全部链接与日期于 2026-09-08 经官网核验）：

### 证监会 SFC（42 条）

| 文件 | 日期 | 说明 |
| --- | --- | --- |
| [减低及缓减与互联网交易相关的黑客入侵风险指引](https://www.sfc.hk/-/media/EN/assets/components/codes/files-current/web/guidelines/guidelines-for-reducing-and-mitigating-hacking-risks-associated-with-internet-trading/guidelines-for-reducing-and-mitigating-hacking-risks-associated-with-internet-trading.pdf) | 2017-10-27 | 全部 20 项基线控制，逐条对应原文条款号 |
| [通函 26EC35：抗钓鱼认证与可疑活动监控](https://apps.sfc.hk/edistributionWeb/gateway/EN/circular/intermediaries/supervision/doc?refNo=26EC35) | 2026-07-09 | OTP 不再获接受；passkey／设备绑定；**限期 2027-07-08** |
| [通函 26EC32：应对 AI 驱动网络攻击](https://apps.sfc.hk/edistributionWeb/gateway/EN/circular/intermediaries/supervision/doc?refNo=26EC32) | 2026-06-02 | 资产清单、加速补丁、最小权限、微分段、不可信输入处理 |
| 《操守准则》第 18 段及附表 7 | — | 互联网交易的上位规定 |

### 金管局 HKMA（24 条）

| 文件 | 日期 | 说明 |
| --- | --- | --- |
| [SPM TM-C-1 网络风险管理的监管方针](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20241202-2-EN) | 2024-11-29 | 法定指引；C-RAF 的现行依据 |
| [SPM TM-E-1 电子银行风险管理（第 4 版）](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/TM-E-1) | 2024-10-25 | 法定指引 |
| [SPM TM-G-1 科技风险管理一般原则](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/TM-G-1) | 2003-06-24 | |
| [SPM OR-2 营运韧性](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/OR-2) | 2022-05-31 | |
| [SPM SA-2 外判](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/SA-2) | 2001-12-28 | |
| [通函：网络安全强化计划 2.0（C-RAF 2.0）](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20201103-1-EN) | 2020-11-03 | 固有风险评估、成熟度评估、iCAST |
| [通函：AI 驱动网络威胁下的网络韧性](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20260529-8-EN) | 2026-06-02 | |

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

在同时持有 SFC 牌照与 HKMA 认可机构身份、且勾选全部业务特征的最大范围下，87 条条文合并为 **67 项**独立要求。

## 数据结构

```
data/
├── _registry.js          全局注册表
├── sources.js            17 份条文出处（标题、日期、法律地位、官方链接）
├── taxonomy.js           14 种牌照 · 6 项业务特征 · 10 个控制域
└── controls/
    ├── sfc-internet-trading.js    SFC 黑客风险指引 20 项 + 操守准则
    ├── sfc-circulars-2026.js      SFC 2026 年两份通函
    ├── hkma.js                    TM-G-1 / TM-E-1 / TM-C-1 / OR-2 / SA-2 / C-RAF
    ├── pdpo.js                    六项保障资料原则
    └── critical-infrastructure.js 关键基础设施条例三类责任
```

单条控制点的形态：

```js
{
  id: 'SFC-IT-1.1',
  domain: 'identity',                  // 控制域，见 taxonomy.js
  priority: 'baseline',                // baseline | enhanced
  sourceId: 'sfc-hacking',             // 指向 sources.js
  clause: '1.1',                       // 条文中的条款编号
  title: '客户账户登录须实施双重认证',
  requirement: '……',                   // 中文说明
  quote: 'A licensed or registered person should implement …',  // 英文原文引述
  applicability: { licenses: [...], attributes: [...] },
  deadline: '2027-07-08',              // 可选：合规限期
  crossRefs: ['SFC-PH-A1', 'HKMA-TME1-4.1']
}
```

## 贡献

欢迎补充条文、修正措辞、更新监管变化。提交前请运行校验：

```bash
node tools/validate.mjs
```

校验项包括：ID 唯一、出处存在、控制域／牌照／业务特征有效、交叉引用可解析、必填字段齐全。
详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 授权

[MIT](LICENSE)。条文原文的版权归各监管机构所有，本项目仅作结构化引用并链接至官方来源。
