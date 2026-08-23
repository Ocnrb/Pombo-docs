// @ts-check
// Docusaurus config for docs.pombo.cc
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pombo Docs',
  tagline: 'Own your communications',
  favicon: 'favicon/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.pombo.cc',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'Ocnrb',
  projectName: 'pombo-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: ['docusaurus-plugin-image-zoom'],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'favicon/og-banner.png',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Pombo',
        logo: {
          alt: 'Pombo logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://app.pombo.cc',
            label: 'Open App',
            position: 'right',
          },
          {
            href: 'https://github.com/Ocnrb/Pombo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Pombo',
            items: [
              {label: 'Website', href: 'https://pombo.cc'},
              {label: 'Open App', href: 'https://app.pombo.cc'},
            ],
          },
          {
            title: 'Community',
            items: [
              {label: 'GitHub', href: 'https://github.com/Ocnrb/Pombo'},
              {label: 'X', href: 'https://x.com/app_Pombo'},
            ],
          },
          {
            title: 'Built on',
            items: [
              {label: 'Streamr Network', href: 'https://streamr.network'},
              {label: 'Polygon', href: 'https://polygon.technology'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Pombo. Own your communications.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
      zoom: {
        selector: '.markdown img',
        background: {
          light: 'rgba(255, 255, 255, 0.95)',
          dark: 'rgba(9, 9, 11, 0.95)',
        },
      },
    }),
};

export default config;
