// Product configuration for Daily.Defender.Admin.News.
//
// CommonJS rather than JSON because the classification rules are RegExps.
// Everything the generator needs that is specific to Defender lives here; the
// code in @merill/dailynews-engine is product-neutral and reads from this file.

// The subtrees of MicrosoftDocs/defender-docs that publish to Microsoft Learn,
// taken from the repository's own .openpublishing.publish.config.json.
// advanced-threat-analytics is listed there but now holds only includes/, so it
// is not tracked. articles/ appears throughout the history and no longer exists;
// its paths do not resolve on Learn, so it is not tracked either.
const TRACKED = [
  'defender-xdr',
  'defender-endpoint',
  'defender-office-365',
  'defender-for-identity',
  'defender-for-cloud-apps',
  'defender-for-cloud',
  'defender-for-iot-azure',
  'defender-for-iot',
  'sentinel',
  'easm',
  'exposure-management',
  'defender-vulnerability-management',
  'defender-business',
  'unified-secops-platform',
  'defender'
];

module.exports = {
  site: {
    name: 'Daily Defender News',
    host: 'daily.defender.admin.news',
    url: 'https://daily.defender.admin.news',
    description: 'A readable record of what changed across Microsoft Defender documentation.',
    productName: 'Microsoft Defender',
    audience: 'Microsoft Defender administrators'
  },

  // v1 is the site alone. Without this the pages would advertise a subscriber
  // email and open a dialog that could only report the form is not configured.
  email: { enabled: false },

  brand: {
    wordmark: 'Daily Defender News',
    ogAlt: 'Daily Defender News — Microsoft Defender change intelligence',
    themeStorageKey: 'defender-news-theme',
    tokenStorageKey: 'defender-news-github-token',
    emailEyebrow: 'Daily Defender News',
    logo: 'defender-news-logo.png',
    aboutIcon: '/assets/products/defender-xdr.svg',
    uiAssets: ['defender-news-logo.png'],
    extraCss: ''
  },

  identity: {
    docEventPrefix: 'defender-docs',
    batchEventPrefix: 'defender-news',
    // Unused while email is off, but fixed now so that turning email on later
    // cannot accidentally reuse another product's marker.
    kitMarkerPrefix: 'daily-defender-news'
  },

  build: { docsCloneDir: 'defender-docs', detailDays: 30 },

  discord: { botName: 'Defender Scout' },

  ai: {
    schemaPrefix: 'defender',
    subject: 'Defender',
    forbiddenOpeners: ['Microsoft Defender documentation', 'Defender documentation', 'The Defender docs'],
    impactBoost: /incident|advanced hunting|attack surface|exposure|onboarding|detection rule|sentinel|kql/
  },

  docs: {
    learnRootUrl: 'https://learn.microsoft.com/en-us/defender-xdr/',

    // Tracked: any markdown under a published subtree, except the fragment
    // directories, which are included into other pages and have no URL of
    // their own.
    trackedPaths: new RegExp(
      `^(${TRACKED.join('|')})\\/(?!(?:.*\\/)?(?:includes?|media|breadcrumb)\\/).+\\.md$`
    ),

    // Ordered: first match wins. Five subtrees publish under a name that is not
    // their folder, verified against learn.microsoft.com rather than assumed —
    // and the two prefix collisions have to be resolved by order, because
    // `defender-for-cloud` would otherwise swallow `defender-for-cloud-apps`
    // and `defender-for-iot` would swallow `defender-for-iot-azure`.
    learnRoutes: [
      { match: /^defender-for-cloud-apps\/(.*)\.md$/, path: 'defender-cloud-apps/$1' },
      { match: /^defender-for-cloud\/(.*)\.md$/, path: 'azure/defender-for-cloud/$1' },
      { match: /^defender-for-iot-azure\/(.*)\.md$/, path: 'azure/defender-for-iot/$1' },
      { match: /^sentinel\/(.*)\.md$/, path: 'azure/sentinel/$1' },
      { match: /^easm\/(.*)\.md$/, path: 'azure/external-attack-surface-management/$1' },
      { match: /^exposure-management\/(.*)\.md$/, path: 'security-exposure-management/$1' },
      // Everything else publishes under its own folder name.
      { match: /^(.+)\.md$/, path: '$1' }
    ],

    areas: {
      rules: [
        { match: /^defender-for-cloud-apps\//, name: 'Defender for Cloud Apps' },
        { match: /^defender-for-cloud\//, name: 'Defender for Cloud' },
        { match: /^defender-for-iot-azure\//, name: 'Defender for IoT' },
        { match: /^defender-for-iot\//, name: 'Defender for IoT' },
        { match: /^defender-for-identity\//, name: 'Defender for Identity' },
        { match: /^defender-office-365\//, name: 'Defender for Office 365' },
        { match: /^defender-vulnerability-management\//, name: 'Defender Vulnerability Management' },
        { match: /^defender-endpoint\//, name: 'Defender for Endpoint' },
        { match: /^defender-business\//, name: 'Defender for Business' },
        { match: /^defender-xdr\//, name: 'Defender XDR' },
        { match: /^unified-secops-platform\//, name: 'Unified SecOps' },
        { match: /^exposure-management\//, name: 'Exposure Management' },
        { match: /^sentinel\//, name: 'Microsoft Sentinel' },
        { match: /^easm\//, name: 'Defender EASM' },
        { match: /^defender\//, name: 'Defender Threat Intelligence' }
      ],
      fallback: 'Microsoft Defender'
    }
  },

  analytics: { piqoSite: '' },

  messageCenter: { servicePattern: /\bDefender\b|\bSentinel\b/i },

  links: {
    related: [],
    footer: [],
    stayCurrent: [
      { url: 'https://learn.microsoft.com/en-us/defender-xdr/whats-new', label: "What's new in Defender XDR" },
      { url: 'https://learn.microsoft.com/en-us/azure/sentinel/whats-new', label: "What's new in Microsoft Sentinel" }
    ],
    followProject: [
      { url: 'https://merill.net', label: 'merill.net' },
      { url: 'https://github.com/merill', label: 'GitHub' }
    ]
  },

  taxonomy: {
    products: [
      { slug: 'defender-xdr', name: 'Microsoft Defender XDR', short: 'Defender XDR', learn: 'https://learn.microsoft.com/en-us/defender-xdr/', icon: { sourceName: 'Defender', sourcePath: 'apps/Defender.svg', match: 'exact' } },
      { slug: 'defender-endpoint', name: 'Microsoft Defender for Endpoint', short: 'Endpoint', learn: 'https://learn.microsoft.com/en-us/defender-endpoint/', icon: { sourceName: 'Defender', sourcePath: 'apps/Defender.svg', match: 'shared' } },
      { slug: 'defender-office-365', name: 'Microsoft Defender for Office 365', short: 'Office 365', learn: 'https://learn.microsoft.com/en-us/defender-office-365/', icon: { sourceName: 'Defender', sourcePath: 'apps/Defender.svg', match: 'shared' } },
      { slug: 'defender-for-identity', name: 'Microsoft Defender for Identity', short: 'Identity', learn: 'https://learn.microsoft.com/en-us/defender-for-identity/', icon: { sourceName: 'Security', sourcePath: 'identity/00321-icon-service-Security.svg', match: 'closest' } },
      { slug: 'defender-for-cloud-apps', name: 'Microsoft Defender for Cloud Apps', short: 'Cloud Apps', learn: 'https://learn.microsoft.com/en-us/defender-cloud-apps/', icon: { sourceName: 'Defender', sourcePath: 'apps/Defender.svg', match: 'shared' } },
      { slug: 'defender-for-cloud', name: 'Microsoft Defender for Cloud', short: 'Defender for Cloud', learn: 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/', icon: { sourceName: 'Microsoft Defender for Cloud', sourcePath: 'security/10241-icon-service-Microsoft-Defender-for-Cloud.svg', match: 'exact' } },
      { slug: 'defender-for-iot', name: 'Microsoft Defender for IoT', short: 'IoT', learn: 'https://learn.microsoft.com/en-us/azure/defender-for-iot/', icon: { sourceName: 'Microsoft Defender for IoT', sourcePath: 'security/02247-icon-service-Microsoft-Defender-for-IoT.svg', match: 'exact' } },
      { slug: 'sentinel', name: 'Microsoft Sentinel', short: 'Sentinel', learn: 'https://learn.microsoft.com/en-us/azure/sentinel/', icon: { sourceName: 'Azure Sentinel', sourcePath: 'security/10248-icon-service-Azure-Sentinel.svg', match: 'exact' } },
      { slug: 'easm', name: 'Microsoft Defender EASM', short: 'EASM', learn: 'https://learn.microsoft.com/en-us/azure/external-attack-surface-management/', icon: { sourceName: 'Microsoft Defender EASM', sourcePath: 'security/03336-icon-service-Microsoft-Defender-EASM.svg', match: 'exact' } },
      { slug: 'exposure-management', name: 'Microsoft Security Exposure Management', short: 'Exposure Management', learn: 'https://learn.microsoft.com/en-us/security-exposure-management/', icon: { sourceName: 'Blueprints', sourcePath: 'management-governance/00006-icon-service-Blueprints.svg', match: 'closest' } },
      { slug: 'defender-vulnerability-management', name: 'Microsoft Defender Vulnerability Management', short: 'Vulnerability Management', learn: 'https://learn.microsoft.com/en-us/defender-vulnerability-management/', icon: { sourceName: 'Compliance', sourcePath: 'management-governance/00011-icon-service-Compliance.svg', match: 'closest' } },
      { slug: 'defender-business', name: 'Microsoft Defender for Business', short: 'Business', learn: 'https://learn.microsoft.com/en-us/defender-business/', icon: { sourceName: 'Defender', sourcePath: 'apps/Defender.svg', match: 'shared' } },
      { slug: 'unified-secops-platform', name: 'Microsoft Unified SecOps Platform', short: 'Unified SecOps', learn: 'https://learn.microsoft.com/en-us/unified-secops-platform/', icon: { sourceName: 'Monitor', sourcePath: 'monitor/00001-icon-service-Monitor.svg', match: 'closest' } },
      { slug: 'defender-threat-intelligence', name: 'Microsoft Defender Threat Intelligence', short: 'Threat Intelligence', learn: 'https://learn.microsoft.com/en-us/defender/', icon: { sourceName: 'Detonation', sourcePath: 'security/00378-icon-service-Detonation.svg', match: 'closest' } }
    ],
    defaultProduct: 'defender-xdr',

    topics: [
      { slug: 'incidents', name: 'Incidents and response', icon: { sourceName: 'Azure Sentinel', sourcePath: 'security/10248-icon-service-Azure-Sentinel.svg', match: 'closest' } },
      { slug: 'hunting', name: 'Hunting and detection', icon: { sourceName: 'Monitor', sourcePath: 'monitor/00001-icon-service-Monitor.svg', match: 'closest' } },
      { slug: 'endpoint', name: 'Endpoint protection', icon: { sourceName: 'Endpoint Analytics', sourcePath: 'analytics/00562-icon-service-Endpoint-Analytics.svg', match: 'closest' } },
      { slug: 'email', name: 'Email and collaboration', icon: { sourceName: 'Detonation', sourcePath: 'security/00378-icon-service-Detonation.svg', match: 'closest' } },
      { slug: 'identity', name: 'Identity protection', icon: { sourceName: 'Security', sourcePath: 'identity/00321-icon-service-Security.svg', match: 'closest' } },
      { slug: 'cloud', name: 'Cloud and workloads', icon: { sourceName: 'Microsoft Defender for Cloud', sourcePath: 'security/10241-icon-service-Microsoft-Defender-for-Cloud.svg', match: 'closest' } },
      { slug: 'vulnerabilities', name: 'Vulnerabilities and exposure', icon: { sourceName: 'Compliance', sourcePath: 'management-governance/00011-icon-service-Compliance.svg', match: 'closest' } },
      { slug: 'architecture', name: 'Architecture and deployment', icon: { sourceName: 'Blueprints', sourcePath: 'management-governance/00006-icon-service-Blueprints.svg', match: 'closest' } },
      { slug: 'fundamentals', name: 'Fundamentals', icon: { sourceName: 'Guide', sourcePath: 'general/10810-icon-service-Guide.svg', match: 'closest' } },
      { slug: 'troubleshooting', name: 'Troubleshooting', icon: { sourceName: 'Troubleshoot', sourcePath: 'general/10341-icon-service-Troubleshoot.svg', match: 'exact' } },
      { slug: 'developer', name: 'Developer and API', icon: { sourceName: 'Code', sourcePath: 'general/10787-icon-service-Code.svg', match: 'closest' } },
      { slug: 'general', name: 'General', icon: { sourceName: 'Information', sourcePath: 'general/10005-icon-service-Information.svg', match: 'closest' } }
    ],
    defaultTopic: 'general',

    iconSource: {
      repository: 'https://github.com/DanielBradley1/msicons',
      revision: '3d57443ed4445be9465ee2fee6a6ce6fd02cf90c'
    },

    stopwords: 'microsoft defender documentation docs update updated updates change changes new for with from into about that this your their has have will are and the how use using overview configure configuration guide learn support service services preview security',

    searchAliases: {
      xdr: 'extended detection and response',
      mde: 'defender for endpoint',
      mdo: 'defender for office',
      mdi: 'defender for identity',
      mdca: 'defender for cloud apps',
      mdvm: 'defender vulnerability management',
      kql: 'kusto query language',
      asr: 'attack surface reduction',
      edr: 'endpoint detection and response',
      siem: 'security information and event management'
    }
  },

  // First match wins. Products come from the subtree a file lives in, which is
  // definitive here — unlike the two older products, where a file's directory
  // says less about which service it documents.
  classify: {
    products: [
      { slug: 'defender-for-cloud-apps', match: /^defender-for-cloud-apps\// },
      { slug: 'defender-for-cloud', match: /^defender-for-cloud\// },
      { slug: 'defender-for-iot', match: /^defender-for-iot(-azure)?\// },
      { slug: 'defender-for-identity', match: /^defender-for-identity\// },
      { slug: 'defender-office-365', match: /^defender-office-365\// },
      { slug: 'defender-vulnerability-management', match: /^defender-vulnerability-management\// },
      { slug: 'defender-endpoint', match: /^defender-endpoint\// },
      { slug: 'defender-business', match: /^defender-business\// },
      { slug: 'unified-secops-platform', match: /^unified-secops-platform\// },
      { slug: 'exposure-management', match: /^exposure-management\// },
      { slug: 'sentinel', match: /^sentinel\// },
      { slug: 'easm', match: /^easm\// },
      { slug: 'defender-threat-intelligence', match: /^defender\/threat-intelligence\// },
      { slug: 'defender-threat-intelligence', match: /^defender\// },
      { slug: 'defender-xdr', match: /^defender-xdr\// }
    ],
    topics: [
      { slug: 'hunting', scope: 'title', match: /\b(advanced hunting|hunting|detection rule|kql|custom detection)\b/ },
      { slug: 'incidents', scope: 'title', match: /\b(incident|alert|investigat|respon|attack story|action center)\b/ },
      { slug: 'troubleshooting', scope: 'title', match: /\b(troubleshoot|known issue|error|fix)\b/ },
      { slug: 'developer', scope: 'title', match: /\b(api|graph|powershell|streaming|connector|schema)\b/ },
      { slug: 'architecture', scope: 'title', match: /\b(deploy|onboard|architecture|plan|migrat|pilot|prerequisit)\b/ },
      { slug: 'vulnerabilities', match: /\b(vulnerabilit|cve|exposure|attack surface|security recommendation)\b/ },
      { slug: 'email', match: /^defender-office-365\/|\b(anti-phishing|anti-spam|safe links|safe attachments|quarantine|mail flow)\b/ },
      { slug: 'identity', match: /^defender-for-identity\/|\b(identity|sensor|lateral movement|domain controller)\b/ },
      { slug: 'cloud', match: /^(defender-for-cloud|defender-for-cloud-apps|sentinel)\/|\b(cloud workload|kubernetes|container|cspm)\b/ },
      { slug: 'endpoint', match: /^(defender-endpoint|defender-business)\/|\b(antivirus|asr|attack surface reduction|device control|endpoint)\b/ },
      { slug: 'fundamentals', scope: 'title', match: /\b(overview|what is|get started|introduction|licens)\b/ }
    ]
  },

  copy: {
    rssFeedLabel: 'Subscribe to the Daily Defender News RSS feed',
    messageCenterHeading: 'Defender in Message Center',
    landing: {
      heading: 'Today in Microsoft Defender',
      blurb: 'Every tracked change across Microsoft Defender documentation, in plain English.'
    },
    directory: {
      productsLede: 'Every Microsoft Defender service tracked here, with what changed in each.',
      topicsLede: 'Cross-product themes, from hunting and incident response to deployment.'
    },
    search: {
      inputLabel: 'Search Defender changes',
      placeholder: 'Search Microsoft Defender documentation changes'
    },
    compare: {
      pageTitle: 'Compare Defender documentation revisions',
      lede: 'Paste a Microsoft Learn URL to see exactly what changed between two revisions.',
      placeholderUrl: 'https://learn.microsoft.com/en-us/defender-xdr/incidents-overview',
      mapping: 'Defender, Sentinel and Azure security pages map to MicrosoftDocs/defender-docs.'
    },
    dailyEmail: {
      eyebrow: 'Daily Defender News',
      intro: 'A short daily summary of what changed across Microsoft Defender documentation.'
    },
    detail: {
      adminHeading: 'What Defender admins need to know',
      adminImpactLabel: 'For Defender administrators',
      summaryLabel: 'Change summary',
      summaryDisclosure: 'Summaries are generated from the documentation change itself.'
    },
    footer: {
      featureBlurb: 'Maester Cloud continuously tests your Microsoft 365 and Defender security configuration.',
      tagline: 'Daily.Defender.Admin.News — an independent record of Microsoft Defender documentation changes.'
    },
    about: {
      heading: 'About Daily.Defender.Admin.News',
      lede: 'A readable daily record of what Microsoft changed across the Defender documentation set.',
      whyItExists: [
        'Microsoft Defender spans more than a dozen services, and their documentation changes constantly. Most changes are never announced anywhere.',
        'This site watches the public documentation repository and writes down what changed, so a defender does not have to diff the docs themselves.'
      ],
      howItWorks: [
        'Every six hours the public MicrosoftDocs/defender-docs repository is checked for commits that touch a published article.',
        'Each change is summarised, classified by service and theme, and published with a link to the exact revision that produced it.',
        'Nothing here is official. It is a reading of the public documentation history.'
      ],
      emailEyebrow: 'Daily Defender News',
      emailBody: 'A short daily summary of what changed across Microsoft Defender documentation.',
      extraSections: [],
      community: [
        'Built by Merill Fernando alongside Daily.Entra.News and Daily.Intune.Admin.News.'
      ],
      quote: 'The documentation changes every day. Somebody should be reading it.',
      bio: 'Merill Fernando builds tools for Microsoft identity and security administrators.'
    }
  }
};
