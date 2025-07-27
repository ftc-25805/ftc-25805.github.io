import seasonsData from '@site/src/data/generated/seasons.json';

export interface SeasonInfo {
  id: string;
  title: string;
  year: string;
  game: string;
  status: 'active' | 'complete' | 'upcoming';
  robotName?: string;
  achievements?: string[];
  path: string;
  order?: number;
}

/**
 * Load season information from generated JSON file
 */
export function loadSeasons(): SeasonInfo[] {
  try {
    return (seasonsData.seasons as SeasonInfo[]) || [];
  } catch (error) {
    console.error('Error loading seasons:', error);
    // Fallback data
    return [
      {
        id: '2024-25',
        title: 'INTO THE DEEP™ 2024-25',
        year: '2024-25',
        game: 'INTO THE DEEP™',
        status: 'active' as const,
        path: '/seasons/2024-25',
        order: 202425,
      }
    ];
  }
}

/**
 * Get the current active season
 */
export function getCurrentSeason(): SeasonInfo | undefined {
  try {
    return (seasonsData.currentSeason as SeasonInfo) || undefined;
  } catch (error) {
    return loadSeasons().find(season => season.status === 'active');
  }
}

/**
 * Get completed seasons
 */
export function getCompletedSeasons(): SeasonInfo[] {
  try {
    return (seasonsData.completedSeasons as SeasonInfo[]) || [];
  } catch (error) {
    return loadSeasons().filter(season => season.status === 'complete');
  }
}

/**
 * Get upcoming seasons
 */
export function getUpcomingSeasons(): SeasonInfo[] {
  return loadSeasons().filter(season => season.status === 'upcoming');
}

/**
 * Get season by ID
 */
export function getSeasonById(id: string): SeasonInfo | undefined {
  return loadSeasons().find(season => season.id === id);
}

/**
 * Generate navigation items for seasons
 */
export function getSeasonsNavItems() {
  const seasons = loadSeasons();
  const currentSeason = getCurrentSeason();
  
  const items = [];
  
  // Add current season first if it exists
  if (currentSeason) {
    items.push({
      label: `Current (${currentSeason.year})`,
      to: currentSeason.path,
      activeBaseRegex: currentSeason.path,
    });
  }
  
  // Add all seasons link
  items.push({
    label: 'All Seasons',
    to: '/seasons',
  });
  
  // Add individual season links (limit to recent ones)
  const recentSeasons = seasons.slice(0, 5);
  for (const season of recentSeasons) {
    if (season.status !== 'active') { // Don't duplicate current season
      items.push({
        label: season.year,
        to: season.path,
      });
    }
  }
  
  return items;
}