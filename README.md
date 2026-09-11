<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
    <img src="assets/logo.svg" alt="HK Cyber Compliance Assistant" width="374">
  </picture>
  <p><strong>Generate the cybersecurity controls Hong Kong regulators require of your firm, by licence and business profile</strong></p>
  <p>
    <!-- lang-nav -->
    <a href="README.zh-Hant.md">繁體</a> · <a href="README.zh-Hans.md">简体</a> · <strong>English</strong>
  </p>
  <p>
    <a href="https://github.com/arthurpanhku/hk-cyber-compliance/actions/workflows/ci.yml"><img src="https://github.com/arthurpanhku/hk-cyber-compliance/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-1d4ed8" alt="License: MIT"></a>
    <img src="https://img.shields.io/badge/version-1.4.0-0ea5e9" alt="Version 1.4.0">
    <img src="https://img.shields.io/badge/controls-102-16a34a" alt="102 controls">
    <img src="https://img.shields.io/badge/sources-20-64748B" alt="20 sources">
    <img src="https://img.shields.io/badge/languages-EN%20%C2%B7%20%E7%B9%81%20%C2%B7%20%E7%AE%80-7c3aed" alt="Three languages">
    <img src="https://img.shields.io/badge/zero%20dependencies-double--click%20to%20run-7c3aed" alt="Zero dependency">
    <img src="https://img.shields.io/badge/sources%20verified-2026--09--08-64748B" alt="Verified 2026-09-08">
  </p>
</div>

---

> ⚠️ **This tool is not legal or compliance advice.** The controls listed are a structured reading of
> publicly available regulatory provisions. They are not a substitute for reading the source documents,
> nor for the judgement of a qualified legal or compliance professional. Regulatory requirements change
> continuously — always check the latest version published on the regulator's own website.

## What this is

Financial institutions in Hong Kong answer to several regulators on cybersecurity at once: the Securities
and Futures Commission (SFC), the Hong Kong Monetary Authority (HKMA), the Privacy Commissioner for
Personal Data (PCPD), and — from 2026 — the Protection of Critical Infrastructures (Computer Systems)
Ordinance. The requirements are scattered across guidelines, circulars, Supervisory Policy Manual modules
and codes of practice, and the same control is often demanded by several regulators in different words.

This tool breaks those provisions down into **checkable controls**. Select the licences your firm holds
and its business characteristics, and you get the list of controls that apply — each one citing its
**source document, clause number, issue date and official link** — which you can then self-assess and export.

## Quick start

Nothing to install, no build step:

```bash
git clone https://github.com/arthurpanhku/hk-cyber-compliance.git
```

Then **double-click `index.html`**. Data is loaded as `.js` rather than `.json` precisely so that opening
the page from `file://` is not blocked by the browser's CORS policy — no server needed.

It also deploys to GitHub Pages as-is (repository settings → Pages → publish from the `main` branch root).

## Features

| Feature | Description |
| --- | --- |
| **Filter by licence** | 14 licence / entity types (SFC regulated activities, VASP, authorized institutions, stored value facilities, general companies) |
| **Narrow by business profile** | 6 characteristics (internet trading, e-banking, personal data processing, CI designation, outsourcing/cloud, use of AI models) decide whether a provision applies to a given licence |
| **De-duplication and cross-mapping** | Where the SFC and HKMA impose the same requirement, it is merged into a single card listing each regulator's own provision and clause number |
| **Traceable to source** | Every control carries a description, clause number, issue and verification dates, official link, and a verbatim / excerpt / summary label for its English source text |
| **Assessment work record** | Record status, implementation notes, evidence references, owner and target date for each individual regulatory control |
| **Remediation list** | Review unrated, partially implemented and unimplemented controls by domain, with overdue and 30-day due indicators |
| **Portable project file** | Export or import a versioned `.hkcc.json` backup containing the full scope and assessment record |
| **Three languages** | English, Traditional Chinese and Simplified Chinese, switchable in the header — including the CSV export |
| **Export** | Export a formula-safe CSV or print to PDF, including project details and work-record fields |
| **Stored locally** | Project data is saved in browser localStorage; nothing is uploaded |

## Coverage

v1.4.0 contains **102 controls** drawn from **20** official documents. Each source carries its own
`verifiedOn` — the day its link and version were last checked against the regulator's website — because
the documents span 2001 to 2026 and are re-checked at different times. The header shows the **earliest**
of those dates, so the freshness claimed is the weakest link, never the most recently touched one. A
scheduled workflow re-checks every link weekly.

### SFC (42 controls)

| Document | Date | Notes |
| --- | --- | --- |
| [Guidelines for Reducing and Mitigating Hacking Risks Associated with Internet Trading](https://www.sfc.hk/-/media/EN/assets/components/codes/files-current/web/guidelines/guidelines-for-reducing-and-mitigating-hacking-risks-associated-with-internet-trading/guidelines-for-reducing-and-mitigating-hacking-risks-associated-with-internet-trading.pdf) | 2017-10-27 | All 20 baseline controls, each mapped to its clause number |
| [Circular 26EC35: phishing-resistant authentication and suspicious activity monitoring](https://apps.sfc.hk/edistributionWeb/gateway/EN/circular/intermediaries/supervision/doc?refNo=26EC35) | 2026-07-09 | OTP no longer accepted; passkeys / device binding; **deadline 2027-07-08** |
| [Circular 26EC32: addressing AI-enabled cyberattacks](https://apps.sfc.hk/edistributionWeb/gateway/EN/circular/intermediaries/supervision/doc?refNo=26EC32) | 2026-06-02 | Asset inventory, accelerated patching, least privilege, micro-segmentation, handling of untrusted input |
| Code of Conduct paragraph 18 and Schedule 7 | — | The overarching rules for internet trading |

### HKMA — authorized institutions (24 controls)

| Document | Date | Notes |
| --- | --- | --- |
| [SPM TM-C-1 Supervisory Approach on Cyber Risk Management](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20241202-2-EN) | 2024-11-29 | Statutory guidance; the current basis for C-RAF |
| [SPM TM-E-1 Risk Management of E-banking (V.4)](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/TM-E-1) | 2024-10-25 | Statutory guidance |
| [SPM TM-G-1 General Principles for Technology Risk Management](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/TM-G-1) | 2003-06-24 | |
| [SPM OR-2 Operational Resilience](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/OR-2) | 2022-05-31 | |
| [SPM SA-2 Outsourcing](https://brdr.hkma.gov.hk/eng/doc-ldg/spm/current/SA-2) | 2001-12-28 | |
| [Circular: Cybersecurity Fortification Initiative 2.0 (C-RAF 2.0)](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20201103-1-EN) | 2020-11-03 | Inherent risk assessment, maturity assessment, iCAST |
| [Circular: Strengthening Cyber Resilience amid AI-Empowered Cyber Threats](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20260529-8-EN) | 2026-06-02 | |

### HKMA — stored value facility licensees (15 controls)

| Document | Date | Notes |
| --- | --- | --- |
| [Guideline on Supervision of Stored Value Facility Licensees (G.N. 5043)](https://www.hkma.gov.hk/media/eng/doc/key-functions/financial-infrastructure/Guidelines-on-supervision-of-SVF-licensees_Eng.pdf) | 2016-09 | Issued under s.54(1A)(b) of the Payment Systems and Stored Value Facilities Ordinance; technology risk, payment security and business continuity requirements in sections 7.2 / 7.3 / 7.4 |
| [Practice Note on Supervision of Stored Value Facility Licensees](https://www.hkma.gov.hk/media/eng/doc/key-functions/financial-infrastructure/PN_on_supervision_of_SVF_licensees_eng.pdf) | 2025-10 | Explains how each principle is met in practice, including the anti-scam rule: **no hyperlinks embedded in messages** |
| [Code of Practice for the SVF sector under the CI Ordinance](https://www.occics.gov.hk/filemanager/en/content_19/SCoP_SVF_Licensees_en.pdf) | 2026-06-12 | Applies to SVF licensees designated as CI operators |

### Critical infrastructure (13 controls)

| Document | Date | Notes |
| --- | --- | --- |
| [Code of Practice under the Protection of Critical Infrastructures (Computer Systems) Ordinance (Generic)](https://www.occics.gov.hk/filemanager/en/content_19/CoP_en_v1.0.pdf) | 2026-01-01 | Three categories of statutory obligation; **12 hours** for serious incidents, **48 hours** otherwise, written report within **14 days** |
| [Banking sector Code of Practice issued by the Monetary Authority](https://brdr.hkma.gov.hk/eng/doc-ldg/docId/20260527-25-EN) | 2026-06-02 | Applies to authorized institutions designated as CI operators |

### PCPD (8 controls)

| Document | Notes |
| --- | --- |
| [Personal Data (Privacy) Ordinance (Cap. 486) — six Data Protection Principles](https://www.pcpd.org.hk/english/data_privacy_law/6_data_protection_principles/principles.html) | Centred on DPP4, the data security principle |

## How applicability is decided

Each control's `applicability` has two parts:

- **`licenses` (any match)** — applies if any one of the ticked licences appears in the list
- **`attributes` (all required)** — applies only if **every** listed business characteristic is ticked

For example, the SFC Hacking Risks controls apply to `Types 1, 2, 3, 9` and `VASP`, but **only** when
"offers internet trading facilities" is also ticked — matching paragraph 3 of the Guidelines (Type 3 is
limited to licensed leveraged foreign exchange traders; Type 9 to distributing its own funds through its
own internet trading facility).

## About "merge duplicates across regulators"

Merging happens only on a **bidirectional cross-reference**: control A references B **and** B references A.
A one-way reference shows up as a "see also" tag and is not merged.

That rule is deliberately conservative. Taking the transitive closure of references would wrongly equate
provisions of unequal scope — merging "daily offline backup" with "test the ability to deliver critical
operations under severe but plausible scenarios", say, or merging the mandatory 12-hour statutory incident
notification with voluntary notification under the PDPO. Those are different obligations, and merging them
would mislead.

Selecting every licence and characteristic, the 102 provisions collapse to **82** distinct requirements.

> **Deployment note**: do not delete `.nojekyll` in the repository root. GitHub Pages processes sites with
> Jekyll by default, and Jekyll ignores paths beginning with an underscore — which would make
> `data/_registry.js` return 404 and stop the application from starting.

## Languages

The interface, the control descriptions and the CSV export are available in English, Traditional Chinese
and Simplified Chinese. The language is picked from `?lang=`, then a saved preference, then the browser's
`Accept-Language`, falling back to English. It is switchable in the header and remembered across visits.

Quoted provisions are **never translated** — they are always reproduced in the official English text as
published by the regulator, with a link to the source. Where any description differs from the official
text, the official text governs.

```
data/i18n/
├── zh-Hans.js     Simplified UI strings (the base data itself is Simplified)
├── zh-Hant.js     Traditional layer — GENERATED, do not edit by hand
└── en.js          English layer — UI strings and all control text
```

The base data is authored in Simplified Chinese. The Traditional layer is generated from it with OpenCC
in `s2hk` mode, so the vocabulary is Hong Kong's (網絡 / 軟件 / 私隱, not the Taiwan forms), with a small
override table restoring the character forms used in Hong Kong legislation and by the HKMA and SFC
(戶 / 說 / 啟 / 群 / 溫 / 閱 rather than the Education Bureau's 户 / 説 / 啓 / 羣 / 温 / 閲).

To regenerate after changing any Chinese text:

```bash
pip install opencc-python-reimplemented
python3 tools/gen-hant.py
```

English is hand-written against the regulators' English source documents rather than translated from the
Chinese — the SFC circulars, HKMA SPM modules and the Codes of Practice are English-language originals, so
the English text matches the wording a reader will find in the cited document.

## Data structure

```
.nojekyll                 disables Jekyll on GitHub Pages (required, do not delete)
data/
├── _registry.js          global registry and locale lookup
├── sources.js            20 source documents (title, date, legal status, official link)
├── taxonomy.js           14 licences · 6 business characteristics · 10 control domains
├── i18n/
│   ├── zh-Hans.js        Simplified UI strings
│   ├── zh-Hant.js        Traditional layer (generated)
│   └── en.js             English layer
└── controls/
    ├── sfc-internet-trading.js    SFC Hacking Risks Guidelines (20) + Code of Conduct
    ├── sfc-circulars-2026.js      the two 2026 SFC circulars
    ├── hkma.js                    TM-G-1 / TM-E-1 / TM-C-1 / OR-2 / SA-2 / C-RAF
    ├── svf.js                     SVF Guideline and Practice Note
    ├── pdpo.js                    the six Data Protection Principles
    └── critical-infrastructure.js the three categories of CI obligation
```

A single control looks like this — authored in Simplified Chinese, with other languages supplied by the
overlay files in `data/i18n/`:

```js
{
  id: 'SFC-IT-1.1',
  domain: 'identity',                  // control domain, see taxonomy.js
  priority: 'baseline',                // baseline | enhanced
  sourceId: 'sfc-hacking',             // points into sources.js
  clause: '1.1',                       // clause number in the source document
  title: '客户账户登录须实施双重认证',
  requirement: '……',
  quote: 'A licensed or registered person should implement …',  // official English, never translated
  quoteStatus: 'excerpt',               // verbatim | excerpt | summary
  applicability: { licenses: [...], attributes: [...] },
  deadline: '2027-07-08',              // optional compliance deadline
  crossRefs: ['SFC-PH-A1', 'HKMA-TME1-4.1']
}
```

## Known gaps

**The Insurance Authority (IA) cybersecurity guidelines are not yet included.** The whole of `ia.org.hk`
sits behind Cloudflare bot verification, so automated tools cannot retrieve the source PDFs. This project
does not accept provisions written from memory, so no IA controls will be added until the official text can
be obtained, and insurance intermediaries / authorized insurers are not yet listed among the licence
options. Pull requests welcome — please cite the official PDF and clause numbers.

## Contributing

Additions, corrections and regulatory updates are welcome. Before submitting, run the validator:

```bash
node tools/validate.mjs
node --test tests/*.test.mjs
```

It checks that IDs are unique, sources exist, domains / licences / characteristics are valid, cross
references resolve, required fields and source-text classifications are present, every source has a
`verifiedOn`, **and that the English and Traditional layers are complete** — a control added without its
translations fails the build. Unit tests cover applicability, merging, v1 migration, project validation,
due dates and CSV injection protection. Sources unchecked for more than 180 days raise a warning.

`.github/workflows/ci.yml` runs this on every pull request, and also confirms the generated Traditional
files are up to date. A separate weekly workflow re-checks all 20 source links:

```bash
node tools/check-links.mjs
```

It fails only on a definite 404 / 410 / DNS failure; 403 and 429 are usually bot protection and 5xx or
timeouts are usually transient, so those are reported without failing — a permanently red check gets
ignored. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

[MIT](LICENSE). Copyright in the quoted provisions remains with the respective regulators; this project
only reproduces them in structured form and links to the official sources.
