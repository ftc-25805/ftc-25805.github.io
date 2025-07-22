import type { ReactNode } from 'react';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  canonical?: string;
}

export default function SEOHead({
  title,
  description,
  image,
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
  canonical
}: SEOHeadProps): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  
  const siteTitle = siteConfig.title;
  const siteDescription = siteConfig.tagline;
  const siteUrl = siteConfig.url;
  
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || siteDescription;
  const pageUrl = `${siteUrl}${location.pathname}`;
  const pageImage = image ? `${siteUrl}${image}` : `${siteUrl}/img/ftc-25805-social-card.jpg`;
  
  const allKeywords = [
    'FTC',
    'FIRST Tech Challenge',
    'robotics',
    'STEM education',
    'engineering',
    'programming',
    'Team 25805',
    ...keywords
  ].join(', ');

  return (
    <Head>
      {/* Basic meta tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={allKeywords} />
      {author && <meta name="author" content={author} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || pageUrl} />
      
      {/* Robot meta */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph meta tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:alt" content={`${title || siteTitle} - Preview`} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ftc25805" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:alt" content={`${title || siteTitle} - Preview`} />
      
      {/* Additional meta tags for better SEO */}
      <meta name="theme-color" content="#FF6A00" />
      <meta name="msapplication-TileColor" content="#FF6A00" />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      <meta name="application-name" content={siteTitle} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "FTC Team 25805",
          "description": pageDescription,
          "url": siteUrl,
          "logo": `${siteUrl}/img/team-logo.svg`,
          "sameAs": [
            "https://github.com/ftc-25805",
            "https://twitter.com/ftc25805"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Team Contact",
            "url": `${siteUrl}/contact`
          },
          "foundingDate": "2024",
          "location": {
            "@type": "Place",
            "name": "Local Area"
          },
          "memberOf": {
            "@type": "Organization", 
            "name": "FIRST Tech Challenge",
            "url": "https://www.firstinspires.org/robotics/ftc"
          }
        })}
      </script>
    </Head>
  );
}