// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import 'dotenv/config';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hi, I\'m Guy Klages!',
  tagline: '',
  favicon: 'img/Guy-suit-head-shot.png',  // favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://guyklages.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // PostHog public keys — safe to expose in the browser bundle.
  // Set POSTHOG_PROJECT_TOKEN and POSTHOG_HOST in .env (never committed).
  customFields: {
    posthogKey: process.env.POSTHOG_PROJECT_TOKEN || '',
    posthogHost: process.env.POSTHOG_HOST || 'https://us.i.posthog.com',
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
        sidebarPath: './sidebars.js',
        routeBasePath: '/',
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        // editUrl:
        //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
      },
      blog: {
        blogSidebarCount: 'ALL',
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        // editUrl:
        //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // Useful options to enforce blogging best practices
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
      },
      theme: {
        customCss: './src/css/custom.css',
      },
    }),
  ],
  [
    'redocusaurus',
    {
      specs: [
        {
          spec: 'static/atelio-api.yaml',
          route: '/atelio-api/',
        },
      ],
      theme: {
        primaryColor: '#1890ff',
      },
    },
  ],
],

  themes: ['docusaurus-theme-redoc', '@docusaurus/theme-mermaid'],

  plugins: ['docusaurus-plugin-image-zoom'],

  markdown: {
    mermaid: true,
  },

  themeConfig:
    {
      image: 'img/Guy-suit-head-shot.png',
      zoom: {
        selector: '.markdown :not(em) > img', // Targets images inside markdown
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)',
        },
        config: {
          // medium-zoom configuration options
          margin: 24,
          scrollOffset: 0,
        },
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Hi, I\'m Guy Klages （柯進強、ガイ-クラゲス）',
        // logo: {
        //   alt: 'My Site Logo',
        //  src: 'img/Guy-suit-head-shot.png',
        // },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'sidebarPortfolio',
            position: 'left',
            label: 'Portfolio',
          },
          {
            type: 'docSidebar',
            sidebarId: 'sidebarAtelioGuides',
            position: 'left',
            label: 'Atelio guides',
          },
          {
            type: 'docSidebar',
            sidebarId: 'sidebarNium',
            position: 'left',
            label: 'Nium guides',
          },
          {
            type: 'docSidebar',
            sidebarId: 'sidebarCouchbase',
            position: 'left',
            label: 'Couchbase guides',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            type: 'docSidebar',
            sidebarId: 'sidebarSolar',
            position: 'left',
            label: 'Solar',
          },
          {
            href: 'https://camelmind-docs.vercel.app/home',
            label: 'CamelMind docs platform',
            position: 'right',
          },
          {
            href: 'https://github.com/guyklages',
            label: 'Guy Klages GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Edutainme, Inc. Built with Docusaurus. Versioned with Git. Powered by coffee.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        showLanguage: true,
        additionalLanguages: ['csharp', 'java', 'javascript', 'json', 'python', 'ruby', 'scala'],
      },
    },
};

export default config;

