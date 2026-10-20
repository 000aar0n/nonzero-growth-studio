# Local MAP publication-description run

- Runtime: Node v24.19.0, npm 11.9.0; mailschema 0.3.2. Installed with `npm install --ignore-scripts --no-audit --no-fund mailschema@0.3.2`.
- I authored a restricted-publication fixture for my offline CSV audit note, including the actual note bytes, its SHA-256 digest, a fixed reviewer snapshot, a scheduled destination, and terms bound to those values. Reserved test domains and addresses are fixtures; no service or email was invoked.
- Validation command: `npx --offline mailschema@0.3.2 description description.json --contract contract.json`. A timed cached-install rerun reached a valid description in 0.071 minutes; earlier research and the first installation are excluded. CLI and API description digests matched.
- I deleted `details.destinations[0].audience`, ran the same command with `broken-description.json`, and received exit 1. Exact output:

```text
npm warn Unknown env config "http-proxy". This will stop working in the next major version of npm.
/details/destinations/0: must have required property 'audience'
/details/destinations/0: must match "then" schema
```
- I also moved expiry before issue time; `broken-core-description.json` was rejected. Evidence records every command and exit code. The valid file remains unchanged.
- Reviewing the restricted-audience contract slowed preparation most. No defect found in these checks; the package correctly enforced both restrictions. I checked the package README and the official core, contract, and Publication Approval documentation.
- Suggested improvement: provide a worked restricted-publication example beside the public example, including an immutable reviewer snapshot. Schema validity alone does not establish authorization or a working service.
