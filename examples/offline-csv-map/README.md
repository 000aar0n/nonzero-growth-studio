# Offline CSV audit note: MAP example

An original local Publication Approval fixture and a reproducible MailSchema validation run. It uses reserved test domains and a fixed synthetic reviewer snapshot. It does not implement a live publication service or send email.

Requires Node 22 or later. Download the official contract to `contract.json` from https://mailschema.org/artifacts/map-0.3/contracts/publication-approval-0.1.json, then run `npm ci --ignore-scripts --no-audit --no-fund` and `node reproduce.mjs` in this folder.

Expected contract digest: `sha-256:de91a49de4cba91209be253456e7c56709791fff877a060560d4eada0cc9468c`.

See report.md and evidence.json for actual versions, commands, failures and digest checks. Re-running overwrites the generated fixture and evidence locally.
