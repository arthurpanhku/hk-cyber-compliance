/**
 * SFC 2026 年两份网络安全通函：
 *  - 26EC35 (2026-07-09) 抗钓鱼认证与可疑活动监控
 *  - 26EC32 (2026-06-02) 应对 AI 驱动网络攻击的加强措施
 */
(function () {
  const IT = ['sfc-ra1', 'sfc-ra2', 'sfc-ra3', 'sfc-ra9', 'sfc-vasp'];
  const ALL_LC = ['sfc-ra1', 'sfc-ra2', 'sfc-ra3', 'sfc-ra4', 'sfc-ra5', 'sfc-ra6',
    'sfc-ra7', 'sfc-ra8', 'sfc-ra9', 'sfc-ra13', 'sfc-vasp'];
  const PH = 'sfc-cir-phishing-2026';
  const AI = 'sfc-cir-ai-2026';

  HKCC.addControls([
    // ---- 26EC35 抗钓鱼认证 ----
    {
      id: 'SFC-PH-A1', domain: 'identity', priority: 'enhanced', sourceId: PH, clause: '(A) 第 5 段',
      title: '客户登录及设备绑定须采用抗钓鱼认证方案', deadline: '2027-07-08',
      requirement: '为客户登录互联网交易账户及客户注册／绑定设备实施抗钓鱼的稳健认证方案。证监会明确表示不视一次性密码（OTP）为抗钓鱼方案，不得用于上述两个流程。可接受示例包括 passkey（基于公开密钥加密的无密码凭证）及已绑定设备。大型互联网券商须即时实施；其余机构最迟须于 2027 年 7 月 8 日前完成。',
      quote: 'The SFC does not consider OTP to be a phishing-resistant authentication solution, and internet brokers and VASPs should not use it for the processes mentioned under paragraph 5 above.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-1.1']
    },
    {
      id: 'SFC-PH-A2', domain: 'identity', priority: 'enhanced', sourceId: PH, clause: '(A)',
      title: '按平台风险特征评估并选用适当认证方法',
      requirement: '审慎评估自身情况，包括向客户提供的互联网交易平台类型及其风险特征，采用适当的认证方法；并持续关注技术发展，定期评估现有安全控制是否仍然适当有效、与业务性质规模复杂程度相称。',
      quote: 'Internet brokers and VASPs should carefully assess their own circumstances, including the types of internet trading platforms offered to clients and the platforms’ risk profile, and adopt the appropriate authentication method.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] }
    },
    {
      id: 'SFC-PH-A3', domain: 'identity', priority: 'enhanced', sourceId: PH, clause: '(A)',
      title: 'passkey 及绑定设备数量上限（一般不超过 3 个）',
      requirement: '一般情况下不应容许客户为其互联网交易账户绑定或注册超过三个 passkey 及／或三部设备。客户如要求超出上限，须先进行充分评估方可批准。',
      quote: '… generally, they should not allow clients to bind or register more than three passkeys and/or three devices for their internet trading accounts.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] }
    },
    {
      id: 'SFC-PH-A4', domain: 'identity', priority: 'enhanced', sourceId: PH, clause: '(A)',
      title: '会话超时不得由客户关闭（建议 30 分钟内）',
      requirement: '不得容许客户关闭会话超时功能，并须限制闲置超时时间（例如 30 分钟内），且须事先评估及持续监察。如客户交易需要合理支持较长闲置时间，只有在密切监察该客户的登入／登出记录及交易活动的前提下方可容许。',
      quote: '… internet brokers and VASPs should not allow clients to disable session timeout and should limit the idle timeout period, for example, to within 30 minutes, subject to prior assessments and ongoing monitoring.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-1.6']
    },
    {
      id: 'SFC-PH-B1', domain: 'detect', priority: 'enhanced', sourceId: PH, clause: '(B)',
      title: '高风险账户活动的多渠道即时通知',
      requirement: '就成功登录及其他高风险账户活动（包括从新设备登录、绑定新设备、创建或撤销 passkey）即时通知客户，并在适用情况下透过多个通讯渠道（电邮、短讯或其他推送通知）发出。',
      quote: 'Internet brokers and VASPs should notify clients promptly of successful login to their internet trading accounts and other high-risk account activities, including logins from new devices, binding of new device and creation or revocation of passkeys.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-1.3']
    },
    {
      id: 'SFC-PH-B2', domain: 'detect', priority: 'enhanced', sourceId: PH, clause: '(B)',
      title: '重大变更后交易前的客户确认',
      requirement: '强烈建议在容许账户进一步交易前，要求客户确认其已授权某些重大变更或已获悉异常账户活动。例如当新注册设备被用于访问客户账户时，可先向客户核实该设备是否确属其本人，方容许以该设备下单。',
      quote: 'Internet brokers and VASPs are also strongly encouraged to require clients to confirm that they have authorised certain material changes or have been notified of unusual account activities before further transactions are permitted in the account.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] }
    },
    {
      id: 'SFC-PH-B3', domain: 'detect', priority: 'enhanced', sourceId: PH, clause: '(B)(a)',
      title: '交易监控：预设阈值与可疑红旗',
      requirement: '以预设阈值识别异常交易活动并分析可疑交易红旗。阈值应参照客户背景、历史交易行为、账户活动、设备使用及登录模式设定。潜在红旗包括：与客户过往交易模式不符的交易、按客户正常模式属异常时段发出的交易、短期内造成重大亏损的交易；突然大量买卖流通量极低或小型股；以及在密码重设、联络资料变更或绑定新设备后短时间内进行的异常交易。',
      quote: 'Transaction monitoring: Identify abnormal trading activities using predefined thresholds and analyse red flags associated with suspicious transactions.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] }
    },
    {
      id: 'SFC-PH-B4', domain: 'detect', priority: 'enhanced', sourceId: PH, clause: '(B)(b)',
      title: '登录及设备绑定监控与日志留存',
      requirement: '保存充分日志（包括系统登录及设备绑定时捕获的设备 ID），并及时检视以侦测异常事件，例如来自异常地理位置的绑定请求、多个客户账户绑定至同一部设备、短时间内自多个地点登录，以及异常长的登录会话。发现异常须即时跟进，包括直接向客户核实交易及在适当情况下暂停账户。',
      quote: 'Maintain sufficient logs, including device IDs captured during system login and device binding, and review them on a timely basis to detect irregular events …',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-1.2']
    },
    {
      id: 'SFC-PH-C1', domain: 'respond', priority: 'enhanced', sourceId: PH, clause: '(C)',
      title: '黑客入侵事故须即时向证监会报告并做根因分析',
      requirement: '建立即时响应黑客入侵事故的程序，包括立即制止未获授权活动、保障客户资产、通知受影响客户及防止进一步入侵。须即时向证监会报告黑客入侵事故，进行根因分析以识别导致事故的内部控制缺失或系统漏洞，保存详细事故报告，并实施适当补救措施防止同类事故再发生。',
      quote: 'Internet brokers and VASPs should also report hacking incidents to the SFC immediately.',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-3.2']
    },
    {
      id: 'SFC-PH-D1', domain: 'awareness', priority: 'enhanced', sourceId: PH, clause: '(D)',
      title: '提升客户对钓鱼及网络安全风险的认识',
      requirement: '提示客户常见攻击情景，包括冒充公司的诈骗电邮、短讯或电话，用以套取登录凭证的假网站或假流动应用程式，以及诱使客户披露密码、OTP 或其他保安资料的社会工程手法；提醒客户凭证一旦外泄可能导致账户被未授权访问，任何情况下均不应向第三方披露；并定期提醒客户采用稳妥保安做法（强而独特的密码、设定适当交易控制及限额、启用关键活动提示、及时检视并举报可疑交易）。',
      quote: '… alert clients of common attack scenarios, including fraudulent emails, text messages or phone calls impersonating the firm, fake websites or mobile applications designed to harvest login credentials, and social engineering tactics …',
      quoteStatus: 'excerpt',
      applicability: { licenses: IT, attributes: ['internet-trading'] },
      crossRefs: ['SFC-IT-3.4']
    },

    // ---- 26EC32 AI 驱动网络攻击 ----
    {
      id: 'SFC-AI-GOV', domain: 'governance', priority: 'enhanced', sourceId: AI, clause: '第 3 段',
      title: 'MIC-IT 对网络安全风险负最终责任',
      requirement: '高级管理层（包括资讯科技主管人员 MIC-IT）对公司面对的网络安全风险负最终责任。MIC-IT 须确保对公司网络安全框架的变更获充分检视及审批，并确保网络安全措施的强化获妥善及迅速实施。必要时应寻求 IT 保安专家的意见及协助。',
      quote: 'They are reminded that their senior management, including the Manager-in-Charge of Information Technology (MIC-IT), is ultimately responsible for managing cybersecurity risks faced by their firms.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-3.1']
    },
    {
      id: 'SFC-AI-INV', domain: 'governance', priority: 'enhanced', sourceId: AI, clause: '第 8 段',
      title: '维持可支持当日决策的科技资产清单',
      requirement: '维持准确及最新的科技资产及组件清单（涵盖硬件、软件、网络基础设施、数据库及云端服务），并识别哪些资产及服务属对外暴露、业务关键（business critical components）或依赖第三方组件，以便迅速有效地将补救及保护措施导向最高风险范围。鉴于前沿 AI 模型识别可利用弱点的速度极快，资产清单须保持足够更新，以支持在新漏洞或威胁情报出现时作出「当日」的优先级排序及围堵决策。',
      quote: '… licensed firms should ensure that their asset inventories are kept sufficiently up-to-date to facilitate same-day prioritisation and containment decisions when new vulnerabilities or threat intelligence emerge.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC }
    },
    {
      id: 'SFC-AI-A1', domain: 'protect', priority: 'enhanced', sourceId: AI, clause: '(A)',
      title: '加快补丁与漏洞管理，设例外紧急修补程序',
      requirement: '检讨并强化补丁及漏洞管理流程，对已知漏洞迅速采取行动，并就常规补丁周期以外的紧急及关键修补制定充分政策及程序（尤其涉及业务关键组件者）。须分配足够资源以应对补丁需求可能出现的激增。',
      quote: 'They should take prompt actions to address known vulnerabilities and implement adequate policies and procedures for handling urgent and critical fixes that fall outside routine patching cycles, especially for vulnerabilities and fixes affecting their business critical components.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-2.4']
    },
    {
      id: 'SFC-AI-B1', domain: 'identity', priority: 'enhanced', sourceId: AI, clause: '(B)(i)',
      title: '假设已被攻破：对业务关键组件执行最小权限',
      requirement: '在设计系统控制时假设任何用户、设备、特权账户或网络组件均可能已被攻破。对所有业务关键组件执行最小权限访问，包括将连接器（connectors）及工具权限限制在预期用途所需范围内，并实施充分措施保护特权账户。',
      quote: 'Licensed firms should design system controls based on the assumption that any user, device, privileged account or network component may be compromised.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-2.2']
    },
    {
      id: 'SFC-AI-B2', domain: 'protect', priority: 'enhanced', sourceId: AI, clause: '(B)(ii)',
      title: '强化防火墙与微分段以限制横向移动',
      requirement: '强化防火墙及网络分段；在可行情况下实施微网络分段（micro network segmentation），以限制跨网络及系统的横向移动能力。',
      quote: '… licensed firms should implement micro network segmentation where feasible to limit lateral movement capabilities across networks and systems.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-2.1']
    },
    {
      id: 'SFC-AI-B3', domain: 'protect', priority: 'enhanced', sourceId: AI, clause: '(B)(iii)',
      title: '将外部及不可信输入视为潜在敌对内容（提示词注入防护）',
      requirement: '将外部及不可信输入——包括从应用程式、电邮、文件及网页取得的内容——视为潜在敌对内容，防止该等输入直接更改系统指令或触发特权操作。',
      quote: '… treat external and untrusted inputs, including content retrieved from apps, emails, documents and webpages, as potentially adversarial and prevent such inputs from directly altering system instructions or triggering privileged actions.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC }
    },
    {
      id: 'SFC-AI-B4', domain: 'governance', priority: 'enhanced', sourceId: AI, clause: '(B)(iv)',
      title: '高影响操作实施双重复核（maker-checker）',
      requirement: '对高影响操作实施 maker-checker（经办／复核）控制。',
      quote: 'apply maker-checker controls for high-impact actions.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC }
    },
    {
      id: 'SFC-AI-C1', domain: 'detect', priority: 'enhanced', sourceId: AI, clause: '(C)',
      title: '强化威胁侦测、异常监控与威胁情报能力',
      requirement: '强化威胁侦测能力，加强对客户交易活动及系统活动异常的监察，使之与不断演变的威胁环境相称；并提升威胁情报收集能力。',
      quote: 'Licensed firms should strengthen their threat detection and monitoring of anomalies in client trading activities and system activities … They should also improve their threat intelligence gathering capability.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC }
    },
    {
      id: 'SFC-AI-D1', domain: 'thirdparty', priority: 'enhanced', sourceId: AI, clause: '(D)',
      title: '第三方供应链风险治理须纳入 AI 威胁',
      requirement: '制定妥善程序应对针对第三方服务提供者的 AI 驱动威胁；强化第三方供应链风险治理框架，在初始及持续评估中纳入最新威胁形势，确保妥善管理与第三方服务提供者相关的网络安全风险，尤其是源于 AI 驱动网络攻击者。',
      quote: 'They should strengthen their third-party supply chain risk governance framework, enhance initial and ongoing assessments on third-party service providers to factor in the latest threat landscape …',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC, attributes: ['outsourcing'] },
      crossRefs: ['SFC-IT-2.10']
    },
    {
      id: 'SFC-AI-E1', domain: 'respond', priority: 'enhanced', sourceId: AI, clause: '(E)',
      title: '事故处理程序及应急计划须涵盖 AI 驱动攻击',
      requirement: '检讨并强化网络安全事故处理程序及应急计划，以有效应对可能导致网络及系统遭未获授权访问、资料外泄等后果的 AI 驱动网络攻击。',
      quote: 'Licensed firms should review and enhance their cybersecurity incident handling procedures and contingency plans to effectively handle AI-enabled cyberattacks …',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC },
      crossRefs: ['SFC-IT-2.9']
    },
    {
      id: 'SFC-AI-LLM', domain: 'governance', priority: 'enhanced', sourceId: AI, clause: '第 7 段',
      title: '使用 AI 语言模型须纳入网安框架并履行申报责任',
      requirement: '无论 AI 语言模型属内部开发、由集团公司或第三方服务商提供，抑或取自开源，其使用均可能放大既有网络风险并引入额外风险（包括针对 AI 语言模型的对抗性攻击、数据外泄及系统提示词覆盖 system prompt override）。须在网络安全框架及事故处理安排中处理相关风险。拟在高风险用例采用 AI 语言模型者，须遵守《证券及期货（发牌及注册）（资料）规则》下的通知责任。',
      quote: 'These include risks arising from adversarial attacks against AI language models, data leakage and system prompt override.',
      quoteStatus: 'excerpt',
      applicability: { licenses: ALL_LC, attributes: ['ai-models'] }
    }
  ]);
})();
