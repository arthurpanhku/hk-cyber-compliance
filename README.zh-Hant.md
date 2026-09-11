<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
    <img src="assets/logo.svg" alt="香港網絡安全合規助手" width="374">
  </picture>
  <p><strong>按牌照與業務特徵，生成香港監管機構的網絡安全控制點要求</strong></p>
  <p>
    <!-- lang-nav -->
    <strong>繁體</strong> · <a href="README.zh-Hans.md">简体</a> · <a href="README.md">English</a>
  </p>
  <p>
    <a href="https://github.com/arthurpanhku/hk-cyber-compliance/actions/workflows/ci.yml"><img src="https://github.com/arthurpanhku/hk-cyber-compliance/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-1d4ed8" alt="License: MIT"></a>
    <img src="https://img.shields.io/badge/version-1.4.0-0ea5e9" alt="Version 1.4.0">
    <img src="https://img.shields.io/badge/控制點-102-16a34a" alt="102 controls">
    <img src="https://img.shields.io/badge/條文出處-20-64748B" alt="20 sources">
    <img src="https://img.shields.io/badge/語言-EN%20%C2%B7%20%E7%B9%81%20%C2%B7%20%E7%AE%80-7c3aed" alt="Three languages">
    <img src="https://img.shields.io/badge/零依賴-雙擊即用-7c3aed" alt="Zero dependency">
    <img src="https://img.shields.io/badge/條文核驗-2026--09--08-64748B" alt="Verified 2026-09-08">
  </p>
</div>

---

> ⚠️ **本工具不構成法律或合規意見。** 所列控制點是對公開監管條文的結構化整理，不能取代閱讀條文原文，
> 亦不能取代具備資格的法律或合規專業人士的判斷。監管要求持續更新，請以監管機構官網最新版本為準。

## 簡介

香港的金融機構同時受多個監管機構的網絡安全要求約束：證監會（SFC）、金管局（HKMA）、私隱專員公署（PCPD），
2026 年起還有《保護關鍵基礎設施（電腦系統）條例》。條文散落在指引、通函、監管政策手冊和實務守則中，
同一項控制往往被多個機構以不同措辭重複要求。

本工具把這些條文拆解為**可勾選的控制點**：選擇貴公司持有的牌照與業務特徵，即時得到適用的控制點清單，
每條都標註**來源法規、條款編號、發佈日期與官方原文連結**，並可自評打分、匯出底稿。

## 快速開始

不需要安裝任何東西，也不需要建置步驟：

```bash
git clone https://github.com/arthurpanhku/hk-cyber-compliance.git
```

然後**雙擊 `index.html`** 即可在瀏覽器中使用。資料以 `.js` 形式加載而非 `.json`，正是為了讓本地
`file://` 打開時不被瀏覽器 CORS 策略攔截——不需要起伺服器。

也可直接部署到 GitHub Pages（倉庫設置 → Pages → 從 `main` 分支根目錄發佈）。

## 功能

| 功能 | 說明 |
| --- | --- |
| **按牌照篩選** | 14 種牌照／實體類型（SFC 各類受規管活動、VASP、認可機構、儲值支付工具、一般企業） |
| **按業務特徵細分** | 6 項特徵（互聯網交易、電子銀行、處理個人資料、關鍵基礎設施指定、外判／雲端、使用 AI 模型）決定同一牌照下條文是否適用 |
| **控制點去重與交叉映射** | 同一項要求被 SFC 與 HKMA 同時規定時合併為一張卡片，並逐一列出各自的條文出處與條款編號 |
| **條文可追溯** | 每條控制附說明、條款、發佈及核驗日期、官方連結，並標明英文來源文字屬於原文、節錄或說明 |
| **評估工作記錄** | 每個監管控制可記錄狀態、實施說明、證據引用、負責人及目標完成日期 |
| **整改清單** | 集中查看未評、部分及未實施控制，按控制領域篩選並標示逾期／30 日內到期 |
| **可攜項目文件** | 匯出或匯入帶版本號的 `.hkcc.json` 備份，保留範圍和完整評估記錄 |
| **三種語言** | 英文、繁體中文、簡體中文，頁首一鍵切換，匯出的 CSV 亦隨之切換 |
| **匯出** | 匯出含公式注入防護的 CSV，或列印為含項目資料及工作記錄的 PDF |
| **本地保存** | 項目資料存於瀏覽器 localStorage，不上傳任何資料 |

## 覆蓋範圍

v1.4.0 共 **102 條控制點**，來自 **20 份**官方文件。每份出處各有自己的 `verifiedOn`——
最近一次實際打開官網核對連結與版本的日期。條文發佈跨 2001 至 2026 年、複核節奏各不相同，
用一個全局日期會讓剛複核過的和多年沒碰的看起來一樣新。頁首顯示的是其中**最早**的一個，
即以最弱的一環為準；另有每週自動巡檢全部連結的工作流。

### 證監會 SFC（42 條）

| 文件 | 日期 | 說明 |
| --- | --- | --- |
| [減低及緩減與互聯網交易相關的黑客入侵風險指引](https://www.sfc.hk/-/media/EN/assets/components/codes/files-current/web/guidelines/guidelines-for-reducing-and-mitigating-hacking-risks-associated-with-internet-trading/guidelines-for-reducing-and-mitigating-hacking-risks-associated-with-internet-trading.pdf) | 2017-10-27 | 全部 20 項基線控制，逐條對應原文條款號 |
| [通函 26EC35：抗釣魚認證與可疑活動監控](https://apps.sfc.hk/edistributionWeb/gateway/EN/circular/intermediaries/supervision/doc?refNo=26EC35) | 2026-07-09 | OTP 不再獲接受；passkey／設備綁定；**限期 2027-07-08** |
| [通函 26EC32：應對 AI 驅動網絡攻擊](https://apps.sfc.hk/edistributionWeb/gateway/EN/circular/intermediaries/supervision/doc?refNo=26EC32) | 2026-06-02 | 資產清單、加速補丁、最小權限、微分段、不可信輸入處理 |
| 《操守準則》第 18 段及附表 7 | — | 互聯網交易的上位規定 |

### 金管局 HKMA — 認可機構（24 條）

| 文件 | 日期 | 說明 |
| --- | --- | --- |
| [SPM TM-C-1 網絡風險管理的監管方針](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20241202-2-EN) | 2024-11-29 | 法定指引；C-RAF 的現行依據 |
| [SPM TM-E-1 電子銀行風險管理（第 4 版）](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/TM-E-1) | 2024-10-25 | 法定指引 |
| [SPM TM-G-1 科技風險管理一般原則](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/TM-G-1) | 2003-06-24 | |
| [SPM OR-2 營運韌性](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/OR-2) | 2022-05-31 | |
| [SPM SA-2 外判](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/SA-2) | 2001-12-28 | |
| [通函：網絡安全強化計劃 2.0（C-RAF 2.0）](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20201103-1-EN) | 2020-11-03 | 固有風險評估、成熟度評估、iCAST |
| [通函：AI 驅動網絡威脅下的網絡韌性](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20260529-8-EN) | 2026-06-02 | |

### 金管局 HKMA — 儲值支付工具持牌人（15 條）

| 文件 | 日期 | 說明 |
| --- | --- | --- |
| [儲值支付工具持牌人監管指引（G.N. 5043）](https://www.hkma.gov.hk/media/eng/doc/key-functions/financial-infrastructure/Guidelines-on-supervision-of-SVF-licensees_Eng.pdf) | 2016-09 | 《支付系統及儲值支付工具條例》第 54(1A)(b) 條；第 7.2／7.3／7.4 節的科技風險、支付保安與業務連續性要求 |
| [儲值支付工具持牌人監管實務備考](https://www.hkma.gov.hk/media/eng/doc/key-functions/financial-infrastructure/PN_on_supervision_of_SVF_licensees_eng.pdf) | 2025-10 | 逐段說明達標方式，含反詐騙要求：**訊息不得嵌入超連結** |
| [SVF 界別關鍵基礎設施實務守則](https://www.occics.gov.hk/filemanager/en/content_19/SCoP_SVF_Licensees_en.pdf) | 2026-06-12 | 適用於被指定為 CI 營運者的 SVF 持牌人 |

### 關鍵基礎設施（13 條）

| 文件 | 日期 | 說明 |
| --- | --- | --- |
| [《保護關鍵基礎設施（電腦系統）條例》實務守則（通用版）](https://www.occics.gov.hk/filemanager/en/content_19/CoP_en_v1.0.pdf) | 2026-01-01 | 三類法定責任；嚴重事故 **12 小時**、其他 **48 小時**通報，書面報告 **14 日** |
| [金管專員發出的銀行界別實務守則](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20260527-25-EN) | 2026-06-02 | 適用於被指定為 CI 營運者的認可機構 |

### 私隱專員公署 PCPD（8 條）

| 文件 | 說明 |
| --- | --- |
| [《個人資料（私隱）條例》（第 486 章）六項保障資料原則](https://www.pcpd.org.hk/english/data_privacy_law/6_data_protection_principles/principles.html) | 以 DPP4 資料保安原則為核心 |

## 適用性判定規則

每條控制點的 `applicability` 由兩部分組成：

- **`licenses`（任一命中）** —— 勾選的牌照中只要有一個在列表內即適用
- **`attributes`（全部具備）** —— 列出的業務特徵必須**全部**勾選才適用

例如 SFC 黑客風險指引的控制點適用於 `第 1、2、3、9 類` 及 `VASP`，但**必須**同時勾選「提供互聯網交易設施」——
這與指引第 3 段的適用範圍一致（第 3 類僅限持牌槓桿式外匯交易商；第 9 類僅限透過自身互聯網交易設施分銷基金）。

## 關於「合併跨監管重複項」

合併只在**雙向交叉引用**時發生：控制點 A 引用 B **且** B 也引用 A，才視為同一項要求並合併為一張卡片。
單向引用只顯示為「另見」標籤，不合並。

這條規則是刻意保守的。若採用引用關係的傳遞閉包，會把範圍不對等的條文錯誤等同——
例如把「每日離線備份」和「在嚴重情景下測試關鍵業務交付能力」合併，或把強制的 12 小時法定事故通報
與《私隱條例》下的自願通報合併。兩者性質不同，合併會造成合規誤讀。

在勾選全部牌照與業務特徵的最大範圍下，102 條條文合併為 **82 項**獨立要求。

> **部署注意**：倉庫根目錄的 `.nojekyll` 不可刪除。GitHub Pages 預設以 Jekyll 處理站點，
> 而 Jekyll 會忽略以下劃線開頭的路徑，導致 `data/_registry.js` 返回 404、整個應用無法啟動。

## 多語言

界面、控制點說明與匯出的 CSV 均提供英文、繁體中文、簡體中文三個版本。語言按
`?lang=` 參數 → 已保存的偏好 → 瀏覽器 `Accept-Language` 的順序判定，最後回落到英文；
頁首可隨時切換，選擇會被記住。

條文引述**一律不翻譯**，永遠保留監管機構發佈的英文原文並附官方連結。
如任何語言的說明與英文原文有出入，概以監管機構發佈的原文為準。

```
data/i18n/
├── zh-Hans.js     簡體界面字符串（基礎資料本身即簡體）
├── zh-Hant.js     繁體層 —— 自動生成，請勿手改
└── en.js          英文層 —— 界面字符串與全部控制點文字
```

基礎資料以簡體中文撰寫。繁體層由 OpenCC 的 `s2hk` 模式生成，因此用詞是香港的
（網絡／軟件／私隱，而非台灣的網路／軟體），並以一張覆蓋表把字形改回香港法例與
金管局、證監會文件的寫法（戶／說／啟／群／溫／閱，而非教育局字形表的 戶／說／啟／群／溫／閱）。

改動任何中文文字後，重新生成繁體層：

```bash
pip install opencc-python-reimplemented
python3 tools/gen-hant.py
```

英文層不是從中文翻譯，而是對照監管機構的英文原始文件撰寫——SFC 通函、HKMA 監管政策手冊
及各實務守則本身即以英文發佈，因此英文措辭與讀者在原文中看到的一致。

## 資料結構

```
.nojekyll                 關閉 GitHub Pages 的 Jekyll 處理（必需，勿刪）
data/
├── _registry.js          全局註冊表與語言查找
├── sources.js            20 份條文出處（標題、日期、法律地位、官方連結）
├── taxonomy.js           14 種牌照 · 6 項業務特徵 · 10 個控制域
├── i18n/
│   ├── zh-Hans.js        簡體界面字符串
│   ├── zh-Hant.js        繁體層（生成）
│   └── en.js             英文層
└── controls/
    ├── sfc-internet-trading.js    SFC 黑客風險指引 20 項 + 操守準則
    ├── sfc-circulars-2026.js      SFC 2026 年兩份通函
    ├── hkma.js                    TM-G-1 / TM-E-1 / TM-C-1 / OR-2 / SA-2 / C-RAF
    ├── svf.js                     儲值支付工具指引與實務備考
    ├── pdpo.js                    六項保障資料原則
    └── critical-infrastructure.js 關鍵基礎設施條例三類責任
```

單條控制點的形態（以簡體撰寫，其餘語言由 `data/i18n/` 的覆蓋層提供）：

```js
{
  id: 'SFC-IT-1.1',
  domain: 'identity',                  // 控制域，見 taxonomy.js
  priority: 'baseline',                // baseline | enhanced
  sourceId: 'sfc-hacking',             // 指向 sources.js
  clause: '1.1',                       // 條文中的條款編號
  title: '客户账户登录须实施双重认证',
  requirement: '……',                   // 中文說明
  quote: 'A licensed or registered person should implement …',  // 英文原文，任何語言下都不翻譯
  quoteStatus: 'excerpt',               // verbatim | excerpt | summary
  applicability: { licenses: [...], attributes: [...] },
  deadline: '2027-07-08',              // 可選：合規限期
  crossRefs: ['SFC-PH-A1', 'HKMA-TME1-4.1']
}
```

## 已知缺口

**保險業監管局（IA）的網絡安全指引尚未納入。** `ia.org.hk` 全站啟用了 Cloudflare 機器人驗證，
自動化工具無法取得原文 PDF。本項目不接受憑記憶撰寫的條文，因此在取得官方原文前不會加入 IA 相關控制點，
牌照選項中亦暫未列出保險中介人／授權保險人。歡迎以 PR 形式補充（請附官方 PDF 出處與條款編號）。

**《虛擬資產交易平台營運者指引》尚未拆解為控制點。** 該指引已登記在 `data/sources.js`
（`sfc-vatp-guidelines`，標記為 `status: 'ref'`），但目前**沒有任何控制點引用它**。
換言之，勾選「SFC 持牌虛擬資產服務提供者／交易平台」只會得到互聯網交易與 2026 年通函那幾套要求，
不包括該指引自身對平台營運者的條文。這是一個已知的覆蓋缺口，不是判斷為「不適用」。

**條文是否仍現行有效，最終由使用者自行核對。** 每份出處的 `verifiedOn` 記錄的是某一天
有人實際打開官網核對過，不是持續監控；監管機構隨時可能修訂或撤回條文。
把本工具的輸出用於任何正式用途前，請循每張控制卡的官方連結回到監管機構網站核對當前版本——
這也是每條控制點都強制標註出處與條款編號的原因。

## 貢獻

歡迎補充條文、修正措辭、更新監管變化。提交前請執行校驗：

```bash
node tools/validate.mjs
node --test tests/*.test.mjs
```

校驗項包括：ID 唯一、出處存在、控制域／牌照／業務特徵有效、交叉引用可解析、必填欄位及來源文字分類齊全、
每份出處都有 `verifiedOn`，**以及英文層與繁體層是否完整**——新增控制點若未補譯，校驗會失敗。
單元測試覆蓋適用性、合併、v1 遷移、項目校驗、到期計算及 CSV 注入防護。
超過 180 天未複核的出處會出現提示。

`.github/workflows/ci.yml` 會在每個 PR 上自動執行以上校驗，並確認繁體生成物是最新的。
另有每週一次的連結巡檢：

```bash
node tools/check-links.mjs
```

只有確定失效（404／410／域名解析不了）才會失敗；403／429 多為機器人防護，5xx 與超時多為暫時性
故障，只報告不失敗——長期紅着的檢查很快就沒人看了。詳見 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 授權

[MIT](LICENSE)。條文原文的版權歸各監管機構所有，本項目僅作結構化引用並連結至官方來源。
