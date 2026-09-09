/**
 * 《保護關鍵基礎設施（電腦系統）條例》下的三類法定責任。
 * 條款編號取自專員辦公室《實務守則（通用版）》第 1.0 版（2026-01-01 生效）。
 * 只適用於已被指定為關鍵基礎設施營運者的機構。
 * 銀行界另有金管專員發出的界別實務守則（2026-06-02），就第 1、2 類責任提供指引。
 */
(function () {
  const ALL = ['sfc-ra1', 'sfc-ra2', 'sfc-ra3', 'sfc-ra4', 'sfc-ra5', 'sfc-ra6', 'sfc-ra7',
    'sfc-ra8', 'sfc-ra9', 'sfc-ra13', 'sfc-vasp', 'hkma-ai', 'hkma-svf', 'other'];
  const A = ['ci-designated'];
  const src = 'occics-cop';

  HKCC.addControls([
    {
      id: 'CI-CAT1-1', domain: 'governance', priority: 'baseline', sourceId: src, clause: '5.1',
      title: '第 1 類責任：在香港設有辦事處',
      requirement: '關鍵基礎設施營運者須在香港維持辦事處，並按指定表格（附件 A）通知辦事處地址。',
      quote: 'Obligation to maintain office in Hong Kong',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT1-2', domain: 'governance', priority: 'baseline', sourceId: src, clause: '5.2',
      title: '第 1 類責任：通知營運者變更',
      requirement: '關鍵基礎設施營運者發生變更時，須按指定表格（附件 B）通知專員。',
      quote: 'Obligation to notify operator changes',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT1-3', domain: 'governance', priority: 'baseline', sourceId: src, clause: '5.3',
      title: '第 1 類責任：設立並維持電腦系統保安管理單位',
      requirement: '設立並維持電腦系統保安管理單位，並按指定表格（附件 C）通知督導該單位的僱員的委任。',
      quote: 'Obligation to set up and maintain computer-system security management unit',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['SFC-IT-3.1', 'HKMA-TMG1-2']
    },
    {
      id: 'CI-CAT2-1', domain: 'governance', priority: 'baseline', sourceId: src, clause: '6.1',
      title: '第 2 類責任：通知關鍵電腦系統的重大變更',
      requirement: '就關鍵電腦系統（CCS）的重大變更，按指定表格（附件 D）通知專員。',
      quote: 'Obligation to notify material changes to certain computer systems',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT2-2', domain: 'governance', priority: 'baseline', sourceId: src, clause: '6.2',
      title: '第 2 類責任：提交並實施電腦系統保安管理計劃',
      requirement: '提交並實施電腦系統保安管理計劃。該計劃是通用實務守則中篇幅最長的部分（第 12–24 頁），涵蓋保安管理的各項基線要求。',
      quote: 'Obligation to submit and implement computer-system security management plan',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT2-3', domain: 'assurance', priority: 'baseline', sourceId: src, clause: '6.3',
      title: '第 2 類責任：進行電腦系統保安風險評估',
      requirement: '就關鍵電腦系統進行電腦系統保安風險評估。',
      quote: 'Obligation to conduct computer-system security risk assessments',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['HKMA-CRAF-1']
    },
    {
      id: 'CI-CAT2-4', domain: 'assurance', priority: 'baseline', sourceId: src, clause: '6.4',
      title: '第 2 類責任：安排進行電腦系統保安審計',
      requirement: '安排進行電腦系統保安審計；審計方法綱要見通用實務守則附件 G。',
      quote: 'Obligation to arrange to carry out computer-system security audits (see Annex G: Outline Methodology for the Computer-System Security Audit)',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT2-5', domain: 'protect', priority: 'baseline', sourceId: src, clause: '6.5',
      title: '第 2 類責任：營運科技（OT）的保安措施',
      requirement: '就營運科技（operational technology）實施相應保安措施。',
      quote: 'Security measures for operational technology',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT3-1', domain: 'assurance', priority: 'baseline', sourceId: src, clause: '7.1',
      title: '第 3 類責任：參與電腦系統保安演習',
      requirement: '參與電腦系統保安演習。',
      quote: 'Obligation to participate in computer-system security drill',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT3-2', domain: 'respond', priority: 'baseline', sourceId: src, clause: '7.2',
      title: '第 3 類責任：提交並實施緊急應變計劃',
      requirement: '提交並實施緊急應變計劃（emergency response plan）。',
      quote: 'Obligation to submit and implement emergency response plan',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['SFC-IT-2.9', 'HKMA-OR2-3']
    },
    {
      id: 'CI-CAT3-3', domain: 'respond', priority: 'baseline', sourceId: src, clause: '7.3.4 / 7.3.6',
      title: '第 3 類責任：事故通報——嚴重事故 12 小時、其他 48 小時',
      requirement: '知悉電腦系統保安事故後須通知專員。嚴重事故（已經、正在或很可能擾亂關鍵基礎設施核心功能者）須於知悉後 12 小時內通報；其他事故為 48 小時（條例第 28(3) 條）。可先致電指定電話提供事故性質、涉及的關鍵電腦系統及事故摘要，再於通報後 48 小時內經指定安全渠道提交指定表格（附件 E）。',
      quote: 'A serious computer-system security incident … must be notified within 12 hours after the CI operator becomes aware of it.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['SFC-PH-C1']
    },
    {
      id: 'CI-CAT3-4', domain: 'respond', priority: 'baseline', sourceId: src, clause: '7.3.7',
      title: '第 3 類責任：14 日內提交書面事故報告',
      requirement: '於知悉電腦系統保安事故後 14 日內，經指定安全渠道以指定表格（附件 F）提交書面報告。',
      quote: 'The CI operator should submit a written report in a specified form (Annex F or a sector-specific form) via the designated secured channel within 14 days after becoming aware of the computer-system security incident.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-SEV-CRITERIA', domain: 'respond', priority: 'baseline', sourceId: src, clause: '7.3.4(a)-(g)',
      title: '在業務連續性計劃中預先定義「嚴重事故」判定門檻',
      requirement: '嚴重事故的多項判定準則須由營運者在業務連續性管理計劃中預先定義，包括：最長可容忍停機時間、最低服務水平，以及「重大」客戶資料外泄量與「重大」客戶查詢／投訴數量的界定。未預先定義者，事故發生時無法判斷是否觸發 12 小時通報時限。',
      quote: '… where “material” is defined by the CI operator in the business continuity management plan',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['HKMA-OR2-2', 'CI-CAT3-3']
    },
    {
      id: 'CI-BANK-COP', domain: 'governance', priority: 'baseline', sourceId: 'hkma-cop-ci', clause: '1.1.2 / 1.1.3',
      title: '銀行界：須同時參照金管專員發出的界別實務守則',
      requirement: '獲金管專員指定為關鍵基礎設施營運者的認可機構，就第 1 類及第 2 類責任須參照金管專員發出的界別實務守則（2026-06-02）；就第 3 類責任則參照專員發出的通用實務守則第 7 節。',
      quote: 'A Designated AI should refer to guidance published by the Commissioner in relation to category 3 obligations, which can be found in section 7 of the Code of Practice (Generic) …',
      quoteStatus: 'excerpt',
      applicability: { licenses: ['hkma-ai'], attributes: A }
    }
  ]);
})();
