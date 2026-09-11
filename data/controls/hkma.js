/**
 * HKMA 认可机构的科技风险与网络韧性要求。
 * 覆盖 SPM TM-G-1 / TM-E-1 (V.4) / TM-C-1 / OR-2 / SA-2，C-RAF 2.0，及 2026 年 AI 威胁通函。
 * 条款编号取自各模块官方 PDF 的章节结构。
 */
(function () {
  const AI_INST = ['hkma-ai'];

  HKCC.addControls([
    // ---- TM-G-1 科技风险管理一般原则 ----
    {
      id: 'HKMA-TMG1-2', domain: 'governance', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '2. IT governance',
      title: 'IT 治理：控制政策、职能监督与科技风险管理职能',
      requirement: '建立 IT 控制政策，明确 IT 职能的监督与组织架构，设立科技风险管理职能，安排科技审计，并确保员工能力与培训充分；如由海外办事处提供 IT 支援，须一并纳入管理。',
      quote: 'IT control policies; Oversight and organisation of IT functions; Technology risk management function; Technology audits; Staff competence and training; IT support provided by overseas offices',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST },
      crossRefs: ['SFC-IT-3.1']
    },
    {
      id: 'HKMA-TMG1-3', domain: 'data', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '3. Security management',
      title: '保安管理：资讯分类与保护、认证与访问控制、系统保安',
      requirement: '涵盖资讯分类与保护、认证与访问控制、保安管理与监察、系统保安、终端用户与流动运算，以及实体与人事保安六个方面。',
      quote: 'Information classification and protection; Authentication and access control; Security administration and monitoring; System security; End-user and mobile computing; Physical and personnel security',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST },
      crossRefs: ['SFC-IT-2.1']
    },
    {
      id: 'HKMA-TMG1-4', domain: 'protect', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '4. System development and change management',
      title: '系统开发与变更管理',
      requirement: '建立项目管理、项目生命周期及变更管理的控制，确保系统开发与变更经适当授权、测试与审批。',
      quote: 'Project management; Project life cycle; Change management',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-TMG1-5', domain: 'resilience', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '5. Information processing',
      title: '资讯处理：运维管理、效能与容量规划、灾难恢复规划',
      requirement: '建立 IT 运维管理与支援、效能监察与容量规划、IT 设施与设备维护，以及灾难恢复规划。',
      quote: 'IT operations management and support; Performance monitoring and capacity planning; IT facilities and equipment maintenance; Disaster recovery planning',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST },
      crossRefs: ['SFC-IT-2.8']
    },
    {
      id: 'HKMA-TMG1-7', domain: 'thirdparty', priority: 'baseline', sourceId: 'hkma-tm-g-1', clause: '7. Management of technology service providers',
      title: '科技服务提供者管理',
      requirement: '管理科技外判安排，以及对其他科技服务提供者的管理。',
      quote: 'Management of technology outsourcing; Management of other technology service providers',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['outsourcing'] },
      crossRefs: ['HKMA-SA2-1']
    },

    // ---- TM-E-1 电子银行风险管理 (V.4, 2024-10-25) ----
    {
      id: 'HKMA-TME1-3.1', domain: 'governance', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '3.1',
      title: '董事会及高级管理层对电子银行的监督',
      requirement: '董事会及高级管理层须对电子银行业务进行监督，并在三道防线中厘清问责与员工能力要求。',
      quote: 'Board and senior management oversight; Accountability and staff competence in the three lines of defence',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] }
    },
    {
      id: 'HKMA-TME1-3.3', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '3.3',
      title: '独立评估与渗透测试',
      requirement: '就电子银行系统安排独立评估及渗透测试；须汇报的项目见 TM-E-1 附件 A。',
      quote: 'Independent assessment and penetration tests (see Annex A: Items to be reported in independent assessment)',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['HKMA-CRAF-3']
    },
    {
      id: 'HKMA-TME1-4.1', domain: 'identity', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '4.1',
      title: '客户认证',
      requirement: '就电子银行服务实施与风险相称的客户认证机制。',
      quote: 'Authentication of customers',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['SFC-IT-1.1', 'SFC-PH-A1']
    },
    {
      id: 'HKMA-TME1-4.2', domain: 'detect', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '4.2 / 4.3',
      title: '向客户发出通知及客户教育',
      requirement: '就账户活动向客户发出通知，并持续提升客户的保安意识与教育。',
      quote: 'Notifications sent to customers; Customer awareness and education; Customer protection',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['SFC-IT-1.3', 'SFC-PH-B1']
    },
    {
      id: 'HKMA-TME1-5', domain: 'protect', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '5',
      title: '网上银行的系统与网络保安',
      requirement: '涵盖资讯的机密性与完整性、互联网基础设施、应用系统保安，以及威胁监察与漏洞评估。',
      quote: 'Confidentiality and integrity of information; Internet infrastructure; Application system security; Threat monitoring and vulnerability assessment',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['SFC-IT-1.4', 'SFC-IT-2.1']
    },
    {
      id: 'HKMA-TME1-6', domain: 'protect', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '6',
      title: '网上银行服务的相关控制',
      requirement: '就资金转账、网上提交资料、账户汇总服务及其他网上金融服务实施相应控制。',
      quote: 'Funds transfers; Online submission of information; Account aggregation service; Provision of other online financial services',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] }
    },
    {
      id: 'HKMA-TME1-9', domain: 'resilience', priority: 'baseline', sourceId: 'hkma-tm-e-1', clause: '9',
      title: '系统可用性与业务连续性管理',
      requirement: '就客户电子银行服务水平、容量规划、效能监察、系统韧性，以及应对系统中断的控制作出安排。',
      quote: 'Service level of e-banking for customers; Capacity planning; Performance monitoring; System resilience; Controls for coping with system disruptions',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ebanking'] },
      crossRefs: ['HKMA-OR2-3']
    },

    // ---- TM-C-1 网络风险管理监管方针 + C-RAF ----
    {
      id: 'HKMA-CRAF-1', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-c-1', clause: '3.5.1(a)',
      title: 'C-RAF：固有风险评估',
      requirement: '按业务规模、营运特征、科技概况及使用情况等风险因素进行固有风险评估（inherent risk assessment），得出固有风险评级。',
      quote: 'an inherent risk assessment based on risk factors such as AIs’ business size, operational characteristics, technology profile and usage',
      quoteStatus: 'excerpt',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-CRAF-2', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-c-1', clause: '3.5.1(b)',
      title: 'C-RAF：成熟度评估',
      requirement: '进行成熟度评估，判断网络安全控制是否与固有风险水平相称。',
      quote: 'a maturity assessment for AIs to assess whether their cybersecurity controls are commensurate with their inherent risk levels',
      quoteStatus: 'excerpt',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-CRAF-3', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-c-1', clause: '3.5.1(c)',
      title: 'C-RAF：iCAST 情报主导网络攻击模拟测试',
      requirement: '固有风险评级为「中」或「高」的认可机构，须进行情报主导网络攻击模拟测试（iCAST），以模拟真实网络攻击检验其网络韧性。',
      quote: 'an Intelligence-led Cyber Attack Simulation Testing (iCAST) for AIs with “medium” or “high” inherent risk ratings to test their cyber resilience by simulating real-life cyber attacks.',
      quoteStatus: 'excerpt',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-CRAF-4', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-tm-c-1', clause: '3.5.2',
      title: '定期进行 C-RAF 评估并提升防卫成熟度',
      requirement: '须定期进行 C-RAF 评估，将网络防卫成熟度提升至与所评估风险敞口相称的水平。金管局会检视认可机构的 C-RAF 评估结果并适时更新框架。',
      quote: 'AIs are required to conduct regular assessments under the C-RAF with a view to raising their cyber defence maturity to a level commensurate with the assessed risk exposures.',
      quoteStatus: 'excerpt',
      applicability: { licenses: AI_INST }
    },

    // ---- OR-2 营运韧性 ----
    {
      id: 'HKMA-OR2-1', domain: 'governance', priority: 'baseline', sourceId: 'hkma-or-2', clause: '2 / 3',
      title: '建立营运韧性框架并由董事会及高级管理层负责',
      requirement: '制定营运韧性框架，并由董事会及高级管理层承担相应角色与责任。',
      quote: 'Operational resilience framework; Role of the Board and senior management',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-OR2-2', domain: 'resilience', priority: 'baseline', sourceId: 'hkma-or-2', clause: '4',
      title: '厘定营运韧性参数：关键业务、中断容忍度、严重但可能情景',
      requirement: '识别关键业务（critical operations）、设定中断容忍度（tolerance for disruption），并识别严重但可能发生的情景（severe but plausible scenarios）。',
      quote: 'Identifying critical operations; Setting tolerance for disruption; Identifying severe but plausible scenarios',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST }
    },
    {
      id: 'HKMA-OR2-3', domain: 'resilience', priority: 'baseline', sourceId: 'hkma-or-2', clause: '5 / 6 / 8',
      title: '测绘相互依存关系、管理风险并具备事故响应恢复能力',
      requirement: '测绘支撑关键业务的相互连接与相互依存关系；为关键业务交付作准备并管理其风险；具备响应及从事故中恢复的能力。',
      quote: 'Mapping interconnections and interdependencies underlying critical operations; Preparing for and managing risks to critical operations delivery; Responding to and recovering from incidents',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST },
      crossRefs: ['SFC-IT-2.9']
    },
    {
      id: 'HKMA-OR2-6', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-or-2', clause: '7',
      title: '在严重但可能情景下测试关键业务交付能力',
      requirement: '就严重但可能发生的情景，测试在该等情景下交付关键业务的能力。',
      quote: 'Testing ability to deliver critical operations under severe but plausible scenarios',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST }
    },

    // ---- SA-2 外判 ----
    {
      id: 'HKMA-SA2-1', domain: 'thirdparty', priority: 'baseline', sourceId: 'hkma-sa-2', clause: 'SA-2',
      title: '外判安排的评估、合约与持续监控',
      requirement: '就外判安排进行风险评估、订立合约保障（包括金管局的查阅权）、保障客户资料机密性，并对服务提供者进行持续监控。',
      quote: 'SPM SA-2 Outsourcing',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['outsourcing'] },
      crossRefs: ['SFC-IT-2.10', 'HKMA-TMG1-7']
    },

    // ---- 2026 AI 威胁通函 ----
    {
      id: 'HKMA-AI-2026', domain: 'governance', priority: 'enhanced', sourceId: 'hkma-cir-ai-2026', clause: '通函全文',
      title: '在 AI 驱动网络威胁下强化网络韧性',
      requirement: '按金管局 2026 年 6 月 2 日通函检讨并强化网络韧性安排，以应对由人工智能驱动的网络威胁。建议与证监会 26EC32 通函的控制要求（资产清单、加速补丁、最小权限、微分段、不可信输入处理、供应链、事故响应）并行落实。',
      quote: 'Strengthening Cyber Resilience amid Artificial Intelligence-Empowered Cyber Threats',
      quoteStatus: 'summary',
      applicability: { licenses: AI_INST, attributes: ['ai-models'] },
      crossRefs: ['SFC-AI-INV', 'SFC-AI-B3']
    }
  ]);
})();

/** C-RAF 2.0 的框架来源：网络安全强化计划 2.0 通函。 */
HKCC.addControls([{
  id: 'HKMA-CFI2', domain: 'assurance', priority: 'baseline', sourceId: 'hkma-cfi-2',
  clause: '通函全文',
  title: '采纳网络安全强化计划 2.0（CFI 2.0）的强化框架',
  requirement: '按 2020 年 11 月 3 日通函采纳 CFI 2.0。CFI 2.0 简化并强化了原有的 C-RAF，涵盖网络防卫评估架构、专业培训（认可培训计划）及网络情报共享平台三大支柱。具体的固有风险评估、成熟度评估及 iCAST 要求见本工具 HKMA-CRAF-1 至 HKMA-CRAF-4。',
  quote: 'Cybersecurity Fortification Initiative 2.0',
  quoteStatus: 'summary',
  applicability: { licenses: ['hkma-ai'] },
  crossRefs: ['HKMA-CRAF-1', 'HKMA-CRAF-2', 'HKMA-CRAF-3', 'HKMA-CRAF-4']
}]);
