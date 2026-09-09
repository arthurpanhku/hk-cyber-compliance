/**
 * HKMA 認可機構的科技風險與網絡韌性要求。
 * 覆蓋 SPM TM-G-1 / TM-E-1 (V.4) / TM-C-1 / OR-2 / SA-2，C-RAF 2.0，及 2026 年 AI 威脅通函。
 * 條款編號取自各模塊官方 PDF 的章節結構。
 */
(function () {
  const AI_INST = ['hkma-ai'];

  HKCC.addControls([
    // ---- TM-G-1 科技風險管理一般原則 ----
    {
      id: 'HKMA-TMG1-2', domain: 'governance', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '2. IT governance',
      title: 'IT 治理：控制政策、職能監督與科技風險管理職能',
      requirement: '建立 IT 控制政策，明確 IT 職能的監督與組織架構，設立科技風險管理職能，安排科技審計，並確保員工能力與培訓充分；如由海外辦事處提供 IT 支援，須一併納入管理。',
      quote: 'IT control policies; Oversight and organisation of IT functions; Technology risk management function; Technology audits; Staff competence and training; IT support provided by overseas offices',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST },
      crossRefs: ['SFC-IT-3.1']
    },
    {
      id: 'HKMA-TMG1-3', domain: 'data', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '3. Security management',
      title: '保安管理：資訊分類與保護、認證與存取控制、系統保安',
      requirement: '涵蓋資訊分類與保護、認證與存取控制、保安管理與監察、系統保安、終端用戶與流動運算，以及實體與人事保安六個方面。',
      quote: 'Information classification and protection; Authentication and access control; Security administration and monitoring; System security; End-user and mobile computing; Physical and personnel security',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST },
      crossRefs: ['SFC-IT-2.1']
    },
    {
      id: 'HKMA-TMG1-4', domain: 'protect', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '4. System development and change management',
      title: '系統開發與變更管理',
      requirement: '建立項目管理、項目生命週期及變更管理的控制，確保系統開發與變更經適當授權、測試與審批。',
      quote: 'Project management; Project life cycle; Change management',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-TMG1-5', domain: 'resilience', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '5. Information processing',
      title: '資訊處理：運維管理、效能與容量規劃、災難恢復規劃',
      requirement: '建立 IT 運維管理與支援、效能監察與容量規劃、IT 設施與設備維護，以及災難恢復規劃。',
      quote: 'IT operations management and support; Performance monitoring and capacity planning; IT facilities and equipment maintenance; Disaster recovery planning',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST },
      crossRefs: ['SFC-IT-2.8']
    },
    {
      id: 'HKMA-TMG1-7', domain: 'thirdparty', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '7. Management of technology service providers',
      title: '科技服務提供者管理',
      requirement: '管理科技外判安排，以及對其他科技服務提供者的管理。',
      quote: 'Management of technology outsourcing; Management of other technology service providers',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['outsourcing'] },
      crossRefs: ['HKMA-SA2-1']
    },

    // ---- TM-E-1 電子銀行風險管理 (V.4, 2024-10-25) ----
    {
      id: 'HKMA-TME1-3.1', domain: 'governance', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '3.1',
      title: '董事會及高級管理層對電子銀行的監督',
      requirement: '董事會及高級管理層須對電子銀行業務進行監督，並在三道防線中釐清問責與員工能力要求。',
      quote: 'Board and senior management oversight; Accountability and staff competence in the three lines of defence',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] }
    },
    {
      id: 'HKMA-TME1-3.3', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '3.3',
      title: '獨立評估與滲透測試',
      requirement: '就電子銀行系統安排獨立評估及滲透測試；須彙報的項目見 TM-E-1 附件 A。',
      quote: 'Independent assessment and penetration tests (see Annex A: Items to be reported in independent assessment)',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['HKMA-CRAF-3']
    },
    {
      id: 'HKMA-TME1-4.1', domain: 'identity', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '4.1',
      title: '客戶認證',
      requirement: '就電子銀行服務實施與風險相稱的客戶認證機制。',
      quote: 'Authentication of customers',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['SFC-IT-1.1', 'SFC-PH-A1']
    },
    {
      id: 'HKMA-TME1-4.2', domain: 'detect', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '4.2 / 4.3',
      title: '向客戶發出通知及客戶教育',
      requirement: '就帳戶活動向客戶發出通知，並持續提升客戶的保安意識與教育。',
      quote: 'Notifications sent to customers; Customer awareness and education; Customer protection',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['SFC-IT-1.3', 'SFC-PH-B1']
    },
    {
      id: 'HKMA-TME1-5', domain: 'protect', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '5',
      title: '網上銀行的系統與網絡保安',
      requirement: '涵蓋資訊的機密性與完整性、互聯網基礎設施、應用系統保安，以及威脅監察與漏洞評估。',
      quote: 'Confidentiality and integrity of information; Internet infrastructure; Application system security; Threat monitoring and vulnerability assessment',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['SFC-IT-1.4', 'SFC-IT-2.1']
    },
    {
      id: 'HKMA-TME1-6', domain: 'protect', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '6',
      title: '網上銀行服務的相關控制',
      requirement: '就資金轉賬、網上提交資料、帳戶彙總服務及其他網上金融服務實施相應控制。',
      quote: 'Funds transfers; Online submission of information; Account aggregation service; Provision of other online financial services',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] }
    },
    {
      id: 'HKMA-TME1-9', domain: 'resilience', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '9',
      title: '系統可用性與業務連續性管理',
      requirement: '就客戶電子銀行服務水平、容量規劃、效能監察、系統韌性，以及應對系統中斷的控制作出安排。',
      quote: 'Service level of e-banking for customers; Capacity planning; Performance monitoring; System resilience; Controls for coping with system disruptions',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['HKMA-OR2-3']
    },

    // ---- TM-C-1 網絡風險管理監管方針 + C-RAF ----
    {
      id: 'HKMA-CRAF-1', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-c-1', clause: '3.5.1(a)',
      title: 'C-RAF：固有風險評估',
      requirement: '按業務規模、營運特徵、科技概況及使用情況等風險因素進行固有風險評估（inherent risk assessment），得出固有風險評級。',
      quote: 'an inherent risk assessment based on risk factors such as AIs’ business size, operational characteristics, technology profile and usage',
      quoteStatus: 'excerpt',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-CRAF-2', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-c-1', clause: '3.5.1(b)',
      title: 'C-RAF：成熟度評估',
      requirement: '進行成熟度評估，判斷網絡安全控制是否與固有風險水平相稱。',
      quote: 'a maturity assessment for AIs to assess whether their cybersecurity controls are commensurate with their inherent risk levels',
      quoteStatus: 'excerpt',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-CRAF-3', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-c-1', clause: '3.5.1(c)',
      title: 'C-RAF：iCAST 情報主導網絡攻擊模擬測試',
      requirement: '固有風險評級為「中」或「高」的認可機構，須進行情報主導網絡攻擊模擬測試（iCAST），以模擬真實網絡攻擊檢驗其網絡韌性。',
      quote: 'an Intelligence-led Cyber Attack Simulation Testing (iCAST) for AIs with “medium” or “high” inherent risk ratings to test their cyber resilience by simulating real-life cyber attacks.',
      quoteStatus: 'excerpt',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-CRAF-4', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-c-1', clause: '3.5.2',
      title: '定期進行 C-RAF 評估並提升防衞成熟度',
      requirement: '須定期進行 C-RAF 評估，將網絡防衞成熟度提升至與所評估風險敞口相稱的水平。金管局會檢視認可機構的 C-RAF 評估結果並適時更新框架。',
      quote: 'AIs are required to conduct regular assessments under the C-RAF with a view to raising their cyber defence maturity to a level commensurate with the assessed risk exposures.',
      quoteStatus: 'excerpt',
      applicability: { licenses: AI_INST }
    },

    // ---- OR-2 營運韌性 ----
    {
      id: 'HKMA-OR2-1', domain: 'governance', priority: 'baseline', sourceId: 'hkma-or-2', clause: '2 / 3',
      title: '建立營運韌性框架並由董事會及高級管理層負責',
      requirement: '制定營運韌性框架，並由董事會及高級管理層承擔相應角色與責任。',
      quote: 'Operational resilience framework; Role of the Board and senior management',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-OR2-2', domain: 'resilience', priority: 'baseline', sourceId: 'hkma-or-2', clause: '4',
      title: '釐定營運韌性參數：關鍵業務、中斷容忍度、嚴重但可能情景',
      requirement: '識別關鍵業務（critical operations）、設定中斷容忍度（tolerance for disruption），並識別嚴重但可能發生的情景（severe but plausible scenarios）。',
      quote: 'Identifying critical operations; Setting tolerance for disruption; Identifying severe but plausible scenarios',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-OR2-3', domain: 'resilience', priority: 'baseline', sourceId: 'hkma-or-2', clause: '5 / 6 / 8',
      title: '測繪相互依存關係、管理風險並具備事故應變恢復能力',
      requirement: '測繪支撐關鍵業務的相互連接與相互依存關係；為關鍵業務交付作準備並管理其風險；具備應變及從事故中恢復的能力。',
      quote: 'Mapping interconnections and interdependencies underlying critical operations; Preparing for and managing risks to critical operations delivery; Responding to and recovering from incidents',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST },
      crossRefs: ['SFC-IT-2.9']
    },
    {
      id: 'HKMA-OR2-6', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-or-2', clause: '7',
      title: '在嚴重但可能情景下測試關鍵業務交付能力',
      requirement: '就嚴重但可能發生的情景，測試在該等情景下交付關鍵業務的能力。',
      quote: 'Testing ability to deliver critical operations under severe but plausible scenarios',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST }
    },

    // ---- SA-2 外判 ----
    {
      id: 'HKMA-SA2-1', domain: 'thirdparty', priority: 'baseline', sourceId: 'hkma-sa-2', clause: 'SA-2',
      title: '外判安排的評估、合約與持續監控',
      requirement: '就外判安排進行風險評估、訂立合約保障（包括金管局的查閱權）、保障客戶資料機密性，並對服務提供者進行持續監控。',
      quote: 'SPM SA-2 Outsourcing',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['outsourcing'] },
      crossRefs: ['SFC-IT-2.10', 'HKMA-TMG1-7']
    },

    // ---- 2026 AI 威脅通函 ----
    {
      id: 'HKMA-AI-2026', domain: 'governance', priority: 'enhanced', sourceId: 'hkma-cir-ai-2026', clause: '通函全文',
      title: '在 AI 驅動網絡威脅下強化網絡韌性',
      requirement: '按金管局 2026 年 6 月 2 日通函檢討並強化網絡韌性安排，以應對由人工智能驅動的網絡威脅。建議與證監會 26EC32 通函的控制要求（資產清單、加速補丁、最小權限、微分段、不可信輸入處理、供應鏈、事故應變）並行落實。',
      quote: 'Strengthening Cyber Resilience amid Artificial Intelligence-Empowered Cyber Threats',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ai-models'] },
      crossRefs: ['SFC-AI-INV', 'SFC-AI-B3']
    }
  ]);
})();

/** C-RAF 2.0 的框架來源：網絡安全強化計劃 2.0 通函。 */
HKCC.addControls([{
  id: 'HKMA-CFI2', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-cfi-2',
  clause: '通函全文',
  title: '採納網絡安全強化計劃 2.0（CFI 2.0）的強化框架',
  requirement: '按 2020 年 11 月 3 日通函採納 CFI 2.0。CFI 2.0 簡化並強化了原有的 C-RAF，涵蓋網絡防衞評估架構、專業培訓（認可培訓計劃）及網絡情報共享平台三大支柱。具體的固有風險評估、成熟度評估及 iCAST 要求見本工具 HKMA-CRAF-1 至 HKMA-CRAF-4。',
  quote: 'Cybersecurity Fortification Initiative 2.0',
  quoteStatus: 'summary',
  applicability: { licenses: ['hkma-ai'] },
  crossRefs: ['HKMA-CRAF-1', 'HKMA-CRAF-2', 'HKMA-CRAF-3', 'HKMA-CRAF-4']
}]);
