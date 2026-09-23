#!/usr/bin/env node
/*
 * Read-only aspect inventory.  Inputs are deliberately opt-in: this command
 * never locates a live registry, invokes Herdr/Orchestrate, or reads a flow
 * transcript by itself.
 */
import fs from 'node:fs';
import path from 'node:path';

const REDACTED = '[redacted]';
const secretKey = /(?:secret|password|passphrase|api[_-]?key|access[_-]?token|refresh[_-]?token|oauth|pairing|credential|authorization)/i;
const secretText = /\b(?:bearer\s+\S+|(?:oauth|access[_ -]?token|refresh[_ -]?token|api[_ -]?key|pairing(?:[_ -]?code)?|password|secret)\s*[:=]\s*\S+)/ig;

function redact(value, key = '') {
  if (secretKey.test(key)) return REDACTED;
  if (typeof value === 'string') return value.replace(secretText, REDACTED);
  if (Array.isArray(value)) return value.map(item => redact(item));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, redact(item, name)]));
  return value;
}

function args(argv) {
  const result = {};
  const names = new Set(['--census', '--orchestrate', '--records']);
  for (let i = 0; i < argv.length; i += 1) {
    if (!names.has(argv[i]) || !argv[i + 1]) throw new Error(`expected --census, --orchestrate, or --records followed by a file path`);
    result[argv[i].slice(2)] = argv[++i];
  }
  return result;
}

function input(name, file) {
  if (!file) return {data: null, source: {state: 'not-supplied'}};
  try {
    const stat = fs.statSync(file);
    return {data: JSON.parse(fs.readFileSync(file, 'utf8')), source: {state: 'observed', path: path.resolve(file), observed_at: stat.mtime.toISOString()}};
  } catch (error) {
    return {data: null, source: {state: error.code === 'ENOENT' ? 'absent' : 'unavailable', path: path.resolve(file), error: String(error.message)}};
  }
}

function collection(data, names) {
  if (Array.isArray(data)) return data;
  for (const name of names) if (Array.isArray(data?.[name])) return data[name];
  return [];
}

function aspectOf(row) {
  if (typeof row.aspect === 'string' && row.aspect.trim()) return {value: row.aspect.trim(), source: 'observed'};
  return {value: 'Unknown', source: 'unknown'};
}

function freshness(row, fallback) {
  const value = row.last_activity ?? row.lastActivity ?? row.freshness?.threadUpdatedAt ?? row.observed_at ?? fallback.observed_at ?? null;
  return {observed_at: value, source: value ? 'input' : 'unknown'};
}

function locks(data) {
  const rows = collection(data, ['locks', 'rows', 'result']);
  const byFlow = new Map();
  for (const row of rows) {
    const flow = row.flow_id ?? row.flowId ?? row.flow;
    if (!flow) continue;
    const values = byFlow.get(String(flow)) ?? [];
    values.push(redact(row));
    byFlow.set(String(flow), values);
  }
  return byFlow;
}

function description(row, field, recordsSource) {
  const value = row[field] ?? row[`${field}_description`] ?? null;
  if (value === null || value === undefined || value === '') return {value: null, source: 'unknown', freshness: {observed_at: null, source: 'unknown'}};
  const kind = row.interpretation === 'light-model' || row.source === 'light-model' || row.provenance === 'light-model-inference'
    ? 'light-model-inference' : 'observed-record';
  return {value: redact(String(value)), source: kind, freshness: freshness(row, recordsSource)};
}

function main() {
  const cli = args(process.argv.slice(2));
  const census = input('census', cli.census ?? process.env.FIELD_ASPECT_STATUS_CENSUS);
  const orchestrate = input('orchestrate', cli.orchestrate ?? process.env.FIELD_ASPECT_STATUS_ORCHESTRATE);
  const records = input('records', cli.records ?? process.env.FIELD_ASPECT_STATUS_RECORDS);
  const recordRows = collection(records.data, ['records', 'rows', 'flows']);
  const recordByFlow = new Map();
  for (const row of recordRows) if (row && (row.flow_id ?? row.flowId)) recordByFlow.set(String(row.flow_id ?? row.flowId), row);
  const lockByFlow = locks(orchestrate.data);
  const censusRows = collection(census.data, ['rows', 'flows']);
  const groups = new Map();

  // Do not deduplicate: simultaneous peers and ambiguous/stale rows are facts.
  for (const raw of censusRows) {
    const row = raw && typeof raw === 'object' ? raw : {};
    const flowId = row.flow_id ?? row.flowId ?? null;
    const record = flowId === null ? null : recordByFlow.get(String(flowId));
    const aspect = aspectOf(record?.aspect ? record : row);
    const native = row.native_thread ?? row.nativeThread ?? row.binding?.native_thread ?? null;
    const model = row.model ?? row.display_model ?? row.context?.model ?? null;
    const activityValue = row.lifecycle ?? row.status ?? row.availability ?? 'unknown';
    const merged = {...row, ...(record ?? {})};
    const flow = redact({
      flow_id: flowId, native_thread: native, model,
      activity: {value: activityValue, source: census.source.state === 'observed' ? 'observed-census' : census.source.state, freshness: freshness(row, census.source)},
      task: description(merged, 'task', records.source),
      blocker: description(merged, 'blocker', records.source),
      freshness: freshness(row, census.source),
      provenance: {census: census.source.state, record: record ? records.source.state : 'none', aspect: aspect.source},
      locks: flowId === null ? [] : lockByFlow.get(String(flowId)) ?? [],
    });
    const bucket = groups.get(aspect.value) ?? {aspect: aspect.value, aspect_source: aspect.source, flows: []};
    bucket.flows.push(flow);
    groups.set(aspect.value, bucket);
  }
  // Records without a census peer remain visible rather than being discarded.
  for (const [flowId, record] of recordByFlow) if (!censusRows.some(row => String(row?.flow_id ?? row?.flowId) === flowId)) {
    const aspect = aspectOf(record);
    const bucket = groups.get(aspect.value) ?? {aspect: aspect.value, aspect_source: aspect.source, flows: []};
    bucket.flows.push(redact({flow_id: flowId, native_thread: record.native_thread ?? null, model: record.model ?? null, activity: {value: record.activity ?? 'unknown', source: records.source.state === 'observed' ? 'observed-record' : records.source.state, freshness: freshness(record, records.source)}, task: description(record, 'task', records.source), blocker: description(record, 'blocker', records.source), freshness: freshness(record, records.source), provenance: {census: 'none', record: records.source.state, aspect: aspect.source}, locks: lockByFlow.get(flowId) ?? []}));
    groups.set(aspect.value, bucket);
  }
  console.log(`${JSON.stringify({version: 1, mode: 'read-only', generated_at: new Date().toISOString(), sources: {census: census.source, orchestrate: orchestrate.source, records: records.source}, aspects: [...groups.values()], notes: ['Input paths are explicit; this tool does not contact lifecycle services.', 'Descriptions marked light-model-inference are interpretations, not observations.']})}\n`);
}

main();
