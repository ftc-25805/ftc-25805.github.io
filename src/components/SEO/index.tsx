/**
 * Comprehensive SEO Component
 * Provides structured data, meta tags, and social sharing optimization
 */

import React from 'react';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile' | 'organization';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  organization?: {
    name?: string;
    type?: string;
    url?: string;
    logo?: string;
    foundingDate?: string;
    location?: string;
  };
  noindex?: boolean;
  canonical?: string;
}

interface RoboticsTeamStructuredData {
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

export default function SEO({
  title,
  description,
  keywords,
  image,
  imageAlt,
  type = 'website',
  article,
  organization,
  noindex = false,
  canonical,
}: SEOProps): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();

  // Default values
  const siteTitle = siteConfig.title;
  const siteDescription = siteConfig.tagline;
  const siteUrl = siteConfig.url;
  const currentUrl = `${siteUrl}${location.pathname}`;

  // Meta tag values
  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || siteDescription;
  const metaImage = image ? `${siteUrl}${image}` : `${siteUrl}/img/ftc-25805-social-card.jpg`;
  const metaImageAlt = imageAlt || 'FTC Team 25805 - Innovation through Engineering Excellence';
  const metaKeywords = keywords || 'FTC, FIRST Tech Challenge, robotics, STEM education, engineering, programming, Team 25805, competition, automation';

  // Structured data for robotics team
  const teamStructuredData: RoboticsTeamStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: 'FTC Team 25805',
    url: siteUrl,
    logo: `${siteUrl}/img/team-logo-512.png`,
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

  // Organization structured data
  const organizationStructuredData = organization && {
    '@context': 'https://schema.org',
    '@type': organization.type || 'Organization',
    name: organization.name || 'FTC Team 25805',
    url: organization.url || siteUrl,
    logo: organization.logo ? `${siteUrl}${organization.logo}` : `${siteUrl}/img/team-logo-512.png`,
    foundingDate: organization.foundingDate || '2023',
    location: organization.location || 'Virginia, United States',
  };

  // Article structured data
  const articleStructuredData = article && {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: metaDescription,
    image: metaImage,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      '@type': 'Person',
      name: article.author || 'FTC Team 25805',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FTC Team 25805',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/img/team-logo-512.png`,
      },
    },
    articleSection: article.section,
    keywords: article.tags?.join(', '),
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="FTC Team 25805" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={metaImageAlt} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ftc25805" />
      <meta name="twitter:creator" content="@ftc25805" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={metaImageAlt} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#7C3AED" />
      <meta name="msapplication-TileColor" content="#7C3AED" />
      <meta name="application-name" content={siteTitle} />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="US-VA" />
      <meta name="geo.placename" content="Virginia, United States" />
      <meta name="ICBM" content="37.4316, -78.6569" />
      
      {/* Contact Information */}
      <meta name="contact" content="team@ftc25805.org" />
      <meta name="copyright" content={`© ${new Date().getFullYear()} FTC Team 25805`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(teamStructuredData)}
      </script>
      
      {organizationStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </script>
      )}
      
      {articleStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      )}
      
      {/* Performance and Resource Hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-touch-fullscreen" content="yes" />
    </Head>
  );
}

// Helper function to generate page-specific SEO
export function generatePageSEO(pageType: string, data: any = {}) {
  const baseProps: SEOProps = {};

  switch (pageType) {
    case 'home':
      return {
        title: 'FTC Team 25805 - Innovation through Engineering Excellence',
        description: 'FTC Team 25805 is a competitive robotics team dedicated to STEM education, engineering innovation, and community outreach. Follow our journey in the FIRST Tech Challenge.',
        keywords: 'FTC Team 25805, FIRST Tech Challenge, robotics competition, STEM education, engineering, programming, autonomous robot, teleop, community outreach',
        type: 'website' as const,
      };
      
    case 'team':
      return {
        title: 'Our Team - Meet the Engineers',
        description: 'Meet the talented students and mentors behind FTC Team 25805. Our diverse team brings together programmers, engineers, designers, and strategists.',
        keywords: 'FTC team members, robotics students, STEM mentors, engineering team, programming team, design team',
        type: 'organization' as const,
      };
      
    case 'season':
      return {
        title: `${data.seasonName} Season - Competition Results`,
        description: `Follow FTC Team 25805's journey during the ${data.seasonName} season. Robot design, competition results, and team achievements.`,
        keywords: `${data.seasonName}, FTC competition, robot design, tournament results, ${data.gameName}`,
        type: 'website' as const,
      };
      
    case 'blog':
      return {
        title: data.title,
        description: data.description || data.excerpt,
        keywords: data.tags?.join(', '),
        type: 'article' as const,
        article: {
          publishedTime: data.publishedTime,
          modifiedTime: data.modifiedTime,
          author: data.author,
          section: 'Robotics Blog',
          tags: data.tags,
        },
      };
      
    default:
      return baseProps;
  }
}