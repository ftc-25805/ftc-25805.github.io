import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'Reprogrammed - FTC #25805',
    tagline: 'We are Team 25805 \'Reprogrammed,\' representing Dayton Christian School with the mission to cultivate the next generation of Christ-centered engineers and innovators. Through competitive robotics, we develop technical excellence, creative problem-solving, and servant leadership that transforms both our team and community',
    favicon: 'logo.png',

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
        image: 'logo.png',
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: true,
            respectPrefersColorScheme: false,
        },
        navbar: {
            title: 'Reprogrammed',
            logo: {
                alt: 'Reprogrammed Team Logo',
                src: 'logo.png',
            },
            items: [
                { to: '/about', label: 'About', position: 'left' },
                { to: '/blog', label: 'Blog', position: 'left' },
                { to: '/sponsorship', label: 'Sponsorship', position: 'left' },
                { to: '/contact', label: 'Contact', position: 'left' },
                {
                    type: 'docSidebar',
                    sidebarId: 'resourcesSidebar',
                    position: 'left',
                    label: 'Resources',
                },
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
                            label: 'FTC Scout',
                            to: 'https://ftcscout.org/teams/25805#USOHCIQ'
                        }
                    ]
                },
                {
                    title: 'More',
                    items: [
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
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Reprogrammed - FTC Team 25805. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
