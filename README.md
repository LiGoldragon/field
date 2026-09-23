# Field

Field is the public home for operational inventory and bounded research around
the existing Primary Field tools.  It does not own flow lifecycle actions.

`bin/field-readiness.mjs` produces a read-only JSON inventory of the Primary
Field tool surface, passive census state, Codex session index, and the
content-addressed prompt archive interface. It reports absent or unavailable
sources as inventory facts; it does not treat presence or matching hashes as
runtime readiness.

`bin/field-aspect-status.mjs` projects explicitly supplied census snapshots,
Orchestrate-lock snapshots, and flow records into a read-only aspect inventory.
It never contacts either service or reads live flow inputs. Use
`--census`, `--orchestrate`, and `--records` (or the matching
`FIELD_ASPECT_STATUS_*` environment variables) to name JSON files. It preserves
duplicate and unknown peers, groups only on an explicit `aspect` field, provides per-flow provenance and freshness, and
redacts secret, OAuth, and pairing material. Task/blocker descriptions from a
record marked `interpretation: "light-model"` are labelled
`light-model-inference`, never presented as observations.

`bin/field-luna-research.mjs --once` rotates six source-code questions covering
session inventory, census, archive retrieval, transcript behaviour, disposable
Herdr fixtures, and OpenCode source availability. A
question runs at most once for a given source digest in a seven-day bounded
backlog; after all questions are complete it exits with `skipped-unchanged`
until that backlog expires or a relevant source/question version changes, and
does not start a model. When it
does run, it invokes an ephemeral `gpt-5.6-luna` worker at medium effort in a
read-only sandbox, with a ten-minute process limit.  The worker has no Flow
identity and cannot wake, prompt, close, archive, remove, or otherwise change
Herdr state.

The state directory defaults to `$XDG_STATE_HOME/field-luna-research` (or
`~/.local/state/field-luna-research`). It contains only `state.json` and
compact JSON receipts plus immutable per-attempt worker reports. There is no retention deletion policy: remove receipts
only after a separately approved policy.

For manual inspection:

```
node bin/field-readiness.mjs
node bin/field-aspect-status.mjs --census /path/census.json --records /path/records.json
bin/field-luna-research-run --once
bin/field-luna-research-run --state-dir /tmp/field-luna-test --once --runner ./test/fake-codex.mjs
```

The supplied `systemd/user` units are installation artifacts only. They are
not enabled or deployed by this repository.
