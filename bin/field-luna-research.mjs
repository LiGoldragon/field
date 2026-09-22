#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const args = process.argv.slice(2);
const option = name => { const index = args.indexOf(name); return index < 0 ? null : args[index + 1]; };
if (!args.includes('--once')) throw new Error('only --once is supported; schedule externally with the supplied timer');
const primary = path.resolve(process.env.FIELD_PRIMARY_ROOT || '/home/li/primary');
const stateDir = path.resolve(option('--state-dir') || path.join(process.env.XDG_STATE_HOME || path.join(os.homedir(), '.local/state'), 'field-luna-research'));
const runner = option('--runner') || 'codex';
const now = new Date().toISOString();
const questions = [
  {id: 'census-boundaries', text: 'Inspect passive Field census and checkup source. State exactly which reads happen and identify boundaries that prevent lifecycle mutation.'},
  {id: 'archive-contract', text: 'Inspect prompt-archive source and tests. Describe content-addressed operations, verification, and whether any deletion/pruning exists.'},
  {id: 'herdr-fixture', text: 'Inspect the existing Field source and Herdr CLI help. Propose one disposable, proven-cleanup fixture experiment; do not run any production Herdr action.'},
  {id: 'opencode-availability', text: 'Inspect source references to OpenCode and local binary availability. Record a safe research boundary and whether an offline fixture is possible.'},
];
const sources = [
  'tools/field-census.mjs', 'tools/field-checkup-shadow.mjs', 'tools/prompt-archive.py',
  'tools/test_prompt_archive.py', 'tools/field-luna-heartbeat.mjs', 'tools/third-seat/provider-run.mjs',
];
const sha = file => { try { return crypto.createHash('sha256').update(fs.readFileSync(path.join(primary, file))).digest('hex'); } catch { return 'absent'; } };
const sourceDigest = crypto.createHash('sha256').update(sources.map(file => `${file}:${sha(file)}`).join('\n')).digest('hex');
fs.mkdirSync(path.join(stateDir, 'receipts'), {recursive: true, mode: 0o700});
const stateFile = path.join(stateDir, 'state.json');
let state = {version: 1, completed: {}};
try { state = JSON.parse(fs.readFileSync(stateFile, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const completed = state.completed?.[sourceDigest] || [];
const question = questions.find(item => !completed.includes(item.id));
const write = (file, value) => { const temp = `${file}.${process.pid}.tmp`; fs.writeFileSync(temp, `${JSON.stringify(value)}\n`, {mode: 0o600}); fs.renameSync(temp, file); };
if (!question) {
  const receipt = {version: 1, at: now, outcome: 'skipped-unchanged', source_digest: sourceDigest, completed_questions: completed};
  write(path.join(stateDir, 'latest.json'), receipt); console.log(JSON.stringify(receipt)); process.exit(0);
}
const prompt = [
  'You are an ephemeral research worker. You have no Flow identity.',
  'Read only the listed Primary source files. Do not change files, invoke Herdr, send messages, create sessions, archive/delete data, or make network requests.',
  `Question: ${question.text}`,
  `Primary root: ${primary}`,
  `Sources: ${sources.join(', ')}`,
  'Return a compact evidence report with source paths and a conclusion. If evidence is absent, say so.',
].join('\n');
const output = path.join(stateDir, 'worker-last-message.txt');
const result = spawnSync(runner, ['exec', '--ephemeral', '--sandbox', 'read-only', '--model', 'gpt-5.6-luna', '-c', 'model_reasoning_effort="medium"', '-C', primary, '--output-last-message', output, prompt], {encoding: 'utf8', timeout: 600_000, maxBuffer: 1_048_576});
const receipt = {
  version: 1, at: now, outcome: result.error ? 'runner-error' : result.status === 0 ? 'completed' : 'runner-failed',
  question: question.id, source_digest: sourceDigest, runner, model: 'gpt-5.6-luna', effort: 'medium',
  ephemeral: true, sandbox: 'read-only', timeout_seconds: 600,
  exit_status: result.status, error: result.error ? String(result.error.message) : null,
  stdout_sha256: crypto.createHash('sha256').update(result.stdout || '').digest('hex'),
  worker_report_sha256: fs.existsSync(output) ? crypto.createHash('sha256').update(fs.readFileSync(output)).digest('hex') : null,
};
if (receipt.outcome === 'completed') state.completed = {...state.completed, [sourceDigest]: [...completed, question.id]};
write(stateFile, state);
write(path.join(stateDir, 'latest.json'), receipt);
write(path.join(stateDir, 'receipts', `${now.replaceAll(/[:.]/g, '-')}-${question.id}.json`), receipt);
console.log(JSON.stringify(receipt));
process.exit(result.status || 0);
