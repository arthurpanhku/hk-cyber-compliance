/**
 * SFC 2026 年兩份網絡安全通函：
 *  - 26EC35 (2026-07-09) 抗釣魚認證與可疑活動監控
 *  - 26EC32 (2026-06-02) 應對 AI 驅動網絡攻擊的加強措施
 */
(function () {
  const IT = ['sfc-ra1', 'sfc-ra2', 'sfc-ra3', 'sfc-ra9', 'sfc-vasp'];
  const ALL_LC = ['sfc-ra1', 'sfc-ra2', 'sfc-ra3', 'sfc-ra4', 'sfc-ra5', 'sfc-ra6',
    'sfc-ra7', 'sfc-ra8', 'sfc-ra9', 'sfc-ra13', 'sfc-vasp'];
  const PH = 'sfc-cir-phishing-2026';
  const AI = 'sfc-cir-ai-2026';

  HKCC.addControls([
    // ---- 26EC35 抗釣魚認證 ----
    {
      id: 'SFC-PH-A1', domain: 'identity', priority: 'enhanced', sourceId: PH, clause: '(A) 第 5 段',
      title: '客戶登入及設備綁定須採用抗釣魚認證方案', deadline: '2027-07-08',
      requirement: '為客戶登入互聯網交易帳戶及客戶註冊／綁定設備實施抗釣魚的穩健認證方案。證監會明確表示不視一次性密碼（OTP）為抗釣魚方案，不得用於上述兩個流程。可接受示例包括 passkey（基於公開密鑰加密的無密碼憑證）及已綁定設備。大型互聯網券商須即時實施；其餘機構最遲須於 2027 年 7 月 8 日前完成。',
      quote: 'The SFC does not consider OTP to be a phishing-resistant authentication solution, and internet brokers and VASPs should not use it for the processes mentioned under paragraph 5 above.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-1.1']
    },
    {
      id: 'SFC-PH-A2', domain: 'identity', priority: 'enhanced', sourceId: PH, clause: '(A)',
      title: '按平台風險特徵評估並選用適當認證方法',
      requirement: '審慎評估自身情況，包括向客戶提供的互聯網交易平台類型及其風險特徵，採用適當的認證方法；並持續關注技術發展，定期評估現有安全控制是否仍然適當有效、與業務性質規模複雜程度相稱。',
      quote: 'Internet brokers and VASPs should carefully assess their own circumstances, including the types of internet trading platforms offered to clients and the platforms’ risk profile, and adopt the appropriate authentication method.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] }
    },
    {
      id: 'SFC-PH-A3', domain: 'identity', priority: 'enhanced', sourceId: PH, clause: '(A)',
      title: 'passkey 及綁定設備數量上限（一般不超過 3 個）',
      requirement: '一般情況下不應容許客戶為其互聯網交易帳戶綁定或註冊超過三個 passkey 及／或三部設備。客戶如要求超出上限，須先進行充分評估方可批准。',
      quote: '… generally, they should not allow clients to bind or register more than three passkeys and/or three devices for their internet trading accounts.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] }
    },
    {
      id: 'SFC-PH-A4', domain: 'identity', priority: 'enhanced', sourceId: PH, clause: '(A)',
      title: '會話超時不得由客戶關閉（建議 30 分鐘內）',
      requirement: '不得容許客戶關閉會話超時功能，並須限制閒置超時時間（例如 30 分鐘內），且須事先評估及持續監察。如客戶交易需要合理支持較長閒置時間，只有在密切監察該客戶的登入／登出記錄及交易活動的前提下方可容許。',
      quote: '… internet brokers and VASPs should not allow clients to disable session timeout and should limit the idle timeout period, for example, to within 30 minutes, subject to prior assessments and ongoing monitoring.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-1.6']
    },
    {
      id: 'SFC-PH-B1', domain: 'detect', priority: 'enhanced', sourceId: PH, clause: '(B)',
      title: '高風險帳戶活動的多渠道即時通知',
      requirement: '就成功登入及其他高風險帳戶活動（包括從新設備登入、綁定新設備、創建或撤銷 passkey）即時通知客戶，並在適用情況下透過多個通訊渠道（電郵、短訊或其他推送通知）發出。',
      quote: 'Internet brokers and VASPs should notify clients promptly of successful login to their internet trading accounts and other high-risk account activities, including logins from new devices, binding of new device and creation or revocation of passkeys.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-1.3']
    },
    {
      id: 'SFC-PH-B2', domain: 'detect', priority: 'enhanced', sourceId: PH, clause: '(B)',
      title: '重大變更後交易前的客戶確認',
      requirement: '強烈建議在容許帳戶進一步交易前，要求客戶確認其已授權某些重大變更或已獲悉異常帳戶活動。例如當新註冊設備被用於存取客戶帳戶時，可先向客戶核實該設備是否確屬其本人，方容許以該設備下單。',
      quote: 'Internet brokers and VASPs are also strongly encouraged to require clients to confirm that they have authorised certain material changes or have been notified of unusual account activities before further transactions are permitted in the account.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] }
    },
    {
      id: 'SFC-PH-B3', domain: 'detect', priority: 'enhanced', sourceId: PH, clause: '(B)(a)',
      title: '交易監控：預設閾值與可疑紅旗',
      requirement: '以預設閾值識別異常交易活動並分析可疑交易紅旗。閾值應參照客戶背景、歷史交易行為、帳戶活動、設備使用及登入模式設定。潛在紅旗包括：與客戶過往交易模式不符的交易、按客戶正常模式屬異常時段發出的交易、短期內造成重大虧損的交易；突然大量買賣流通量極低或小型股；以及在密碼重設、聯絡資料變更或綁定新設備後短時間內進行的異常交易。',
      quote: 'Transaction monitoring: Identify abnormal trading activities using predefined thresholds and analyse red flags associated with suspicious transactions.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] }
    },
    {
      id: 'SFC-PH-B4', domain: 'detect', priority: 'enhanced', sourceId: PH, clause: '(B)(b)',
      title: '登入及設備綁定監控與日誌留存',
      requirement: '保存充分日誌（包括系統登入及設備綁定時捕獲的設備 ID），並及時檢視以偵測異常事件，例如來自異常地理位置的綁定請求、多個客戶帳戶綁定至同一部設備、短時間內自多個地點登入，以及異常長的登入會話。發現異常須即時跟進，包括直接向客戶核實交易及在適當情況下暫停帳戶。',
      quote: 'Maintain sufficient logs, including device IDs captured during system login and device binding, and review them on a timely basis to detect irregular events …',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-1.2']
    },
    {
      id: 'SFC-PH-C1', domain: 'respond', priority: 'enhanced', sourceId: PH, clause: '(C)',
      title: '黑客入侵事故須即時向證監會報告並做根因分析',
      requirement: '建立即時應變黑客入侵事故的程序，包括立即制止未獲授權活動、保障客戶資產、通知受影響客戶及防止進一步入侵。須即時向證監會報告黑客入侵事故，進行根因分析以識別導致事故的內部控制缺失或系統漏洞，保存詳細事故報告，並實施適當補救措施防止同類事故再發生。',
      quote: 'Internet brokers and VASPs should also report hacking incidents to the SFC immediately.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-3.2']
    },
    {
      id: 'SFC-PH-D1', domain: 'awareness', priority: 'enhanced', sourceId: PH, clause: '(D)',
      title: '提升客戶對釣魚及網絡安全風險的認識',
      requirement: '提示客戶常見攻擊情景，包括冒充公司的詐騙電郵、短訊或電話，用以套取登入憑證的假網站或假流動應用程式，以及誘使客戶披露密碼、OTP 或其他保安資料的社會工程手法；提醒客戶憑證一旦外泄可能導致帳戶被未授權存取，任何情況下均不應向第三方披露；並定期提醒客戶採用穩妥保安做法（強而獨特的密碼、設定適當交易控制及限額、啟用關鍵活動提示、及時檢視並舉報可疑交易）。',
      quote: '… alert clients of common attack scenarios, including fraudulent emails, text messages or phone calls impersonating the firm, fake websites or mobile applications designed to harvest login credentials, and social engineering tactics …',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-3.4']
    },

    // ---- 26EC32 AI 驅動網絡攻擊 ----
    {
      id: 'SFC-AI-GOV', domain: 'governance', priority: 'enhanced', sourceId: AI, clause: '第 3 段',
      title: 'MIC-IT 對網絡安全風險負最終責任',
      requirement: '高級管理層（包括資訊科技主管人員 MIC-IT）對公司面對的網絡安全風險負最終責任。MIC-IT 須確保對公司網絡安全框架的變更獲充分檢視及審批，並確保網絡安全措施的強化獲妥善及迅速實施。必要時應尋求 IT 保安專家的意見及協助。',
      quote: 'They are reminded that their senior management, including the Manager-in-Charge of Information Technology (MIC-IT), is ultimately responsible for managing cybersecurity risks faced by their firms.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-3.1']
    },
    {
      id: 'SFC-AI-INV', domain: 'governance', priority: 'enhanced', sourceId: AI, clause: '第 8 段',
      title: '維持可支持當日決策的科技資產清單',
      requirement: '維持準確及最新的科技資產及組件清單（涵蓋硬件、軟件、網絡基礎設施、資料庫及雲端服務），並識別哪些資產及服務屬對外暴露、業務關鍵（business critical components）或依賴第三方組件，以便迅速有效地將補救及保護措施導向最高風險範圍。鑑於前沿 AI 模型識別可利用弱點的速度極快，資產清單須保持足夠更新，以支持在新漏洞或威脅情報出現時作出「當日」的優先級排序及圍堵決策。',
      quote: '… licensed firms should ensure that their asset inventories are kept sufficiently up-to-date to facilitate same-day prioritisation and containment decisions when new vulnerabilities or threat intelligence emerge.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC }
    },
    {
      id: 'SFC-AI-A1', domain: 'protect', priority: 'enhanced', sourceId: AI, clause: '(A)',
      title: '加快補丁與漏洞管理，設例外緊急修補程序',
      requirement: '檢討並強化補丁及漏洞管理流程，對已知漏洞迅速採取行動，並就常規補丁週期以外的緊急及關鍵修補制定充分政策及程序（尤其涉及業務關鍵組件者）。須分配足夠資源以應對補丁需求可能出現的激增。',
      quote: 'They should take prompt actions to address known vulnerabilities and implement adequate policies and procedures for handling urgent and critical fixes that fall outside routine patching cycles, especially for vulnerabilities and fixes affecting their business critical components.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-2.4']
    },
    {
      id: 'SFC-AI-B1', domain: 'identity', priority: 'enhanced', sourceId: AI, clause: '(B)(i)',
      title: '假設已被攻破：對業務關鍵組件執行最小權限',
      requirement: '在設計系統控制時假設任何用戶、設備、特權帳戶或網絡組件均可能已被攻破。對所有業務關鍵組件執行最小權限存取，包括將連接器（connectors）及工具權限限制在預期用途所需範圍內，並實施充分措施保護特權帳戶。',
      quote: 'Licensed firms should design system controls based on the assumption that any user, device, privileged account or network component may be compromised.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-2.2']
    },
    {
      id: 'SFC-AI-B2', domain: 'protect', priority: 'enhanced', sourceId: AI, clause: '(B)(ii)',
      title: '強化防火牆與微分段以限制橫向移動',
      requirement: '強化防火牆及網絡分段；在可行情況下實施微網絡分段（micro network segmentation），以限制跨網絡及系統的橫向移動能力。',
      quote: '… licensed firms should implement micro network segmentation where feasible to limit lateral movement capabilities across networks and systems.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-2.1']
    },
    {
      id: 'SFC-AI-B3', domain: 'protect', priority: 'enhanced', sourceId: AI, clause: '(B)(iii)',
      title: '將外部及不可信輸入視為潛在敵對內容（提示詞注入防護）',
      requirement: '將外部及不可信輸入——包括從應用程式、電郵、文件及網頁取得的內容——視為潛在敵對內容，防止該等輸入直接更改系統指令或觸發特權操作。',
      quote: '… treat external and untrusted inputs, including content retrieved from apps, emails, documents and webpages, as potentially adversarial and prevent such inputs from directly altering system instructions or triggering privileged actions.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC }
    },
    {
      id: 'SFC-AI-B4', domain: 'governance', priority: 'enhanced', sourceId: AI, clause: '(B)(iv)',
      title: '高影響操作實施雙重複核（maker-checker）',
      requirement: '對高影響操作實施 maker-checker（經辦／複核）控制。',
      quote: 'apply maker-checker controls for high-impact actions.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC }
    },
    {
      id: 'SFC-AI-C1', domain: 'detect', priority: 'enhanced', sourceId: AI, clause: '(C)',
      title: '強化威脅偵測、異常監控與威脅情報能力',
      requirement: '強化威脅偵測能力，加強對客戶交易活動及系統活動異常的監察，使之與不斷演變的威脅環境相稱；並提升威脅情報收集能力。',
      quote: 'Licensed firms should strengthen their threat detection and monitoring of anomalies in client trading activities and system activities … They should also improve their threat intelligence gathering capability.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC }
    },
    {
      id: 'SFC-AI-D1', domain: 'thirdparty', priority: 'enhanced', sourceId: AI, clause: '(D)',
      title: '第三方供應鏈風險治理須納入 AI 威脅',
      requirement: '制定妥善程序應對針對第三方服務提供者的 AI 驅動威脅；強化第三方供應鏈風險治理框架，在初始及持續評估中納入最新威脅形勢，確保妥善管理與第三方服務提供者相關的網絡安全風險，尤其是源於 AI 驅動網絡攻擊者。',
      quote: 'They should strengthen their third-party supply chain risk governance framework, enhance initial and ongoing assessments on third-party service providers to factor in the latest threat landscape …',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC, attributes: ['outsourcing'] },
      crossRefs: ['SFC-IT-2.10']
    },
    {
      id: 'SFC-AI-E1', domain: 'respond', priority: 'enhanced', sourceId: AI, clause: '(E)',
      title: '事故處理程序及應急計劃須涵蓋 AI 驅動攻擊',
      requirement: '檢討並強化網絡安全事故處理程序及應急計劃，以有效應對可能導致網絡及系統遭未獲授權存取、資料外泄等後果的 AI 驅動網絡攻擊。',
      quote: 'Licensed firms should review and enhance their cybersecurity incident handling procedures and contingency plans to effectively handle AI-enabled cyberattacks …',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-2.9']
    },
    {
      id: 'SFC-AI-LLM', domain: 'governance', priority: 'enhanced', sourceId: AI, clause: '第 7 段',
      title: '使用 AI 語言模型須納入網安框架並履行申報責任',
      requirement: '無論 AI 語言模型屬內部開發、由集團公司或第三方服務商提供，抑或取自開源，其使用均可能放大既有網絡風險並引入額外風險（包括針對 AI 語言模型的對抗性攻擊、資料外泄及系統提示詞覆蓋 system prompt override）。須在網絡安全框架及事故處理安排中處理相關風險。擬在高風險用例採用 AI 語言模型者，須遵守《證券及期貨（發牌及註冊）（資料）規則》下的通知責任。',
      quote: 'These include risks arising from adversarial attacks against AI language models, data leakage and system prompt override.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC, attributes: ['ai-models'] }
    }
  ]);
})();
