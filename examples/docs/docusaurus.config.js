// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'glrb',
  tagline: 'glrb is a simple OpenGL wrapper for Ruby',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tseijp',
  projectName: 'tseijp',
  i18n: { defaultLocale: 'en', locales: ['en'], },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          editUrl:
            'https://github.com/tseijp/glrb/tree/main/examples/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/tseijp/glrb/tree/main/examples/docs/',
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'glrb',
        logo: { alt: ' ', src: 'img/logo.svg', },
        items: [
          { type: 'doc', docId: 'intro', position: 'left', label: 'API', },
          { to: '/blog', label: 'Blog', position: 'left'},
          { label: 'GitHub', position: 'right', href: 'https://github.com/tseijp/glrb', },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [ { label: 'Docs', to: '/docs/intro', }, ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/glrb', },
              { label: 'glrb', href: 'https://discord.gg/kPCdxrGuVu', },
              { label: 'Twitter', href: 'https://twitter.com/tseijp', },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Blog', to: '/blog', },
              { label: 'GitHub', href: 'https://github.com/tseijp/glrb', },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: { theme: lightCodeTheme, darkTheme: darkCodeTheme, },
    }),
};

module.exports = config;
