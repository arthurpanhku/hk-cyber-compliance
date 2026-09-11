/**
 * 《保护关键基础设施（电脑系统）条例》下的三类法定责任。
 * 条款编号取自专员办公室《实务守则（通用版）》第 1.0 版（2026-01-01 生效）。
 * 只适用于已被指定为关键基础设施营运者的机构。
 * 银行界另有金管专员发出的界别实务守则（2026-06-02），就第 1、2 类责任提供指引。
 */
(function () {
  const ALL = ['sfc-ra1', 'sfc-ra2', 'sfc-ra3', 'sfc-ra4', 'sfc-ra5', 'sfc-ra6', 'sfc-ra7',
    'sfc-ra8', 'sfc-ra9', 'sfc-ra13', 'sfc-vasp', 'hkma-ai', 'hkma-svf', 'other'];
  const A = ['ci-designated'];
  const src = 'occics-cop';

  HKCC.addControls([
    {
      id: 'CI-CAT1-1', domain: 'governance', priority: 'baseline', sourceId: src, clause: '5.1',
      title: '第 1 类责任：在香港设有办事处',
      requirement: '关键基础设施营运者须在香港维持办事处，并按指定表格（附件 A）通知办事处地址。',
      quote: 'Obligation to maintain office in Hong Kong',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT1-2', domain: 'governance', priority: 'baseline', sourceId: src, clause: '5.2',
      title: '第 1 类责任：通知营运者变更',
      requirement: '关键基础设施营运者发生变更时，须按指定表格（附件 B）通知专员。',
      quote: 'Obligation to notify operator changes',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT1-3', domain: 'governance', priority: 'baseline', sourceId: src, clause: '5.3',
      title: '第 1 类责任：设立并维持电脑系统保安管理单位',
      requirement: '设立并维持电脑系统保安管理单位，并按指定表格（附件 C）通知督导该单位的雇员的委任。',
      quote: 'Obligation to set up and maintain computer-system security management unit',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['SFC-IT-3.1', 'HKMA-TMG1-2']
    },
    {
      id: 'CI-CAT2-1', domain: 'governance', priority: 'baseline', sourceId: src, clause: '6.1',
      title: '第 2 类责任：通知关键电脑系统的重大变更',
      requirement: '就关键电脑系统（CCS）的重大变更，按指定表格（附件 D）通知专员。',
      quote: 'Obligation to notify material changes to certain computer systems',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT2-2', domain: 'governance', priority: 'baseline', sourceId: src, clause: '6.2',
      title: '第 2 类责任：提交并实施电脑系统保安管理计划',
      requirement: '提交并实施电脑系统保安管理计划。该计划是通用实务守则中篇幅最长的部分（第 12–24 页），涵盖保安管理的各项基线要求。',
      quote: 'Obligation to submit and implement computer-system security management plan',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT2-3', domain: 'assurance', priority: 'baseline', sourceId: src, clause: '6.3',
      title: '第 2 类责任：进行电脑系统保安风险评估',
      requirement: '就关键电脑系统进行电脑系统保安风险评估。',
      quote: 'Obligation to conduct computer-system security risk assessments',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['HKMA-CRAF-1']
    },
    {
      id: 'CI-CAT2-4', domain: 'assurance', priority: 'baseline', sourceId: src, clause: '6.4',
      title: '第 2 类责任：安排进行电脑系统保安审计',
      requirement: '安排进行电脑系统保安审计；审计方法纲要见通用实务守则附件 G。',
      quote: 'Obligation to arrange to carry out computer-system security audits (see Annex G: Outline Methodology for the Computer-System Security Audit)',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT2-5', domain: 'protect', priority: 'baseline', sourceId: src, clause: '6.5',
      title: '第 2 类责任：营运科技（OT）的保安措施',
      requirement: '就营运科技（operational technology）实施相应保安措施。',
      quote: 'Security measures for operational technology',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT3-1', domain: 'assurance', priority: 'baseline', sourceId: src, clause: '7.1',
      title: '第 3 类责任：参与电脑系统保安演习',
      requirement: '参与电脑系统保安演习。',
      quote: 'Obligation to participate in computer-system security drill',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-CAT3-2', domain: 'respond', priority: 'baseline', sourceId: src, clause: '7.2',
      title: '第 3 类责任：提交并实施紧急应变计划',
      requirement: '提交并实施紧急应变计划（emergency response plan）。',
      quote: 'Obligation to submit and implement emergency response plan',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['SFC-IT-2.9', 'HKMA-OR2-3']
    },
    {
      id: 'CI-CAT3-3', domain: 'respond', priority: 'baseline', sourceId: src, clause: '7.3.4 / 7.3.6',
      title: '第 3 类责任：事故通报——严重事故 12 小时、其他 48 小时',
      requirement: '知悉电脑系统保安事故后须通知专员。严重事故（已经、正在或很可能扰乱关键基础设施核心功能者）须于知悉后 12 小时内通报；其他事故为 48 小时（条例第 28(3) 条）。可先致电指定电话提供事故性质、涉及的关键电脑系统及事故摘要，再于通报后 48 小时内经指定安全渠道提交指定表格（附件 E）。',
      quote: 'A serious computer-system security incident … must be notified within 12 hours after the CI operator becomes aware of it.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['SFC-PH-C1']
    },
    {
      id: 'CI-CAT3-4', domain: 'respond', priority: 'baseline', sourceId: src, clause: '7.3.7',
      title: '第 3 类责任：14 日内提交书面事故报告',
      requirement: '于知悉电脑系统保安事故后 14 日内，经指定安全渠道以指定表格（附件 F）提交书面报告。',
      quote: 'The CI operator should submit a written report in a specified form (Annex F or a sector-specific form) via the designated secured channel within 14 days after becoming aware of the computer-system security incident.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL, attributes: A }
    },
    {
      id: 'CI-SEV-CRITERIA', domain: 'respond', priority: 'baseline', sourceId: src, clause: '7.3.4(a)-(g)',
      title: '在业务连续性计划中预先定义「严重事故」判定门槛',
      requirement: '严重事故的多项判定准则须由营运者在业务连续性管理计划中预先定义，包括：最长可容忍停机时间、最低服务水平，以及「重大」客户资料外泄量与「重大」客户查询／投诉数量的界定。未预先定义者，事故发生时无法判断是否触发 12 小时通报时限。',
      quote: '… where “material” is defined by the CI operator in the business continuity management plan',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL, attributes: A },
      crossRefs: ['HKMA-OR2-2', 'CI-CAT3-3']
    },
    {
      id: 'CI-BANK-COP', domain: 'governance', priority: 'baseline', sourceId: 'hkma-cop-ci', clause: '1.1.2 / 1.1.3',
      title: '银行界：须同时参照金管专员发出的界别实务守则',
      requirement: '获金管专员指定为关键基础设施营运者的认可机构，就第 1 类及第 2 类责任须参照金管专员发出的界别实务守则（2026-06-02）；就第 3 类责任则参照专员发出的通用实务守则第 7 节。',
      quote: 'A Designated AI should refer to guidance published by the Commissioner in relation to category 3 obligations, which can be found in section 7 of the Code of Practice (Generic) …',
      quoteStatus: 'excerpt',
      applicability: { licenses: ['hkma-ai'], attributes: A }
    }
  ]);
})();
