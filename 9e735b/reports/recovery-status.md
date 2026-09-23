# Field recovery status — 9e735b

## Prometheus route checkpoint — 2026-09-23

Source 0ad137 reports diagnosis complete; native Field Terra df09b6 owns active repair, which remains pending. These are attributed source observations, not independent tests by this flow. Do not claim fixed.

- USB strict root SSH and hostname succeed.
- Configured Ygg TCP ports 22 and 80 time out.
- USB port 80 times out, while the Prometheus cache listener and localhost nix-cache-info work. Listener health and remote reachability are separate observations.
- Ouranos USB has NetworkManager ipv6.method=disabled and sysctl disable_ipv6=1. Prometheus eno1 has IPv6 link-local and a Ygg listener on port 10001. Source 0ad137 attributes absent local Ygg peering to disabled USB IPv6.

Terra owns the reversible candidate: link-local-only IPv6 on the existing USB profile, never-default and ignore-auto-dns, preserving IPv4 and a rollback path. Required subsequent witnesses are configured Ygg TCP22/80, strict SSH, and cache info. No successful repair or post-change test receipt has reached this flow.

Field High made no network, route, key, authentication, URL, service, default/DNS, local-build fallback, or lock changes for this diagnosis. Terra owns machine/route/session repair; Sol owns storage and repositories.

## Coordination evidence

A delegated route worker freshly resolved native Terra df09b6 at messaging-build/wQ:pG, terminal term_65c2b8548382c5f, and submitted the differential diagnosis followed by the bounded IPv6 candidate through native active-turn steering. The API accepted both into the active turn. This is submission acceptance; recipient read and repair completion remain unobserved.

## Next result owed to the aggregate

Terra must return the applied change or blocker, preservation/rollback evidence, and actual connectivity test outcomes. Psyche's aggregate must distinguish completed source diagnosis from pending repair, and local cache health from remote cache reachability.

## Sources

- Source 0ad137 coordination messages received directly in this native thread on 2026-09-23, including the durable-checkpoint message.
- Source report: /home/li/primary/field/0ad137/reports/prometheus-route-20260923.md at Field revision 199c9ec; location and revision supplied by 0ad137, not independently read in this checkpoint.
- Internal medium_coordination worker returned exact Terra binding and native steer acceptance; its report explicitly left read and completion unknown.
