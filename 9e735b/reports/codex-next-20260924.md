# Codex next server and GPT-6 model proof

The living corrected Field's use of the old server and explicitly authorized bringing up the next server and coordinating proper source changes with Mind. The earlier inference that no GPT-6 Sol/Luna exists from the old catalog was wrong.

Published Home implementation: initial tested source 2039067c6d93abb46330c3721792e95848fe290b, followed by formatting and documentation child on branch field/codex-next-9e735b. Stock upstream Codex 0.158.0-alpha.9 is pinned by release artifact digest, packaged in Nix. The module provides codex-remote-control-next and a codex-next client with separate .codex-next state, database and socket. Account/config files are bootstrapped once without displaying credentials. Stable version 0.153.4 is unchanged.

Direct proof: package and module contract passed. Configured Prometheus cache and bounded TCP22 timed out; the living-authorized local build succeeded. The Nix-generated service unit is linked and enabled directly for the authorized next-server operation. It is not a completed whole Home/Lojix generation deployment. Stable PID1553993 stayed active; next PID1814561 is active. No stable thread was restarted or migrated.

The next socket's live model/list includes gpt-6-sol and gpt-6-luna. Both harmless native medium-effort test turns completed with NEXT_MODEL_OK and no error. Sol thread01a0d4c7-88f2-7de3-ab2f-3870bd8cfd8d and Luna thread01a0d4c7-8933-73f0-93d0-fe0dfba40686 are test threads, not main flows, claimed identities, or replacement seats. Full receipts are in ../receipts/codex-next-20260924/.

Mind6288d1 accepted the disjoint launcher endpoint/model-selection follow-up after its current BindExisting publication. Existing stable bindings must retain their owning endpoint; new Sol6/Luna6 launches select next explicitly. No final launcher implementation or new main-seat receipt is claimed yet.

Runtime locks5179 and5193 were released with typed receipts. A mistaken Release5185 returned UnknownLockId and changed no lock; the actual5193 was then released. Controller and other owners were preserved.
