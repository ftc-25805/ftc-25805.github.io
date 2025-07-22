import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { loadSeasons } from './scripts/generate-data.js';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Dynamic navigation helper functions
function getSeasonsNavItems() {
  try {
    const seasons = loadSeasons();
    const currentSeason = seasons.find(season => season.status === 'active');
    
    const items = [];
    
    // Add current season first if it exists
    if (currentSeason) {
      items.push({
        label: `Current (${currentSeason.year})`,
        to: currentSeason.path,
      });
    }
    
    // Add all seasons link
    items.push({
      label: 'All Seasons',
      to: '/seasons',
    });
    
    // Add individual season links (limit to recent ones)
    const recentSeasons = seasons.slice(0, 3);
    for (const season of recentSeasons) {
      if (season.status !== 'active') {
        items.push({
          label: season.year,
          to: season.path,
        });
      }
    }
    
    return items;
  } catch (error) {
    console.error('Error loading seasons for navigation:', error);
    // Fallback navigation
    return [
      { label: 'Current (2024-25)', to: '/seasons/2024-25' },
      { label: 'All Seasons', to: '/seasons' },
      { label: '2023-24', to: '/seasons/2023-24' },
      { label: '2022-23', to: '/seasons/2022-23' },
    ];
  }
}

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
                    editUrl: 'https://github.com/ftc-25805/ftc-25805.github.io/tree/main/',
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                },
                blog: {
                    showReadingTime: true,
                    readingTime: ({content, frontMatter, defaultReadingTime}) =>
                        defaultReadingTime({content, options: {wordsPerMinute: 300}}),
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                        title: 'FTC Team 25805 Blog',
                        description: 'Latest updates from FTC Team 25805 - robotics, competitions, and STEM outreach',
                        copyright: `Copyright © ${new Date().getFullYear()} FTC Team 25805`,
                    },
                    editUrl: 'https://github.com/ftc-25805/ftc-25805.github.io/tree/main/',
                    blogSidebarTitle: 'Recent Posts',
                    blogSidebarCount: 10,
                    postsPerPage: 6,
                    // Enable draft posts in development
                    showLastUpdateTime: true,
                    showLastUpdateAuthor: true,
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                    ignorePatterns: ['/tags/**'],
                    filename: 'sitemap.xml',
                },
                gtag: {
                    trackingID: 'G-XXXXXXXXXX', // Replace with actual Google Analytics ID
                    anonymizeIP: true,
                },
            } satisfies Preset.Options,
        ],
    ],

    plugins: [
        [
            '@docusaurus/plugin-ideal-image',
            {
                quality: 70,
                max: 1030,
                min: 640,
                steps: 2,
                disableInDev: false,
            },
        ],
        [
            '@easyops-cn/docusaurus-search-local',
            {
                hashed: true,
                language: ['en'],
                highlightSearchTermsOnTargetPage: true,
                explicitSearchResultPath: true,
                docsRouteBasePath: '/docs',
                blogRouteBasePath: '/blog',
                removeDefaultStopWordFilter: false,
                searchResultLimits: 8,
                searchResultContextMaxLength: 50,
            },
        ],
        [
            '@docusaurus/plugin-pwa',
            {
                debug: true,
                offlineModeActivationStrategies: [
                    'appInstalled',
                    'standalone',
                    'queryString',
                ],
                pwaHead: [
                    {
                        tagName: 'link',
                        rel: 'icon',
                        href: '/img/team-logo.png',
                    },
                    {
                        tagName: 'link',
                        rel: 'manifest',
                        href: '/manifest.json',
                    },
                    {
                        tagName: 'meta',
                        name: 'theme-color',
                        content: '#8B5CF6',
                    },
                    {
                        tagName: 'meta',
                        name: 'apple-mobile-web-app-capable',
                        content: 'yes',
                    },
                    {
                        tagName: 'meta',
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: '#8B5CF6',
                    },
                    {
                        tagName: 'link',
                        rel: 'apple-touch-icon',
                        href: '/img/team-logo-192.png',
                    },
                    {
                        tagName: 'link',
                        rel: 'mask-icon',
                        href: '/img/team-logo.svg',
                        color: '#FF6A00',
                    },
                    {
                        tagName: 'meta',
                        name: 'msapplication-TileImage',
                        content: '/img/team-logo-192.png',
                    },
                    {
                        tagName: 'meta',
                        name: 'msapplication-TileColor',
                        content: '#8B5CF6',
                    },
                    // SEO and metadata
                    {
                        tagName: 'meta',
                        name: 'keywords',
                        content: 'FTC, FIRST Tech Challenge, robotics, STEM education, engineering, programming',
                    },
                    {
                        tagName: 'meta',
                        name: 'author',
                        content: 'FTC Team 25805',
                    },
                    {
                        tagName: 'meta',
                        property: 'og:type',
                        content: 'website',
                    },
                    {
                        tagName: 'meta',
                        property: 'og:site_name',
                        content: 'FTC Team 25805',
                    },
                    {
                        tagName: 'meta',
                        name: 'twitter:card',
                        content: 'summary_large_image',
                    },
                    {
                        tagName: 'meta',
                        name: 'twitter:site',
                        content: '@ftc25805',
                    },
                ],
            },
        ],
    ],

    themeConfig: {
        // Social card image for sharing
        image: 'img/ftc-25805-social-card.jpg',
        
        // Announcement bar for important updates
        announcementBar: {
            id: 'competition-season-2024',
            content:
                '🏆 <strong>Competition Season 2024-25 is underway!</strong> Follow our journey and upcoming tournaments. <a target="_blank" rel="noopener noreferrer" href="/seasons/2024-25">Learn more</a>',
            backgroundColor: '#8B5CF6',
            textColor: '#FFFFFF',
            isCloseable: true,
        },
        
        // Enhanced navbar configuration
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        
        // Search configuration (disabled until Algolia is properly configured)
        // algolia: {
        //     appId: 'YOUR_APP_ID',
        //     apiKey: 'YOUR_SEARCH_API_KEY',
        //     indexName: 'ftc-25805',
        //     contextualSearch: true,
        //     searchParameters: {},
        //     searchPagePath: 'search',
        // },
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
                    className: 'navbar__item--hide-mobile',
                },
                {
                    type: 'dropdown',
                    label: 'Seasons',
                    position: 'left',
                    items: getSeasonsNavItems(),
                    className: 'navbar__item--show-mobile',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'ftcSidebar',
                    position: 'left',
                    label: 'Resources',
                    className: 'navbar__item--hide-mobile',
                },
                {
                    to: '/community',
                    label: 'Community',
                    position: 'left',
                    className: 'navbar__item--hide-mobile',
                },
                { 
                    to: '/blog', 
                    label: 'Blog', 
                    position: 'left',
                    className: 'navbar__item--hide-mobile',
                },
                {
                    href: 'https://github.com/ftc-25805',
                    label: 'GitHub',
                    position: 'right',
                    className: 'navbar__item--show-mobile',
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
                            label: 'All Seasons',
                            to: '/seasons',
                        },
                        {
                            label: 'Current Season',
                            to: '/seasons/2024-25',
                        },
                        {
                            label: 'Our Robots',
                            to: '/seasons/2024-25#current-robot',
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
            additionalLanguages: ['java', 'kotlin', 'groovy'],
        },
        
        // Table of contents configuration
        tableOfContents: {
            minHeadingLevel: 2,
            maxHeadingLevel: 4,
        },
        
        // Live code blocks configuration
        liveCodeBlock: {
            playgroundPosition: 'bottom',
        },
        
        // Enhanced docs configuration
        docs: {
            sidebar: {
                hideable: true,
                autoCollapseCategories: true,
            },
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
