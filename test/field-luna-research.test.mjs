import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const repo = path.resolve(import.meta.dirname, '..');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'field-luna-research-'));
const state = path.join(root, 'state');
const run = (runner = path.join(repo, 'test/fake-codex.mjs'), extra = {}) => spawnSync(process.execPath, [path.join(repo, 'bin/field-luna-research.mjs'), '--once', '--state-dir', state, '--runner', runner], {encoding: 'utf8', env: {...process.env, FIELD_PRIMARY_ROOT: '/home/li/primary', ...extra}});
try {
  const noOutput = path.join(root, 'no-output.mjs'); fs.writeFileSync(noOutput, '#!/usr/bin/env node\n'); fs.chmodSync(noOutput, 0o700);
  const failed = run(noOutput); assert.equal(failed.status, 1); assert.equal(JSON.parse(failed.stdout).outcome, 'retryable-failure');
  const sleeper = path.join(root, 'sleeper.mjs'); fs.writeFileSync(sleeper, '#!/usr/bin/env node\nsetTimeout(() => {}, 1000);'); fs.chmodSync(sleeper, 0o700);
  const timedOut = run(sleeper, {FIELD_LUNA_TIMEOUT_MS: '10'}); assert.equal(timedOut.status, 1); assert.equal(JSON.parse(timedOut.stdout).outcome, 'retryable-failure');
  for (let index = 0; index < 6; index++) { const result = run(); assert.equal(result.status, 0, result.stderr); assert.equal(JSON.parse(result.stdout).outcome, 'completed'); }
  const skipped = run(); assert.equal(skipped.status, 0, skipped.stderr); assert.equal(JSON.parse(skipped.stdout).outcome, 'skipped-unchanged');
  const files = fs.readdirSync(path.join(state, 'receipts')); assert.equal(files.filter(x => x.endsWith('.json')).length, 8); assert.equal(files.filter(x => x.endsWith('.md')).length, 6);
  console.log('field Luna research loop fixtures passed');
} finally { fs.rmSync(root, {recursive: true, force: true}); }
