/** 牌照/實體類型。用戶可多選。 */
HKCC.addLicenses([
  { id: 'sfc-ra1', group: 'SFC 持牌法團', label: '第 1 類：證券交易', note: 'Dealing in securities' },
  { id: 'sfc-ra2', group: 'SFC 持牌法團', label: '第 2 類：期貨合約交易', note: 'Dealing in futures contracts' },
  { id: 'sfc-ra3', group: 'SFC 持牌法團', label: '第 3 類：槓桿式外匯交易', note: 'Leveraged foreign exchange trading（黑客風險指引只適用於持牌槓桿式外匯交易商）' },
  { id: 'sfc-ra4', group: 'SFC 持牌法團', label: '第 4 類：就證券提供意見', note: 'Advising on securities' },
  { id: 'sfc-ra5', group: 'SFC 持牌法團', label: '第 5 類：就期貨合約提供意見', note: 'Advising on futures contracts' },
  { id: 'sfc-ra6', group: 'SFC 持牌法團', label: '第 6 類：就機構融資提供意見', note: 'Advising on corporate finance' },
  { id: 'sfc-ra7', group: 'SFC 持牌法團', label: '第 7 類：提供自動化交易服務', note: 'Providing automated trading services' },
  { id: 'sfc-ra8', group: 'SFC 持牌法團', label: '第 8 類：提供證券保證金融資', note: 'Securities margin financing' },
  { id: 'sfc-ra9', group: 'SFC 持牌法團', label: '第 9 類：提供資產管理', note: 'Asset management' },
  { id: 'sfc-ra13', group: 'SFC 持牌法團', label: '第 13 類：為集體投資計劃提供託管服務', note: 'Depositary of relevant CIS' },
  { id: 'sfc-vasp', group: 'SFC 持牌法團', label: 'SFC 持牌虛擬資產服務提供者 / 交易平台', note: 'VASP / VATP' },
  { id: 'hkma-ai', group: 'HKMA 認可機構', label: '認可機構（銀行 / 有限制牌照銀行 / 接受存款公司）', note: 'Authorized Institution' },
  { id: 'hkma-svf', group: 'HKMA 認可機構', label: '儲值支付工具持牌人', note: 'Stored Value Facility licensee' },
  { id: 'other', group: '其他', label: '無上述金融牌照（一般企業）', note: '仍受《個人資料（私隱）條例》約束' }
]);

/** 業務特徵。決定同一牌照下條文是否適用。 */
HKCC.addAttributes([
  { id: 'internet-trading', label: '提供互聯網交易設施', note: '客戶可透過網頁或應用程式下達買賣指令；觸發 SFC 黑客風險指引全套要求' },
  { id: 'ebanking', label: '提供電子銀行服務', note: '網上銀行、流動支付、自助終端等；觸發 HKMA TM-E-1' },
  { id: 'personal-data', label: '收集或處理個人資料', note: '觸發《個人資料（私隱）條例》DPP4 資料保安要求' },
  { id: 'ci-designated', label: '已被指定為關鍵基礎設施營運者', note: '觸發《保護關鍵基礎設施（電腦系統）條例》三類法定責任' },
  { id: 'outsourcing', label: '使用第三方服務商或雲端服務', note: '觸發外判與供應鏈管理要求' },
  { id: 'ai-models', label: '在營運中使用 AI 語言模型', note: '觸發 2026 年 SFC / HKMA 關於 AI 驅動網絡攻擊的通函' }
]);

/** 控制域。用於結果分組。 */
HKCC.addDomains([
  { id: 'governance', label: '治理與問責', desc: '董事會及高級管理層職責、政策審批、風險管理架構' },
  { id: 'identity', label: '身份認證與存取控制', desc: '客戶認證、密碼策略、權限管理、特權帳戶' },
  { id: 'protect', label: '系統與網絡加固', desc: '網絡分段、補丁、端點防護、物理安全' },
  { id: 'data', label: '資料保護與加密', desc: '傳輸與存儲加密、敏感資料保護' },
  { id: 'detect', label: '監測、偵測與告警', desc: '異常交易監控、日誌、威脅情報、客戶通知' },
  { id: 'respond', label: '事件應變與監管報告', desc: '事故處理程序、上報時限、根因分析' },
  { id: 'resilience', label: '備份、韌性與業務連續性', desc: '備份、災難恢復、營運韌性、容忍度設定' },
  { id: 'thirdparty', label: '第三方與外判管理', desc: '服務水平協議、供應鏈風險、持續評估' },
  { id: 'assurance', label: '評估、審計與測試', desc: '自我評估、滲透測試、獨立審計、C-RAF' },
  { id: 'awareness', label: '意識與培訓', desc: '員工培訓、客戶風險提示' }
]);
