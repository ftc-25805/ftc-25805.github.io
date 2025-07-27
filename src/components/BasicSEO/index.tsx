/**
 * Basic SEO Component
 * Simplified SEO component for most pages with essential meta tags
 */

import React from 'react';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface BasicSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  canonical?: string;
}

export default function BasicSEO({
  title,
  description,
  keywords,
  image,
  imageAlt,
  noindex = false,
  canonical,
}: BasicSEOProps): React.ReactElement {
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
  const metaKeywords = keywords || 'FTC, FIRST Tech Challenge, robotics, STEM education, engineering, programming, Team 25805';

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
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={metaImageAlt} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ftc25805" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={metaImageAlt} />
      
      {/* Theme */}
      <meta name="theme-color" content="#7C3AED" />
    </Head>
  );
}