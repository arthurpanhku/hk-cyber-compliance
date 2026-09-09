/**
 * 《個人資料（私隱）條例》（第 486 章）——與資訊保安相關的保障資料原則。
 * 適用於任何收集、持有、處理或使用個人資料的資料使用者，不論有否金融牌照。
 */
(function () {
  const ALL = ['sfc-ra1', 'sfc-ra2', 'sfc-ra3', 'sfc-ra4', 'sfc-ra5', 'sfc-ra6', 'sfc-ra7',
    'sfc-ra8', 'sfc-ra9', 'sfc-ra13', 'sfc-vasp', 'hkma-ai', 'hkma-svf', 'other'];
  const src = 'pdpo';

  HKCC.addControls([
    {
      id: 'PDPO-DPP4-1', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP4',
      title: 'DPP4 資料保安原則：採取切實可行步驟保護個人資料',
      requirement: '採取一切切實可行的步驟，保障所持有的個人資料不會未獲授權或意外地被查閱、處理、刪除、喪失或使用。考慮因素包括資料的種類及一旦發生上述事故可能造成的損害、儲存資料的地點、儲存設備的保安措施、可查閱資料的人員的誠信謹慎與能力，以及傳送資料時的保安措施。',
      quote: 'DPP4 - Data Security Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] },
      crossRefs: ['SFC-IT-1.4', 'HKMA-TMG1-3']
    },
    {
      id: 'PDPO-DPP4-2', domain: 'thirdparty', priority: 'baseline', sourceId: src, clause: 'DPP4(2)',
      title: 'DPP4 委託處理者：以合約或其他方法確保資料獲同等保護',
      requirement: '如將個人資料交由代理人或承辦商處理，須採取合約或其他方法，防止該等資料未獲授權或意外地被查閱、處理、刪除、喪失或使用。資料使用者對受託方的行為仍須負責。',
      quote: 'DPP4 - Data Security Principle（委託處理情形）',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data', 'outsourcing'] },
      crossRefs: ['SFC-IT-2.10', 'HKMA-SA2-1']
    },
    {
      id: 'PDPO-DPP2', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP2',
      title: 'DPP2 準確性及保留期：不保存超逾所需時間',
      requirement: '採取切實可行步驟確保個人資料準確，並確保資料的保存時間不超逾達致使用目的所需的時間。逾期資料須予以刪除，以縮小一旦發生資料外泄事故的影響範圍。',
      quote: 'DPP2 - Accuracy & Retention Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-DPP1', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP1',
      title: 'DPP1 收集原則：只收集必需且不超乎適度的資料',
      requirement: '只為與職能或活動直接相關的合法目的收集個人資料，且收集的資料屬必需但不超乎適度。收集時須以合法及公平的方法進行，並向資料當事人作出指定告知。',
      quote: 'DPP1 - Data Collection Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-DPP3', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP3',
      title: 'DPP3 使用原則：新目的使用須獲訂明同意',
      requirement: '除獲資料當事人自願給予的明示及告知性同意（訂明同意）外，個人資料只可用於收集時述明的目的或直接相關的目的。',
      quote: 'DPP3 - Data Use Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-DPP5', domain: 'governance', priority: 'baseline', sourceId: src, clause: 'DPP5',
      title: 'DPP5 公開原則：公開私隱政策及資料種類',
      requirement: '採取切實可行步驟，公開其處理個人資料的政策與實務、所持有個人資料的種類，以及資料的主要使用目的。',
      quote: 'DPP5 - Openness Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-DPP6', domain: 'data', priority: 'baseline', sourceId: src, clause: 'DPP6',
      title: 'DPP6 查閱及改正：處理資料當事人的查閱與改正要求',
      requirement: '建立程序處理資料當事人的查閱資料要求及改正要求，並在法定時限內回覆。',
      quote: 'DPP6 - Data Access & Correction Principle',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] }
    },
    {
      id: 'PDPO-BREACH', domain: 'respond', priority: 'baseline', sourceId: src, clause: '私隱專員公署指引',
      title: '資料外泄事故的處理與通報',
      requirement: '就資料外泄事故建立處理程序。須注意：《個人資料（私隱）條例》現時並無強制的資料外泄通報責任，向私隱專員公署及受影響資料當事人作出通報屬自願性質，但屬良好行事常規。若機構同時受其他制度規限（如已被指定為關鍵基礎設施營運者，或屬證監會持牌法團／金管局認可機構），相關制度下的強制通報時限仍然適用，須一併遵守。',
      quote: 'Guidance on Data Breach Handling and Data Breach Notifications（私隱專員公署指引）',
      quoteStatus: 'summary',
      applicability: { licenses: ALL, attributes: ['personal-data'] },
      crossRefs: ['SFC-PH-C1', 'CI-CAT3-3'],
      note: '本條的「自願通報」表述以 2026-09-08 核驗日的法律狀態為準；若日後條例修訂引入強制通報，須相應更新。'
    }
  ]);
})();
