import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const includePrivate = process.env.CRAFTBASE_BUILD === 'full';

const config: Config = {
  title: 'CraftBase',
  tagline: 'Base de conocimiento técnico y de diseño',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://craftbase.example.com',
  baseUrl: '/',

  organizationName: 'craftbase',
  projectName: 'craftbase',

  onBrokenLinks: 'throw',

  markdown: {
    format: 'detect',
  },

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  themes: ['@docusaurus/theme-live-codeblock'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    ...(includePrivate
      ? [
          [
            '@docusaurus/plugin-content-docs',
            {
              id: 'private',
              path: 'private-docs',
              routeBasePath: 'private',
              sidebarPath: './sidebarsPrivate.ts',
            },
          ] as [string, Record<string, unknown>],
        ]
      : []),
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['es', 'en'],
        indexBlog: false,
        indexPages: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcut: true,
        searchBarShortcutHint: false,
        searchBarShortcutKeymap: 'mod+k',
        searchBarPosition: 'right',
        searchResultLimits: 8,
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'CraftBase',
      logo: {
        alt: 'CraftBase',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'craftbaseSidebar',
          position: 'left',
          label: 'Documentación',
        },
        {
          type: 'custom-navbarTools',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `CraftBase · v1 Docusaurus · ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'docker', 'sql'],
    },
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
