/** 牌照/实体类型。用户可多选。 */
HKCC.addLicenses([
  { id: 'sfc-ra1', group: 'SFC 持牌法团', label: '第 1 类：证券交易', note: 'Dealing in securities' },
  { id: 'sfc-ra2', group: 'SFC 持牌法团', label: '第 2 类：期货合约交易', note: 'Dealing in futures contracts' },
  { id: 'sfc-ra3', group: 'SFC 持牌法团', label: '第 3 类：杠杆式外汇交易', note: 'Leveraged foreign exchange trading（黑客风险指引只适用于持牌杠杆式外汇交易商）' },
  { id: 'sfc-ra4', group: 'SFC 持牌法团', label: '第 4 类：就证券提供意见', note: 'Advising on securities' },
  { id: 'sfc-ra5', group: 'SFC 持牌法团', label: '第 5 类：就期货合约提供意见', note: 'Advising on futures contracts' },
  { id: 'sfc-ra6', group: 'SFC 持牌法团', label: '第 6 类：就机构融资提供意见', note: 'Advising on corporate finance' },
  { id: 'sfc-ra7', group: 'SFC 持牌法团', label: '第 7 类：提供自动化交易服务', note: 'Providing automated trading services' },
  { id: 'sfc-ra8', group: 'SFC 持牌法团', label: '第 8 类：提供证券保证金融资', note: 'Securities margin financing' },
  { id: 'sfc-ra9', group: 'SFC 持牌法团', label: '第 9 类：提供资产管理', note: 'Asset management' },
  { id: 'sfc-ra13', group: 'SFC 持牌法团', label: '第 13 类：为集体投资计划提供托管服务', note: 'Depositary of relevant CIS' },
  { id: 'sfc-vasp', group: 'SFC 持牌法团', label: 'SFC 持牌虚拟资产服务提供者 / 交易平台', note: 'VASP / VATP' },
  { id: 'hkma-ai', group: 'HKMA 认可机构', label: '认可机构（银行 / 有限制牌照银行 / 接受存款公司）', note: 'Authorized Institution' },
  { id: 'hkma-svf', group: 'HKMA 认可机构', label: '储值支付工具持牌人', note: 'Stored Value Facility licensee' },
  { id: 'other', group: '其他', label: '无上述金融牌照（一般企业）', note: '仍受《个人资料（私隐）条例》约束' }
]);

/** 业务特征。决定同一牌照下条文是否适用。 */
HKCC.addAttributes([
  { id: 'internet-trading', label: '提供互联网交易设施', note: '客户可透过网页或应用程式下达买卖指令；触发 SFC 黑客风险指引全套要求' },
  { id: 'ebanking', label: '提供电子银行服务', note: '网上银行、流动支付、自助终端等；触发 HKMA TM-E-1' },
  { id: 'personal-data', label: '收集或处理个人资料', note: '触发《个人资料（私隐）条例》DPP4 资料保安要求' },
  { id: 'ci-designated', label: '已被指定为关键基础设施营运者', note: '触发《保护关键基础设施（电脑系统）条例》三类法定责任' },
  { id: 'outsourcing', label: '使用第三方服务商或云端服务', note: '触发外判与供应链管理要求' },
  { id: 'ai-models', label: '在营运中使用 AI 语言模型', note: '触发 2026 年 SFC / HKMA 关于 AI 驱动网络攻击的通函' }
]);

/** 控制域。用于结果分组。 */
HKCC.addDomains([
  { id: 'governance', label: '治理与问责', desc: '董事会及高级管理层职责、政策审批、风险管理架构' },
  { id: 'identity', label: '身份认证与访问控制', desc: '客户认证、密码策略、权限管理、特权账户' },
  { id: 'protect', label: '系统与网络加固', desc: '网络分段、补丁、端点防护、物理安全' },
  { id: 'data', label: '数据保护与加密', desc: '传输与存储加密、敏感资料保护' },
  { id: 'detect', label: '监测、侦测与告警', desc: '异常交易监控、日志、威胁情报、客户通知' },
  { id: 'respond', label: '事件响应与监管报告', desc: '事故处理程序、上报时限、根因分析' },
  { id: 'resilience', label: '备份、韧性与业务连续性', desc: '备份、灾难恢复、营运韧性、容忍度设定' },
  { id: 'thirdparty', label: '第三方与外判管理', desc: '服务水平协议、供应链风险、持续评估' },
  { id: 'assurance', label: '评估、审计与测试', desc: '自我评估、渗透测试、独立审计、C-RAF' },
  { id: 'awareness', label: '意识与培训', desc: '员工培训、客户风险提示' }
]);
