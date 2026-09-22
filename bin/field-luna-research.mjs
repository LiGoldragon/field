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
const startedAt = Date.now();
const timeoutMilliseconds = Math.min(600_000, Math.max(1, Number(process.env.FIELD_LUNA_TIMEOUT_MS || 600_000)));
const cycleTtlMilliseconds = 7 * 24 * 60 * 60 * 1000;
const questions = [
  {id: 'session-inventory', text: 'Inspect session inventory locators in Field source, including local Codex index/rollout paths and any remote locator references. Describe only observable evidence and any unavailable remote boundary.'},
  {id: 'census-boundaries', text: 'Inspect passive Field census and checkup source. State exactly which reads happen and identify boundaries that prevent lifecycle mutation.'},
  {id: 'archive-retrieval-trace', text: 'Inspect prompt-archive source and tests. Describe content-addressed materialize/get/info/verify operations, retrieval trace evidence, and whether any deletion/pruning exists.'},
  {id: 'transcript-behavior', text: 'Inspect transcript locator and census source. Describe how Codex and Claude transcript paths are inferred, and identify any uncertain or unavailable cases without opening or changing session state.'},
  {id: 'herdr-fixture', text: 'Inspect the existing Field source and Herdr CLI help. Propose one disposable, proven-cleanup fixture experiment; do not run any production Herdr action.'},
  {id: 'opencode-availability', text: 'Inspect source references to OpenCode and local binary availability. Record a safe research boundary and whether an offline fixture is possible.'},
];
const sources = [
  'tools/field-census.mjs', 'tools/field-checkup-shadow.mjs', 'tools/prompt-archive.py',
  'tools/test_prompt_archive.py', 'tools/field-luna-heartbeat.mjs', 'tools/field-census/codex-context.mjs', 'tools/third-seat/provider-run.mjs', 'tools/third-seat/README.md',
];
const sha = file => { try { return crypto.createHash('sha256').update(fs.readFileSync(path.join(primary, file))).digest('hex'); } catch { return 'absent'; } };
const version = executable => { const result = spawnSync(executable, ['--version'], {encoding: 'utf8', timeout: 5000}); return result.status === 0 ? (result.stdout || '').trim() : 'unavailable'; };
const sourceStates = sources.map(file => [file, sha(file)]);
const sourceDigest = crypto.createHash('sha256').update(JSON.stringify({sources: sourceStates, tools: {herdr: version('herdr'), opencode: version('opencode')}, questions, version: 3})).digest('hex');
fs.mkdirSync(path.join(stateDir, 'receipts'), {recursive: true, mode: 0o700});
const stateFile = path.join(stateDir, 'state.json');
let state = {version: 2, completed: {}};
try { state = JSON.parse(fs.readFileSync(stateFile, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const prior = state.completed?.[sourceDigest] || {questions: [], expires_at: null};
const completed = Date.parse(prior.expires_at || '') > startedAt ? prior.questions : [];
const question = questions.find(item => !completed.includes(item.id));
const write = (file, value) => { const temp = `${file}.${process.pid}.tmp`; fs.writeFileSync(temp, `${JSON.stringify(value)}\n`, {mode: 0o600}); fs.renameSync(temp, file); };
const missingSources = sourceStates.filter(([, state]) => state === 'absent').map(([file]) => file);
if (missingSources.length) {
  const receipt = {version: 3, at: now, outcome: 'blocked-missing-source', source_digest: sourceDigest, missing_sources: missingSources};
  write(path.join(stateDir, 'latest.json'), receipt); console.log(JSON.stringify(receipt)); process.exit(1);
}
if (!question) {
  const receipt = {version: 2, at: now, outcome: 'skipped-unchanged', source_digest: sourceDigest, completed_questions: completed, retry_after: prior.expires_at};
  write(path.join(stateDir, 'latest.json'), receipt); console.log(JSON.stringify(receipt)); process.exit(0);
}
const prompt = [
  'You are an ephemeral research worker. You have no Flow identity.',
  'Read only relevant files beneath the Primary tools directory and the named source list. You may run only `herdr --help` and `command -v opencode` as bounded local availability probes. Do not change files, invoke a Herdr action, send messages, create sessions, archive/delete data, or make network requests.',
  `Question: ${question.text}`,
  `Primary root: ${primary}`,
  `Sources: ${sources.join(', ')}`,
  'Return a compact evidence report with source paths and a conclusion. If evidence is absent, say so.',
].join('\n');
const attemptId = `${now.replaceAll(/[:.]/g, '-')}-${question.id}`;
const output = path.join(stateDir, 'receipts', `${attemptId}.md`);
const result = spawnSync(runner, ['exec', '--ephemeral', '--sandbox', 'read-only', '--model', 'gpt-5.6-luna', '-c', 'model_reasoning_effort="medium"', '-C', primary, '--output-last-message', output, prompt], {encoding: 'utf8', timeout: timeoutMilliseconds, maxBuffer: 1_048_576});
let report = null;
try { const stat = fs.statSync(output); if (stat.size > 0 && stat.mtimeMs >= startedAt) report = {path: output, sha256: crypto.createHash('sha256').update(fs.readFileSync(output)).digest('hex'), bytes: stat.size}; } catch { /* A missing/stale/empty report cannot complete research. */ }
const succeeded = !result.error && !result.signal && result.status === 0 && report !== null;
const receipt = {
  version: 2, at: now, outcome: succeeded ? 'completed' : 'retryable-failure',
  question: question.id, source_digest: sourceDigest, runner, model: 'gpt-5.6-luna', effort: 'medium',
  ephemeral: true, sandbox: 'read-only', timeout_seconds: timeoutMilliseconds / 1000,
  exit_status: result.status, signal: result.signal, error: result.error ? String(result.error.message) : null,
  stdout_sha256: crypto.createHash('sha256').update(result.stdout || '').digest('hex'),
  worker_report: report,
};
if (succeeded) state.completed = {...state.completed, [sourceDigest]: {questions: [...completed, question.id], expires_at: new Date(startedAt + cycleTtlMilliseconds).toISOString()}};
write(stateFile, state);
write(path.join(stateDir, 'latest.json'), receipt);
write(path.join(stateDir, 'receipts', `${attemptId}.json`), receipt);
console.log(JSON.stringify(receipt));
process.exit(succeeded ? 0 : 1);
