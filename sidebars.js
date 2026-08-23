// @ts-check
// Explicit sidebar for docs.pombo.cc
// See: https://docusaurus.io/docs/sidebar

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'welcome',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/install',
        'getting-started/identity',
        'getting-started/first-steps',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'concepts/architecture',
        'concepts/channels-and-ownership',
        'concepts/gated-and-paid-channels',
        'concepts/encryption',
        'concepts/privacy-model',
        'concepts/storage-and-persistence',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/managing-channels',
        'guides/file-sharing',
        'guides/notifications',
        'guides/backup-and-recovery',
      ],
    },
    {
      type: 'category',
      label: 'Node Operators',
      collapsed: true,
      items: [
        'operators/run-a-relay',
        'operators/run-a-storage-node',
      ],
    },
    {
      type: 'category',
      label: 'Security & Privacy',
      collapsed: true,
      items: [
        'security/threat-model',
      ],
    },
    {
      type: 'category',
      label: 'Help',
      collapsed: true,
      items: [
        'help/faq',
        'help/troubleshooting',
        'help/glossary',
      ],
    },
  ],
};

export default sidebars;
