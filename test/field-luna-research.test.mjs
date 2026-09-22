import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const repo = path.resolve(import.meta.dirname, '..');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'field-luna-research-'));
const state = path.join(root, 'state');
const run = () => spawnSync(process.execPath, [path.join(repo, 'bin/field-luna-research.mjs'), '--once', '--state-dir', state, '--runner', path.join(repo, 'test/fake-codex.mjs')], {encoding: 'utf8', env: {...process.env, FIELD_PRIMARY_ROOT: '/home/li/primary'}});
try {
  for (let index = 0; index < 6; index++) { const result = run(); assert.equal(result.status, 0, result.stderr); assert.equal(JSON.parse(result.stdout).outcome, 'completed'); }
  const skipped = run(); assert.equal(skipped.status, 0, skipped.stderr); assert.equal(JSON.parse(skipped.stdout).outcome, 'skipped-unchanged');
  const files = fs.readdirSync(path.join(state, 'receipts')); assert.equal(files.length, 6);
  console.log('field Luna research loop fixtures passed');
} finally { fs.rmSync(root, {recursive: true, force: true}); }
