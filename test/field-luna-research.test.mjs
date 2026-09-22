import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn, spawnSync} from 'node:child_process';
const repo = path.resolve(import.meta.dirname, '..');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'field-luna-research-'));
const state = path.join(root, 'state');
const wrapper = path.join(repo, 'bin/field-luna-research-run');
const run = (runner = path.join(repo, 'test/fake-codex.mjs'), extra = {}) => spawnSync(wrapper, ['--once', '--state-dir', state, '--runner', runner], {encoding: 'utf8', env: {...process.env, FIELD_PRIMARY_ROOT: '/home/li/primary', ...extra}});
try {
  const noOutput = path.join(root, 'no-output.mjs'); fs.writeFileSync(noOutput, '#!/usr/bin/env node\n'); fs.chmodSync(noOutput, 0o700);
  const failed = run(noOutput); assert.equal(failed.status, 1); assert.equal(JSON.parse(failed.stdout).outcome, 'retryable-failure');
  const sleeper = path.join(root, 'sleeper.mjs'); fs.writeFileSync(sleeper, '#!/usr/bin/env node\nsetTimeout(() => {}, 1000);'); fs.chmodSync(sleeper, 0o700);
  const timedOut = run(sleeper, {FIELD_LUNA_TIMEOUT_MS: '10'}); assert.equal(timedOut.status, 1); assert.equal(JSON.parse(timedOut.stdout).outcome, 'retryable-failure');
  const crashed = spawn(wrapper, ['--once', '--state-dir', state, '--runner', sleeper], {env: {...process.env, FIELD_PRIMARY_ROOT: '/home/li/primary'}});
  await new Promise(resolve => setTimeout(resolve, 50)); crashed.kill('SIGKILL'); await new Promise(resolve => crashed.on('exit', resolve));
  const recovered = run(); assert.equal(recovered.status, 0, recovered.stderr);
  const missingRoot = fs.mkdtempSync(path.join(root, 'missing-primary-'));
  const missing = run(path.join(repo, 'test/fake-codex.mjs'), {FIELD_PRIMARY_ROOT: missingRoot}); assert.equal(missing.status, 1); assert.equal(JSON.parse(missing.stdout).outcome, 'blocked-missing-source');
  for (let index = 0; index < 5; index++) { const result = run(); assert.equal(result.status, 0, result.stderr); assert.equal(JSON.parse(result.stdout).outcome, 'completed'); }
  const skipped = run(); assert.equal(skipped.status, 0, skipped.stderr); assert.equal(JSON.parse(skipped.stdout).outcome, 'skipped-unchanged');
  const files = fs.readdirSync(path.join(state, 'receipts')); assert.equal(files.filter(x => x.endsWith('.json')).length, 8); assert.equal(files.filter(x => x.endsWith('.md')).length, 6);
  console.log('field Luna research loop fixtures passed');
} finally { fs.rmSync(root, {recursive: true, force: true}); }
