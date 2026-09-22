import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const repo = path.resolve(import.meta.dirname, '..');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'field-readiness-'));
try {
  const result = spawnSync(process.execPath, [path.join(repo, 'bin/field-readiness.mjs')], {encoding: 'utf8', env: {...process.env, FIELD_PRIMARY_ROOT: root}});
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.mode, 'read-only');
  assert.equal(report.tools['field-census.mjs'].state, 'absent');
  assert.equal(report.passive_locators.prompt_archive.state, 'absent');
  console.log('field readiness missing-source fixture passed');
} finally { fs.rmSync(root, {recursive: true, force: true}); }
