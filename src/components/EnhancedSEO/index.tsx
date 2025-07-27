/**
 * Enhanced SEO Component
 * Full-featured SEO component with structured data for landing pages
 */

import React from 'react';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { 
  generateTeamStructuredData, 
  generateArticleStructuredData, 
  generateOrganizationStructuredData 
} from '@site/src/utils/structuredData';

interface EnhancedSEOProps {
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
  includeTeamData?: boolean;
  noindex?: boolean;
  canonical?: string;
}

export default function EnhancedSEO({
  title,
  description,
  keywords,
  image,
  imageAlt,
  type = 'website',
  article,
  organization,
  includeTeamData = true,
  noindex = false,
  canonical,
}: EnhancedSEOProps): React.ReactElement {
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

  // Configuration for structured data
  const structuredDataConfig = {
    siteUrl,
    siteName: siteTitle,
  };

  // Generate structured data
  const teamStructuredData = includeTeamData ? generateTeamStructuredData(structuredDataConfig) : null;
  
  const organizationStructuredData = organization ? 
    generateOrganizationStructuredData(structuredDataConfig, organization) : null;
  
  const articleStructuredData = article ? 
    generateArticleStructuredData(structuredDataConfig, {
      title,
      description: metaDescription,
      image: metaImage,
      ...article,
    }) : null;

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
      {teamStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(teamStructuredData)}
        </script>
      )}
      
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