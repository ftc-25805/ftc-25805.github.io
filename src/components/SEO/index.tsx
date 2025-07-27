/**
 * SEO Component - Smart Wrapper
 * Chooses between BasicSEO and EnhancedSEO based on requirements
 */

import React from 'react';
import BasicSEO from '@site/src/components/BasicSEO';
import EnhancedSEO from '@site/src/components/EnhancedSEO';
import { generateBasicSEO, generateEnhancedSEO } from '@site/src/utils/seoHelpers';

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
  enhanced?: boolean; // Flag to determine which SEO component to use
  includeTeamData?: boolean;
  noindex?: boolean;
  canonical?: string;
}

export default function SEO({
  enhanced = false,
  ...props
}: SEOProps): React.ReactElement {
  // Use enhanced SEO for complex pages (home, landing pages, articles)
  // Use basic SEO for simple pages (docs, team pages, etc.)
  
  if (enhanced || props.article || props.organization || props.includeTeamData) {
    return <EnhancedSEO {...props} />;
  }
  
  return <BasicSEO {...props} />;
}

// Re-export helper functions for backward compatibility
export { generateBasicSEO as generatePageSEO } from '@site/src/utils/seoHelpers';