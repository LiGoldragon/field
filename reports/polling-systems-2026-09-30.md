# Polling systems registry draft — 2026-09-30

This source-owned draft records known periodic or stateful observation work without converting source declarations into live claims. Its companion JSON is machine-readable at `registry/polling-systems.json`.

## Coverage and freshness

The authored Goldragon roster names eight nodes: Balboa, Mirror Alpha, Mirror Beta, Ouranos, Prometheus, Tiger, VM Testing, and Zeus. The only live host witnesses in this draft are bounded reads at 2026-09-30 11:20–11:28 America/Mexico_City from Ouranos, Prometheus, and Zeus. The other five nodes are `Unknown`: a single existing-alias SSH attempt did not resolve and no trusted route was invented.

Prometheus and Zeus each had an active Bird user manager, but its private bus could not be read as `li`; a noninteractive privilege attempt required a password. Bird timers are therefore explicitly unknown.

## What is known

Prometheus has one confirmed stateful network poller: `router-wan-lease-recovery.timer`, with a two-minute inactive interval and 15-second accuracy. Its one-shot recovery can affect WAN DHCP configuration, so its side effect is recorded rather than softened into observation. The inspected authored source is `CriomOS/modules/nixos/router/default.nix:421-429` plus `CriomOS/modules/nixos/router/wan-lease-recovery.sh:5-16`; local working-copy revision `fe8ebf3d` identifies the inspected source only and is not an inferred deployed revision.

All three live-witnessed hosts have `fwupd-refresh.timer`: hourly, randomized by up to one hour, and backed by `fwupdmgr refresh`. It refreshes firmware metadata.

Ouranos has the authorized corrected USB observer as a transient, volatile service. The inspected immutable source and handover establish a two-second carrier reconcile plus event watchers, with public runtime state under `/run`. Its evidence is not a durable installation, and its peer parser/reducer remains unresolved.

Log rotation, Nix garbage collection, tmpfile cleanup, and filesystem trimming are separately listed as scheduled local maintenance. They are not promoted to external polling.

## Source-conditional rows

Two inspected authored mechanisms are intentionally recorded as `AuthoredSourceOnly`.

- `tailnet-enroll.service` retries after 30 seconds on failure if a projected node is a Tailnet client. The inspected source is `CriomOS/modules/nixos/network/tailscale.nix`; the working-copy revision inspected was `fe8ebf3d`, which is not evidence of deployment.
- The active-network helper permits one Wi-Fi `iw` current-link query per five seconds while Wi-Fi is active; NetworkManager signals drive the surrounding updates. The inspected source is `CriomOS-home/modules/home/profiles/min/noctalia-plugins/active-network/active_network_helper.py`; the working-copy revision inspected was `19bd2cf9`, which is not evidence of deployment.

Core checkup, Field Monitor 98eb43, Field census, checkup-shadow, research, and heartbeat timers are source-conditional opt-ins. Their source declares core-checkup every thirty minutes, Field Monitor 98eb43 and census every five minutes, checkup-shadow/research/heartbeat every thirty minutes, and heartbeat path triggers. No live deployment is inferred. The Field source itself excludes the heartbeat from its read-only readiness invocation because it is lifecycle-mutating.

## Health exception and unknowns

Zeus `li`'s `message-daemon.service` had two failed pre-start attempts at 11:25:19 and 11:25:58 and was auto-restarting at 11:26:10. The bounded journal states that preservation refused because the existing snapshot differed from the live store. This is a time-scoped service health exception. It does not establish a polling loop or attribute the failure to a generation change.

Long-running services such as Lojix, Repository Ledger, Flow/Nexus, Messenger, Kea/DNS, and time synchronization remain `internal-polling-unknown` unless a source or live cadence is later witnessed. Absence of a systemd timer does not settle application behavior.

## Operation of the registry

An owner should refresh a row after a bounded source inspection or live witness, preserving source path or immutable revision, as-of time, side effects, and unknowns. A periodic report is deliberately not started by this draft. Its recipient, cadence, and delivery surface for the living and Psyche Opus remain unresolved.

## Sources

- Goldragon authored roster: `goldragon/cluster-definition.datom`.
- Field live bounded witnesses: flow `1bc255`, 2026-09-30 11:20–11:28 America/Mexico_City.
- Corrected observer source: CriomOS `6485b64eaf328273d44b718d4c11da86b7554edd`; transient handover revision `36f36da145278619e7293f641a04920cae0f69d2`.
- Router WAN source: `CriomOS/modules/nixos/router/default.nix:421-429` and `CriomOS/modules/nixos/router/wan-lease-recovery.sh:5-16`, inspected working-copy revision `fe8ebf3d` only.
- Field monitoring source: `CriomOS-home/modules/home/profiles/min/field-monitoring.nix:184-221,226-310,318-335` and `field-luna-heartbeat.nix:18-45`; inspected non-deployed paths and working-copy revisions are identified in the JSON rows.
