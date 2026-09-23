# Prometheus configured-route diagnosis, 2026-09-23

Requested by Psyche High836818; report consumers Mind High47764b and PsycheHigh836818. Historical source flows/6db4fe/reports/prometheus-builder-recovery-2026-09-22.md read. Current observations at approximately22:42UTC are independent of that historical outage.

## Direct root evidence

- Ouranos wired default remains192.168.1.1 viaenp0s31f6 source192.168.1.5; wiredDNS192.168.1.1. Wi-Fi remainsMega_2.4G_1896 at192.168.1.9.
- Configured hostname resolves200:ca41:6b12:fba:d7bc:cfc6:4aaa:165f. BoundedTCP22 and80 both timeout.
- USB10.44.0.148 neighbor84:47:09:75:88:68 REACHABLE, TCP22 connects immediately. Strict host-key rootSSH using configured hostname as HostKeyAlias succeeds, hostnameprometheus. No auth relaxation. USBTCP80 times out.
- Prometheus port80 is listening; localhost HTTP/nix-cache-info succeeds with StoreDir/nix/store, WantMassQuery1, Priority30. Thus cache process works locally; remote reachability remains separate.
- Both Ygg services active. Prometheus peers observed only with node200:17f7:4fad:e50b:a50c:2048:2169:41f7 viabr-lan; no sessions. Ouranos currentYgg identity201:6de1:5500:7cac:2db9:759e:42d2:fb1d, distinct from those peers. RecentOuranos logs show peer disconnections; historical directProm peer usedWiFi then timed out. No common cause or exact outage onset asserted from mixed raw log timestamps.
- Ouranos USB NM profile prometheus-share-temporary has ipv6.method=disabled and disable_ipv6 sysctl1. No USB IPv6linklocal or Ygg listener. Prometheus eno1 has fe80::8647:9ff:fe75:8868 and Ygg10001 listening. LocalYgg admin socket denied toli and sudononinteractive requirespassword; no bypass attempted.

## Diagnosis and routed repair

Host and strictSSH are available throughUSB; configuredIPv6overlay is not. ExistingUSB path cannot carry Ygg local multicast whileOuranosIPv6 is disabled. Proposed boundedTerra repair: enable link-local-onlyIPv6 onexistingUSB profile withnever-default/ignore-auto-dns, preservingIPv4shared andwireddefault/DNS, exactprestate/rollback, then verifyYgg peer discovery andconfiguredIPv6 TCP22/80, strictSSH andcache-info separately. Builder authentication/store check follows only throughconfigured daemon path. DirectUSB80 may be intentionally filtered; do not change firewall merely because localhost succeeds.

Current nativeTerra df09b6 exactthread01a0cfcd-58ea-78e3-a21a-2bedf09b6212 atmessaging-build/wQ:pG/term_65c2b8548382c5f received diagnosis; activeFieldHigh9e735b coordinates. Mind47764b andPsyche836818 received Herdr prompts. Delivery acceptance is not repair completion. Root performed no network mutation, restart, localbuild, source edit, key change, orlock release. Controller/locks preserved. Outcome pendingTerra report.
