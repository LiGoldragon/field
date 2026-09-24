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

## Superseding owner checkpoint — 2026-09-24

Field 9e735b explicitly accepts the durable-network handoff at Field revision 34fe6c8899684de4f892142d4357a3ca3d67895b, read by its delegated evidence worker. The native Medium owners coordinate source/build work with Terra df09b6; controller and existing locks remain unchanged. This acceptance is not deployment evidence.

The prior blanket remote-path failure is superseded: Terra reported a passing Wi-Fi/br-lan Ygg check (ping 2/2, strict SSH, active peers, cache HTTP 200). The cable remains a distinct repair. Psyche's newer witness identifies missing Prometheus eno1 ICMPv6/NDP admission, Ouranos USB IPv6 configuration, and router firewall composition of declared service ports; the older claim excluding a Prometheus firewall cause is superseded.

Latest owner-supplied build results, not independently rerun by Field High:

- Message: Home child 9a85262ae34c41bf6d82a6c927e0b3c24e2a52c0 supersedes 50757d39. Its configured-builder, no-fallback check passed on Prometheus. Derivation /nix/store/z6kb9s23wyymsyxz015m8hqa9br21ni5-message-service-path.drv produced /nix/store/v1appbkz48daampb6vihiswj2gxlqxij-message-service-path. The check executes the pinned packaged writer with nested Struct, checks nonempty binary output, and rejects retired Meaning. No activation, restart, or service-state mutation is established. Lock 3776 remains 9ddcbc's.
- Flow: owner eb7bae reports exact child 82bf8003a0d245e8e539cfb867b6a102130f9747 ran the full configured-builder gate on Prometheus, exit 1, 40 passed and two runtime tests failed. Log SHA256 d19ab9f3b9f0a7f8822322748d66d84c42d9f70a33a3229a843bc1b0cc009e1c. Mind 6288d1 holds disjoint correction locks 4954/4955 under the existing source ownership. Message deployment remains held pending Flow green and Field's accepted deployment packet.
- Earlier Message attempts used an inline USB builder, unlike Flow's configured builders file. Later 50757d39 evaluation failures and earlier Flow Clippy failure are historical results, not the current Message gate status.

Process incident: delegated read-only inspection found all reported PID incarnations 1285813, 1285847 and 1289376 absent; no signals were sent by this flow. The accidental client's completion/cancellation status remains unknown. The intentional eb7bae gate outcome is known from its subsequent terminal-result report and must not be labelled unknown. Never restart the accidental broad check or kill shared SSH/Nix processes from a process-name count.

Fresh user-supplied eb7bae route: native 01a0cefc-9744-73f3-8dfb-4e0eb7bae957, default/wB:p1/term_65c2891d9f7778, agent field-medium-eb7bae, working and interactive-ready. This supersedes the earlier messaging-build-only route miss; re-resolve before contact. No HM registration change was requested for eb7bae.

### Sources for this update

- Direct user-delivered owner receipts from eb7bae and 9ddcbc, plus the fresh eb7bae route correction, in Field 9e735b's native transcript on 2026-09-24.
- Delegated recovery_evidence read of durableNetworkRefresh.md at 34fe6c8899684de4f892142d4357a3ca3d67895b and its read-only process-incarnation inspection.
- Medium native transcript comparison: Message attempts at lines 12690 and 12737; Flow initial remote check at lines 12773–12776.
