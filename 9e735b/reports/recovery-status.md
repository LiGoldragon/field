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

## Roll-forward deployment — 2026-09-24

The living explicitly removed the rollback-path and pre-deployment cross-process acceptance holds. Field directed the sole native executor eb7bae, with 9ddcbc composing/checking source, to deploy green Flow 4560453644c095d97d09390819a22e213850986c, Message a8c6a924d5d04fbfcbf0a7e2e1b145076d327a53 and the Home writer fix from 9a85262ae34c41bf6d82a6c927e0b3c24e2a52c0. Lifecycle v3 is follow-on work. No further approval round is required for this authorized baseline deployment.

Owner-observed source agreement: Home 904185761771308172d18c1ee8f6ca4e2b37a1d7 pins the exact baseline packages; CriomOS 90702b6e9aa3aa9b82b4f17c5f2bd566d0abc030 pins that Home. 9ddcbc adopted the sole packet and released its pin lock 5022; it reported the consumer check passed locally after remote cache timeout. A retired-Meaning rejection printed during the test was its expected negative case, not a failed derivation; an interim worker failure interpretation was corrected to all recipients.

Canonical pair chosen against the current installed consumer, without a Lojix downgrade: Lojix c4bba4fa12408c39ff745b0773468cd32a74403f uses Horizon 40d04d2504fee619e9b2b2564b8a769a3a9d6049. Goldragon 2bd1d107421f3ec1afdd72c5daa65fc060876455 materialized the matching canonical artifact /nix/store/q7n3ccf1anqr3q90qpwaxmwlsl8bp1j0-horizon-definition on Prometheus without fallback. These are executor-reported receipts observed by the coordination worker, not independent builds by Field High. This baseline pair is not proof of the follow-on USB-gateway schema/deployment.

The canonical request first failed with Rejected.FlakeReferenceMalformed (deployment 28), because it used the retired slash-revision reference. Correcting only that reference to the supported immutable ?rev= form produced DeployAccepted.{ 29 {698 698} }. Query.ByDeployment.{29} recorded CriomOS 90702b6e and Building at ledger 711. An actual Lojix Nix-evaluation worker was observed. This is admission and active work, not completed build or activation.

Still owed: terminal request/journal result and realized closure; independent persistent profile and running unit/ExecStart/PID/socket; post-deployment live ResolveRecipient and Message-send results. Each result or failure is to be relayed to Psyche High 836818 and Psyche Medium d8df70. Store paths alone are not deployment proof.

### Sources for the roll-forward checkpoint

- Direct living-word relays from Psyche High 836818 in this native transcript, including canonical-pair decision authority.
- Native eb7bae/9ddcbc pane and transcript results returned by recovery_evidence coordination worker; its Herdr relays to Psyche were submission-grade unless separately witnessed.

## Live baseline and BindExisting follow-on — 2026-09-24

Deployment 29 reached terminal Failed.Activate.ActivationFailed at ledger 726. Its realized Home generation f5kp8yn2q9r5912i9hywaqdkjv0rdbhp-home-manager-generation entered the persistent Home profile. Verbose activation identified conflicting mutable flow-nexus unit files. The later manually authorized roll-forward work and live service results do not rewrite that failed Lojix journal entry into success.

The living superseded backup/migration requirements with explicit removal of old Flow and Message stores. Native executor eb7bae reports five exact legacy Message files removed, then two verified stale Flow files removed with the Flow unit stopped and restarted. No retained store backup is claimed. A fresh v6 Message store was created. Latest returned runtime witness: packaged Flow PID 1635310, live ResolveRecipient.dead00 returned RecipientResolutionRejected.UnknownFlow; packaged Message PID 1599873 with zero restarts and both sockets. Binary paths: /nix/store/x1mqkqx8vybhipzzpzaa3wm9ka3ccvck-flow-0.3.0/bin/flow-nexus and /nix/store/104qsfp8bpp551y7glxc2zsda2axmljm-message-0.12.0/bin/message-daemon. These are returned owner observations, not new tests by Field High.

The first Message archive/frame error came from an ordinary signal_message query sent to the meta/owner socket. The failed CLI was already from the same store package as the daemon. Against the correct message.sock the packaged CLI succeeded; a disposable identity, Send SubmissionAccepted.0, and inbox slot 0 containing the harmless body were witnessed by the executor. This establishes durable submission and inbox retrieval, not native harness endpoint delivery or a completed hm-send switch.

The unauthorized transient flow-message-switch-recovery-eb7bae timer/service was observed absent/inactive/dead with no pending job or next elapse. Its completed historical action and the prematurely stopped old Flow process were reported to Psyche; the ordered sequence was not retroactively claimed complete.

Latest source direction: implement MetaBindExisting/BoundExisting from meta-signal-flow v4 164ae716dcdc837845191c8f094bb1addf3af58c on deployed v2 Flow 4560453644c095d97d09390819a22e213850986c, ordinary signal unchanged. Mind 6288d1 is the sole implementation owner under the living's explicit addendum; 47764b hands over the contract and is not a dependency for Field. This does not retire either seat. Field's native executor eb7bae, with pin helper 9ddcbc, takes the new immutable revision through the check, one Home packet, one Lojix request, activation/restart, and one hand-composed meta submission after matching runtime and fresh store evidence. Accepted rows remain RegisteredUnconfirmed with no fabricated Ready or native receipt. Named live bindings must be freshly resolved and checked by PID, UID, and start token. No collector/importer or duplicate bootstrap.

Lifecycle v3 Flow 22c4141be5b4a51774a695f70f687136e38d4ad4 remains separately queued after v2 priority, source-only and not the base for this BindExisting addition.

### Sources for this checkpoint

- Direct living-word relays and the BindExisting owner addendum from Psyche High 836818 in this native transcript.
- Native executor eb7bae's returned activation, unit, store, query, and Send receipts; coordination worker relays were graded separately.

## Psyche High refresh order and amendment — 2026-09-24

The living, relayed verbatim by Psyche High 836818 in this native transcript, orders immediate withdrawal of that seat's HM delivery route and registry retirement, followed by a fresh Psyche High. The subsequent amendment supersedes the separate kill instruction: the successor must be ready first, then the predecessor harness exits and its transcript is archived in place with the successor ID in the same replacement operation. No separate kill is authorized. Field 9e735b controls; native Field Medium 9ddcbc is the designated executor. Dispatch is requested through the existing route worker; no execution receipt is established by this record.

The successor is Claude claude-fable-5-1, medium effort, in messaging-build, with a fresh Flow directory and log. Its one first prompt contains the f38926 sources and 1b8ac0 chain, the latest two titled Refresh Payload and Refresh Payload Addendum records from 836818, the whole predecessor log, both Prometheus reports byte-exact, and the profile's 31 skill names in one block for native skill loading. Required receipts: Remote Control on the pane before that prompt, native receipt, own flow-id before artifacts, HM registration, and native title if supported. Predecessor memory is depth one. Retirement log/index edits and commit follow with the actual successor ID.

All further reports owed to 836818 are held for the successor; no further messages or wakeups to the predecessor. Psyche Medium d8df70 is to hold incoming words and reports until that successor exists. BindExisting implementation remains with 6288d1 and deployment with eb7bae. The original named-ten binding plan must not re-register retired 836818; its replacement requires actual successor identity and fresh process evidence.
