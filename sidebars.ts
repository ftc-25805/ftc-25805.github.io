import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    // Resources sidebar with organized categories
    resourcesSidebar: [
        'resources/index',
        {
            type: 'category',
            label: 'Programming Guides',
            items: [
                'resources/programming-guides/getting-started',
                'resources/programming-guides/advanced-programming',
            ],
        },
        {
            type: 'category',
            label: 'Build and Design Resources',
            items: [
                'resources/build-and-design/mechanical-design',
                // 'resources/build-and-design/electronics-and-wiring',
            ],
        },
        // {
        //     type: 'category',
        //     label: 'Competition Strategy',
        //     items: [
        //         'resources/competition-strategy/game-strategy',
        //     ],
        // },
        // {
        //     type: 'category',
        //     label: 'Video Tutorials',
        //     items: [
        //         'resources/video-tutorials/programming-series',
        //         'resources/video-tutorials/additional-resources',
        //     ],
        // },
        // {
        //   type: 'category',
        //   label: 'Team Development',
        //   items: [
        //     'resources/team-development/project-management',
        //     'resources/team-development/teamwork-and-communication',
        //   ],
        // },
        {
            type: 'category',
            label: 'Community Resources',
            items: [
                'resources/community-resources/forums-and-discussion',
                'resources/community-resources/local-events-and-meetups',
            ],
        },
    ],

    // But you can create a sidebar manually
    /*
    tutorialSidebar: [
      'intro',
      'hello',
      {
        type: 'category',
        label: 'Tutorial',
        items: ['tutorial-basics/create-a-document'],
      },
    ],
     */
};

export default sidebars;
