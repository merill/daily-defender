const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const WORKFLOWS = path.join(__dirname, '..', '.github', 'workflows');

function workflowSources() {
  return fs.readdirSync(WORKFLOWS)
    .filter(name => name.endsWith('.yml') || name.endsWith('.yaml'))
    .map(name => [name, fs.readFileSync(path.join(WORKFLOWS, name), 'utf8')]);
}

test('every workflow pins the same engine version', () => {
  // `uses:` cannot take an expression, so the engine ref is repeated in every
  // workflow that needs it. Nothing but this stops one being upgraded alone,
  // which would have two workflows in the same repository building the site
  // with different code.
  const refs = new Set();
  for (const [, source] of workflowSources()) {
    for (const match of source.matchAll(/uses:\s*merill\/dailynews-engine\/[^@\s]+@(\S+)/g)) {
      refs.add(match[1]);
    }
  }
  assert.ok(refs.size <= 1, `workflows pin different engine versions: ${[...refs].join(', ')}`);
});

test('the engine is pinned to a tag or a sha, never a branch', () => {
  for (const [name, source] of workflowSources()) {
    for (const match of source.matchAll(/uses:\s*merill\/dailynews-engine\/[^@\s]+@(\S+)/g)) {
      const ref = match[1];
      assert.match(ref, /^(v\d+\.\d+\.\d+|[0-9a-f]{40})$/, `${name} pins the engine to '${ref}'`);
    }
  }
});

test('workflow inputs never reach a run block directly', () => {
  // An input interpolated into `run:` is a script injection: the value is
  // pasted into the shell before it ever becomes a string.
  for (const [name, source] of workflowSources()) {
    const runBlocks = source.split(/^\s*(?:-\s*)?run:/m).slice(1);
    for (const block of runBlocks) {
      assert.doesNotMatch(block.split(/^\s*-\s/m)[0], /\$\{\{\s*(inputs|github\.event\.inputs)\./,
        `${name} interpolates a workflow input into a run block`);
    }
  }
});

test('nothing in this repository names another product', () => {
  // The engine asserts this about itself. A product repository needs its own
  // version, because files are copied between these three repositories and a
  // leftover name is invisible until it reaches a rendered page: the first
  // backfill here produced 190 days of briefs announcing "Microsoft Intune
  // documentation changes", from a script copied out of daily-intune.
  const foreign = /\b(intune|entra|memdocs|autopilot)\b/i;
  const roots = ['scripts', 'src', '.github/workflows'];
  const offenders = [];
  for (const dir of roots) {
    const base = path.join(__dirname, '..', dir);
    if (!fs.existsSync(base)) continue;
    for (const name of fs.readdirSync(base)) {
      const file = path.join(base, name);
      if (!fs.statSync(file).isFile()) continue;
      // This file necessarily names them, to look for them.
      if (path.resolve(file) === path.resolve(__filename)) continue;
      fs.readFileSync(file, 'utf8').split('\n').forEach((line, index) => {
        if (foreign.test(line)) offenders.push(`${dir}/${name}:${index + 1}: ${line.trim().slice(0, 110)}`);
      });
    }
  }
  assert.deepEqual(offenders, [], `another product is named here:\n${offenders.join('\n')}`);
});
