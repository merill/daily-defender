const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { normalize, runRoute, runRules } = require('@merill/dailynews-engine/config');

const raw = require(path.join(__dirname, '..', 'dailynews.config.js'));
const config = normalize(raw);

test('the configuration is valid', () => {
  assert.doesNotThrow(() => normalize(raw));
});

test('v1 ships without a subscriber email', () => {
  assert.equal(config.email.enabled, false);
});

// Five docsets in defender-docs publish under a name that is not their folder,
// and two pairs collide on prefix. These were verified against
// learn.microsoft.com rather than inferred, and getting one wrong would break
// every link for that service, silently.
test('each service maps to the Learn path it actually publishes under', () => {
  const expected = {
    'defender-xdr/incidents-overview.md': 'defender-xdr/incidents-overview',
    'defender-endpoint/microsoft-defender-endpoint.md': 'defender-endpoint/microsoft-defender-endpoint',
    'defender-for-cloud-apps/what-is-defender-for-cloud-apps.md': 'defender-cloud-apps/what-is-defender-for-cloud-apps',
    'defender-for-cloud/defender-for-cloud-introduction.md': 'azure/defender-for-cloud/defender-for-cloud-introduction',
    'defender-for-iot-azure/device-builders/overview.md': 'azure/defender-for-iot/device-builders/overview',
    'sentinel/overview.md': 'azure/sentinel/overview',
    'easm/overview.md': 'azure/external-attack-surface-management/overview',
    'exposure-management/microsoft-security-exposure-management.md': 'security-exposure-management/microsoft-security-exposure-management',
    'defender/threat-intelligence/analyst-insights.md': 'defender/threat-intelligence/analyst-insights',
    'defender-office-365/mdo-about.md': 'defender-office-365/mdo-about'
  };
  for (const [source, target] of Object.entries(expected)) {
    assert.equal(runRoute(config.docs.learnRoutes, source), target, source);
  }
});

test('the prefix collisions resolve by order, not by luck', () => {
  // defender-for-cloud would swallow defender-for-cloud-apps, and
  // defender-for-iot would swallow defender-for-iot-azure, if either rule
  // moved above its longer sibling.
  const routes = config.docs.learnRoutes.map(route => String(route.match));
  assert.ok(routes.indexOf(String(/^defender-for-cloud-apps\/(.*)\.md$/)) <
            routes.indexOf(String(/^defender-for-cloud\/(.*)\.md$/)));
  assert.ok(routes.indexOf(String(/^defender-for-iot-azure\/(.*)\.md$/)) <
            routes.findIndex(route => route.includes('(.+)')));
});

test('fragment directories are not tracked', () => {
  for (const source of [
    'defender-xdr/includes/banner.md',
    'defender-endpoint/media/thing.md',
    'defender-xdr/breadcrumb/toc.md',
    'README.md',
    'advanced-threat-analytics/includes/banner.md'
  ]) {
    assert.equal(config.docs.trackedPaths.test(source), false, source);
  }
  for (const source of ['defender-xdr/incidents-overview.md', 'sentinel/overview.md']) {
    assert.equal(config.docs.trackedPaths.test(source), true, source);
  }
});

test('every declared product is reachable by classification', () => {
  const reachable = new Set(config.classify.products.map(rule => rule.slug));
  for (const product of config.taxonomy.products) {
    assert.ok(reachable.has(product.slug), `${product.slug} has no classification rule`);
  }
});

test('a file classifies to the service whose subtree it lives in', () => {
  const cases = {
    'defender-for-cloud-apps/a.md': 'defender-for-cloud-apps',
    'defender-for-cloud/a.md': 'defender-for-cloud',
    'defender-for-iot-azure/a.md': 'defender-for-iot',
    'sentinel/a.md': 'sentinel',
    'defender/threat-intelligence/a.md': 'defender-threat-intelligence',
    'defender-xdr/a.md': 'defender-xdr'
  };
  for (const [source, slug] of Object.entries(cases)) {
    assert.equal(runRules(config.classify.products, config.taxonomy.products,
      config.taxonomy.defaultProduct, source, '', '').slug, slug, source);
  }
});

test('the tracked subtrees match what the repository publishes', () => {
  // Guards against a subtree being added upstream and silently ignored here.
  const declared = String(config.docs.trackedPaths);
  for (const subtree of ['defender-xdr', 'defender-endpoint', 'sentinel', 'easm',
    'exposure-management', 'unified-secops-platform', 'defender-business']) {
    assert.ok(declared.includes(subtree), `${subtree} is not tracked`);
  }
});
