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
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/direct-messages',
        'guides/managing-channels',
        'guides/file-sharing',
        'guides/backup-and-recovery',
      ],
    },
    {
      type: 'category',
      label: 'How Pombo Works',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Architecture',
          collapsed: false,
          items: [
            'concepts/client',
            'concepts/channel-anatomy',
            'concepts/storage-and-sync',
            'concepts/notifications',
          ],
        },
        'concepts/channel-access',
        'concepts/ownership-and-moderation',
        'concepts/encryption',
        'concepts/privacy-model',
      ],
    },
    {
      type: 'category',
      label: 'Security & Privacy',
      collapsed: true,
      items: [
        'security/privacy-at-a-glance',
        'security/threat-model',
        {type: 'link', label: 'Privacy policy', href: '/legal/privacy-policy'},
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
