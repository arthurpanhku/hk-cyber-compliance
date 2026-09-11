import test from 'node:test';
import assert from 'node:assert/strict';

await import('../js/engine.js');
const E = globalThis.HKCCEngine;

const controls = [
  { id: 'A', priority: 'baseline', applicability: { licenses: ['l1'], attributes: ['a1'] }, crossRefs: ['B'] },
  { id: 'B', priority: 'enhanced', applicability: { licenses: ['l1'], attributes: ['a1'] }, crossRefs: ['A'] },
  { id: 'C', priority: 'baseline', applicability: { licenses: ['l2'], attributes: [] }, crossRefs: ['A'] }
];
const byId = new Map(controls.map(c => [c.id, c]));

test('applies uses any licence and all attributes', () => {
  assert.equal(E.applies(controls[0], new Set(['l1']), new Set()), false);
  assert.equal(E.applies(controls[0], new Set(['l1']), new Set(['a1'])), true);
  assert.equal(E.applies(controls[0], new Set(['l2']), new Set(['a1'])), false);
});

test('cluster merges reciprocal references only', () => {
  assert.deepEqual(E.cluster(controls, byId, true).map(g => g.map(c => c.id)), [['A', 'B'], ['C']]);
  assert.deepEqual(E.cluster(controls, byId, false).map(g => g.map(c => c.id)), [['A'], ['B'], ['C']]);
});

test('pendingCount includes unassessed, partial and gap', () => {
  assert.equal(E.pendingCount(controls.slice(0, 2), { A: { status: 'done' }, B: { status: 'na' } }), 0);
  assert.equal(E.pendingCount(controls.slice(0, 2), { A: { status: 'partial' } }), 2);
});

test('v1 merged state propagates without overwriting explicit member state', () => {
  const migrated = E.migrateV1({
    licenses: ['l1'], attributes: ['a1'], merge: true,
    assessment: { A: 'done', B: 'partial', UNKNOWN: 'gap' }
  }, controls);
  assert.equal(migrated.assessments.A.status, 'done');
  assert.equal(migrated.assessments.B.status, 'partial');
  assert.equal(migrated.unresolvedAssessments.UNKNOWN.status, 'gap');
});

test('v1 merged state propagates to an unassessed member', () => {
  const migrated = E.migrateV1({
    licenses: ['l1'], attributes: ['a1'], merge: true, assessment: { A: 'done' }
  }, controls);
  assert.equal(migrated.assessments.B.status, 'done');
});

test('v1 unmerged state stays on its original control', () => {
  const migrated = E.migrateV1({
    licenses: ['l1'], attributes: ['a1'], merge: false, assessment: { A: 'done' }
  }, controls);
  assert.equal(migrated.assessments.A.status, 'done');
  assert.equal(migrated.assessments.B, undefined);
});

test('csvCell neutralises formulas and escapes quotes', () => {
  assert.equal(E.csvCell('=2+2'), '"\'=2+2"');
  assert.equal(E.csvCell('+SUM(A1)'), '"\'+SUM(A1)"');
  assert.equal(E.csvCell('a,"b"'), '"a,""b"""');
});

test('dueState is reproducible from the assessment date', () => {
  assert.equal(E.dueState('2026-09-08', '2026-09-09'), 'overdue');
  assert.equal(E.dueState('2026-10-09', '2026-09-09'), 'due-soon');
  assert.equal(E.dueState('2026-10-10', '2026-09-09'), '');
  assert.equal(E.dueState('2026-02-30', '2026-02-01'), '');
});

const definitions = {
  controlIds: new Set(['A', 'B']),
  licenseIds: new Set(['l1']),
  attributeIds: new Set(['a1'])
};

test('project validation normalises known data and quarantines unknown controls', () => {
  const result = E.validateProject({
    schemaVersion: 2,
    controlDataVersion: '1.2.0',
    exportedAt: '2026-09-09T00:00:00.000Z',
    project: { name: 'Test', asOfDate: '2026-09-09' },
    scope: { licenses: ['l1', 'old-licence'], attributes: ['a1'] },
    assessments: {
      A: { status: 'partial', owner: 'Risk' },
      OLD: { status: 'gap', evidenceRef: 'ticket-1' }
    }
  }, definitions);
  assert.equal(result.ok, true);
  assert.deepEqual(result.data.scope.licenses, ['l1']);
  assert.equal(result.data.assessments.A.owner, 'Risk');
  assert.equal(result.data.unresolvedAssessments.OLD.status, 'gap');
  assert.ok(result.warnings.length >= 2);
});

test('project validation rejects future schemas and invalid records atomically', () => {
  assert.equal(E.validateProject({ schemaVersion: 3 }, definitions).ok, false);
  const invalid = E.validateProject({
    schemaVersion: 2,
    project: { name: 'Test', asOfDate: '09/09/2026' },
    scope: { licenses: ['l1'], attributes: [] },
    assessments: { A: { status: '=bad' } }
  }, definitions);
  assert.equal(invalid.ok, false);
  assert.ok(invalid.errors.length >= 2);

  const impossibleDate = E.validateProject({
    schemaVersion: 2,
    project: { name: 'Test', asOfDate: '2026-02-30' },
    scope: { licenses: ['l1'], attributes: [] },
    assessments: {}
  }, definitions);
  assert.equal(impossibleDate.ok, false);
});

test('a formerly unknown control is restored when the current data recognises it', () => {
  const result = E.validateProject({
    schemaVersion: 2,
    project: { name: 'Test', asOfDate: '2026-09-09' },
    scope: { licenses: ['l1'], attributes: [] },
    assessments: {},
    unresolvedAssessments: { A: { status: 'done', owner: 'Risk' } }
  }, definitions);
  assert.equal(result.ok, true);
  assert.equal(result.data.assessments.A.status, 'done');
  assert.equal(result.data.unresolvedAssessments.A, undefined);
});

test('legacy project files migrate explicitly', () => {
  const result = E.validateProject({
    schemaVersion: 1,
    licenses: ['l1'], attributes: ['a1'], assessment: { A: 'done' }
  }, definitions);
  assert.equal(result.ok, true);
  assert.equal(result.data.schemaVersion, 2);
  assert.equal(result.data.assessments.A.status, 'done');
});
