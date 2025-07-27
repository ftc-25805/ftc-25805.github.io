/**
 * SEO Helper Functions
 * Simplified helper functions for generating page-specific SEO
 */

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  canonical?: string;
}

interface EnhancedSEOProps extends SEOProps {
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
}

// Helper function to generate basic SEO props for most pages
export function generateBasicSEO(pageType: string, data: any = {}): SEOProps {
  const baseProps: SEOProps = {};

  switch (pageType) {
    case 'home':
      return {
        title: 'FTC Team 25805 - Innovation through Engineering Excellence',
        description: 'FTC Team 25805 is a competitive robotics team dedicated to STEM education, engineering innovation, and community outreach. Follow our journey in the FIRST Tech Challenge.',
        keywords: 'FTC Team 25805, FIRST Tech Challenge, robotics competition, STEM education, engineering, programming, autonomous robot, teleop, community outreach',
      };
      
    case 'team':
      return {
        title: 'Our Team - Meet the Engineers',
        description: 'Meet the talented students and mentors behind FTC Team 25805. Our diverse team brings together programmers, engineers, designers, and strategists.',
        keywords: 'FTC team members, robotics students, STEM mentors, engineering team, programming team, design team',
      };
      
    case 'season':
      return {
        title: `${data.seasonName} Season - Competition Results`,
        description: `Follow FTC Team 25805's journey during the ${data.seasonName} season. Robot design, competition results, and team achievements.`,
        keywords: `${data.seasonName}, FTC competition, robot design, tournament results, ${data.gameName}`,
      };
      
    case 'docs':
      return {
        title: data.title,
        description: data.description || 'Technical documentation and resources for FTC Team 25805.',
        keywords: 'FTC documentation, robotics programming, engineering guide, technical resources',
      };
      
    default:
      return baseProps;
  }
}

// Helper function to generate enhanced SEO props for special pages
export function generateEnhancedSEO(pageType: string, data: any = {}): EnhancedSEOProps {
  const basicProps = generateBasicSEO(pageType, data);

  switch (pageType) {
    case 'home':
      return {
        ...basicProps,
        type: 'website',
        includeTeamData: true,
      };
      
    case 'team':
      return {
        ...basicProps,
        type: 'organization',
        organization: {
          name: 'FTC Team 25805',
          type: 'SportsTeam',
          foundingDate: '2023',
          location: 'Virginia, United States',
        },
      };
      
    case 'blog':
      return {
        ...basicProps,
        title: data.title,
        description: data.description || data.excerpt,
        keywords: data.tags?.join(', '),
        type: 'article',
        article: {
          publishedTime: data.publishedTime,
          modifiedTime: data.modifiedTime,
          author: data.author,
          section: 'Robotics Blog',
          tags: data.tags,
        },
      };
      
    default:
      return {
        ...basicProps,
        includeTeamData: false,
      };
  }
}