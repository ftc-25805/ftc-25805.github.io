/**
 * Structured Data Utilities
 * Centralized structured data generation for SEO
 */

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface StructuredDataConfig {
  siteUrl: string;
  siteName: string;
}

interface TeamStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  foundingDate: string;
  description: string;
  location: {
    '@type': string;
    addressCountry: string;
    addressRegion: string;
  };
  memberOf: {
    '@type': string;
    name: string;
    url: string;
  };
  sport: string;
  coach?: {
    '@type': string;
    name: string;
  };
  awards?: Array<{
    '@type': string;
    name: string;
    dateReceived: string;
  }>;
}

interface ArticleStructuredData {
  '@context': string;
  '@type': string;
  headline?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  articleSection?: string;
  keywords?: string;
}

export function generateTeamStructuredData(config: StructuredDataConfig): TeamStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: 'FTC Team 25805',
    url: config.siteUrl,
    logo: `${config.siteUrl}/img/team-logo-512.png`,
    foundingDate: '2023',
    description: 'FTC Team 25805 - Innovation through Engineering Excellence. Competitive robotics team dedicated to STEM education and community outreach.',
    location: {
      '@type': 'Place',
      addressCountry: 'US',
      addressRegion: 'VA',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'FIRST Tech Challenge',
      url: 'https://www.firstinspires.org/robotics/ftc',
    },
    sport: 'Robotics',
    coach: {
      '@type': 'Person',
      name: 'Team Mentors',
    },
    awards: [
      {
        '@type': 'Achievement',
        name: 'Think Award',
        dateReceived: '2024-12-01',
      },
      {
        '@type': 'Achievement', 
        name: 'Regional Tournament Advancement',
        dateReceived: '2024-11-15',
      },
    ],
  };
}

export function generateArticleStructuredData(
  config: StructuredDataConfig,
  data: {
    title?: string;
    description?: string;
    image?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  }
): ArticleStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image,
    datePublished: data.publishedTime,
    dateModified: data.modifiedTime || data.publishedTime,
    author: {
      '@type': 'Person',
      name: data.author || 'FTC Team 25805',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FTC Team 25805',
      logo: {
        '@type': 'ImageObject',
        url: `${config.siteUrl}/img/team-logo-512.png`,
      },
    },
    articleSection: data.section,
    keywords: data.tags?.join(', '),
  };
}

export function generateOrganizationStructuredData(
  config: StructuredDataConfig,
  data: {
    name?: string;
    type?: string;
    url?: string;
    logo?: string;
    foundingDate?: string;
    location?: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': data.type || 'Organization',
    name: data.name || 'FTC Team 25805',
    url: data.url || config.siteUrl,
    logo: data.logo ? `${config.siteUrl}${data.logo}` : `${config.siteUrl}/img/team-logo-512.png`,
    foundingDate: data.foundingDate || '2023',
    location: data.location || 'Virginia, United States',
  };
}