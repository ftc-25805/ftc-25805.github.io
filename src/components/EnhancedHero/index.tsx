/**
 * Enhanced Hero Section
 * Modern hero design with animations, improved visual hierarchy, and interactive elements
 */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import { getCurrentSeason, loadSeasons } from '@site/src/data/seasons';
import styles from './styles.module.css';

// Animated background particles component
const BackgroundParticles = () => {
  return (
    <div className={styles.particlesContainer}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={styles.particle}
          style={{
            '--delay': `${i * 0.3}s`,
            '--duration': `${3 + (i % 3)}s`,
            '--size': `${4 + (i % 4)}px`,
            '--x': `${(i * 23) % 100}%`,
            '--y': `${(i * 37) % 100}%`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};


// Stats counter component with animation
const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ years: 0, competitions: 0, awards: 0 });

  const stats = [
    { key: 'years', target: 2, label: 'Years Active', suffix: '' },
    { key: 'competitions', target: 8, label: 'Competitions', suffix: '+' },
    { key: 'awards', target: 3, label: 'Awards Won', suffix: '' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateCounters = () => {
      stats.forEach(stat => {
        let current = 0;
        const increment = stat.target / 30; // 30 frames for smooth animation
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            current = stat.target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [stat.key]: Math.floor(current) }));
        }, 50);
      });
    };

    animateCounters();
  }, [isVisible]);

  return (
    <div className={clsx(styles.statsContainer, { [styles.visible]: isVisible })}>
      {stats.map((stat, index) => (
        <div key={stat.key} className={styles.statItem} style={{ animationDelay: `${index * 0.2}s` }}>
          <div className={styles.statNumber}>
            {counters[stat.key as keyof typeof counters]}{stat.suffix}
          </div>
          <div className={styles.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Enhanced call-to-action buttons
const HeroActions = ({ displaySeason }: { displaySeason: any }) => {
  return (
    <div className={styles.heroActions}>
      <Link
        className={clsx('button', styles.primaryButton)}
        to="/team"
      >
        <span className={styles.buttonIcon}>👥</span>
        <span>Meet Our Team</span>
        <span className={styles.buttonArrow}>→</span>
      </Link>
      
      <Link
        className={clsx('button', styles.secondaryButton)}
        to={displaySeason ? displaySeason.path : "/seasons/2024-25"}
      >
        <span className={styles.buttonIcon}>🏆</span>
        <span>{displaySeason?.status === 'active' ? 'Current Season' : 'Latest Season'}</span>
        <span className={styles.buttonArrow}>→</span>
      </Link>
      
      <Link
        className={clsx('button', styles.tertiaryButton)}
        to={displaySeason ? `${displaySeason.path}#current-robot` : "/seasons/2024-25#current-robot"}
      >
        <span className={styles.buttonIcon}>🤖</span>
        <span>Our Robot</span>
        <span className={styles.buttonArrow}>→</span>
      </Link>
    </div>
  );
};

export default function EnhancedHero(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const currentSeason = getCurrentSeason();
  const displaySeason = currentSeason || (loadSeasons().length > 0 ? loadSeasons()[0] : null);

  return (
    <header className={styles.enhancedHero}>
      <BackgroundParticles />
      
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* Logo Section with Enhanced Animation */}
          <div className={styles.logoSection}>
            <div className={styles.logoWrapper}>
              <img 
                src="/img/team-logo.svg" 
                alt="FTC Team 25805 Logo" 
                className={styles.teamLogo}
              />
              <div className={styles.logoGlow}></div>
            </div>
          </div>

          {/* Team Identity Section */}
          <div className={styles.identitySection}>
            <div className={styles.teamBadge}>
              <span className={styles.ftcLabel}>FIRST Tech Challenge</span>
              <span className={styles.teamNumber}>25805</span>
            </div>
            
            <Heading as="h1" className={styles.teamTitle}>
              {siteConfig.title}
            </Heading>
            
            <p className={styles.teamTagline}>{siteConfig.tagline}</p>
          </div>

          {/* Season Information */}
          <div className={styles.seasonSection}>
            <div className={styles.seasonBadge}>
              <span className={styles.seasonLabel}>
                {currentSeason ? 'Current Season' : 'Latest Season'}
              </span>
              <span className={styles.seasonName}>
                {displaySeason ? `${displaySeason.game} ${displaySeason.year}` : 'INTO THE DEEP™ 2024-25'}
              </span>
            </div>
            
            <div className={styles.statusIndicator}>
              <span className={styles.statusIcon}>
                {displaySeason?.status === 'active' ? '🔴' : '🟢'}
              </span>
              <span className={styles.statusText}>
                {displaySeason?.status === 'active' ? 'Active Competition Season' : 'Preparing for Next Season'}
              </span>
            </div>
          </div>

          {/* Animated Statistics */}
          <AnimatedStats />

          {/* Enhanced Action Buttons */}
          <HeroActions displaySeason={displaySeason} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span className={styles.scrollText}>Scroll to explore</span>
      </div>
    </header>
  );
}