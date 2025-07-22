import type { Sponsor } from '@site/src/components/SponsorShowcase';
import sponsorsData from '@site/src/data/generated/sponsors.json';

/**
 * Load sponsor data from generated JSON file
 */
export function loadSponsors(): Sponsor[] {
  try {
    return sponsorsData.sponsors || [];
  } catch (error) {
    console.error('Error loading sponsors:', error);
    // Fallback to hardcoded sponsors if JSON is not available
    return [
      {
        id: 'fallback',
        name: 'Example Sponsor',
        logo: '/img/team-placeholder.svg',
        tier: 'supporter' as const,
        description: 'Fallback sponsor data - run npm run generate-data to update',
      }
    ];
  }
}

/**
 * Get sponsors by tier
 */
export function getSponsorsByTier(tier: Sponsor['tier']): Sponsor[] {
  return loadSponsors().filter(sponsor => sponsor.tier === tier);
}

/**
 * Get featured sponsors
 */
export function getFeaturedSponsors(): Sponsor[] {
  try {
    return sponsorsData.featuredSponsors || [];
  } catch (error) {
    return loadSponsors().filter(sponsor => sponsor.featured);
  }
}

/**
 * Get sponsor by ID
 */
export function getSponsorById(id: string): Sponsor | undefined {
  return loadSponsors().find(sponsor => sponsor.id === id);
}