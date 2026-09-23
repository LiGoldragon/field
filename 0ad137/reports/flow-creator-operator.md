# Reusable Flow creator operator

This report is an authored operator contract for Curriculum integration. It
describes a reusable create-or-refresh operation; it is not a launcher,
native-start receipt, Flow identity, route, lifecycle authority, or model
provider. The implementation owner must connect it to the existing
`tools/native-seat-launch.mjs` and `codex-remote` interfaces, preserving their
receipt and fail-closed boundaries.

## Typed input

The operator accepts one typed request with these fields:

```text
FlowCreateRequest {
  operation: Create | Refresh { predecessor: FlowId },
  aspect: Psyche | Mind | Field,
  power: High | Medium | Low | UltraLow,
  seat: Astra | Sol | Terra | Luna | Other(String),
  model: ModelId,
  effort: Light | Medium | High,
  source_manifest: AuditedSourceManifest,
  skills: OrderedStructuredSkillSet,
  task_input: CurrentTask,
  handoff: Optional<HandoffRef>,
  target: Optional<ExistingHerdrTarget>,
  policy: LifecyclePolicy
}
```

The caller must supply the model and effort explicitly. The operator does not
select a newer model, add weights, or infer a power from a seat label. `Create`
requires no predecessor. `Refresh` requires the immediate predecessor's
canonical Flow ID and preserves its records and route until the successor's
readiness and any cutover are separately accepted.

`source_manifest` names the newest applicable Vision, raw Vision, handoff,
distillation, and task sources with provenance and hashes in the machine
receipt. `skills` is an ordered set of structured skill records loaded through
the native interface, including `main-flow` where a native main is requested.
A literal skill token, catalog entry, generated tree, or ordinary file read is
not an expansion receipt. The assembled prompt is created programmatically;
the operator must reject missing, duplicate, stale, or conflicting source and
skill records before resource creation.

`target` is used only for an explicitly authorized existing-thread attachment
or refresh continuation. It contains the exact native thread UUID, Herdr
session/pane/terminal, HM binding, and expected process identity. A name,
pane, PID, or remote registration alone is insufficient. The known recipe
includes Mind Astra `4b0f60`, Herdr `messaging-build/w11:p1`, terminal
`term_65c2b7a716fd85b`; these are witnessed example inputs for validation,
not hardcoded defaults or a claim that the target is still live.

## Create and refresh protocol

1. Validate the typed request and source audit without launching anything.
   Resolve the intended current route and check ownership, held locks,
   predecessor preservation, and whether the operation is create, refresh, or
   attach. A refresh never silently becomes a new create.
2. Build and persist a plan containing the exact model/effort, source and
   skill digests, task reference, predecessor, target binding if any, and a
   unique attempt ID. Repeating the same attempt ID is an idempotent read of
   the existing plan/receipt; it cannot allocate another pane or native UUID.
3. Use the supported `native-seat-launch.mjs` receipt-first path through the
   existing `codex-remote` app-server. The first native turn is receipt-only.
   It must prove the requested model/effort, expanded structured skills,
   selected source set, prompt digest, and native thread UUID before activation
   or useful work.
4. Claim the Flow ID only after the native-start receipt proves the main-flow
   context. Store the claim in the caller-provided Flow record root. Derive
   the title as `<Aspect> <Power> <FLOW_ID>`, then read it back through the
   native harness. A title, process, HM registration, or Flow record without
   the native-start receipt is not an identity claim.
5. For an existing target, attach only after exact native/HM/Herdr identity
   and same-thread evidence match. Re-resolve immediately before every
   submission. If the binding changes or becomes ambiguous, preserve the
   unknown attempt and stop; never relabel it as delivered or retry blindly.
6. Run one harmless direct structured witness and record target-side read
   acknowledgment. Submission, transport, presented, read, and completed
   are separate receipt grades. Useful work starts only after the required
   grade for the operation is present.
7. Produce a readiness report naming current deployment, native identity,
   route health, ownership, locks, open blockers, and freshness. A pane,
   process, idle status, or stale receipt cannot satisfy readiness.

## Handoff, cutover, and retirement

The operator reports these as distinct transitions:

- **Handoff:** the successor receives predecessor context and open work; no
  ownership or route changes occur.
- **Readiness:** the successor has native-start, identity/title, exact route,
  structured-skill, live-health, currentness, and acceptance receipts.
- **Cutover:** an explicitly authorized owner transfer changes the active
  controller after readiness. The predecessor remains crossover-only while
  retention and routing are decided separately.
- **Retirement:** an independent lifecycle operation with retained transcript,
  evidence, no active work, no held locks, and a last-moment exact target
  check. Creating or refreshing a successor never retires a predecessor.

The operator must preserve all predecessor records and reject duplicate
active seats, duplicate controller reservations, or a cutover without explicit
authority. It must not reap, silence, withdraw routing, or delete a failed
attempt as a side effect of a launch failure.

## Failure and retry rules

Every attempt has a durable idempotency key and monotonic state. A transport
timeout, ambiguous app-server response, missing persistence acknowledgment,
or lost route leaves the attempt `Unconfirmed`; it does not prove that no
thread exists. Recovery reads the existing attempt and exact native/Herdr/HM
state before any retry. A new attempt requires definitive non-delivery or a
safe acknowledged binding transition, plus a fresh attempt ID.

The operator fails closed on source drift, skill expansion gaps, model/effort
mismatch, native/HM mismatch, stale Herdr evidence, duplicate occupancy,
unknown lifecycle state, or an unavailable `codex-remote` route. It returns a
typed blocker with the preserved attempt and next owner instead of inventing
success or changing authority.

This contract adds no new harness, model, route, lock, or lifecycle authority.
It is intended for the implementation owner to encode in the authored
Curriculum skill and test with disposable fixtures plus the existing launcher
receipt verifier.
