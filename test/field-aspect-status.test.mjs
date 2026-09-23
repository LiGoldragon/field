import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const repo = path.resolve(import.meta.dirname, '..');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'field-aspect-status-'));
const write = (name, value) => { const file = path.join(root, name); fs.writeFileSync(file, JSON.stringify(value)); return file; };
try {
  const census = write('census.json', {rows: [
    {flow_id: 'a1', aspect: 'Field', threadName: 'Field Low a1', native_thread: 'native-a1', context: {model: 'gpt-5.6-terra'}, lifecycle: 'working', last_activity: '2026-09-20T00:00:00Z'},
    {flow_id: 'a1', aspect: 'Field', threadName: 'Field Low a1 duplicate', native_thread: 'native-a1b', display_model: 'gpt-5.6-terra', status: 'idle'},
    {flow_id: 'u1', name: 'unlabelled-peer', status: 'unknown'},
    {flow_id: 't1', threadName: 'Field Low t1', status: 'idle'},
  ]});
  const records = write('records.json', {records: [
    {flow_id: 'a1', aspect: 'Field', task: 'rotate oauth=top-secret and pairing-code=123456', blocker: 'waiting', observed_at: '2026-09-21T00:00:00Z'},
    {flow_id: 'u1', task: 'summarized by a light model', interpretation: 'light-model', observed_at: '2026-09-22T00:00:00Z'},
    {flow_id: 'p1', aspect: 'Psyche', task: 'record-only peer'},
  ]});
  const orchestrate = write('locks.json', {locks: [{flow_id: 'a1', name: 'work', oauth_token: 'must-not-leak'}]});
  const result = spawnSync(process.execPath, [path.join(repo, 'bin/field-aspect-status.mjs'), '--census', census, '--records', records, '--orchestrate', orchestrate], {encoding: 'utf8'});
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  const field = report.aspects.find(x => x.aspect === 'Field');
  assert.equal(field.flows.length, 2, 'duplicate peers are retained');
  assert.equal(field.flows[0].freshness.observed_at, '2026-09-20T00:00:00Z');
  assert.deepEqual(field.flows[0].activity, {value: 'working', source: 'observed-census', freshness: {observed_at: '2026-09-20T00:00:00Z', source: 'input'}});
  assert.equal(field.flows[0].task.value.includes('top-secret'), false, 'task secrets are redacted');
  assert.equal(field.flows[0].locks[0].oauth_token, '[redacted]', 'lock secrets are redacted');
  const unknowns = report.aspects.find(x => x.aspect === 'Unknown').flows;
  const unknown = unknowns.find(flow => flow.flow_id === 'u1');
  assert.equal(unknown.activity.value, 'unknown');
  assert.equal(unknown.task.source, 'light-model-inference');
  assert.equal(unknowns.find(flow => flow.flow_id === 't1').provenance.aspect, 'unknown', 'a Field-like title alone is not an explicit aspect');
  const psyche = report.aspects.find(x => x.aspect === 'Psyche').flows[0];
  assert.equal(psyche.provenance.census, 'none', 'record-only flow is retained');
  console.log('field aspect status fixtures passed');
} finally { fs.rmSync(root, {recursive: true, force: true}); }
