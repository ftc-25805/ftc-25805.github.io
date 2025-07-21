import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export interface Award {
  name: string;
  description?: string;
}

export interface Match {
  number: number;
  alliance: 'red' | 'blue';
  partners: string[];
  opponents: string[];
  score: {
    team: number;
    opponent: number;
  };
  result: 'win' | 'loss' | 'tie';
}

export interface CompetitionResultsProps {
  competition: string;
  date: string;
  location: string;
  rank: number;
  totalTeams: number;
  record: {
    wins: number;
    losses: number;
    ties: number;
  };
  awards: Award[];
  matches: Match[];
  videos?: string[];
  highlights?: string[];
  className?: string;
}

export default function CompetitionResults({
  competition,
  date,
  location,
  rank,
  totalTeams,
  record,
  awards,
  matches,
  videos,
  highlights,
  className
}: CompetitionResultsProps): ReactNode {
  const winPercentage = record.wins + record.losses + record.ties > 0 
    ? Math.round((record.wins / (record.wins + record.losses + record.ties)) * 100)
    : 0;

  const getRankSuffix = (rank: number): string => {
    if (rank >= 11 && rank <= 13) return 'th';
    switch (rank % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const getMatchResultClass = (result: string): string => {
    switch (result) {
      case 'win': return styles.matchWin;
      case 'loss': return styles.matchLoss;
      case 'tie': return styles.matchTie;
      default: return '';
    }
  };

  return (
    <div className={clsx('ftc-card', styles.competitionCard, className)}>
      <div className={styles.competitionHeader}>
        <h3 className={styles.competitionName}>{competition}</h3>
        <div className={styles.competitionInfo}>
          <div className={styles.competitionDate}>{date}</div>
          <div className={styles.competitionLocation}>{location}</div>
        </div>
      </div>

      <div className={styles.competitionStats}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>
            {rank}{getRankSuffix(rank)}
          </div>
          <div className={styles.statLabel}>Rank</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{totalTeams}</div>
          <div className={styles.statLabel}>Teams</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>
            {record.wins}-{record.losses}-{record.ties}
          </div>
          <div className={styles.statLabel}>Record</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{winPercentage}%</div>
          <div className={styles.statLabel}>Win Rate</div>
        </div>
      </div>

      {awards.length > 0 && (
        <div className={styles.awardsSection}>
          <h4>Awards</h4>
          <div className={styles.awardsList}>
            {awards.map((award, index) => (
              <div key={index} className={styles.awardItem}>
                <div className="ftc-badge ftc-badge--secondary">{award.name}</div>
                {award.description && (
                  <div className={styles.awardDescription}>{award.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {highlights && highlights.length > 0 && (
        <div className={styles.highlightsSection}>
          <h4>Highlights</h4>
          <ul className={styles.highlightsList}>
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      )}

      {matches.length > 0 && (
        <div className={styles.matchesSection}>
          <h4>Match Results</h4>
          <div className={styles.matchesGrid}>
            {matches.map((match, index) => (
              <div key={index} className={clsx(styles.matchItem, getMatchResultClass(match.result))}>
                <div className={styles.matchHeader}>
                  <span className={styles.matchNumber}>Match {match.number}</span>
                  <span className={clsx(styles.matchAlliance, {
                    [styles.allianceRed]: match.alliance === 'red',
                    [styles.allianceBlue]: match.alliance === 'blue'
                  })}>
                    {match.alliance.toUpperCase()}
                  </span>
                </div>
                <div className={styles.matchScore}>
                  <span className={styles.scoreTeam}>{match.score.team}</span>
                  <span className={styles.scoreSeparator}>-</span>
                  <span className={styles.scoreOpponent}>{match.score.opponent}</span>
                </div>
                <div className={styles.matchResult}>{match.result.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {videos && videos.length > 0 && (
        <div className={styles.videosSection}>
          <h4>Match Videos</h4>
          <div className={styles.videoLinks}>
            {videos.map((video, index) => (
              <Link
                key={index}
                to={video}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--outline button--primary button--sm"
              >
                Video {index + 1}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}