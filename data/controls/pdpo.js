/**
 * 《个人资料（私隐）条例》（第 486 章）——与资讯保安相关的保障资料原则。
 * 适用于任何收集、持有、处理或使用个人资料的资料使用者，不论有否金融牌照。
 */
(function () {
  const ALL = ['sfc-ra1', 'sfc-ra2', 'sfc-ra3', 'sfc-ra4', 'sfc-ra5', 'sfc-ra6', 'sfc-ra7',
    'sfc-ra8', 'sfc-ra9', 'sfc-ra13', 'sfc-vasp', 'hkma-ai', 'hkma-svf', 'other'];
  const src = 'pdpo';

  HKCC.addControls([
    {
      id: 'PDPO-DPP4-1', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP4',
      title: 'DPP4 资料保安原则：采取切实可行步骤保护个人资料',
      requirement: '采取一切切实可行的步骤，保障所持有的个人资料不会未获授权或意外地被查阅、处理、删除、丧失或使用。考虑因素包括资料的种类及一旦发生上述事故可能造成的损害、储存资料的地点、储存设备的保安措施、可查阅资料的人员的诚信谨慎与能力，以及传送资料时的保安措施。',
      quote: 'DPP4 - Data Security Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] },
      crossRefs: ['SFC-IT-1.4', 'HKMA-TMG1-3']
    },
    {
      id: 'PDPO-DPP4-2', domain: 'thirdparty', priority: 'baseline', sourceId: src, clause: 'DPP4(2)',
      title: 'DPP4 委托处理者：以合约或其他方法确保资料获同等保护',
      requirement: '如将个人资料交由代理人或承办商处理，须采取合约或其他方法，防止该等资料未获授权或意外地被查阅、处理、删除、丧失或使用。资料使用者对受托方的行为仍须负责。',
      quote: 'DPP4 - Data Security Principle（委托处理情形）',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data', 'outsourcing'] },
      crossRefs: ['SFC-IT-2.10', 'HKMA-SA2-1']
    },
    {
      id: 'PDPO-DPP2', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP2',
      title: 'DPP2 准确性及保留期：不保存超逾所需时间',
      requirement: '采取切实可行步骤确保个人资料准确，并确保资料的保存时间不超逾达致使用目的所需的时间。逾期资料须予以删除，以缩小一旦发生资料外泄事故的影响范围。',
      quote: 'DPP2 - Accuracy & Retention Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-DPP1', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP1',
      title: 'DPP1 收集原则：只收集必需且不超乎适度的资料',
      requirement: '只为与职能或活动直接相关的合法目的收集个人资料，且收集的资料属必需但不超乎适度。收集时须以合法及公平的方法进行，并向资料当事人作出指定告知。',
      quote: 'DPP1 - Data Collection Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-DPP3', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP3',
      title: 'DPP3 使用原则：新目的使用须获订明同意',
      requirement: '除获资料当事人自愿给予的明示及告知性同意（订明同意）外，个人资料只可用于收集时述明的目的或直接相关的目的。',
      quote: 'DPP3 - Data Use Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-DPP5', domain: 'governance', priority: 'baseline', sourceId: src, clause: 'DPP5',
      title: 'DPP5 公开原则：公开私隐政策及资料种类',
      requirement: '采取切实可行步骤，公开其处理个人资料的政策与实务、所持有个人资料的种类，以及资料的主要使用目的。',
      quote: 'DPP5 - Openness Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-DPP6', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP6',
      title: 'DPP6 查阅及改正：处理资料当事人的查阅与改正要求',
      requirement: '建立程序处理资料当事人的查阅资料要求及改正要求，并在法定时限内回复。',
      quote: 'DPP6 - Data Access & Correction Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-BREACH', domain: 'respond', priority: 'baseline', sourceId: src, clause: '私隐专员公署指引',
      title: '资料外泄事故的处理与通报',
      requirement: '就资料外泄事故建立处理程序。须注意：《个人资料（私隐）条例》现时并无强制的资料外泄通报责任，向私隐专员公署及受影响资料当事人作出通报属自愿性质，但属良好行事常规。若机构同时受其他制度规限（如已被指定为关键基础设施营运者，或属证监会持牌法团／金管局认可机构），相关制度下的强制通报时限仍然适用，须一并遵守。',
      quote: 'Guidance on Data Breach Handling and Data Breach Notifications（私隐专员公署指引）',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] },
      crossRefs: ['SFC-PH-C1', 'CI-CAT3-3'],
      note: '本条的「自愿通报」表述以 2026-09-08 核验日的法律状态为准；若日后条例修订引入强制通报，须相应更新。'
    }
  ]);
})();
