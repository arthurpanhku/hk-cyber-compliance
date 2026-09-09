/**
 * 儲值支付工具（SVF）持牌人的科技與支付保安要求。
 * 法律框架：《支付系統及儲值支付工具條例》（第 584 章，PSSVFO）
 *   → 《儲值支付工具持牌人監管指引》（2016 年 9 月，第 54(1A)(b) 條）
 *   → 《儲值支付工具持牌人監管實務備考》（2025 年 10 月，說明達標方式）
 * 條款編號沿用《指引》第 7 節的段落編號；實務備考按同一編號提供補充指引。
 */
(function () {
  const SVF = ['hkma-svf'];
  const GL = 'hkma-svf-guideline';
  const PN = 'hkma-svf-pn';

  HKCC.addControls([
    {
      id: 'SVF-7.2.1', domain: 'governance', priority: 'baseline', sourceId: GL, clause: '7.2.1',
      title: '建立與業務相稱的科技風險管理（TRM）框架',
      requirement: '建立有效的科技風險管理框架，確保 (i) IT 控制充分；(ii) 電腦系統的質素與保安（包括可靠性、穩健性、穩定性及可用性）；(iii) 儲值支付工具運作的安全與效率。框架須「切合用途」，即與業務的性質、規模、複雜程度及類型、所採用的技術及整體風險管理系統相稱，並在業務發展與風險管理之間適當分配科技資源。實務備考訂明框架通常須包含三項職能：IT 職能、TRM 職能、IT 審計職能，並須制定經正式批准的 IT 控制政策、訂明豁免審批流程及違規後果。',
      quote: 'A licensee should establish an effective technology risk management framework to ensure (i) the adequacy of IT controls, (ii) the quality and security, including the reliability, robustness, stability and availability, of its computer systems, and (iii) the safety and efficiency of the operations of the SVF.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['HKMA-TMG1-2']
    },
    {
      id: 'SVF-7.2.2', domain: 'respond', priority: 'baseline', sourceId: GL, clause: '7.2.2',
      title: '事故管理框架及向金管局的及時呈報',
      requirement: '建立具備充分管理層監督的事故管理框架，確保有效的事故應變與管理能力。其中包括及時向金管局呈報任何已確認的 IT 相關欺詐個案或重大保安漏洞（包括網絡攻擊）、服務長時間中斷的個案，以及導致用戶金錢損失或嚴重影響用戶體驗的系統性事故。',
      quote: 'This includes (i) timely reporting to the HKMA of any confirmed IT-related fraud cases or major security breaches, including cyber attacks, cases of prolonged disruption of service, and systemic incidents where users suffer from monetary loss or frustrating user experience.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-PH-C1']
    },
    {
      id: 'SVF-7.2.3', domain: 'data', priority: 'baseline', sourceId: GL, clause: '7.2.3',
      title: '資料庫按用途分隔並執行嚴格存取控制',
      requirement: '採取充分措施，就不同用途的資料庫維持適當分隔，防止未獲授權或非預期的存取或檢索，並執行穩健的存取控制以確保資料庫的機密性與完整性。就用戶（包括商戶）的個人資料，須在任何時候遵守《個人資料（私隱）條例》及私隱專員公署不時發出的相關實務守則、指引或最佳行事常規。',
      quote: 'In respect of any personal data of users, including merchants, a licensee should at all times comply with the PDPO as well as any relevant codes of practice, guidelines or best practice issued by the Office of the PCPD from time to time.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['PDPO-DPP4-1', 'SFC-IT-2.2']
    },
    {
      id: 'SVF-7.3.1', domain: 'governance', priority: 'baseline', sourceId: GL, clause: '7.3.1',
      title: '建立穩健的支付保安管理框架',
      requirement: '建立與其儲值支付工具計劃所涉支付保安風險的規模及性質相稱的穩健支付保安管理框架，以有效監察、識別、評估、應對及緩減因營運該等計劃而產生的支付保安風險。',
      quote: 'A licensee should put in place a robust payment security management framework that is commensurate with the scale and nature of payment security risks associated with its SVF schemes to effectively monitor, identify, evaluate, respond and mitigate the payment security risks arising from the operation of the SVF schemes.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF }
    },
    {
      id: 'SVF-7.3.2', domain: 'data', priority: 'baseline', sourceId: GL, clause: '7.3.2',
      title: '用戶資料全生命週期的政策與程序',
      requirement: '就透過儲值支付工具服務登記及執行支付交易所收集的用戶資料，制定關於其擁有權、分類、儲存、傳輸、處理及保留的充分政策與程序，以確保資料的機密性與完整性。',
      quote: 'A licensee should have adequate policies and procedures on the ownership, classification, storage, transmission, processing and retention of information collected from users through registration of SVF service and execution of payment transactions to ensure confidentiality and integrity of the information.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['PDPO-DPP2', 'SFC-IT-1.4']
    },
    {
      id: 'SVF-7.3.3', domain: 'protect', priority: 'baseline', sourceId: GL, clause: '7.3.3',
      title: '保護每一支付渠道（包括卡片與用戶設備）',
      requirement: '就提供予用戶使用儲值支付工具的每一支付渠道（包括卡片及用戶設備），實施充分的保安措施以抵禦所有重大漏洞及攻擊。實務備考訂明：提供支付卡服務者須實施充分保障以保護敏感支付卡資料，典型做法是部署晶片卡儲存該等資料。',
      quote: 'A licensee should implement adequate security measures to protect each payment channel (including cards and user devices) provided to users for using its SVF against all material vulnerabilities and attacks.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF }
    },
    {
      id: 'SVF-7.3.4', domain: 'detect', priority: 'baseline', sourceId: GL, clause: '7.3.4',
      title: '支付交易的真確性、可追溯性與欺詐偵測',
      requirement: '實施充分的支付保安控制，確保支付交易的真確性與可追溯性，並偵測欺詐交易。實務備考就非接觸式支付（如二維碼、近場通訊 NFC）等模式提供進一步指引。',
      quote: 'A licensee should implement adequate payment security controls to ensure the authenticity and traceability of payment transactions and detect fraudulent transactions.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-PH-B3']
    },
    {
      id: 'SVF-7.3.5', domain: 'identity', priority: 'baseline', sourceId: GL, clause: '7.3.5',
      title: '高風險操作前的用戶身份認證與事後通知',
      requirement: '在用戶管理其儲值支付工具帳戶及發起高風險交易前認證其身份，並在該等活動後向用戶發出及時通知。實務備考訂明：如容許用戶透過網上渠道開戶，須採用可靠方法認證身份；用戶要求更改帳戶資料時須進行充分的身份查核。',
      quote: 'A licensee should authenticate the identity of SVF users before they can administer their SVF accounts and initiate high-risk transactions. Timely notification should be sent to users after these activities.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['HKMA-TME1-4.1', 'SFC-IT-1.3']
    },
    {
      id: 'SVF-7.3.6', domain: 'awareness', priority: 'baseline', sourceId: GL, clause: '7.3.6',
      title: '透過有效渠道向用戶提供安全使用建議',
      requirement: '透過有效的溝通渠道向用戶提供關於安全使用儲值支付工具的建議與協助。實務備考訂明：須警示用戶有責任採取合理保安預防措施保護支付設備並妥善保密密碼，並須提供淺白、顯眼且定期檢討的建議。',
      quote: 'A licensee should provide advice and assistance to users on the secure use of SVF through an effective communication channel.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-IT-3.4']
    },
    {
      id: 'SVF-PN-ANTISCAM', domain: 'awareness', priority: 'enhanced', sourceId: PN, clause: '7.3.6 補充指引 (b)',
      title: '反詐騙：設安全溝通渠道，且訊息不得嵌入超連結',
      requirement: '須至少提供一條安全渠道與用戶持續溝通支付服務的正確及安全使用方式，並告知用戶透過其他途徑發出的「代表持牌人」訊息均不可靠。為管理各類詐騙風險，持牌人**不得**向用戶發送、生成或觸發任何嵌有超連結的訊息（如電郵、短訊或即時通訊），若該超連結會 (a) 要求用戶提供個人資料及憑證等敏感資料，或 (b) 將用戶導向其網站或應用程式進行交易；並須在必要時提醒用戶其不會作出上述行為。如發生釣魚網站事件，須發新聞稿警示用戶及公眾，並向警方、金管局及其他相關監管機構報告，同時及時向金管局提供釣魚網站超連結等相關資料。',
      quote: 'A licensee should not send, generate or trigger any message (e.g. emails, SMS messages, or similar kinds of instant messages) to the users with embedded hyperlinks that would (a) request users to provide sensitive user information such as personal data and credentials; or (b) direct a user to its website or Apps for transactions.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-PH-D1']
    },
    {
      id: 'SVF-7.3.7', domain: 'assurance', priority: 'baseline', sourceId: GL, clause: '7.3.7',
      title: '網絡威脅監察、定期保安測試與滲透測試',
      requirement: '透過監察網絡威脅趨勢、實施充分的保護措施及進行定期保安測試，防範現有及新興的網絡安全風險。實務備考訂明四方面：(a) 高度依賴互聯網與流動技術者須透過 TRM 流程充分管理網絡安全風險，並投入足夠資源以具備識別、保護、遏制及恢復的能力；(b) 可考慮訂閲優質網絡威脅情報服務，並與其他機構協作共享情報；(c) 定期評估進行滲透測試的必要性，測試範圍應基於網絡安全風險狀況，涵蓋內外部網絡、應用系統，以及社會工程與新興威脅，並按影響與風險敞口分析及時緩減所發現的問題；(d) 關注「永遠在線」的聯網設備所帶來的端點風險。',
      quote: 'A licensee should guard against current and upcoming cyber security risks associated with its SVF by monitoring the trends in cyber threats, implementing adequate protective measures and performing periodic security testing.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['HKMA-CRAF-3', 'SFC-AI-C1']
    },
    {
      id: 'SVF-7.3.8', domain: 'resilience', priority: 'baseline', sourceId: GL, clause: '7.3.8',
      title: '支付服務的效率與可靠性須可量度',
      requirement: '提供與其儲值支付工具運作模式相稱的高效可靠支付服務。實務備考訂明：效率與可靠性應以可量度的表現指標評估，例如回應時間、交易吞吐量、系統容量、系統可用性及穩定性；須按預設指標測試及監察表現。就對錶現要求高的商戶（如公共運輸營運者），須與商戶議定預期表現指標並投入足夠資源以確保達標。',
      quote: 'In typical situations, efficiency and reliability should be assessed by measurable performance indicators such as response time, transaction throughput, system capacity, system availability and stability.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF }
    },
    {
      id: 'SVF-7.4.1', domain: 'resilience', priority: 'baseline', sourceId: GL, clause: '7.4.1',
      title: '業務連續性管理（BCM）計劃',
      requirement: '建立充分的業務連續性管理計劃，確保在各種突發情景造成重大中斷時，關鍵營運可以持續、及時恢復，或在極端情況下有序縮減。實務備考訂明：充分的 BCM 計劃通常包含業務影響分析、恢復策略、業務連續性計劃，以及供業務與 IT 恢復使用的替代場地。',
      quote: 'A licensee should have in place adequate business continuity management (BCM) programs to ensure continuation, timely recovery, or in extreme situations orderly scale-down of critical operations in the event of major disruptions caused by different contingent scenarios.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-IT-2.9', 'HKMA-OR2-3']
    },
    {
      id: 'SVF-7.4.2', domain: 'governance', priority: 'baseline', sourceId: GL, clause: '7.4.2',
      title: '董事會及高級管理層對 BCM 負最終責任',
      requirement: '持牌人的董事會及高級管理層對業務連續性管理及其業務連續性計劃的有效性負最終責任，須確保 BCM 計劃獲妥善實施、獲各級員工認真對待，並投入足夠資源落實計劃。',
      quote: 'The board and senior management of a licensee have the ultimate responsibility for BCM and the effectiveness of their business continuity plans.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF }
    },
    {
      id: 'SVF-CI-COP', domain: 'governance', priority: 'baseline', sourceId: 'occics-cop-svf', clause: '1.1',
      title: 'SVF 界別：關鍵基礎設施條例的專屬實務守則',
      requirement: '獲金管專員指定為關鍵基礎設施營運者的儲值支付工具持牌人，就第 1 類及第 2 類責任須參照金管專員發出的 SVF 界別實務守則（2026-06-12 生效）；就第 3 類責任則參照專員發出的通用實務守則第 7 節。',
      quote: 'Code of Practice Pursuant to the Protection of Critical Infrastructures (Computer Systems) Ordinance For Stored Value Facility Licensees designated by the Monetary Authority as Critical Infrastructure Operators',
      quoteStatus: 'summary',
      applicability: { licenses: SVF, attributes: ['ci-designated'] },
      crossRefs: ['CI-CAT1-3', 'CI-CAT3-3']
    }
  ]);
})();
