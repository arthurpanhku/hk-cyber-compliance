/**
 * 《虚拟资产交易平台营运者指引》（2023 年 6 月）第 XII 部：网络安全。
 *
 * 该指引以英文发布，适用于证监会发牌的虚拟资产交易平台营运者
 * （"Platform Operator"）。本文件只收录第 XII 部的条文——指引其余部分
 * （财政稳健、尽职审查、代币纳入、市场监察、客户资产保管等）不属本工具范围。
 *
 * 与《减低及缓减与互联网交易相关的黑客入侵风险指引》高度重合：证监会显然以
 * 后者为蓝本撰写本部分。重合之处以双向交叉引用标注，界面会合并为同一张卡片，
 * 使同时受两份文件约束的平台营运者不必重复评估同一项要求。
 */
(function () {
  const src = 'sfc-vatp-guidelines';
  const VA = ['sfc-vasp'];

  HKCC.addControls([
    // ---- 管治与问责（12.1–12.5）----
    {
      id: 'SFC-VATP-12.1', domain: 'governance', priority: 'baseline', sourceId: src, clause: '12.1',
      title: '平台（含交易系统与托管基础设施）须妥善设计及运作',
      requirement: '确保平台（包括交易系统及托管基础设施）的设计与运作符合所有适用法律及规例，并确保支撑平台运作的所有系统及流程稳健、妥善维护，使盗窃、欺诈及其他不诚实行为、专业失当、错误及遗漏、服务中断或其他营运或控制失效的风险减至最低并获妥善管理。',
      quote: 'A Platform Operator should ensure that the platform (including the trading system and custody infrastructure) is properly designed and operated in compliance with all applicable laws and regulations. The Platform Operator should ensure that all systems and processes underpinning the operation of the platform are robust and properly maintained such that the risk of theft, fraud, and other dishonest acts, professional misconduct, errors and omissions, interruptions or other operational or control failures is minimised and appropriately managed.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.2', domain: 'governance', priority: 'baseline', sourceId: src, clause: '12.2',
      title: '稳健的管治安排与充足的人力、技术及财政资源',
      requirement: '就监督平台运作设立稳健的管治安排，并备有充足的人力、技术及财政资源，确保平台运作得以妥善进行。',
      quote: 'A Platform Operator should ensure that there are robust governance arrangements in place for overseeing the operation of its platform as well as adequate human, technology and financial resources available to ensure that the operations of its platform are carried out properly.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.3', domain: 'governance', priority: 'baseline', sourceId: src, clause: '12.3',
      title: '书面内部政策、关键人员风险与负责人员的网络安全问责',
      requirement: '就平台的设计、开发、部署、运作及修改制定并实施书面内部政策及程序，确保：(a) 关键人员具备必要的专业资格、管理及技术经验，并识别关键人员（如平台的创办人或首席开发者）及订立缓减关键人风险的计划；(b) 至少委任一名负责人员总体管理及监督平台，并界定网络安全管理框架与关键角色职责，包括审批政策程序、审批预算与资源、安排定期科技审计（第 12.7 段）及独立网络安全评估（第 12.13 段）、检视紧急事故与网络安全事故所引起的重大事项、检视内部及外部审计与网络安全检视的主要发现并认可及监察补救措施的完成、监察及评估网络安全威胁与攻击（包括掌握威胁形势、新漏洞与攻击手法，搜集威胁情报，并定期以自动化工具进行漏洞扫描）、审批应急计划，以及审批第三方服务提供者的首次及持续尽职审查、服务水平协议与合约。上述职责可以书面转授予指定委员会或运作部门，但整体问责仍由负责人员承担；(c) 设有由交易、风险及合规职能提供意见的正式管治流程；(d) 设有清晰的汇报路线；(e) 设有管理及监督控制。',
      note: '指引明确注明：「定期以自动化工具进行漏洞扫描」的要求不包括进行基于攻击模拟的渗透测试。',
      quote: 'A Platform Operator should have at least one responsible officer responsible for the overall management and supervision of its platform and for defining a cybersecurity management framework and setting out key roles and responsibilities. … These responsibilities can be delegated, in writing, to a designated committee or operational unit, but overall accountability remains with the responsible officer(s).',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-3.1']
    },
    {
      id: 'SFC-VATP-12.4', domain: 'governance', priority: 'baseline', sourceId: src, clause: '12.4',
      title: '定期检讨内部政策及程序并即时补救缺失',
      requirement: '定期检讨上述内部政策及程序，确保其与不断变化的市场状况、网络威胁形势及监管发展保持一致，并即时补救所发现的任何缺失。',
      quote: 'A Platform Operator should conduct regular reviews to ensure that these internal policies and procedures are in line with changing market conditions, the cyber threat landscape and regulatory developments and promptly remedy any deficiencies identified.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.5', domain: 'governance', priority: 'baseline', sourceId: src, clause: '12.5',
      title: '为平台的设计、开发、部署、运作及修改配备合资格人员与资源',
      requirement: '就平台的设计、开发、部署、运作及修改，指派具备足够资格的人员、专业知识、技术及财政资源。',
      quote: 'A Platform Operator should assign adequately qualified staff, expertise, technology and financial resources to the design, development, deployment, operation and modification of the platform.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },

    // ---- 第三方与审计（12.6–12.7）----
    {
      id: 'SFC-VATP-12.6', domain: 'thirdparty', priority: 'baseline', sourceId: src, clause: '12.6',
      title: '第三方服务提供者的尽职审查、持续监察与服务水平协议',
      requirement: '平台或其相关活动如由第三方服务提供者提供或外判予第三方，须进行适当尽职审查及持续监察，并作出适当安排以确保平台营运者仍能符合本指引（包括第 XII 部及第 XIV 部「备存纪录」）的要求。平台营运者或其有联系实体尤须与服务提供者订立正式服务水平协议，列明服务条款及提供者的责任；该协议须定期检讨，并在适当时修订以反映服务、外判安排或监管发展的变动。在可行情况下，协议应载有量化的维护及技术支援水平。',
      quote: 'In particular, the Platform Operator or its Associated Entity should enter into a formal service-level agreement with the service provider which specifies the terms of services and responsibilities of the provider. This service-level agreement should be regularly reviewed and revised, where appropriate, to reflect any changes to the services provided, outsourcing arrangements or regulatory developments.',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.10']
    },
    {
      id: 'SFC-VATP-12.7', domain: 'assurance', priority: 'baseline', sourceId: src, clause: '12.7',
      title: '至少每年一次由独立专业人士进行的科技审计',
      requirement: '安排由具备合适资格的独立专业人士定期（至少每年一次）进行科技审计，以信纳平台营运者及其有联系实体已完全遵守本指引第 XII 部。在甄选及委任该独立专业人士时须以适当的技能、谨慎及勤勉行事，并考虑其在检视虚拟资产相关技术方面的经验及往绩。一经发现任何不合规情况，须即时采取（并确保其有联系实体采取）补救措施。',
      quote: 'A Platform Operator should arrange a periodic (at least annual) technology audit by a suitably qualified independent professional so as to be satisfied that the Platform Operator and its Associated Entity have fully complied with Part XII of these Guidelines.',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] }
    },

    // ---- 平台的充分性与可靠性（12.8–12.11）----
    {
      id: 'SFC-VATP-12.8', domain: 'resilience', priority: 'baseline', sourceId: src, clause: '12.8',
      title: '确保平台的完整性、可靠性、保安与容量并备有应急措施',
      requirement: '确保平台的完整性，在系统方面维持高度的可靠性、保安性及容量，并备有适当的应急措施。',
      quote: 'A Platform Operator should ensure the integrity of the platform, maintain a high degree of reliability, security and capacity in respect of its systems, and have appropriate contingency measures in place.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.9', domain: 'protect', priority: 'baseline', sourceId: src, clause: '12.9',
      title: '系统升级及维护的书面标准作业程序',
      requirement: '就进行系统升级及维护制定书面标准作业程序（SOP），内容须包括：(a) 通讯方式，以及仍在买卖盘纪录册内的未完成买卖盘的处理方法；(b) 系统停止运作后、持续交易恢复前，买卖盘可于多长时间内输入、修改或取消；(c) 影响有秩序市场的意外及非计划系统故障的处理流程。',
      quote: 'A Platform Operator should have standard operating procedures (SOP) in writing for performing system upgrades and maintenance.',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.10', domain: 'protect', priority: 'baseline', sourceId: src, clause: '12.10',
      title: '部署前的测试、高级管理层签核、全面备份与回退计划',
      requirement: '确保平台及其所有修改（例如实施新系统或升级现有系统）在部署前经过测试并定期检视。部署前至少须：(a) 由高级管理层检视测试结果并签核；(b) 对系统及数据作全面备份；(c) 订立应急计划，以便新版本出现严重且无法复原的错误时可切换回上一版本。平台的所有修改均须保留清晰的审计轨迹。',
      quote: 'Specifically, a Platform Operator should at least conduct the following before deployment: (a) reviewing and signing off on the test results by senior management; (b) fully backing up the system and data; and (c) devising a contingency plan to switch back to the previous version of the platform in the event of any critical and unrecoverable errors in the new version.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.11', domain: 'resilience', priority: 'baseline', sourceId: src, clause: '12.11',
      title: '计划内停机须尽早预告受影响客户',
      requirement: '计划就平台或系统进行更新及测试而需要停止服务时，如可能影响客户，须在切实可行范围内尽早通知客户。',
      quote: 'Where a Platform Operator plans to have outages to perform updates and testing of its platforms or systems, it should inform its clients as far in advance as practicable if such outages may affect them.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },

    // ---- 平台保安：12.12 各项控制 ----
    {
      id: 'SFC-VATP-12.12a', domain: 'identity', priority: 'baseline', sourceId: src, clause: '12.12(a)',
      title: '员工按需访问、唯一身份认证、年度权限复核与访问日志',
      requirement: '采用稳健的认证及授权方法与技术，确保只有获授权者可按「须知」原则访问平台。具体包括：(i) 只准许员工访问平台上的买卖盘或交易资料，且以平台妥善有效运作所必需者为限，并须随时让高级管理层知悉获访问权的员工身份（职衔及部门）、其可访问的资料、每项访问权的必要理由，以及任何变更及其理由；(ii) 采用适当的用户认证方法，使相关用户可被唯一识别；(iii) 至少每年复核平台及数据库的用户访问名单，确保访问权仍限于获批准者，并及时撤销不必要的权限（例如离职员工）；(iv) 备存充分的访问日志，记录访问者身份与角色、所访问的资料、访问时间、就该次访问所给予的批准及其理由，并设有充分保护以防日志被篡改或删除；(v) 设有充分有效的政策、系统及控制，以防范并侦测员工就其可访问的买卖盘及交易资料所作的错误、遗漏、未经授权的插入、更改或删除数据（包括客户资料及交易资料）、资料外泄或滥用。',
      quote: 'robust authentication and authorisation methods and technology to ensure that access to the platform is restricted to authorised persons only on a need-to-have basis',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.2']
    },
    {
      id: 'SFC-VATP-12.12b', domain: 'identity', priority: 'baseline', sourceId: src, clause: '12.12(b)',
      title: '客户账户登录须实施双重认证',
      requirement: '就客户账户的登录实施双重认证。指引注明双重认证指采用「客户所知」、「客户所有」及「客户本身」三项因素中任何两项的认证机制。',
      quote: 'two-factor authentication for login to clients’ accounts',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-1.1']
    },
    {
      id: 'SFC-VATP-12.12c', domain: 'identity', priority: 'baseline', sourceId: src, clause: '12.12(c)',
      title: '客户登录密码的安全生成与传递',
      requirement: '设有有效政策及程序，确保在账户启动及密码重设过程中，客户登录密码以安全方式生成及传递。密码应由系统随机生成，并经不受人为干预、亦不会被平台营运者员工篡改的通讯渠道送交客户。如密码并非由系统随机生成，须实施充分的补偿性保安控制，例如在账户启动后首次登录时强制更改密码。',
      quote: 'A client login password should be randomly generated by the system and sent to a client through a channel of communication which is free from human intervention and from tampering by staff of the Platform Operator.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-1.5']
    },
    {
      id: 'SFC-VATP-12.12d', domain: 'identity', priority: 'baseline', sourceId: src, clause: '12.12(d)',
      title: '严格的密码政策与会话超时控制',
      requirement: '在平台上实施严格的密码政策及会话超时控制，包括：(i) 最短密码长度；(ii) 就长期未更改密码的客户定期发出提示；(iii) 最低密码复杂度（即字母数字混合）及密码历史；(iv) 避免使用已知常用、可预期或已外泄的密码；(v) 对无效登录尝试的适当控制；(vi) 闲置一段时间后的会话超时。',
      quote: 'stringent password policies and session timeout controls on its platform',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-1.6']
    },
    {
      id: 'SFC-VATP-12.12e', domain: 'detect', priority: 'baseline', sourceId: src, clause: '12.12(e)',
      title: '客户账户活动的即时通知（须用有别于登录的渠道）',
      requirement: '在客户账户发生特定活动后即时通知客户，至少包括：(i) 系统登录；(ii) 密码重设；(iii) 交易执行；(iv) 客户及账户相关资料的变更。通知渠道须有别于系统登录所用的渠道。客户仅可选择退出「交易执行」通知；在此情况下，除应对机构专业投资者及合资格的法团专业投资者外，平台营运者须向客户提供充分的风险披露，并由客户签署确认已明白当中涉及的风险。',
      quote: 'The channel of notification to clients should be different from the one used for system login (as outlined in subparagraph (b)). Clients may choose to opt out from “trade execution” notifications only.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-1.3']
    },
    {
      id: 'SFC-VATP-12.12f-i', domain: 'protect', priority: 'baseline', sourceId: src, clause: '12.12(f)(i)',
      title: '以网络分段（DMZ 加多层防火墙）部署安全网络基础设施',
      requirement: '透过适当的网络分段部署安全的网络基础设施，即设置配备多层防火墙的非军事区（DMZ），以保护关键系统及客户资料免受网络攻击。',
      quote: 'deploy a secure network infrastructure through proper network segmentation, ie, a Demilitarised Zone (DMZ) with multi-tiered firewalls, to protect critical systems and client data against cyber-attacks',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.1']
    },
    {
      id: 'SFC-VATP-12.12f-ii', domain: 'identity', priority: 'baseline', sourceId: src, clause: '12.12(f)(ii)',
      title: '内部网络及其各分段的访问（含远程访问）按需授权',
      requirement: '按「须知」原则授予对内部网络及其不同分段的访问权（包括远程访问），并就该等访问实施保安控制。',
      quote: 'grant access (including remote access) to its internal network and different segments of it on a need-to-have basis and implement security controls over such access',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.3']
    },
    {
      id: 'SFC-VATP-12.12f-iii', domain: 'protect', priority: 'baseline', sourceId: src, clause: '12.12(f)(iii)',
      title: '补丁管理（测试完成后一个月内部署）',
      requirement: '及时监察及评估软件供应商发布的安全补丁或修补程式，在评估影响后尽快进行测试，并于测试完成后一个月内部署该等补丁或修补程式。',
      quote: 'monitor and evaluate security patches or hotfixes released by software provider(s) on a timely basis and, subject to an evaluation of the impact, conduct testing as soon as practicable and implement the security patches or hotfixes within one month following the completion of testing',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.4']
    },
    {
      id: 'SFC-VATP-12.12f-iv', domain: 'protect', priority: 'baseline', sourceId: src, clause: '12.12(f)(iv)',
      title: '防病毒、反恶意软件及端点侦测与响应（EDR）',
      requirement: '及时实施并更新防病毒及反恶意软件方案，以及端点侦测与响应（EDR）技术，以侦测关键系统服务器及工作站上的恶意应用程式及恶意软件。',
      quote: 'implement and update anti-virus and anti-malware solutions as well as endpoint detection and response technology on a timely basis to detect malicious applications and malware on critical system servers and workstations',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.5']
    },
    {
      id: 'SFC-VATP-12.12f-v', domain: 'detect', priority: 'baseline', sourceId: src, clause: '12.12(f)(v)',
      title: '实施 IPS／IDS 及 SIEM 以实时侦测并告警',
      requirement: '实施入侵防御系统（IPS）、入侵侦测系统（IDS）及安全信息与事件管理（SIEM）方案，就任何入侵或对关键系统服务器及工作站的未经授权访问实时侦测并发出告警。',
      note: '指引注明：EDR 技术与 SIEM 方案的侦测规则须在有需要时更新，例如出现需要增补侦测规则的新攻击或威胁情景时。',
      quote: 'implement Intrusion Prevent System (IPS), Intrusion Detection System (IDS) and System Information and Event Management (SIEM) solutions to detect and generate alerts on any intrusion or unauthorised access to critical system servers and workstations on a real time basis',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.12f-vi', domain: 'detect', priority: 'baseline', sourceId: src, clause: '12.12(f)(vi)',
      title: '设立保安运作中心（SOC）或同等职能',
      requirement: '设立配备充足资源的保安运作中心（SOC）或同等职能，负责所有保安监察流程及技术，并担任有效侦测及处理事故的协调角色。',
      quote: 'establish a Security Operations Center (SOC) or equivalent function with sufficient resources to take charge of all security monitoring processes and technologies and act as a coordinator for efficient incident detection and handling',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.12f-vii', domain: 'protect', priority: 'baseline', sourceId: src, clause: '12.12(f)(vii)',
      title: '防止未经授权安装硬件及软件，并管控存储媒介',
      requirement: '实施保安控制，防止未经授权安装硬件及软件，并确保只使用获授权的存储媒介及设备来存储及传输关键数据。',
      quote: 'implement security controls to prevent unauthorised installation of hardware and software, and ensure that only authorised storage media and devices are used to store and transfer critical data',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.6']
    },
    {
      id: 'SFC-VATP-12.12f-viii', domain: 'protect', priority: 'baseline', sourceId: src, clause: '12.12(f)(viii)',
      title: '关键平台组件（含 HSM）的物理安全与权限分离',
      requirement: '制定物理安全政策及程序，在安全环境中保护关键平台组件（例如硬件安全模块 HSM、用于存储及传输关键数据的获授权存储媒介及设备、系统服务器及网络设备），防止未经授权者实际进入托管平台及关键平台组件的设施；并在适用情况下，对关键平台组件的访问实施职责分离或权限分离。',
      quote: 'establish physical security policies and procedures to protect critical platform components (for example, the HSM, the authorised storage media and devices used to store and transfer critical data, system servers and network devices) in a secure environment …',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.7']
    },
    {
      id: 'SFC-VATP-12.12g', domain: 'data', priority: 'baseline', sourceId: src, clause: '12.12(g)',
      title: '加密与安全传输（含备份副本）',
      requirement: '按业界最佳实践及国际标准采用最新的数据加密及安全传输技术，保护存储于平台内及在内部与外部网络之间传输的资料的保密性与完整性，并确保来源真确性。平台营运者尤须使用强加密算法：(i) 在内部网络与客户设备之间传输敏感资料（如客户登录凭证及交易数据）时加密；(ii) 保护存储于平台内的客户登录密码；(iii) 保护在系统基础设施各组件之间传输的关键数据；(iv) 保护平台关键数据的备份副本。',
      quote: 'up-to-date data encryption and secure transfer technology, in accordance with industry best practices and international standards, to protect the confidentiality and integrity and assure source authenticity of information stored on the platform and during transmission between internal and external networks.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-1.4']
    },
    {
      id: 'SFC-VATP-12.12h', domain: 'detect', priority: 'baseline', sourceId: src, clause: '12.12(h)',
      title: '侦测并阻截入侵企图，并监察未获授权的账户访问',
      requirement: '采用最新的保安工具，以侦测、防止及阻截任何潜在的未经授权入侵、保安漏洞及网络攻击企图。平台营运者尤须实施有效的监察及监控机制，以侦测对客户账户或平台营运者本身账户（如有）的未经授权访问。',
      quote: 'In particular, the Platform Operator should implement an effective monitoring and surveillance mechanism to detect unauthorised access to clients accounts or the Platform Operator’s accounts (if any)',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-1.2']
    },
    {
      id: 'SFC-VATP-12.12i', domain: 'awareness', priority: 'baseline', sourceId: src, clause: '12.12(i)',
      title: '员工年度培训与向客户发出的定期提示',
      requirement: '为员工提供充分的内部程序及至少每年一次的培训，并向客户定期发出警示及教育材料，以提高对网络安全重要性的认识，以及在使用平台时严格遵守保安措施的必要性。',
      quote: 'adequate internal procedures and training for the Platform Operator’s staff at least on a yearly basis and regular alerts and educational materials for its clients to raise awareness of the importance of cybersecurity and the need to strictly observe security measures when using the platform',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-3.3', 'SFC-IT-3.4']
    },

    // ---- 独立评估与事故呈报（12.13–12.14）----
    {
      id: 'SFC-VATP-12.13', domain: 'assurance', priority: 'baseline', sourceId: src, clause: '12.13',
      title: '独立网络安全评估（含钱包安全与托管系统源代码审查）',
      requirement: '在平台推出前、部署平台修改前，以及其后定期进行严格的独立网络安全评估。评估范围至少须涵盖：(a) 用户应用程式保安（桌面／网页／流动应用程式）；(b) 钱包保安；(c) 物理安全；(d) 网络及系统保安（包括渗透测试、托管系统及与托管系统接口或连接的其他系统的源代码审查，以及漏洞扫描）。平台营运者须就评估保留充分文件，包括测试范围、方法及评估结果。',
      note: '就源代码审查：平台推出前的评估及其后的定期评估须由独立第三方进行；至于部署修改前的审查，可由独立第三方或平台营运者自行进行。如平台初次推出后托管系统及与其接口或连接的系统并无改动，则无须进行源代码审查。',
      quote: 'A Platform Operator should perform a stringent independent cybersecurity assessment, before the launch or deployment of modifications to its platform, and periodically thereafter.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.14', domain: 'respond', priority: 'baseline', sourceId: src, clause: '12.14',
      title: '网络安全事故的内部及外部呈报程序',
      requirement: '制定书面政策及程序，订明怀疑发生或实际发生的网络安全事故须如何向内部及外部（例如客户、证监会及其他监管机构，在适当情况下）呈报。',
      quote: 'A Platform Operator should establish written policies and procedures specifying the manner in which a suspected or actual cybersecurity incident should be escalated internally and externally (for example, the clients, the SFC and other regulatory authorities, where appropriate).',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-3.2']
    },

    // ---- 容量、备份与应急（12.15–12.20）----
    {
      id: 'SFC-VATP-12.15', domain: 'resilience', priority: 'baseline', sourceId: src, clause: '12.15',
      title: '容量监察、压力测试与超出容量时的应急安排',
      requirement: '确保：(a) 定期监察平台的使用容量并制定适当的容量规划，并厘定及记录所需的备用容量水平；(b) 定期对平台容量进行压力测试，以确立系统在不同模拟市场状况下的表现，并记录测试结果及为处理测试发现所采取的行动；(c) 平台有足够容量应付可预见的业务量及市场成交额增长；(d) 备有应急安排，以在平台容量被超出时处理客户的买卖盘，并告知客户有关安排及确保向客户提供可供选择的其他执行买卖盘途径。',
      quote: 'the capacity of the platform is regularly stress tested to establish system behaviour under different simulated market conditions, and the results of the stress tests and any actions taken to address the findings of the stress tests are documented',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-12.16', domain: 'resilience', priority: 'baseline', sourceId: src, clause: '12.16',
      title: '至少每日以离线媒介备份，并确保备份的可用性与完整性',
      requirement: '至少每日以离线媒介备份业务纪录、客户及交易数据库、服务器及支持文件。异地存储一般预期须受适当保安措施规限。平台营运者亦须实施适当措施，确保备份副本的可用性及完整性。',
      quote: 'A Platform Operator should back up business records, client and transaction databases, servers and supporting documentation in an offline medium at least on a daily basis. Off-site storage is generally expected to be subject to proper security measures.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.8']
    },
    {
      id: 'SFC-VATP-12.17', domain: 'resilience', priority: 'baseline', sourceId: src, clause: '12.17–12.19',
      title: '书面应急计划：网络攻击情景、备用设施与至少每年测试',
      requirement: '审慎识别及管理相关风险（包括任何非预期后果），并备有适当的应急安排，当中须包括书面应急计划，以应对与平台有关的紧急事故及服务中断（包括网络安全情况），包括在系统恢复后检查并确保数据完整性，以及确保恢复后交易能以公平有序的方式进行。应急计划至少须包括：(a) 潜在的服务中断情景，包括网络攻击情景（例如分布式拒绝服务攻击，以及因网络攻击而完全丧失业务纪录及客户资料），以及启动应急计划的相应程序；(b) 合适的备用设施，使平台营运者可在紧急情况下继续提供交易服务，或有其他执行买卖盘的安排；(c) 备有受过训练的员工处理客户及监管机构的查询。备用设施及应急计划须至少每年检讨、更新及测试其可行性与充分性。',
      quote: 'The contingency plan should at least include: (a) the potential disruptive scenarios, including cyber-attack scenarios, such as distributed denial-of-service attacks and total loss of business records and client data resulting from cyber-attacks, and the corresponding procedures for activating the contingency plan;',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-IT-2.9']
    },
    {
      id: 'SFC-VATP-12.20', domain: 'respond', priority: 'baseline', sourceId: src, clause: '12.20',
      title: '重大系统延误或故障：及时补救并告知客户',
      requirement: '发生重大系统延误或故障时，须及时：(a) 纠正有关情况；(b) 在切实可行范围内尽快告知客户有关情况，以及其未完成的买卖盘、存款及提款将如何处理。',
      quote: 'In the event of material system delay or failure, a Platform Operator should, in a timely manner: (a) rectify the situation; and (b) inform clients about the situation as soon as practicable and how their pending orders, deposits and withdrawals will be handled.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },

    // ---- 第 X 部：客户资产的保管（只收录技术性保安条文）----
    {
      id: 'SFC-VATP-10.6c', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.6(c)',
      title: '客户虚拟资产的 98% 须存于冷存储',
      requirement: '平台营运者及其有联系实体须将客户虚拟资产的 98% 存放于冷存储（例如以硬件安全模块 HSM 为基础的冷存储），以减低因平台被入侵或遭黑客攻击而蒙受损失的风险；只有在证监会按个别情况准许的有限情况下方可例外。',
      quote: 'The Platform Operator and its Associated Entity should store 98% of client virtual assets in cold storage (such as Hardware Security Module (HSM)-based cold storage) except under limited circumstances permitted by the SFC on a case-by-case basis to minimise exposure to losses arising from a compromise or hacking of the platform.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.6d', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.6(d)',
      title: '尽量减少从冷存储转出的交易',
      requirement: '平台营运者及其有联系实体须尽量减少从存放大部分客户虚拟资产的冷存储转出的交易。',
      quote: 'The Platform Operator and its Associated Entity should minimise transactions out of the cold storage in which a majority of client virtual assets are held.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.6e', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.6(e)',
      title: '加密设备及应用程式的存取授权与验证规格',
      requirement: '平台营运者及其有联系实体须就如何授权及验证对加密设备或应用程式的存取订立详细规格，涵盖密钥的生成、分发、存储、使用及销毁。',
      quote: 'The Platform Operator and its Associated Entity should have detailed specifications for how access to cryptographic devices or applications is to be authorised and validated, covering key generation, distribution, storage, use and destruction.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.6f', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.6(f)',
      title: '冷热钱包之间转移机制的详细文档与权限范围',
      requirement: '平台营运者及其有联系实体须详细记录虚拟资产在热存储、冷存储及其他存储之间转移的机制，并清楚订明获指派执行该等转移中任何非自动化流程的每个职能的权限范围。',
      quote: 'The Platform Operator and its Associated Entity should document in detail the mechanism for the transfer of virtual assets between hot, cold and other storages. The scope of authority of each function designated to perform any non-automated process in such transfers should be clearly specified.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.6g', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.6(g)',
      title: '投票、硬分叉及空投事件的操作与技术程序',
      requirement: '平台营运者及其有联系实体须就如何从操作及技术角度处理投票、硬分叉或空投等事件订立详细程序。',
      quote: 'The Platform Operator and its Associated Entity should have detailed procedures for how to deal with events such as voting, hard forks or airdrops from an operational and technical point of view.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.7', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.7',
      title: '客户虚拟资产的存取款只可经已列入白名单的客户钱包地址',
      requirement: '除证监会指明的获准许情况外，平台营运者不得透过并非属于客户、且未经平台营运者列入白名单的钱包地址，进行客户虚拟资产的存款及提款。平台营运者须确保其有联系实体亦遵守此项要求。',
      quote: 'A Platform Operator should not conduct any deposits and withdrawals of client virtual assets through any wallet address other than an address which belongs to the client and is whitelisted by the Platform Operator, except under permitted circumstances specified by the SFC.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.8a', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.8(a)',
      title: '种子及私钥须以不可推演的方式生成，尽可能离线并存于 HSM',
      requirement: '所生成的种子及私钥须足以抵御推测或串谋。种子及私钥须按适用的国际保安标准及业界最佳实践生成，确保种子（使用分层确定性钱包或类似流程时）或私钥（不使用种子时）以非确定性方式生成，具备随机性因而不可重现。在切实可行的情况下，种子及私钥应离线生成，并在种子或私钥的整个生命周期内保存于安全环境中，例如具备适当认证的硬件安全模块（HSM）。',
      quote: 'The generated seeds and private keys must be sufficiently resistant to speculation or collusion. … Where practicable, seeds and private keys should be generated offline and kept in a secure environment, such as a HSM, with appropriate certification for the lifetime of the seeds or private keys.',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.8b', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.8(b)',
      title: '密钥存取的授权验证、多重认证与即时撤销',
      requirement: '就如何授权及验证对加密设备或应用程式的存取订立详细规格，涵盖密钥的生成、分发、使用、存储及销毁，以及在有需要时即时撤销签署人的存取权。在切实可行的情况下，须采用多重因素认证，以验证获授权人员对管理私钥使用的应用程式的存取。',
      quote: 'Detailed specifications for how access to cryptographic devices or applications is to be authorised and validated, covering key generation, distribution, use, storage and destruction, as well as the immediate revocation of a signatory’s access as required. Where practicable, multi-factor authentication is used to authenticate authorised personnel for access to applications governing the use of private keys.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.8c', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.8(c)',
      title: '密钥存取严格限于经审查人员，且无任何单一人员掌握全部',
      requirement: '与客户虚拟资产有关的种子及私钥的存取权，须严格限于已接受适当审查及培训的获授权人员；不得有任何单一人员掌握或可存取种子、私钥或备份助记词的全部；并须实施控制以缓减获授权人员之间串谋的风险。',
      quote: 'Access to seeds and private keys relating to client virtual assets is tightly restricted amongst authorised personnel who have undergone appropriate screening and training, no single person has possession of information on or access to the entirety of the seeds, private keys or backup passphrases, and controls are implemented to mitigate the risk of collusion amongst authorised personnel.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.8d', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.8(d)',
      title: '种子及私钥的分布式备份，且不得单靠同一地点的备份重建',
      requirement: '须保存种子或私钥的分布式备份，以缓减任何单点故障。备份须以影响种子或私钥主存放地点的事件不会同时影响备份的方式分散存放。备份须以受保护形式存放于外部媒介（宜为具备适当认证的 HSM）。分布式备份的存放方式须确保不能仅凭存放于同一实际地点的备份重新生成种子或私钥。对备份的存取控制须与对原始种子或私钥的存取控制同样严格。',
      quote: 'Distributed backups of seeds or private keys are kept so as to mitigate any single point of failure. … Access control to the backups needs to be as stringent as access control to the original seeds or private keys.',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.8e', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.8(e)',
      title: '种子及私钥须安全存放于香港',
      requirement: '种子及私钥须安全存放于香港。',
      quote: 'Seeds and private keys are securely stored in Hong Kong.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.9', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.9',
      title: '存储方式的风险评估、钱包技术更新与密钥外泄的应对',
      requirement: '因应保安威胁、技术及市场状况的新发展，评估各种存储方式所面对的风险，并实施适当的存储方案以确保客户虚拟资产获安全存放；亦须确保其有联系实体作出相同安排。平台营运者尤须令钱包存储技术保持最新并符合国际最佳实践或标准；钱包存储技术及其任何升级须在部署前经全面测试，以确保可靠性及安全性。平台营运者须实施（并确保其有联系实体实施）措施，在任何种子或私钥全部或部分外泄或懷疑外泄时不作不当延误地处理，包括在适当情况下将所有客户虚拟资产转移至新的存储位置。',
      quote: 'The Platform Operator should implement, and should ensure that its Associated Entity implements, measures to deal with any compromise or suspected compromise of all or part of any seed or private key without undue delay, including the transfer of all client virtual assets to a new storage location as appropriate.',
      quoteStatus: 'excerpt',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.10', domain: 'custody', priority: 'baseline', sourceId: src, clause: '10.10',
      title: '存取款处理的保安控制（51% 攻击、客户 IP 监察、提款地址不可篡改）',
      requirement: '就客户虚拟资产的存款及提款要求设有充分的处理流程，以防范因盗窃、欺诈及其他不诚实行为、专业失当或遗漏而蒙受损失：(a) 持续监察与所有可供交易的虚拟资产有关的发展（例如技术变化或保安威胁的演变），并设有清晰流程评估该等发展的潜在影响与风险，以及处理分布式帐本技术特有的欺诈企图（例如 51% 攻击），且须主动执行该等流程；(b) 监察客户的 IP 地址，以识别并跟进可能并非由客户发出的存款或提款指示；(c) 确保用于存款及提款的钱包地址已列入白名单，并采用适当控制防止客户将资产转移至其指定钱包地址以外的地址；平台营运者及其有联系实体须确保客户提款指示的目标地址在交易被签署并广播至相应区块链之前不可被修改。',
      quote: 'The Platform Operator and its Associated Entity should ensure that destination addresses of client withdrawal instructions cannot be modified before the transactions are signed and broadcasted to the respective blockchain.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.20', domain: 'assurance', priority: 'baseline', sourceId: src, clause: '10.20',
      title: '指派专责人员定期内部审核客户资产保管的合规情况',
      requirement: '指派专责人员定期进行内部审核，监察平台营运者是否遵守客户资产保管的各项要求，以及其就处理该等资产所订立的政策及程序。专责人员一旦察觉任何不合规情况，须在切实可行范围内尽快向平台营运者的高级管理层报告。',
      quote: 'A Platform Operator should assign designated staff member(s) to conduct regular internal audits to monitor its compliance with the requirements for custody of client assets, and its established policies and procedures in respect of handling of these assets.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },
    {
      id: 'SFC-VATP-10.21', domain: 'detect', priority: 'baseline', sourceId: src, clause: '10.21',
      title: '密切监察账户活动以识别不活跃或休眠账户',
      requirement: '密切监察账户活动，检查是否有不活跃或休眠账户，并就该等账户的客户资产存款及提款应如何处理订立内部程序。',
      quote: 'A Platform Operator should closely monitor account activities to check if there are inactive or dormant accounts. It should establish internal procedures as to how deposits and withdrawals of client assets in these accounts should be handled.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] }
    },

    // ---- 附表 3：审计日志及事故报告（锚定条文为第 14.8(e)、(f) 段）----
    {
      id: 'SFC-VATP-SCH3-1', domain: 'detect', priority: 'baseline', sourceId: src, clause: '附表 3 第 1 节',
      title: '审计日志的最低内容（买卖盘全流程、登录尝试、权限指派、参数变更）',
      requirement: '按第 14.8(e) 段保存系统活动的审计日志（包括但不限于第 XII 部所指的审计轨迹及存取日志），保存期不少于两年，并须应证监会要求提供。审计日志须记录买卖盘流程及经交易平台的交易流程，至少包括：(a) 买卖盘的下达／取消／修改／执行（须有时间戳及唯一参考编号）；(b) 系统登录尝试，包括用户身份、登录尝试的日期及时间；(c) 交易限额／持仓限额／现金限额的验证例外；(d) 合规验证例外；(e) 分层用户存取权限的指派；(f) 关键系统参数及主档案的变更详情；(g) 错误的买卖盘输入。日志须定期检视，以侦测潜在问题及规划预防措施。',
      quote: 'Audit logs should document the order process and transaction flow through the trading platform, where applicable.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-VATP-12.12a']
    },
    {
      id: 'SFC-VATP-SCH3-2', domain: 'respond', priority: 'baseline', sourceId: src, clause: '附表 3 第 2 节',
      title: '事故报告的最低内容（含根本原因分析与防止再发生的措施）',
      requirement: '按第 14.8(f) 段就所有重大系统延误或故障保存事故报告，保存期不少于两年，并须应证监会要求提供。事故报告须记录平台或系统出现重大延误或故障以致客户无法使用的情况，至少包括：(a) 问题的清楚说明，包括根本原因分析；(b) 中断或延误的时间；(c) 中断或延误的持续时长；(d) 中断或延误期间及其后受影响的平台或系统；(e) 此问题或相关问题过往是否曾经发生；(f) 当时受影响的客户数目及对该等客户的影响；(g) 为纠正问题已采取的步骤；(h) 为确保问题不再发生已采取的步骤。报告须定期检视，以侦测潜在问题及规划预防措施。',
      quote: 'Incident reports should document instances where the Platform Operator’s platform or system experiences a material delay or failure that renders it unusable by clients.',
      quoteStatus: 'verbatim',
      applicability: { licenses: VA, attributes: [] },
      crossRefs: ['SFC-VATP-12.20']
    }
  ]);
})();
