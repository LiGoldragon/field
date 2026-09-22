#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const primary = path.resolve(process.env.FIELD_PRIMARY_ROOT || '/home/li/primary');
const toolNames = [
  'field-census.mjs', 'field-census-cycle.mjs', 'field-checkup-shadow.mjs',
  'field-checkup-shadow-cycle.mjs', 'field-flow-preflight.mjs',
  'prompt-archive.py', 'field-luna-heartbeat.mjs',
];
const digest = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const inspect = file => {
  try { const stat = fs.statSync(file); return {path: file, state: 'present', bytes: stat.size, sha256: digest(file)}; }
  catch (error) { return {path: file, state: error.code === 'ENOENT' ? 'absent' : 'unavailable', error: String(error.message)}; }
};
const stateRoot = process.env.XDG_STATE_HOME || path.join(os.homedir(), '.local/state');
const codexIndex = path.join(os.homedir(), '.codex/session_index.jsonl');
const census = path.join(stateRoot, 'field-census/latest.json');
const archive = path.join(primary, 'tools/prompt-archive.py');
const tools = Object.fromEntries(toolNames.map(name => [name, inspect(path.join(primary, 'tools', name))]));
const result = {
  version: 1,
  observed_at: new Date().toISOString(),
  mode: 'read-only',
  primary_root: primary,
  tools,
  passive_locators: {
    census_snapshot: inspect(census),
    codex_session_index: inspect(codexIndex),
    prompt_archive: inspect(archive),
  },
  exclusions: ['field-luna-heartbeat.mjs is lifecycle-mutating and is never invoked'],
};
console.log(`${JSON.stringify(result)}\n`);
