import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'FTC Team 25805',
    tagline: 'Innovation through Engineering Excellence',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://ftc-25805.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'ftc-25805', // Usually your GitHub org/user name.
    projectName: 'ftc-25805.github.io', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    deploymentBranch: 'gh-pages',

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
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/ftc-25805/ftc-25805.github.io/tree/main/',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/ftc-25805/ftc-25805.github.io/tree/main/',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'FTC Team 25805',
            logo: {
                alt: 'FTC Team 25805 Logo',
                src: 'img/team-logo.svg',
            },
            items: [
                {
                    to: '/team',
                    label: 'Team',
                    position: 'left',
                },
                {
                    to: '/robots',
                    label: 'Robots',
                    position: 'left',
                },
                {
                    to: '/competitions',
                    label: 'Competitions',
                    position: 'left',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Resources',
                },
                {
                    to: '/community',
                    label: 'Community',
                    position: 'left',
                },
                { to: '/blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/ftc-25805',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Team',
                    items: [
                        {
                            label: 'About Us',
                            to: '/team/about',
                        },
                        {
                            label: 'Team Members',
                            to: '/team/members',
                        },
                        {
                            label: 'History',
                            to: '/team/history',
                        },
                    ],
                },
                {
                    title: 'Competition',
                    items: [
                        {
                            label: 'Current Season',
                            to: '/competitions/current',
                        },
                        {
                            label: 'Our Robots',
                            to: '/robots',
                        },
                        {
                            label: 'Awards',
                            to: '/competitions/awards',
                        },
                    ],
                },
                {
                    title: 'Resources',
                    items: [
                        {
                            label: 'Documentation',
                            to: '/docs/intro',
                        },
                        {
                            label: 'Blog',
                            to: '/blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/ftc-25805',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Sponsors',
                            to: '/community/sponsors',
                        },
                        {
                            label: 'Outreach',
                            to: '/community/outreach',
                        },
                        {
                            label: 'Contact',
                            to: '/contact',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} FTC Team 25805. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
