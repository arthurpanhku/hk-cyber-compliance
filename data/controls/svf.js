/**
 * 储值支付工具（SVF）持牌人的科技与支付保安要求。
 * 法律框架：《支付系统及储值支付工具条例》（第 584 章，PSSVFO）
 *   → 《储值支付工具持牌人监管指引》（2016 年 9 月，第 54(1A)(b) 条）
 *   → 《储值支付工具持牌人监管实务备考》（2025 年 10 月，说明达标方式）
 * 条款编号沿用《指引》第 7 节的段落编号；实务备考按同一编号提供补充指引。
 */
(function () {
  const SVF = ['hkma-svf'];
  const GL = 'hkma-svf-guideline';
  const PN = 'hkma-svf-pn';

  HKCC.addControls([
    {
      id: 'SVF-7.2.1', domain: 'governance', priority: 'baseline', sourceId: GL, clause: '7.2.1',
      title: '建立与业务相称的科技风险管理（TRM）框架',
      requirement: '建立有效的科技风险管理框架，确保 (i) IT 控制充分；(ii) 电脑系统的质素与保安（包括可靠性、稳健性、稳定性及可用性）；(iii) 储值支付工具运作的安全与效率。框架须「切合用途」，即与业务的性质、规模、复杂程度及类型、所采用的技术及整体风险管理系统相称，并在业务发展与风险管理之间适当分配科技资源。实务备考订明框架通常须包含三项职能：IT 职能、TRM 职能、IT 审计职能，并须制定经正式批准的 IT 控制政策、订明豁免审批流程及违规后果。',
      quote: 'A licensee should establish an effective technology risk management framework to ensure (i) the adequacy of IT controls, (ii) the quality and security, including the reliability, robustness, stability and availability, of its computer systems, and (iii) the safety and efficiency of the operations of the SVF.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['HKMA-TMG1-2']
    },
    {
      id: 'SVF-7.2.2', domain: 'respond', priority: 'baseline', sourceId: GL, clause: '7.2.2',
      title: '事故管理框架及向金管局的及时呈报',
      requirement: '建立具备充分管理层监督的事故管理框架，确保有效的事故响应与管理能力。其中包括及时向金管局呈报任何已确认的 IT 相关欺诈个案或重大保安漏洞（包括网络攻击）、服务长时间中断的个案，以及导致用户金钱损失或严重影响用户体验的系统性事故。',
      quote: 'This includes (i) timely reporting to the HKMA of any confirmed IT-related fraud cases or major security breaches, including cyber attacks, cases of prolonged disruption of service, and systemic incidents where users suffer from monetary loss or frustrating user experience.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-PH-C1']
    },
    {
      id: 'SVF-7.2.3', domain: 'data', priority: 'baseline', sourceId: GL, clause: '7.2.3',
      title: '数据库按用途分隔并执行严格访问控制',
      requirement: '采取充分措施，就不同用途的数据库维持适当分隔，防止未获授权或非预期的访问或检索，并执行稳健的访问控制以确保数据库的机密性与完整性。就用户（包括商户）的个人资料，须在任何时候遵守《个人资料（私隐）条例》及私隐专员公署不时发出的相关实务守则、指引或最佳行事常规。',
      quote: 'In respect of any personal data of users, including merchants, a licensee should at all times comply with the PDPO as well as any relevant codes of practice, guidelines or best practice issued by the Office of the PCPD from time to time.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['PDPO-DPP4-1', 'SFC-IT-2.2']
    },
    {
      id: 'SVF-7.3.1', domain: 'governance', priority: 'baseline', sourceId: GL, clause: '7.3.1',
      title: '建立稳健的支付保安管理框架',
      requirement: '建立与其储值支付工具计划所涉支付保安风险的规模及性质相称的稳健支付保安管理框架，以有效监察、识别、评估、应对及缓减因营运该等计划而产生的支付保安风险。',
      quote: 'A licensee should put in place a robust payment security management framework that is commensurate with the scale and nature of payment security risks associated with its SVF schemes to effectively monitor, identify, evaluate, respond and mitigate the payment security risks arising from the operation of the SVF schemes.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF }
    },
    {
      id: 'SVF-7.3.2', domain: 'data', priority: 'baseline', sourceId: GL, clause: '7.3.2',
      title: '用户资料全生命周期的政策与程序',
      requirement: '就透过储值支付工具服务登记及执行支付交易所收集的用户资料，制定关于其拥有权、分类、储存、传输、处理及保留的充分政策与程序，以确保资料的机密性与完整性。',
      quote: 'A licensee should have adequate policies and procedures on the ownership, classification, storage, transmission, processing and retention of information collected from users through registration of SVF service and execution of payment transactions to ensure confidentiality and integrity of the information.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['PDPO-DPP2', 'SFC-IT-1.4']
    },
    {
      id: 'SVF-7.3.3', domain: 'protect', priority: 'baseline', sourceId: GL, clause: '7.3.3',
      title: '保护每一支付渠道（包括卡片与用户设备）',
      requirement: '就提供予用户使用储值支付工具的每一支付渠道（包括卡片及用户设备），实施充分的保安措施以抵御所有重大漏洞及攻击。实务备考订明：提供支付卡服务者须实施充分保障以保护敏感支付卡资料，典型做法是部署晶片卡储存该等资料。',
      quote: 'A licensee should implement adequate security measures to protect each payment channel (including cards and user devices) provided to users for using its SVF against all material vulnerabilities and attacks.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF }
    },
    {
      id: 'SVF-7.3.4', domain: 'detect', priority: 'baseline', sourceId: GL, clause: '7.3.4',
      title: '支付交易的真确性、可追溯性与欺诈侦测',
      requirement: '实施充分的支付保安控制，确保支付交易的真确性与可追溯性，并侦测欺诈交易。实务备考就非接触式支付（如二维码、近场通讯 NFC）等模式提供进一步指引。',
      quote: 'A licensee should implement adequate payment security controls to ensure the authenticity and traceability of payment transactions and detect fraudulent transactions.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-PH-B3']
    },
    {
      id: 'SVF-7.3.5', domain: 'identity', priority: 'baseline', sourceId: GL, clause: '7.3.5',
      title: '高风险操作前的用户身份认证与事后通知',
      requirement: '在用户管理其储值支付工具账户及发起高风险交易前认证其身份，并在该等活动后向用户发出及时通知。实务备考订明：如容许用户透过网上渠道开户，须采用可靠方法认证身份；用户要求更改账户资料时须进行充分的身份查核。',
      quote: 'A licensee should authenticate the identity of SVF users before they can administer their SVF accounts and initiate high-risk transactions. Timely notification should be sent to users after these activities.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['HKMA-TME1-4.1', 'SFC-IT-1.3']
    },
    {
      id: 'SVF-7.3.6', domain: 'awareness', priority: 'baseline', sourceId: GL, clause: '7.3.6',
      title: '透过有效渠道向用户提供安全使用建议',
      requirement: '透过有效的沟通渠道向用户提供关于安全使用储值支付工具的建议与协助。实务备考订明：须警示用户有责任采取合理保安预防措施保护支付设备并妥善保密密码，并须提供浅白、显眼且定期检讨的建议。',
      quote: 'A licensee should provide advice and assistance to users on the secure use of SVF through an effective communication channel.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-IT-3.4']
    },
    {
      id: 'SVF-PN-ANTISCAM', domain: 'awareness', priority: 'enhanced', sourceId: PN, clause: '7.3.6 补充指引 (b)',
      title: '反诈骗：设安全沟通渠道，且讯息不得嵌入超连结',
      requirement: '须至少提供一条安全渠道与用户持续沟通支付服务的正确及安全使用方式，并告知用户透过其他途径发出的「代表持牌人」讯息均不可靠。为管理各类诈骗风险，持牌人**不得**向用户发送、生成或触发任何嵌有超连结的讯息（如电邮、短讯或即时通讯），若该超连结会 (a) 要求用户提供个人资料及凭证等敏感资料，或 (b) 将用户导向其网站或应用程式进行交易；并须在必要时提醒用户其不会作出上述行为。如发生钓鱼网站事件，须发新闻稿警示用户及公众，并向警方、金管局及其他相关监管机构报告，同时及时向金管局提供钓鱼网站超连结等相关资料。',
      quote: 'A licensee should not send, generate or trigger any message (e.g. emails, SMS messages, or similar kinds of instant messages) to the users with embedded hyperlinks that would (a) request users to provide sensitive user information such as personal data and credentials; or (b) direct a user to its website or Apps for transactions.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-PH-D1']
    },
    {
      id: 'SVF-7.3.7', domain: 'assurance', priority: 'baseline', sourceId: GL, clause: '7.3.7',
      title: '网络威胁监察、定期保安测试与渗透测试',
      requirement: '透过监察网络威胁趋势、实施充分的保护措施及进行定期保安测试，防范现有及新兴的网络安全风险。实务备考订明四方面：(a) 高度依赖互联网与流动技术者须透过 TRM 流程充分管理网络安全风险，并投入足够资源以具备识别、保护、遏制及恢复的能力；(b) 可考虑订阅优质网络威胁情报服务，并与其他机构协作共享情报；(c) 定期评估进行渗透测试的必要性，测试范围应基于网络安全风险状况，涵盖内外部网络、应用系统，以及社会工程与新兴威胁，并按影响与风险敞口分析及时缓减所发现的问题；(d) 关注「永远在线」的联网设备所带来的端点风险。',
      quote: 'A licensee should guard against current and upcoming cyber security risks associated with its SVF by monitoring the trends in cyber threats, implementing adequate protective measures and performing periodic security testing.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['HKMA-CRAF-3', 'SFC-AI-C1']
    },
    {
      id: 'SVF-7.3.8', domain: 'resilience', priority: 'baseline', sourceId: GL, clause: '7.3.8',
      title: '支付服务的效率与可靠性须可量度',
      requirement: '提供与其储值支付工具运作模式相称的高效可靠支付服务。实务备考订明：效率与可靠性应以可量度的表现指标评估，例如响应时间、交易吞吐量、系统容量、系统可用性及稳定性；须按预设指标测试及监察表现。就对表现要求高的商户（如公共运输营运者），须与商户议定预期表现指标并投入足够资源以确保达标。',
      quote: 'In typical situations, efficiency and reliability should be assessed by measurable performance indicators such as response time, transaction throughput, system capacity, system availability and stability.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF }
    },
    {
      id: 'SVF-7.4.1', domain: 'resilience', priority: 'baseline', sourceId: GL, clause: '7.4.1',
      title: '业务连续性管理（BCM）计划',
      requirement: '建立充分的业务连续性管理计划，确保在各种突发情景造成重大中断时，关键营运可以持续、及时恢复，或在极端情况下有序缩减。实务备考订明：充分的 BCM 计划通常包含业务影响分析、恢复策略、业务连续性计划，以及供业务与 IT 恢复使用的替代场地。',
      quote: 'A licensee should have in place adequate business continuity management (BCM) programs to ensure continuation, timely recovery, or in extreme situations orderly scale-down of critical operations in the event of major disruptions caused by different contingent scenarios.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF },
      crossRefs: ['SFC-IT-2.9', 'HKMA-OR2-3']
    },
    {
      id: 'SVF-7.4.2', domain: 'governance', priority: 'baseline', sourceId: GL, clause: '7.4.2',
      title: '董事会及高级管理层对 BCM 负最终责任',
      requirement: '持牌人的董事会及高级管理层对业务连续性管理及其业务连续性计划的有效性负最终责任，须确保 BCM 计划获妥善实施、获各级员工认真对待，并投入足够资源落实计划。',
      quote: 'The board and senior management of a licensee have the ultimate responsibility for BCM and the effectiveness of their business continuity plans.',
      quoteStatus: 'verbatim',
      applicability: { licenses: SVF }
    },
    {
      id: 'SVF-CI-COP', domain: 'governance', priority: 'baseline', sourceId: 'occics-cop-svf', clause: '1.1',
      title: 'SVF 界别：关键基础设施条例的专属实务守则',
      requirement: '获金管专员指定为关键基础设施营运者的储值支付工具持牌人，就第 1 类及第 2 类责任须参照金管专员发出的 SVF 界别实务守则（2026-06-12 生效）；就第 3 类责任则参照专员发出的通用实务守则第 7 节。',
      quote: 'Code of Practice Pursuant to the Protection of Critical Infrastructures (Computer Systems) Ordinance For Stored Value Facility Licensees designated by the Monetary Authority as Critical Infrastructure Operators',
      quoteStatus: 'summary',
      applicability: { licenses: SVF, attributes: ['ci-designated'] },
      crossRefs: ['CI-CAT1-3', 'CI-CAT3-3']
    }
  ]);
})();
