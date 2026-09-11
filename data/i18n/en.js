/**
 * English layer.
 *
 * Control titles and requirements are written against the regulators' own
 * English source documents (SFC circulars, HKMA SPM modules and the OCCICS
 * Codes of Practice are English-language originals), not translated from the
 * Simplified Chinese. Where a phrase is a defined regulatory term it is kept
 * verbatim, so it matches what a reader will find in the cited document.
 *
 * The `quote` field is never translated — it is the official text itself.
 */
HKCC.addI18n('en', {
  ui: {
    appTitle: 'HK Cyber Compliance Assistant',
    metaDescription: 'Generate the cybersecurity control requirements that apply to your firm under SFC, HKMA, PCPD and the Critical Infrastructure Ordinance — every control cited to its official source.',
    printTitle: 'Hong Kong Cybersecurity Compliance Control Checklist',
    versionLine: 'v{version} · sources verified {date}',

    langLabel: 'Language',
    btnExportProject: 'Export project',
    btnImportProject: 'Import project',
    btnExport: 'Export CSV',
    btnPrint: 'Print / Save as PDF',
    btnReset: 'Reset',
    btnTheme: 'Theme',
    btnThemeTitle: 'Switch light / dark / follow system',

    searchPlaceholder: 'Search controls, provisions, evidence or owners…',
    searchAria: 'Search controls',
    optMerge: 'Merge duplicates across regulators',
    optGaps: 'Remediation list',

    secProject: 'Assessment project',
    projectName: 'Project / organisation name',
    projectNamePlaceholder: 'e.g. 2026 cybersecurity assessment',
    asOfDate: 'Assessment as-of date',
    secLicenses: '① Licence / entity type',
    secAttributes: '② Business characteristics',
    allDomains: 'All control domains',
    domainFilterAria: 'Filter by control domain',

    emptyNoLicenseTitle: 'Select a licence to begin',
    emptyNoLicenseNote: 'Tick the licences your firm holds and its business characteristics, and the applicable control requirements will be listed here.',
    emptyNoMatchTitle: 'No matching controls',
    emptyNoMatchGaps: 'There are no unrated, partially implemented or unimplemented controls in this selection.',
    emptyNoMatchQuery: 'Try adjusting your search terms or selections.',

    countItems: '{n}',
    alsoStates: '{regulator} also states:',
    pendingCount: '{n} outstanding',
    allComplete: 'All complete',
    quoteSummary: 'English source text',
    quoteVerbatim: 'Verbatim English provision',
    quoteExcerpt: 'English source excerpt',
    quoteSummaryType: 'English source summary',
    notePrefix: 'Note: ',
    tagMerged: 'Merged across {n} regulators',
    tagDeadline: 'Deadline {date}',
    tagSeeAlso: 'See also {id}',
    tagApplies: 'Applies: {value}',
    tagTriggered: 'Triggered by: {value}',

    summaryLabel: 'applicable control requirements',
    summaryFrom: 'Drawn from {total} regulatory provisions.',
    summaryFromMerged: 'Drawn from {total} regulatory provisions, of which {merged} were de-duplicated across regulators.',
    progressLabel: 'Control implementation progress {pct}%',
    progressTally: 'Implemented {done} · Partial {partial} · Not implemented {gap} · Unrated {none}',

    statusDone: 'Implemented',
    statusPartial: 'Partial',
    statusGap: 'Not implemented',
    statusNa: 'N/A',
    statusUnrated: 'Unrated',
    progressDisclaimer: 'Partial implementation counts as 50% for progress only; this is not a regulatory compliance determination.',

    recordFilled: 'Assessment record (completed)',
    recordEmpty: 'Add assessment record',
    naReason: 'N/A rationale',
    implementationNote: 'Implementation note',
    implementationPlaceholder: 'Describe implementation or the basis for the assessment',
    evidenceRef: 'Evidence reference',
    evidencePlaceholder: 'e.g. IAM Standard v3; SEC-241',
    owner: 'Owner',
    ownerPlaceholder: 'Department or role',
    targetDate: 'Target completion date',
    overdue: 'Overdue',
    dueSoon: 'Due within 30 days',
    storageWarning: 'The browser cannot save automatically. Export the project regularly as a backup.',
    unresolvedWarning: 'The project retains {n} unrecognised legacy control records.',

    sourceMetaTip: 'Issued {issued}　·　source verified {verified}',
    verifiedRangeTip: 'Sources were verified between {from} and {to}; the earliest is shown.',

    phScope: 'Licence scope: ',
    phAttrs: 'Business characteristics: ',
    phNone: '(none selected)',
    phDate: 'Generated: {today}　·　Sources verified: {verified}',
    phProject: 'Project: {name}',
    phAssessmentDate: 'Assessment as of: {date}　·　Control data v{version}　·　Sources verified: {verified}',

    confirmReset: 'Clear every selection and assessment record in this project? Export a backup first if needed. This cannot be undone.',
    importTooLarge: 'The project file is larger than 5 MB and was not imported.',
    importInvalidJson: 'The project file is not valid JSON. Existing data was not changed.',
    importValidationFailed: 'The project file failed validation. Existing data was not changed:\n\n{errors}',
    importVersionDifferent: '\nControl data version: {imported} (current {current})',
    importVersion: '\nControl data version: {version}',
    notRecorded: 'not recorded',
    importWarnings: '\n\nWarnings:\n{warnings}',
    confirmImport: 'Import project “{name}”?\nExported: {exportedAt}{versionNote}\nValid records: {known}\nUnrecognised records: {unresolved}{warningText}\n\nThis will replace the current project.',
    unnamedProject: 'Unnamed project',
    quarantineWarning: 'The locally saved assessment could not be read. It has been set aside under {key} in this browser and was not overwritten. Import your project file again, or ask IT to recover that copy.',

    // Project-file diagnostics. The engine returns codes and parameters only; the wording lives here.
    diagNotObject: 'The project file must be a JSON object.',
    diagSchemaInvalid: 'schemaVersion is invalid.',
    diagSchemaTooNew: 'This project uses a newer schemaVersion ({version}). Update this tool first.',
    diagAssessmentsNotObject: 'assessments must be an object.',
    diagLicensesNotArray: 'scope.licenses must be an array.',
    diagAttributesNotArray: 'scope.attributes must be an array.',
    diagProjectNameType: 'project.name must be text.',
    diagProjectNameTooLong: 'project.name exceeds {max} characters.',
    diagAsOfDateInvalid: 'project.asOfDate is not a valid date.',
    diagLicenseIdType: 'Licence IDs must be text.',
    diagAttributeIdType: 'Business characteristic IDs must be text.',
    diagRecordNotObject: 'The assessment record for control {id} must be an object.',
    diagStatusInvalid: 'The status of control {id} is invalid.',
    diagFieldType: 'The {field} of control {id} must be text.',
    diagFieldTooLong: 'The {field} of control {id} exceeds {max} characters.',
    diagDateInvalid: 'The {field} of control {id} is not a valid date.',
    diagUnknownLicense: 'Unknown licence skipped: {id}',
    diagUnknownAttribute: 'Unknown business characteristic skipped: {id}',
    diagUnresolvedKept: 'Unrecognised control kept aside: {id}',
    diagUnresolvedRestored: 'Previously unrecognised control restored: {id}',
    diagLegacyNotObject: 'The legacy local state is not a valid object.',

    csvProjectName: 'Project name',
    csvAsOfDate: 'Assessment as-of date',
    csvId: 'Control ID',
    csvDomain: 'Domain',
    csvTitle: 'Control',
    csvRequirement: 'Requirement',
    csvApplicability: 'Why applicable',
    csvRegulator: 'Regulator',
    csvSource: 'Source',
    csvClause: 'Clause',
    csvIssued: 'Issued',
    csvVerified: 'Source verified',
    csvDeadline: 'Deadline',
    csvUrl: 'Official link',
    csvQuote: 'Official text',
    csvStatus: 'Self-assessment',
    csvQuoteType: 'English source type',
    csvImplementation: 'Implementation note / N/A rationale',
    csvEvidence: 'Evidence reference',
    csvOwner: 'Owner',
    csvTargetDate: 'Target completion date',
    csvDueState: 'Due status',

    disclaimerLabel: 'Disclaimer: ',
    disclaimerBody: 'This is an open-source reference tool and does not constitute legal or compliance advice. The controls listed are a structured reading of publicly available regulatory provisions; they are not a substitute for reading the source documents, nor for the judgement of a qualified legal or compliance professional. Regulatory requirements change — always check the latest version published on the regulator’s own website.',
    langNoteLabel: 'On language: ',
    langNoteBody: 'Control descriptions are offered in English, Traditional Chinese and Simplified Chinese for ease of reading only. English source text is labelled as verbatim, excerpt or summary and is never translated; each item links to the official source. Where any description differs from the official text, the official text governs.'
  },

  licenses: {
    'sfc-ra1': { group: 'SFC licensed corporations', label: 'Type 1: Dealing in securities', note: 'Dealing in securities' },
    'sfc-ra2': { group: 'SFC licensed corporations', label: 'Type 2: Dealing in futures contracts', note: 'Dealing in futures contracts' },
    'sfc-ra3': { group: 'SFC licensed corporations', label: 'Type 3: Leveraged foreign exchange trading', note: 'The Hacking Risks Guidelines apply only to licensed leveraged foreign exchange traders' },
    'sfc-ra4': { group: 'SFC licensed corporations', label: 'Type 4: Advising on securities', note: 'Advising on securities' },
    'sfc-ra5': { group: 'SFC licensed corporations', label: 'Type 5: Advising on futures contracts', note: 'Advising on futures contracts' },
    'sfc-ra6': { group: 'SFC licensed corporations', label: 'Type 6: Advising on corporate finance', note: 'Advising on corporate finance' },
    'sfc-ra7': { group: 'SFC licensed corporations', label: 'Type 7: Providing automated trading services', note: 'Providing automated trading services' },
    'sfc-ra8': { group: 'SFC licensed corporations', label: 'Type 8: Securities margin financing', note: 'Securities margin financing' },
    'sfc-ra9': { group: 'SFC licensed corporations', label: 'Type 9: Asset management', note: 'Asset management' },
    'sfc-ra13': { group: 'SFC licensed corporations', label: 'Type 13: Depositary of a relevant CIS', note: 'Depositary of relevant collective investment schemes' },
    'sfc-vasp': { group: 'SFC licensed corporations', label: 'SFC-licensed virtual asset service provider / trading platform', note: 'VASP / VATP' },
    'hkma-ai': { group: 'HKMA authorized institutions', label: 'Authorized institution (bank / restricted licence bank / deposit-taking company)', note: 'Authorized Institution' },
    'hkma-svf': { group: 'HKMA authorized institutions', label: 'Stored value facility licensee', note: 'Stored Value Facility licensee' },
    'other': { group: 'Other', label: 'No financial licence above (general company)', note: 'Still bound by the Personal Data (Privacy) Ordinance' }
  },

  attributes: {
    'internet-trading': { label: 'Offers internet trading facilities', note: 'Clients can place orders through a website or app; triggers the full set of SFC Hacking Risks Guidelines requirements' },
    'ebanking': { label: 'Offers e-banking services', note: 'Internet banking, mobile payment, self-service terminals; triggers HKMA TM-E-1' },
    'personal-data': { label: 'Collects or processes personal data', note: 'Triggers DPP4 data security requirements under the Personal Data (Privacy) Ordinance' },
    'ci-designated': { label: 'Designated as a critical infrastructure operator', note: 'Triggers the three categories of statutory obligation under the Protection of Critical Infrastructures (Computer Systems) Ordinance' },
    'outsourcing': { label: 'Uses third-party or cloud service providers', note: 'Triggers outsourcing and supply chain management requirements' },
    'ai-models': { label: 'Uses AI language models in operations', note: 'Triggers the 2026 SFC / HKMA circulars on AI-enabled cyberattacks' }
  },

  domains: {
    governance: { label: 'Governance & accountability', desc: 'Board and senior management responsibilities, policy approval, risk management structure' },
    identity: { label: 'Authentication & access control', desc: 'Client authentication, password policy, entitlement management, privileged accounts' },
    protect: { label: 'System & network hardening', desc: 'Network segmentation, patching, endpoint protection, physical security' },
    data: { label: 'Data protection & encryption', desc: 'Encryption in transit and at rest, protection of sensitive information' },
    detect: { label: 'Monitoring, detection & alerting', desc: 'Abnormal transaction monitoring, logging, threat intelligence, client notification' },
    respond: { label: 'Incident response & regulatory reporting', desc: 'Incident handling procedures, reporting deadlines, root cause analysis' },
    resilience: { label: 'Backup, resilience & business continuity', desc: 'Backup, disaster recovery, operational resilience, tolerance setting' },
    thirdparty: { label: 'Third-party & outsourcing management', desc: 'Service level agreements, supply chain risk, ongoing assessment' },
    assurance: { label: 'Assessment, audit & testing', desc: 'Self-assessment, penetration testing, independent audit, C-RAF' },
    awareness: { label: 'Awareness & training', desc: 'Staff training, client risk alerts' }
  },

  sources: {
    'occics-cop': { regulator: 'OCCICS' },
    'occics-index': { regulator: 'OCCICS' }
  },

  controls: {
    /* ---- SFC Guidelines for Reducing and Mitigating Hacking Risks ---- */
    'SFC-IT-1.1': {
      title: 'Two-factor authentication for client account login',
      requirement: 'Implement two-factor authentication for login to clients’ internet trading accounts, and assess and adopt a 2FA solution proportionate to the firm’s business model. Two-factor authentication means using any two of: something the client knows, something the client has, and something the client is.'
    },
    'SFC-IT-1.2': {
      title: 'Monitoring and surveillance to detect unauthorised access',
      requirement: 'Implement an effective monitoring and surveillance mechanism to detect unauthorised access to clients’ internet trading accounts.'
    },
    'SFC-IT-1.3': {
      title: 'Prompt notification of client activities',
      requirement: 'Notify clients promptly after any of the following occur in their accounts: (a) system login; (b) password reset; (c) trade execution; (d) fund transfer to a non-registered third-party account; and (e) changes to client and account related information. The notification channel must differ from the channel used for login. Clients may opt out of trade execution notifications only, and only after adequate risk disclosure and a signed acknowledgement.'
    },
    'SFC-IT-1.4': {
      title: 'Data encryption',
      requirement: 'Use a strong encryption algorithm to: (a) encrypt sensitive information such as client login credentials and trade data during transmission between internal networks and client devices; and (b) protect client login passwords stored in the internet trading system.'
    },
    'SFC-IT-1.5': {
      title: 'Protection of client login passwords',
      requirement: 'Establish and implement effective policies and procedures to ensure client login passwords are generated and delivered securely during account activation and password reset. Passwords should be randomly generated by the system and delivered through a channel free from human intervention and from tampering by staff. Where a password is not system-generated, compensating controls are required — for example forcing a password change on first login.'
    },
    'SFC-IT-1.6': {
      title: 'Stringent password policy and session timeout controls',
      requirement: 'Configure the internet trading system with: (a) a minimum password length; (b) periodic reminders to clients who have not changed their password for a long time; (c) minimum password complexity (alphanumeric) and password history; (d) appropriate controls over invalid login attempts; and (e) session timeout after a period of inactivity.'
    },
    'SFC-IT-2.1': {
      title: 'Deploy a secure network infrastructure',
      requirement: 'Deploy a secure network infrastructure through proper network segmentation — a Demilitarised Zone (DMZ) with multi-tiered firewalls — to protect critical systems (such as the internet trading system and settlement system) and client data against cyber-attacks.'
    },
    'SFC-IT-2.2': {
      title: 'User access management and annual review',
      requirement: 'Establish policies and procedures so that system access is granted on a need-to-have basis, and review at least annually the user access list for critical systems (such as the internet trading and settlement systems) and databases (such as client data), to confirm that access remains restricted to approved persons.'
    },
    'SFC-IT-2.3': {
      title: 'Security controls over remote access',
      requirement: 'Grant remote access to the internal network on a need-to-have basis and implement security controls over such access.'
    },
    'SFC-IT-2.4': {
      title: 'Patch management — deploy within one month of testing',
      requirement: 'Monitor and evaluate security patches and hotfixes released by software vendors on a timely basis, conduct testing as soon as practicable after assessing the impact, and implement them within one month following completion of testing.'
    },
    'SFC-IT-2.5': {
      title: 'Endpoint protection',
      requirement: 'Implement and update anti-virus and anti-malware solutions — including the corresponding definition and signature files — on a timely basis on critical system servers and workstations, to detect malicious applications and malware.'
    },
    'SFC-IT-2.6': {
      title: 'Prevent unauthorised installation of hardware and software',
      requirement: 'Implement security controls to prevent unauthorised installation of hardware and software.'
    },
    'SFC-IT-2.7': {
      title: 'Physical security',
      requirement: 'Establish physical security policies and procedures to protect critical system components (such as system servers and network devices) in a secure environment, and to prevent unauthorised physical access to the facilities housing the internet trading system and critical system components.'
    },
    'SFC-IT-2.8': {
      title: 'System and data backup — at least daily, offline',
      requirement: 'Back up business records, client and transaction databases, servers and supporting documentation to an offline medium at least daily, and adopt appropriate recovery methods so that major system changes can be rolled back successfully.'
    },
    'SFC-IT-2.9': {
      title: 'Contingency planning for cyber-attack scenarios',
      requirement: 'Make all reasonable efforts to cover possible cyber-attack scenarios in the contingency plan and crisis management procedures — for example distributed denial-of-service (DDoS) attacks, and total loss of business records and client data resulting from a cyber-attack such as ransomware.'
    },
    'SFC-IT-2.10': {
      title: 'Third-party service providers and service level agreements',
      requirement: 'Where internet trading related activities are outsourced to a third-party service provider, enter into a formal service level agreement specifying the terms of service and the provider’s responsibilities, and ensure the service enables the firm to comply with paragraph 18 of and Schedule 7 to the Code of Conduct and with these Guidelines. Service level agreements should be reviewed periodically and revised where appropriate.'
    },
    'SFC-IT-3.1': {
      title: 'Cybersecurity roles and responsibilities (RO/EO accountability)',
      requirement: 'The Responsible Officer(s) or Executive Officer(s) with overall management and supervision of the internet trading system must define the cybersecurity risk management framework and set out key roles and responsibilities, including: (a) approving cybersecurity policies and procedures; (b) approving the cybersecurity budget and resources; (c) arranging periodic self-assessment of the overall framework; (d) reviewing material matters escalated through incident reporting; (e) reviewing key findings from internal and external audits and cybersecurity reviews, endorsing and overseeing completion of remediation; (f) monitoring and assessing the latest cyber threats; (g) approving contingency plans covering cybersecurity scenarios; and (h) approving service level agreements and contracts with third-party service providers. These responsibilities may be delegated in writing to a designated committee or operational unit, but overall accountability remains with the RO/EO.'
    },
    'SFC-IT-3.2': {
      title: 'Internal escalation and external reporting of cybersecurity incidents',
      requirement: 'Establish written policies and procedures specifying how a suspected or actual cybersecurity incident should be escalated and reported internally (for example to the RO/EO responsible for internet trading) and externally (for example to clients, the SFC and other enforcement bodies, where appropriate).'
    },
    'SFC-IT-3.3': {
      title: 'Annual cybersecurity awareness training for internal system users',
      requirement: 'Provide adequate cybersecurity awareness training at least annually to all internal system users — including permanent and contract staff with access to internal networks and systems — with content reflecting the types and degree of cybersecurity risk the firm faces.'
    },
    'SFC-IT-3.4': {
      title: 'Cybersecurity reminders and alerts to clients',
      requirement: 'Take all reasonable steps to remind and alert clients to the cybersecurity risks of using the internet trading system and to recommended preventive and protective measures — for example that login credentials must be kept secure and never shared.'
    },
    'SFC-COC-18': {
      clause: 'paras. 18.4–18.7; Schedule 7 paras. 1.1, 1.2.2–1.2.8, 1.3 and 2.1',
      title: 'Overarching rules for internet trading: Code of Conduct paragraph 18 and Schedule 7',
      requirement: 'The Hacking Risks Guidelines must be read together with the Code of Conduct. Paragraphs 18.4 to 18.7, and paragraphs 1.1, 1.2.2 to 1.2.8, 1.3 and 2.1 of Schedule 7, set out the overall requirements for electronic trading, including system reliability, capacity, security and contingency arrangements. “Internet trading” is defined in paragraph 18.2(f) of the Code of Conduct as an arrangement under which orders are placed through the licensed or registered person’s internet trading facility.'
    },

    /* ---- SFC circular 26EC35: phishing-resistant authentication ---- */
    'SFC-PH-A1': {
      clause: '(A) para. 5',
      title: 'Phishing-resistant authentication for client login and device binding',
      requirement: 'Implement a phishing-resistant robust authentication solution for client login to internet trading accounts and for client registration/binding of devices. The SFC has stated expressly that it does not regard a one-time password (OTP) as phishing-resistant, and OTP must not be used for these two processes. Acceptable examples include passkeys (passwordless credentials based on public key cryptography) and bound devices. Large internet brokers must implement immediately; all other firms must complete implementation by 8 July 2027.'
    },
    'SFC-PH-A2': {
      title: 'Select authentication methods against the platform’s risk profile',
      requirement: 'Carefully assess the firm’s own circumstances, including the types of internet trading platform offered to clients and the platforms’ risk profile, and adopt the appropriate authentication method. Keep abreast of technological developments and periodically assess whether existing security controls remain appropriate, effective and commensurate with the nature, scale and complexity of the business.'
    },
    'SFC-PH-A3': {
      title: 'Cap on passkeys and bound devices (generally no more than three)',
      requirement: 'Generally, do not allow clients to bind or register more than three passkeys and/or three devices for their internet trading accounts. Requests to exceed the cap should be approved only after adequate assessment.'
    },
    'SFC-PH-A4': {
      title: 'Session timeout must not be client-disableable (30 minutes suggested)',
      requirement: 'Do not allow clients to disable session timeout, and limit the idle timeout period — for example to within 30 minutes — subject to prior assessment and ongoing monitoring. Where a client’s trading activity reasonably requires a longer idle period, this may be permitted only with close monitoring of that client’s login/logout records and trading activity.'
    },
    'SFC-PH-B1': {
      title: 'Multi-channel prompt notification of high-risk account activity',
      requirement: 'Notify clients promptly of successful login and other high-risk account activities — including logins from new devices, binding of a new device, and creation or revocation of passkeys — through multiple communication channels (email, SMS or other push notifications) where applicable.'
    },
    'SFC-PH-B2': {
      title: 'Client confirmation after material changes, before further trading',
      requirement: 'Firms are strongly encouraged to require clients to confirm that they authorised certain material changes, or that they have been notified of unusual account activity, before further transactions are permitted in the account. For example, where a newly registered device is used to access a client account, verify with the client that the device is genuinely theirs before allowing orders from it.'
    },
    'SFC-PH-B3': {
      title: 'Transaction monitoring: predefined thresholds and suspicious red flags',
      requirement: 'Identify abnormal trading activity using predefined thresholds and analyse red flags associated with suspicious transactions. Thresholds should reflect client background, historical trading behaviour, account activity, device usage and login patterns. Potential red flags include: trades inconsistent with the client’s past trading pattern; orders placed at hours unusual for that client; trades causing significant loss within a short period; sudden heavy trading in illiquid or small-cap stocks; and unusual trades shortly after a password reset, a change of contact details or the binding of a new device.'
    },
    'SFC-PH-B4': {
      title: 'Login and device-binding monitoring with log retention',
      requirement: 'Maintain sufficient logs — including device IDs captured during system login and device binding — and review them on a timely basis to detect irregular events, such as binding requests from unusual geographic locations, multiple client accounts bound to the same device, logins from multiple locations within a short period, and unusually long login sessions. Follow up on anomalies immediately, including verifying transactions directly with the client and suspending the account where appropriate.'
    },
    'SFC-PH-C1': {
      title: 'Report hacking incidents to the SFC immediately and perform root cause analysis',
      requirement: 'Establish procedures to respond to hacking incidents immediately, including stopping unauthorised activity, safeguarding client assets, notifying affected clients and preventing further intrusion. Report hacking incidents to the SFC immediately, conduct root cause analysis to identify the internal control failures or system vulnerabilities that led to the incident, maintain a detailed incident report, and implement appropriate remedial measures to prevent recurrence.'
    },
    'SFC-PH-D1': {
      title: 'Raise client awareness of phishing and cybersecurity risks',
      requirement: 'Alert clients to common attack scenarios, including fraudulent emails, text messages or phone calls impersonating the firm, fake websites or mobile applications designed to harvest login credentials, and social engineering tactics used to induce clients to disclose passwords, OTPs or other security information. Remind clients that compromised credentials can lead to unauthorised account access and must never be disclosed to third parties, and periodically remind them of sound security practices — strong and unique passwords, appropriate trading controls and limits, alerts enabled for key activities, and timely review and reporting of suspicious transactions.'
    },

    /* ---- SFC circular 26EC32: AI-enabled cyberattacks ---- */
    'SFC-AI-GOV': {
      clause: 'para. 3',
      title: 'MIC-IT bears ultimate responsibility for cybersecurity risk',
      requirement: 'Senior management, including the Manager-in-Charge of Information Technology (MIC-IT), is ultimately responsible for managing the cybersecurity risks the firm faces. The MIC-IT must ensure that changes to the firm’s cybersecurity framework are adequately reviewed and approved, and that enhancements to cybersecurity measures are implemented properly and promptly. Advice and assistance from IT security specialists should be sought where necessary.'
    },
    'SFC-AI-INV': {
      clause: 'para. 8',
      title: 'Maintain a technology asset inventory that supports same-day decisions',
      requirement: 'Maintain an accurate and up-to-date inventory of technology assets and components — covering hardware, software, network infrastructure, databases and cloud services — and identify which assets and services are externally exposed, business critical, or dependent on third-party components, so that remediation and protective measures can be directed quickly and effectively to the highest-risk areas. Given how rapidly frontier AI models can identify exploitable weaknesses, inventories must be kept sufficiently up to date to support same-day prioritisation and containment decisions when new vulnerabilities or threat intelligence emerge.'
    },
    'SFC-AI-A1': {
      title: 'Accelerate patch and vulnerability management, with an emergency fix path',
      requirement: 'Review and strengthen patch and vulnerability management processes, take prompt action on known vulnerabilities, and implement adequate policies and procedures for urgent and critical fixes that fall outside routine patching cycles — particularly for vulnerabilities and fixes affecting business critical components. Allocate sufficient resources to absorb potential surges in patching demand.'
    },
    'SFC-AI-B1': {
      title: 'Assume compromise: enforce least privilege on business critical components',
      requirement: 'Design system controls on the assumption that any user, device, privileged account or network component may be compromised. Enforce least-privilege access across all business critical components, including restricting connector and tool permissions to what the intended use requires, and implement adequate measures to protect privileged accounts.'
    },
    'SFC-AI-B2': {
      title: 'Strengthen firewalls and micro-segmentation to limit lateral movement',
      requirement: 'Strengthen firewalls and network segmentation, and implement micro network segmentation where feasible, to limit lateral movement capabilities across networks and systems.'
    },
    'SFC-AI-B3': {
      title: 'Treat external and untrusted input as potentially adversarial (prompt injection defence)',
      requirement: 'Treat external and untrusted inputs — including content retrieved from apps, emails, documents and webpages — as potentially adversarial, and prevent such inputs from directly altering system instructions or triggering privileged actions.'
    },
    'SFC-AI-B4': {
      title: 'Apply maker-checker controls to high-impact actions',
      requirement: 'Apply maker-checker controls for high-impact actions.'
    },
    'SFC-AI-C1': {
      title: 'Strengthen threat detection, anomaly monitoring and threat intelligence',
      requirement: 'Strengthen threat detection capability and the monitoring of anomalies in client trading activity and system activity, commensurate with the evolving threat landscape, and improve threat intelligence gathering capability.'
    },
    'SFC-AI-D1': {
      title: 'Third-party supply chain risk governance must account for AI threats',
      requirement: 'Establish sound procedures to address AI-enabled threats targeting third-party service providers. Strengthen the third-party supply chain risk governance framework and enhance initial and ongoing assessments of third-party service providers to factor in the latest threat landscape, so that cybersecurity risks associated with them — particularly those arising from AI-enabled attackers — are properly managed.'
    },
    'SFC-AI-E1': {
      title: 'Incident handling procedures and contingency plans must cover AI-enabled attacks',
      requirement: 'Review and enhance cybersecurity incident handling procedures and contingency plans so they can effectively handle AI-enabled cyberattacks that may lead to unauthorised access to networks and systems, data leakage and similar consequences.'
    },
    'SFC-AI-LLM': {
      clause: 'para. 7',
      title: 'Use of AI language models: bring within the cyber framework and notify the SFC',
      requirement: 'Whether an AI language model is developed in-house, provided by a group company or third-party service provider, or obtained from open source, its use may amplify existing cyber risks and introduce additional ones — including adversarial attacks against AI language models, data leakage and system prompt override. These risks must be addressed within the cybersecurity framework and incident handling arrangements. Firms intending to deploy AI language models in high-risk use cases must comply with the notification obligations under the Securities and Futures (Licensing and Registration) (Information) Rules.'
    },

    /* ---- HKMA SPM TM-G-1 ---- */
    'HKMA-TMG1-2': {
      title: 'IT governance: control policies, oversight of IT functions, technology risk management function',
      requirement: 'Establish IT control policies, define the oversight and organisation of IT functions, set up a technology risk management function, arrange technology audits, and ensure staff competence and training are adequate. Where IT support is provided by overseas offices, bring it within the same governance arrangements.'
    },
    'HKMA-TMG1-3': {
      title: 'Security management: information classification, authentication and access control, system security',
      requirement: 'Covers six areas: information classification and protection; authentication and access control; security administration and monitoring; system security; end-user and mobile computing; and physical and personnel security.'
    },
    'HKMA-TMG1-4': {
      title: 'System development and change management',
      requirement: 'Establish controls over project management, the project life cycle and change management, so that system development and changes are properly authorised, tested and approved.'
    },
    'HKMA-TMG1-5': {
      title: 'Information processing: operations management, capacity planning, disaster recovery',
      requirement: 'Establish IT operations management and support, performance monitoring and capacity planning, IT facilities and equipment maintenance, and disaster recovery planning.'
    },
    'HKMA-TMG1-7': {
      title: 'Management of technology service providers',
      requirement: 'Manage technology outsourcing arrangements and the management of other technology service providers.'
    },

    /* ---- HKMA SPM TM-E-1 ---- */
    'HKMA-TME1-3.1': {
      title: 'Board and senior management oversight of e-banking',
      requirement: 'The board and senior management must oversee e-banking business, with clear accountability and staff competence requirements across the three lines of defence.'
    },
    'HKMA-TME1-3.3': {
      title: 'Independent assessment and penetration testing',
      requirement: 'Arrange independent assessment and penetration testing of e-banking systems. The items to be reported are set out in Annex A to TM-E-1.'
    },
    'HKMA-TME1-4.1': {
      title: 'Customer authentication',
      requirement: 'Implement customer authentication for e-banking services commensurate with the risk involved.'
    },
    'HKMA-TME1-4.2': {
      title: 'Notifications to customers and customer education',
      requirement: 'Send customers notifications of account activity, and maintain ongoing customer security awareness and education.'
    },
    'HKMA-TME1-5': {
      title: 'System and network security for internet banking',
      requirement: 'Covers confidentiality and integrity of information, internet infrastructure, application system security, and threat monitoring and vulnerability assessment.'
    },
    'HKMA-TME1-6': {
      title: 'Controls over internet banking services',
      requirement: 'Implement controls over funds transfers, online submission of information, account aggregation services and other online financial services.'
    },
    'HKMA-TME1-9': {
      title: 'System availability and business continuity management',
      requirement: 'Make arrangements for the e-banking service level offered to customers, capacity planning, performance monitoring, system resilience, and controls for coping with system disruptions.'
    },

    /* ---- HKMA TM-C-1 / C-RAF ---- */
    'HKMA-CRAF-1': {
      title: 'C-RAF: inherent risk assessment',
      requirement: 'Carry out an inherent risk assessment based on risk factors such as business size, operational characteristics, technology profile and usage, producing an inherent risk rating.'
    },
    'HKMA-CRAF-2': {
      title: 'C-RAF: maturity assessment',
      requirement: 'Carry out a maturity assessment to determine whether cybersecurity controls are commensurate with the institution’s inherent risk level.'
    },
    'HKMA-CRAF-3': {
      title: 'C-RAF: iCAST intelligence-led cyber attack simulation testing',
      requirement: 'Authorized institutions with a “medium” or “high” inherent risk rating must conduct Intelligence-led Cyber Attack Simulation Testing (iCAST) to test their cyber resilience by simulating real-life cyber attacks.'
    },
    'HKMA-CRAF-4': {
      title: 'Conduct C-RAF assessments regularly and raise cyber defence maturity',
      requirement: 'Conduct regular assessments under the C-RAF with a view to raising cyber defence maturity to a level commensurate with the assessed risk exposures. The HKMA reviews institutions’ C-RAF assessment results and updates the framework from time to time.'
    },

    /* ---- HKMA SPM OR-2 ---- */
    'HKMA-OR2-1': {
      title: 'Establish an operational resilience framework owned by the board and senior management',
      requirement: 'Establish an operational resilience framework, with defined roles and responsibilities for the board and senior management.'
    },
    'HKMA-OR2-2': {
      title: 'Set resilience parameters: critical operations, tolerance for disruption, severe but plausible scenarios',
      requirement: 'Identify critical operations, set the tolerance for disruption, and identify severe but plausible scenarios.'
    },
    'HKMA-OR2-3': {
      title: 'Map interdependencies, manage risk, and be able to respond to and recover from incidents',
      requirement: 'Map the interconnections and interdependencies underlying critical operations; prepare for and manage risks to critical operations delivery; and maintain the ability to respond to and recover from incidents.'
    },
    'HKMA-OR2-6': {
      title: 'Test the ability to deliver critical operations under severe but plausible scenarios',
      requirement: 'Test the ability to deliver critical operations under severe but plausible scenarios.'
    },

    /* ---- HKMA SPM SA-2 ---- */
    'HKMA-SA2-1': {
      title: 'Assessment, contractual protection and ongoing monitoring of outsourcing arrangements',
      requirement: 'Conduct risk assessment of outsourcing arrangements, put contractual protections in place (including HKMA access rights), safeguard the confidentiality of customer data, and maintain ongoing monitoring of service providers.'
    },

    /* ---- HKMA 2026 AI circular / CFI 2.0 ---- */
    'HKMA-AI-2026': {
      clause: 'Full circular',
      title: 'Strengthening cyber resilience amid AI-empowered cyber threats',
      requirement: 'Review and strengthen cyber resilience arrangements in line with the HKMA circular of 2 June 2026, to address artificial intelligence-empowered cyber threats. It is advisable to implement these alongside the controls in SFC circular 26EC32 — asset inventory, accelerated patching, least privilege, micro-segmentation, handling of untrusted input, supply chain, and incident response.'
    },
    'HKMA-CFI2': {
      clause: 'Full circular',
      title: 'Adopt the enhanced framework under the Cybersecurity Fortification Initiative 2.0',
      requirement: 'Adopt CFI 2.0 in line with the circular of 3 November 2020. CFI 2.0 streamlines and strengthens the original C-RAF and rests on three pillars: the Cyber Resilience Assessment Framework, professional development (the Professional Development Programme), and the Cyber Intelligence Sharing Platform. The specific inherent risk assessment, maturity assessment and iCAST requirements appear as HKMA-CRAF-1 to HKMA-CRAF-4 in this tool.'
    },

    /* ---- SVF licensees ---- */
    'SVF-7.2.1': {
      title: 'Establish a technology risk management framework proportionate to the business',
      requirement: 'Establish an effective technology risk management framework to ensure (i) the adequacy of IT controls; (ii) the quality and security of computer systems, including reliability, robustness, stability and availability; and (iii) the safety and efficiency of SVF operations. The framework must be fit for purpose — commensurate with the nature, scale, complexity and type of business, the technology adopted and the overall risk management system — and must allocate technology resources appropriately between business development and risk management. The Practice Note provides that the framework should normally comprise three functions — the IT function, the TRM function and the IT audit function — supported by formally approved IT control policies that set out the exemption approval process and the consequences of non-compliance.'
    },
    'SVF-7.2.2': {
      title: 'Incident management framework and timely reporting to the HKMA',
      requirement: 'Establish an incident management framework with adequate management oversight to ensure effective incident response and management capability. This includes timely reporting to the HKMA of any confirmed IT-related fraud cases or major security breaches (including cyber attacks), cases of prolonged service disruption, and systemic incidents where users suffer monetary loss or a seriously degraded user experience.'
    },
    'SVF-7.2.3': {
      title: 'Segregate databases by purpose and enforce strict access control',
      requirement: 'Take adequate measures to maintain proper segregation between databases serving different purposes, prevent unauthorised or unintended access or retrieval, and enforce robust access controls to preserve the confidentiality and integrity of the databases. In respect of personal data of users, including merchants, comply at all times with the Personal Data (Privacy) Ordinance and with any relevant codes of practice, guidelines or best practice issued by the PCPD from time to time.'
    },
    'SVF-7.3.1': {
      title: 'Establish a robust payment security management framework',
      requirement: 'Put in place a robust payment security management framework commensurate with the scale and nature of the payment security risks associated with the SVF schemes, to effectively monitor, identify, evaluate, respond to and mitigate the payment security risks arising from operating those schemes.'
    },
    'SVF-7.3.2': {
      title: 'Policies and procedures across the user information lifecycle',
      requirement: 'Maintain adequate policies and procedures on the ownership, classification, storage, transmission, processing and retention of information collected from users through SVF service registration and the execution of payment transactions, to ensure the confidentiality and integrity of that information.'
    },
    'SVF-7.3.3': {
      title: 'Protect every payment channel, including cards and user devices',
      requirement: 'Implement adequate security measures to protect each payment channel provided to users for using the SVF — including cards and user devices — against all material vulnerabilities and attacks. The Practice Note provides that licensees offering payment card services should implement adequate safeguards to protect sensitive payment card data, typically by deploying chip cards to store it.'
    },
    'SVF-7.3.4': {
      title: 'Authenticity and traceability of payment transactions, and fraud detection',
      requirement: 'Implement adequate payment security controls to ensure the authenticity and traceability of payment transactions and to detect fraudulent transactions. The Practice Note gives further guidance on contactless payment modes such as QR codes and near-field communication (NFC).'
    },
    'SVF-7.3.5': {
      title: 'Authenticate users before high-risk actions and notify them afterwards',
      requirement: 'Authenticate the identity of SVF users before they can administer their SVF accounts and initiate high-risk transactions, and send timely notification to users after such activities. The Practice Note provides that where account opening is permitted through online channels, reliable identity authentication methods must be used, and that adequate identity checks must be performed when users request changes to account information.'
    },
    'SVF-7.3.6': {
      title: 'Provide secure-use advice to users through an effective channel',
      requirement: 'Provide advice and assistance to users on the secure use of the SVF through an effective communication channel. The Practice Note provides that users must be alerted to their responsibility to take reasonable security precautions to protect their payment devices and keep passwords confidential, and that the advice must be in plain language, prominent and reviewed periodically.'
    },
    'SVF-PN-ANTISCAM': {
      clause: '7.3.6 supplementary guidance (b)',
      title: 'Anti-scam: a secure communication channel, and no hyperlinks embedded in messages',
      requirement: 'Provide at least one secure channel for ongoing communication with users about the correct and secure use of payment services, and inform users that messages purporting to come from the licensee through other routes are not reliable. To manage fraud risk, a licensee must NOT send, generate or trigger any message to users — email, SMS or similar instant messages — with embedded hyperlinks that would (a) request users to provide sensitive information such as personal data and credentials, or (b) direct users to its website or apps for transactions; and must remind users where necessary that it will not do so. If a phishing website incident occurs, issue a press release alerting users and the public, report to the Police, the HKMA and other relevant regulators, and provide the HKMA promptly with relevant information such as the phishing website hyperlink.'
    },
    'SVF-7.3.7': {
      title: 'Cyber threat monitoring, periodic security testing and penetration testing',
      requirement: 'Guard against current and emerging cybersecurity risks by monitoring cyber threat trends, implementing adequate protective measures and performing periodic security testing. The Practice Note sets out four areas: (a) licensees highly dependent on internet and mobile technology must manage cybersecurity risk adequately through the TRM process and devote sufficient resources to identify, protect, contain and recover; (b) subscribing to quality cyber threat intelligence services and collaborating with other institutions to share intelligence should be considered; (c) the need for penetration testing should be assessed periodically, with scope based on the cybersecurity risk profile and covering internal and external networks, application systems, social engineering and emerging threats, and findings mitigated promptly according to impact and risk exposure; and (d) attention should be paid to endpoint risks from always-on connected devices.'
    },
    'SVF-7.3.8': {
      title: 'Payment service efficiency and reliability must be measurable',
      requirement: 'Provide an efficient and reliable payment service commensurate with the SVF’s operating model. The Practice Note provides that efficiency and reliability should be assessed by measurable performance indicators such as response time, transaction throughput, system capacity, system availability and stability, with performance tested and monitored against predefined indicators. For merchants with demanding performance requirements — such as public transport operators — expected performance indicators should be agreed with the merchant and sufficient resources committed to meeting them.'
    },
    'SVF-7.4.1': {
      title: 'Business continuity management programmes',
      requirement: 'Maintain adequate business continuity management programmes to ensure continuation, timely recovery, or in extreme situations orderly scale-down, of critical operations in the event of major disruptions caused by different contingent scenarios. The Practice Note provides that an adequate BCM programme normally includes business impact analysis, recovery strategies, business continuity plans, and alternate sites for business and IT recovery.'
    },
    'SVF-7.4.2': {
      title: 'Board and senior management bear ultimate responsibility for BCM',
      requirement: 'The board and senior management of a licensee have ultimate responsibility for business continuity management and for the effectiveness of the business continuity plans. They must ensure the BCM programme is properly implemented, taken seriously by staff at all levels, and supported by sufficient resources.'
    },
    'SVF-CI-COP': {
      title: 'SVF sector: dedicated Code of Practice under the Critical Infrastructure Ordinance',
      requirement: 'A stored value facility licensee designated by the Monetary Authority as a critical infrastructure operator must refer, for category 1 and category 2 obligations, to the sectoral Code of Practice issued by the Monetary Authority (effective 12 June 2026), and, for category 3 obligations, to section 7 of the generic Code of Practice issued by the Commissioner.'
    },

    /* ---- Protection of Critical Infrastructures (Computer Systems) Ordinance ---- */
    'CI-CAT1-1': {
      title: 'Category 1: maintain an office in Hong Kong',
      requirement: 'A critical infrastructure operator must maintain an office in Hong Kong and notify the Commissioner of the office address using the specified form (Annex A).'
    },
    'CI-CAT1-2': {
      title: 'Category 1: notify changes of operator',
      requirement: 'Notify the Commissioner of any change of critical infrastructure operator using the specified form (Annex B).'
    },
    'CI-CAT1-3': {
      title: 'Category 1: set up and maintain a computer-system security management unit',
      requirement: 'Set up and maintain a computer-system security management unit, and notify the Commissioner of the appointment of the employee supervising that unit using the specified form (Annex C).'
    },
    'CI-CAT2-1': {
      title: 'Category 2: notify material changes to critical computer systems',
      requirement: 'Notify the Commissioner of material changes to critical computer systems (CCS) using the specified form (Annex D).'
    },
    'CI-CAT2-2': {
      title: 'Category 2: submit and implement a computer-system security management plan',
      requirement: 'Submit and implement a computer-system security management plan. This is the longest part of the generic Code of Practice (pages 12–24) and covers the baseline requirements for security management.'
    },
    'CI-CAT2-3': {
      title: 'Category 2: conduct computer-system security risk assessments',
      requirement: 'Conduct computer-system security risk assessments in respect of critical computer systems.'
    },
    'CI-CAT2-4': {
      title: 'Category 2: arrange computer-system security audits',
      requirement: 'Arrange for computer-system security audits to be carried out. An outline of the audit methodology is at Annex G to the generic Code of Practice.'
    },
    'CI-CAT2-5': {
      title: 'Category 2: security measures for operational technology',
      requirement: 'Implement corresponding security measures for operational technology (OT).'
    },
    'CI-CAT3-1': {
      title: 'Category 3: participate in computer-system security drills',
      requirement: 'Participate in computer-system security drills.'
    },
    'CI-CAT3-2': {
      title: 'Category 3: submit and implement an emergency response plan',
      requirement: 'Submit and implement an emergency response plan.'
    },
    'CI-CAT3-3': {
      title: 'Category 3: incident notification — 12 hours for serious incidents, 48 hours otherwise',
      requirement: 'Notify the Commissioner after becoming aware of a computer-system security incident. A serious incident — one that has disrupted, is disrupting, or is likely to disrupt the core function of the critical infrastructure — must be notified within 12 hours of becoming aware of it; other incidents within 48 hours (section 28(3) of the Ordinance). An operator may first call the designated telephone number to give the nature of the incident, the critical computer systems involved and a summary, then submit the specified form (Annex E) through the designated secure channel within 48 hours of that notification.'
    },
    'CI-CAT3-4': {
      title: 'Category 3: submit a written incident report within 14 days',
      requirement: 'Submit a written report using the specified form (Annex F) through the designated secure channel within 14 days of becoming aware of the computer-system security incident.'
    },
    'CI-SEV-CRITERIA': {
      title: 'Pre-define the thresholds for a “serious incident” in the business continuity plan',
      requirement: 'Several of the criteria for a serious incident must be defined in advance by the operator in its business continuity management plan, including the maximum tolerable downtime, the minimum service level, and what counts as a “material” volume of leaked customer data and a “material” number of customer enquiries or complaints. Without these definitions set in advance, there is no way to judge at the time of an incident whether the 12-hour notification deadline has been triggered.'
    },
    'CI-BANK-COP': {
      title: 'Banking sector: the Monetary Authority’s sectoral Code of Practice also applies',
      requirement: 'An authorized institution designated by the Monetary Authority as a critical infrastructure operator must refer, for category 1 and category 2 obligations, to the sectoral Code of Practice issued by the Monetary Authority (2 June 2026), and, for category 3 obligations, to section 7 of the generic Code of Practice issued by the Commissioner.'
    },

    /* ---- PDPO ---- */
    'PDPO-DPP4-1': {
      title: 'DPP4 data security: take practicable steps to protect personal data',
      requirement: 'Take all practicable steps to protect personal data held against unauthorised or accidental access, processing, erasure, loss or use. Relevant considerations include the kind of data and the harm that would result from such an event, the physical location where the data is stored, the security measures of the storage equipment, measures to ensure the integrity, prudence and competence of persons with access to the data, and measures to secure data in transmission.'
    },
    'PDPO-DPP4-2': {
      title: 'DPP4 data processors: ensure equivalent protection by contract or other means',
      requirement: 'Where personal data is passed to an agent or contractor for processing, adopt contractual or other means to prevent unauthorised or accidental access, processing, erasure, loss or use of that data. The data user remains responsible for the acts of the party engaged.'
    },
    'PDPO-DPP2': {
      title: 'DPP2 accuracy and retention: do not keep data longer than necessary',
      requirement: 'Take practicable steps to ensure personal data is accurate, and ensure it is not kept longer than is necessary for the fulfilment of the purpose for which it is used. Data past its retention period must be erased, which narrows the blast radius of any future data breach.'
    },
    'PDPO-DPP1': {
      title: 'DPP1 collection: collect only what is necessary and not excessive',
      requirement: 'Collect personal data only for a lawful purpose directly related to a function or activity of the data user, and only where the data collected is necessary and not excessive for that purpose. Collection must be by means that are lawful and fair, and the prescribed information must be given to the data subject.'
    },
    'PDPO-DPP3': {
      title: 'DPP3 use: a new purpose requires prescribed consent',
      requirement: 'Personal data may only be used for the purpose stated at collection or a directly related purpose, unless the data subject gives express and voluntary informed consent (prescribed consent).'
    },
    'PDPO-DPP5': {
      title: 'DPP5 openness: publish the privacy policy and the kinds of data held',
      requirement: 'Take practicable steps to make publicly known the policies and practices for handling personal data, the kinds of personal data held, and the main purposes for which that data is used.'
    },
    'PDPO-DPP6': {
      title: 'DPP6 access and correction: handle data subject access and correction requests',
      requirement: 'Establish procedures to handle data access requests and data correction requests from data subjects, and respond within the statutory time limits.'
    },
    'PDPO-BREACH': {
      clause: 'PCPD guidance',
      title: 'Data breach handling and notification',
      requirement: 'Establish procedures for handling data breach incidents. Note that the Personal Data (Privacy) Ordinance currently imposes no mandatory data breach notification obligation — notifying the PCPD and affected data subjects is voluntary, though it is good practice. Where the organisation is also subject to another regime — for example as a designated critical infrastructure operator, an SFC licensed corporation or an HKMA authorized institution — the mandatory notification deadlines under that regime still apply and must be observed.',
      note: 'The “voluntary notification” statement reflects the legal position as verified on 2026-09-08. If the Ordinance is later amended to introduce mandatory notification, this must be updated.'
    },
    'SFC-VATP-12.1': {
      title: 'Platform (including trading system and custody infrastructure) properly designed and operated',
      requirement: 'Ensure that the platform — including the trading system and custody infrastructure — is properly designed and operated in compliance with all applicable laws and regulations, and that all systems and processes underpinning its operation are robust and properly maintained, so that the risk of theft, fraud and other dishonest acts, professional misconduct, errors and omissions, interruptions and other operational or control failures is minimised and appropriately managed.'
    },
    'SFC-VATP-12.2': {
      title: 'Robust governance arrangements and adequate human, technology and financial resources',
      requirement: 'Put robust governance arrangements in place for overseeing the operation of the platform, and make available adequate human, technology and financial resources to ensure the platform is operated properly.'
    },
    'SFC-VATP-12.3': {
      title: 'Written internal policies, key man risk, and responsible officer accountability for cybersecurity',
      requirement: 'Establish and implement written internal policies and procedures for the design, development, deployment, operation and modification of the platform, ensuring that: (a) key personnel hold the necessary professional qualifications, management and technical experience, and that key personnel (such as the founder or chief developer) are identified with plans to mitigate the associated key man risks; (b) at least one responsible officer is accountable for the overall management and supervision of the platform and for defining a cybersecurity management framework and key roles and responsibilities — including approving policies and procedures, approving budget and spending, arranging a periodic technology audit (paragraph 12.7) and independent cybersecurity assessment (paragraph 12.13), reviewing significant issues from emergencies, disruptions and cybersecurity incidents, reviewing major audit and cybersecurity review findings and endorsing and monitoring remedial actions, monitoring and assessing cyber threats (including maintaining up-to-date knowledge of the threat landscape, gathering threat intelligence and performing regular automated vulnerability scans), approving the contingency plan, and approving third-party due diligence, service level agreements and contracts. These responsibilities may be delegated in writing to a designated committee or operational unit, but overall accountability remains with the responsible officer(s); (c) there is a formalised governance process with input from the dealing, risk and compliance functions; (d) reporting lines are clearly identified; and (e) managerial and supervisory controls are in place.',
      note: 'The Guidelines state expressly that the requirement to perform vulnerability scans regularly with automated tools does not include performing penetration tests based on attack simulations.'
    },
    'SFC-VATP-12.4': {
      title: 'Regularly review internal policies and promptly remedy deficiencies',
      requirement: 'Conduct regular reviews to ensure these internal policies and procedures are in line with changing market conditions, the cyber threat landscape and regulatory developments, and promptly remedy any deficiencies identified.'
    },
    'SFC-VATP-12.5': {
      title: 'Assign qualified staff and resources across the platform lifecycle',
      requirement: 'Assign adequately qualified staff, expertise, technology and financial resources to the design, development, deployment, operation and modification of the platform.'
    },
    'SFC-VATP-12.6': {
      title: 'Third-party service provider due diligence, ongoing monitoring and service level agreement',
      requirement: 'Where the platform or any associated activity is provided by or outsourced to a third party service provider, perform appropriate due diligence, conduct ongoing monitoring and make arrangements ensuring the Platform Operator still meets the requirements of these Guidelines (including Part XII and Part XIV on record keeping). In particular, the Platform Operator or its Associated Entity should enter into a formal service-level agreement specifying the terms of services and the provider’s responsibilities, reviewed regularly and revised to reflect changes to the services, outsourcing arrangements or regulatory developments. Whenever possible such agreements should provide sufficient levels of maintenance and technical assistance with quantitative details.'
    },
    'SFC-VATP-12.7': {
      title: 'Periodic (at least annual) technology audit by an independent professional',
      requirement: 'Arrange a periodic (at least annual) technology audit by a suitably qualified independent professional so as to be satisfied that the Platform Operator and its Associated Entity have fully complied with Part XII of the Guidelines. Exercise due skill, care and diligence in selecting and appointing the independent professional, having regard to their experience and track record in reviewing virtual asset related technology, and take prompt rectification measures — and ensure the Associated Entity does so — upon identifying any non-compliance.'
    },
    'SFC-VATP-12.8': {
      title: 'Ensure platform integrity, reliability, security and capacity, with contingency measures',
      requirement: 'Ensure the integrity of the platform, maintain a high degree of reliability, security and capacity in respect of its systems, and have appropriate contingency measures in place.'
    },
    'SFC-VATP-12.9': {
      title: 'Written standard operating procedures for system upgrades and maintenance',
      requirement: 'Have written standard operating procedures (SOP) for performing system upgrades and maintenance, containing: (a) the methods of communication and how pending orders still in the order book are dealt with; (b) how long orders can be entered, amended or cancelled after a system downtime and before continuous trading resumes; and (c) the process applicable to unexpected and unplanned system failures which affect an orderly market.'
    },
    'SFC-VATP-12.10': {
      title: 'Pre-deployment testing, senior management sign-off, full backup and rollback plan',
      requirement: 'Ensure the platform and all modifications to it — such as implementing a new system or upgrading an existing one — are tested before deployment and regularly reviewed. Before deployment, at least: (a) review and sign off on the test results at senior management level; (b) fully back up the system and data; and (c) devise a contingency plan to switch back to the previous version in the event of critical and unrecoverable errors in the new version. Maintain a clear audit trail for all modifications made to the platform.'
    },
    'SFC-VATP-12.11': {
      title: 'Inform clients of planned outages as far in advance as practicable',
      requirement: 'Where outages are planned to perform updates and testing of platforms or systems, inform clients as far in advance as practicable if such outages may affect them.'
    },
    'SFC-VATP-12.12a': {
      title: 'Need-to-have staff access, unique user authentication, annual access review and access logs',
      requirement: 'Employ robust authentication and authorisation methods and technology so that access to the platform is restricted to authorised persons on a need-to-have basis. Specifically: (i) permit staff access to trading information only to the extent necessary for the platform to operate properly and efficiently, keeping senior management informed at all times of each such staff member (by title and department), the information accessible, the basis for that access and any change and its basis; (ii) adopt an appropriate user authentication method enabling each user to be uniquely identified; (iii) review the user access list of the platform and databases at least yearly and revoke unnecessary access and privileges (for example for departed staff) on a timely basis; (iv) maintain an adequate access log recording identity and role, information accessed, time of access, any approval given and the basis for it, with adequate protection against tampering or erasure; and (v) have adequate and effective policies, systems and controls to guard against and detect errors, omissions, unauthorised insertion, alteration or deletion of data (including client and trading information), information leakage or abuse by staff.'
    },
    'SFC-VATP-12.12b': {
      title: 'Two-factor authentication for login to clients’ accounts',
      requirement: 'Implement two-factor authentication for login to clients’ accounts. The Guidelines define two-factor authentication as an authentication mechanism which utilises any two of the following factors: what a client knows, what a client has, and who a client is.'
    },
    'SFC-VATP-12.12c': {
      title: 'Secure generation and delivery of client login passwords',
      requirement: 'Have effective policies and procedures ensuring a client login password is generated and delivered securely during account activation and password reset. The password should be randomly generated by the system and sent through a channel of communication free from human intervention and from tampering by the Platform Operator’s staff. Where the password is not randomly generated by the system, implement adequate compensating security controls such as a compulsory password change upon first login after account activation.'
    },
    'SFC-VATP-12.12d': {
      title: 'Stringent password policies and session timeout controls',
      requirement: 'Apply stringent password policies and session timeout controls on the platform, including: (i) minimum password length; (ii) periodic reminders for clients who have not changed their passwords for a long period; (iii) minimum password complexity (ie, alphanumeric) and history; (iv) avoidance of passwords containing values known to be commonly-used, expected or compromised; (v) appropriate controls on invalid login attempts; and (vi) session timeout after a period of inactivity.'
    },
    'SFC-VATP-12.12e': {
      title: 'Prompt client notification of account activities, on a different channel from login',
      requirement: 'Notify clients promptly after certain activities have taken place in their accounts, at least: (i) system login; (ii) password reset; (iii) trade execution; and (iv) changes to client and account-related information. The notification channel should be different from the one used for system login. Clients may opt out of “trade execution” notifications only; where they do, except when dealing with institutional and qualified corporate professional investors, adequate risk disclosures should be provided and an acknowledgement executed by the client confirming they understand the risks involved.'
    },
    'SFC-VATP-12.12f-i': {
      title: 'Secure network infrastructure through network segmentation (DMZ with multi-tiered firewalls)',
      requirement: 'Deploy a secure network infrastructure through proper network segmentation — a Demilitarised Zone (DMZ) with multi-tiered firewalls — to protect critical systems and client data against cyber-attacks.'
    },
    'SFC-VATP-12.12f-ii': {
      title: 'Need-to-have access to the internal network and its segments, including remote access',
      requirement: 'Grant access, including remote access, to the internal network and its different segments on a need-to-have basis, and implement security controls over such access.'
    },
    'SFC-VATP-12.12f-iii': {
      title: 'Patch management: deploy within one month following completion of testing',
      requirement: 'Monitor and evaluate security patches or hotfixes released by software providers on a timely basis and, subject to an evaluation of the impact, conduct testing as soon as practicable and implement the security patches or hotfixes within one month following the completion of testing.'
    },
    'SFC-VATP-12.12f-iv': {
      title: 'Anti-virus, anti-malware and endpoint detection and response (EDR)',
      requirement: 'Implement and update anti-virus and anti-malware solutions as well as endpoint detection and response technology on a timely basis to detect malicious applications and malware on critical system servers and workstations.'
    },
    'SFC-VATP-12.12f-v': {
      title: 'IPS, IDS and SIEM for real-time intrusion detection and alerting',
      requirement: 'Implement Intrusion Prevention System (IPS), Intrusion Detection System (IDS) and Security Information and Event Management (SIEM) solutions to detect and generate alerts on any intrusion or unauthorised access to critical system servers and workstations on a real time basis.',
      note: 'The Guidelines state that the detection rules of the endpoint detection and response technology and SIEM solutions should be updated as and when necessary, such as when new attack or threat scenarios require additional detection rules.'
    },
    'SFC-VATP-12.12f-vi': {
      title: 'Establish a Security Operations Center (SOC) or equivalent function',
      requirement: 'Establish a Security Operations Center (SOC) or equivalent function with sufficient resources to take charge of all security monitoring processes and technologies and to act as coordinator for efficient incident detection and handling.'
    },
    'SFC-VATP-12.12f-vii': {
      title: 'Prevent unauthorised installation of hardware and software; control storage media',
      requirement: 'Implement security controls to prevent unauthorised installation of hardware and software, and ensure that only authorised storage media and devices are used to store and transfer critical data.'
    },
    'SFC-VATP-12.12f-viii': {
      title: 'Physical security of critical platform components including the HSM',
      requirement: 'Establish physical security policies and procedures to protect critical platform components — for example the HSM, the authorised storage media and devices used to store and transfer critical data, system servers and network devices — in a secure environment, and to prevent unauthorised physical access to the facilities hosting the platform and those components. Where applicable, apply segregation of duty or privilege separation to access to critical platform components.'
    },
    'SFC-VATP-12.12g': {
      title: 'Up-to-date encryption and secure transfer, including of backup copies',
      requirement: 'Use up-to-date data encryption and secure transfer technology, in accordance with industry best practices and international standards, to protect the confidentiality and integrity and assure source authenticity of information stored on the platform and during transmission between internal and external networks. In particular, use a strong encryption algorithm to: (i) encrypt sensitive information such as client login credentials (ie, user ID and password) and trade data during transmission between internal networks and client devices; (ii) protect client login passwords stored on the platform; (iii) protect critical data transferred between components of the system infrastructure; and (iv) protect the backup copies of the platform’s critical data.'
    },
    'SFC-VATP-12.12h': {
      title: 'Security tools to block intrusion attempts and monitoring for unauthorised account access',
      requirement: 'Use up-to-date security tools to detect, prevent and block any potential unauthorised intrusion, security breach and cyberattack attempts. In particular, implement an effective monitoring and surveillance mechanism to detect unauthorised access to clients accounts or the Platform Operator’s accounts (if any).'
    },
    'SFC-VATP-12.12i': {
      title: 'Yearly staff training and regular client alerts and educational materials',
      requirement: 'Provide adequate internal procedures and training for staff at least on a yearly basis, and regular alerts and educational materials for clients, to raise awareness of the importance of cybersecurity and the need to strictly observe security measures when using the platform.'
    },
    'SFC-VATP-12.13': {
      title: 'Independent cybersecurity assessment covering wallet security and custody system source code review',
      requirement: 'Perform a stringent independent cybersecurity assessment before the launch of the platform or the deployment of modifications to it, and periodically thereafter. The scope should at least cover: (a) user application security (ie, desktop/web-based/mobile app); (b) wallet security; (c) physical security; and (d) network and system security, including penetration testing, source code review of the custody system and other systems which interface or connect with it, and vulnerability scanning. Maintain sufficient documentation on the assessment, including the testing scope and methodology and the assessment results.',
      note: 'For the source code review: the assessment prior to launch and the ongoing periodic assessments must be performed by an independent third party, whereas the review for modifications prior to deployment may be performed either by an independent third party or by the Platform Operator itself. If no changes have been made to the custody system or connected systems since launch, no source code review needs to be performed.'
    },
    'SFC-VATP-12.14': {
      title: 'Written escalation procedures for cybersecurity incidents, internally and externally',
      requirement: 'Establish written policies and procedures specifying the manner in which a suspected or actual cybersecurity incident should be escalated internally and externally — for example to clients, the SFC and other regulatory authorities, where appropriate.'
    },
    'SFC-VATP-12.15': {
      title: 'Capacity monitoring, stress testing and contingency arrangements when capacity is exceeded',
      requirement: 'Ensure that: (a) usage capacity is regularly monitored and appropriate capacity planning is developed, determining and recording the required level of spare capacity; (b) capacity is regularly stress tested to establish system behaviour under different simulated market conditions, with results and remedial actions documented; (c) the platform has sufficient capacity to handle any foreseeable increase in business volume and market turnover; and (d) contingency arrangements exist to handle clients’ orders when capacity is exceeded and to inform clients of those arrangements, ensuring alternative means of executing orders are available and offered.'
    },
    'SFC-VATP-12.16': {
      title: 'Daily offline backup, with availability and integrity of backup copies assured',
      requirement: 'Back up business records, client and transaction databases, servers and supporting documentation in an offline medium at least on a daily basis. Off-site storage is generally expected to be subject to proper security measures. Implement proper measures to ensure the availability and integrity of the backup copies.'
    },
    'SFC-VATP-12.17': {
      title: 'Written contingency plan covering cyber-attack scenarios, backup facility and yearly testing',
      requirement: 'Identify and manage the associated risks — including any unintended consequences — prudently, with appropriate contingency arrangements including a written contingency plan to cope with emergencies and disruptions (including cybersecurity situations) related to the platform, checking and ensuring data integrity after system recovery and ensuring trading can be conducted fairly and in an orderly manner after resumption. The plan should at least include: (a) the potential disruptive scenarios, including cyber-attack scenarios such as distributed denial-of-service attacks and total loss of business records and client data resulting from cyber-attacks, and the corresponding activation procedures; (b) a suitable backup facility enabling continued trading services or alternative order execution arrangements in an emergency; and (c) the availability of trained staff to deal with clients’ and regulators’ enquiries. The backup facility and the contingency plan should be reviewed, updated and tested for viability and adequacy at least yearly.'
    },
    'SFC-VATP-12.20': {
      title: 'Material system delay or failure: rectify promptly and inform clients',
      requirement: 'In the event of material system delay or failure, in a timely manner: (a) rectify the situation; and (b) inform clients about the situation as soon as practicable and how their pending orders, deposits and withdrawals will be handled.'
    }
  }
});
