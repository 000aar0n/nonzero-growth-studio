import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';

// Offline protocol fixture. This does not run a service, send email or publish.
const started = performance.now();
const runs = [];
function run(command, args) {
  const r = spawnSync(command, args, { encoding: 'utf8' });
  runs.push({ command: [command, ...args].join(' '), status: r.status,
    stdout: r.stdout, stderr: r.stderr });
  if (r.error) throw r.error;
  return r;
}
const install = run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', 'mailschema@0.3.2']);
if (install.status !== 0) throw new Error('Install failed');
const { digest, parseDescription, Contract } = await import('mailschema');
const sha = b => 'sha-256:' + createHash('sha256').update(b).digest('hex');
const writeJson = (name, value) => writeFile(name, JSON.stringify(value, null, 2) + '\n');
const note = '# Offline CSV tools: reviewed behavior\n\n'
  + 'Catalog Check and CSV Compare run on local CSV files. The October 20 audit\n'
  + 'passed 63 Node tests. Real-browser interaction, download and layout QA remains\n'
  + 'incomplete. No live checkout or customer payment is established.\n\n'
  + 'This note is an original local test artifact, not a publication request to a live service.\n';
await writeFile('content.md', note);
const audience = { id: 'urn:offline-csv-tools:reviewers', revision: 'reviewers-20261020-01',
  members: ['reviewer@example.invalid'] };
await writeJson('audience-snapshot.json', audience);
const contract = Contract.parse(await readFile('contract.json'));
const details = {
  summary: 'Review a local audit note before making it available to the fixed fixture reviewer.',
  requester: 'Offline CSV tools quality review',
  content: { id: 'urn:offline-csv-tools:content:qa-note-20261020', revision: 'audit-note-01',
    digest: sha(Buffer.from(note)), title: 'Offline CSV tools: reviewed behavior' },
  destinations: [{ id: 'https://offline-csv-tools.example.test/reviews/qa-note-20261020',
    account: 'urn:offline-csv-tools:workspace:quality', visibility: 'restricted',
    audience: { id: audience.id, revision: audience.revision } }],
  schedule: { mode: 'scheduled', at: '2026-10-20T20:00:00Z' }
};
const description = {
  '@context': 'https://mailschema.org/contexts/map-0.3.jsonld', '@type': 'MailAction',
  profile: 'https://mailschema.org/profiles/map/0.3',
  type: { id: 'https://mailschema.org/types/publication-approval', version: '0.1',
    contractDigest: contract.digest },
  '@id': 'urn:offline-csv-tools:interaction:qa-note-20261020-01',
  issuedAt: '2026-10-20T12:00:00Z', expiresAt: '2026-10-20T21:00:00Z', inLanguage: 'en',
  service: { id: 'https://offline-csv-tools.example.test', tenant: 'urn:offline-csv-tools:workspace:quality' },
  recipient: 'reviewer@example.invalid',
  subject: { id: 'urn:offline-csv-tools:content:qa-note-20261020', title: 'Review the offline CSV audit note' },
  terms: { id: 'urn:offline-csv-tools:proposal:qa-note-20261020-01',
    version: digest({ details, audience, recipient: 'reviewer@example.invalid', contract: contract.digest }) },
  human: { url: 'https://offline-csv-tools.example.test/reviews/qa-note-20261020/decision' },
  details, operations: [{ id: 'approve' }, { id: 'decline' }]
};
await writeJson('description.json', description);
const cli = ['--offline', 'mailschema@0.3.2', 'description'];
const valid = run('npx', [...cli, 'description.json', '--contract', 'contract.json']);
if (valid.status !== 0) throw new Error(valid.stdout + valid.stderr);
const minutes = (performance.now() - started) / 60000;
const broken = structuredClone(description);
delete broken.details.destinations[0].audience;
await writeJson('broken-description.json', broken);
const bad = run('npx', [...cli, 'broken-description.json', '--contract', 'contract.json']);
if (bad.status === 0) throw new Error('Missing audience unexpectedly validated');
const brokenCore = structuredClone(description);
brokenCore.expiresAt = '2026-10-20T11:00:00Z';
await writeJson('broken-core-description.json', brokenCore);
const badCore = run('npx', [...cli, 'broken-core-description.json', '--contract', 'contract.json']);
if (badCore.status === 0) throw new Error('Invalid chronology unexpectedly validated');
const parsed = parseDescription(await readFile('description.json'));
const expectedDigest = digest(parsed);
if (!valid.stdout.split(/\r?\n/).includes(expectedDigest)) throw new Error('CLI digest differs from API');
const pkg = JSON.parse(await readFile('node_modules/mailschema/package.json'));
const npmVersion = run('npm', ['--version']).stdout.trim();
const evidence = { runtime: process.version, npm: npmVersion, package: pkg.version,
  installToValidMinutes: minutes, timingScope: 'Timed cached-install rerun; earlier research and initial install excluded',
  descriptionDigest: expectedDigest, contentDigest: sha(await readFile('content.md')),
  checks: ['valid fixture accepted', 'restricted destination without audience rejected',
    'expiry before issue rejected', 'CLI and API digest match'], runs };
await writeJson('evidence.json', evidence);
await writeFile('description-digest.txt', expectedDigest + '\n');
const report = [
  '# Local MAP publication-description run',
  '',
  `- Runtime: Node ${process.version}, npm ${npmVersion}; mailschema ${pkg.version}. Installed with \`npm install --ignore-scripts --no-audit --no-fund mailschema@0.3.2\`.`,
  '- I authored a restricted-publication fixture for my offline CSV audit note, including the actual note bytes, its SHA-256 digest, a fixed reviewer snapshot, a scheduled destination, and terms bound to those values. Reserved test domains and addresses are fixtures; no service or email was invoked.',
  `- Validation command: \`npx --offline mailschema@0.3.2 description description.json --contract contract.json\`. A timed cached-install rerun reached a valid description in ${minutes.toFixed(3)} minutes; earlier research and the first installation are excluded. CLI and API description digests matched.`,
  '- I deleted `details.destinations[0].audience`, ran the same command with `broken-description.json`, and received exit ' + bad.status + '. Exact output:\n\n```text\n' + (bad.stdout + bad.stderr).trim() + '\n```',
  '- I also moved expiry before issue time; `broken-core-description.json` was rejected. Evidence records every command and exit code. The valid file remains unchanged.',
  '- Reviewing the restricted-audience contract slowed preparation most. No defect found in these checks; the package correctly enforced both restrictions. I checked the package README and the official core, contract, and Publication Approval documentation.',
  '- Suggested improvement: provide a worked restricted-publication example beside the public example, including an immutable reviewer snapshot. Schema validity alone does not establish authorization or a working service.',
  ''
].join('\n');
if (report.split(/\s+/).length > 300) throw new Error('Report exceeds 300 words');
await writeFile('report.md', report);
console.log(JSON.stringify({ tests: evidence.checks, digest: expectedDigest, reportWords: report.split(/\s+/).length, minutes }, null, 2));
