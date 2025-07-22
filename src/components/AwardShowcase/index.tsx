import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface Award {
  id: string;
  name: string;
  season: string;
  competition: string;
  date: string;
  level: 'tournament' | 'regional' | 'state' | 'worlds';
  category: 'engineering' | 'performance' | 'outreach' | 'judged' | 'special';
  description: string;
  image?: string;
  certificate?: string;
  significance: string;
  teamRole?: string;
}

export interface AwardShowcaseProps {
  awards: Award[];
  layout?: 'grid' | 'timeline' | 'category';
  showFilters?: boolean;
  showStats?: boolean;
  title?: string;
  subtitle?: string;
}

export default function AwardShowcase({
  awards,
  layout = 'grid',
  showFilters = true,
  showStats = true,
  title = 'Team Awards & Achievements',
  subtitle = 'Recognition earned through excellence in engineering, performance, and community impact'
}: AwardShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');

  const categories = ['all', 'engineering', 'performance', 'outreach', 'judged', 'special'];
  const levels = ['all', 'tournament', 'regional', 'state', 'worlds'];

  const filteredAwards = awards.filter(award => {
    const categoryMatch = selectedCategory === 'all' || award.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || award.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const awardStats = {
    total: awards.length,
    byLevel: levels.slice(1).reduce((acc, level) => {
      acc[level] = awards.filter(award => award.level === level).length;
      return acc;
    }, {} as Record<string, number>),
    byCategory: categories.slice(1).reduce((acc, category) => {
      acc[category] = awards.filter(award => award.category === category).length;
      return acc;
    }, {} as Record<string, number>)
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'worlds': return '🌍';
      case 'state': return '🏛️';
      case 'regional': return '🏞️';
      case 'tournament': return '🏟️';
      default: return '🏆';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'engineering': return '⚙️';
      case 'performance': return '🚀';
      case 'outreach': return '🤝';
      case 'judged': return '👥';
      case 'special': return '⭐';
      default: return '🏆';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'worlds': return 'var(--award-worlds)';
      case 'state': return 'var(--award-state)';
      case 'regional': return 'var(--award-regional)';
      case 'tournament': return 'var(--award-tournament)';
      default: return 'var(--ifm-color-primary)';
    }
  };

  return (
    <div className={styles.awardShowcase}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {showStats && (
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{awardStats.total}</div>
            <div className={styles.statLabel}>Total Awards</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{awardStats.byLevel.worlds || 0}</div>
            <div className={styles.statLabel}>World Championships</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{awardStats.byLevel.state || 0}</div>
            <div className={styles.statLabel}>State Level</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{awardStats.byLevel.regional || 0}</div>
            <div className={styles.statLabel}>Regional Level</div>
          </div>
        </div>
      )}

      {showFilters && (
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : 
                    category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Level:</label>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={styles.filterSelect}
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : 
                    level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className={clsx(styles.awardsContainer, styles[layout])}>
        {filteredAwards.map((award) => (
          <div key={award.id} className={styles.awardCard}>
            <div className={styles.awardHeader}>
              <div className={styles.awardBadge} style={{ backgroundColor: getLevelColor(award.level) }}>
                <span className={styles.levelIcon}>{getLevelIcon(award.level)}</span>
                <span className={styles.categoryIcon}>{getCategoryIcon(award.category)}</span>
              </div>
              <div className={styles.awardMeta}>
                <span className={styles.awardLevel}>{award.level.toUpperCase()}</span>
                <span className={styles.awardSeason}>{award.season}</span>
              </div>
            </div>

            <div className={styles.awardContent}>
              <h3 className={styles.awardName}>{award.name}</h3>
              <p className={styles.awardCompetition}>{award.competition}</p>
              <p className={styles.awardDate}>{new Date(award.date).toLocaleDateString()}</p>
              <p className={styles.awardDescription}>{award.description}</p>
              
              {award.significance && (
                <div className={styles.awardSignificance}>
                  <strong>Significance:</strong> {award.significance}
                </div>
              )}

              {award.teamRole && (
                <div className={styles.awardRole}>
                  <strong>Team Role:</strong> {award.teamRole}
                </div>
              )}
            </div>

            <div className={styles.awardFooter}>
              <div className={styles.awardActions}>
                {award.certificate && (
                  <a 
                    href={award.certificate} 
                    className={styles.certificateLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    📜 Certificate
                  </a>
                )}
                {award.image && (
                  <a 
                    href={award.image} 
                    className={styles.imageLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    📷 Photo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAwards.length === 0 && (
        <div className={styles.noResults}>
          <p>No awards found matching the selected filters.</p>
        </div>
      )}
    </div>
  );
}