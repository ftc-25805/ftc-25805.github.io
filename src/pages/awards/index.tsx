/**
 * Awards Overview Page
 * Comprehensive showcase of FTC Team 25805's award potential and achievements
 */

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { awardCriteria, currentAchievements } from '@site/src/data/awards';
import EnhancedCard from '@site/src/components/EnhancedCard';
import styles from './styles.module.css';

// Award card component
const AwardCard = ({ awardKey, award, achieved = false }) => (
  <EnhancedCard
    className={clsx(styles.awardCard, { [styles.achieved]: achieved })}
    variant="elevated"
    hover="lift"
    to={`/awards/${awardKey}`}
  >
    <div className={styles.awardHeader}>
      <div className={styles.awardIcon}>
        {achieved ? '🏆' : getAwardIcon(awardKey)}
      </div>
      <div className={styles.awardMeta}>
        <h3 className={styles.awardName}>{award.name}</h3>
        {achieved && <span className={styles.achievedBadge}>Achieved 2024</span>}
      </div>
    </div>
    
    <p className={styles.awardDescription}>{award.description}</p>
    
    <div className={styles.keyPoints}>
      <h4>Key Focus Areas:</h4>
      <ul>
        {award.keyPoints.slice(0, 3).map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
    
    <div className={styles.cardFooter}>
      <span className={styles.viewDetails}>
        View Evidence & Documentation →
      </span>
    </div>
  </EnhancedCard>
);

// Get appropriate icon for each award
const getAwardIcon = (awardKey: string) => {
  const icons = {
    inspire: '⭐',
    think: '🧠',
    connect: '🤝', 
    design: '🎨',
    motivate: '🚀'
  };
  return icons[awardKey] || '🏅';
};

// Achievement showcase component
const AchievementShowcase = () => (
  <section className={styles.achievementSection}>
    <div className="container">
      <Heading as="h2" className={styles.sectionTitle}>
        Current Season Achievements
      </Heading>
      
      <div className={styles.achievementGrid}>
        {currentAchievements.map((achievement) => (
          <EnhancedCard key={achievement.id} variant="glass" className={styles.achievementCard}>
            <div className={styles.achievementHeader}>
              <div className={styles.achievementIcon}>🏆</div>
              <div>
                <h3>{achievement.title}</h3>
                {achievement.award && <span className={styles.awardBadge}>{achievement.award}</span>}
                {achievement.competition && (
                  <span className={styles.competitionName}>{achievement.competition}</span>
                )}
              </div>
            </div>
            
            <p className={styles.achievementDescription}>{achievement.description}</p>
            
            <div className={styles.significance}>
              <strong>Significance:</strong> {achievement.significance}
            </div>
            
            <div className={styles.evidence}>
              <strong>Evidence:</strong>
              <ul>
                {achievement.evidence.slice(0, 2).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                {achievement.evidence.length > 2 && (
                  <li>...and {achievement.evidence.length - 2} more</li>
                )}
              </ul>
            </div>
            
            <div className={styles.achievementDate}>
              {new Date(achievement.date).toLocaleDateString()}
            </div>
          </EnhancedCard>
        ))}
      </div>
    </div>
  </section>
);

// Award timeline component
const AwardTimeline = () => (
  <section className={styles.timeline}>
    <div className="container">
      <Heading as="h2" className={styles.sectionTitle}>
        Award Journey & Strategy
      </Heading>
      
      <div className={styles.timelineContainer}>
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}>🎯</div>
          <div className={styles.timelineContent}>
            <h3>Season Goals</h3>
            <p>Target Inspire Award through comprehensive excellence in engineering, community impact, and team culture.</p>
            <span className={styles.timelineDate}>Season Start</span>
          </div>
        </div>
        
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}>🧠</div>
          <div className={styles.timelineContent}>
            <h3>Think Award Achievement</h3>
            <p>Recognized for exceptional engineering design process and systematic problem-solving approach.</p>
            <span className={styles.timelineDate}>Regional Competition</span>
          </div>
        </div>
        
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}>🤝</div>
          <div className={styles.timelineContent}>
            <h3>Connect Award Pursuit</h3>
            <p>Expanding community outreach programs with measurable impact across 12+ schools.</p>
            <span className={styles.timelineDate}>Ongoing</span>
          </div>
        </div>
        
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}>⭐</div>
          <div className={styles.timelineContent}>
            <h3>Inspire Award Goal</h3>
            <p>Demonstrating overall excellence and commitment to FIRST values across all team activities.</p>
            <span className={styles.timelineDate}>Championship Goal</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function AwardsOverview(): React.ReactElement {
  const achievedAwards = currentAchievements
    .filter(a => a.award)
    .map(a => a.award.toLowerCase().replace(' award', ''));

  return (
    <Layout
      title="Awards & Recognition"
      description="Comprehensive documentation of FTC Team 25805's award achievements and pursuit of excellence in engineering, community impact, and team values."
    >
      <div className={styles.awardsPage}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <Heading as="h1" className={styles.heroTitle}>
                Awards & Recognition
              </Heading>
              <p className={styles.heroSubtitle}>
                Documenting our journey of excellence in engineering, community impact, and FIRST values
              </p>
              
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{currentAchievements.length}</span>
                  <span className={styles.statLabel}>Major Achievements</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{Object.keys(awardCriteria).length}</span>
                  <span className={styles.statLabel}>Award Categories</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>800+</span>
                  <span className={styles.statLabel}>Students Reached</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Awards Grid */}
        <section className={styles.awardsGrid}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              FTC Awards Portfolio
            </Heading>
            <p className={styles.sectionDescription}>
              Each award represents a different aspect of our team's excellence. 
              Click to explore detailed evidence and documentation.
            </p>
            
            <div className={styles.gridContainer}>
              {Object.entries(awardCriteria).map(([key, award]) => (
                <AwardCard
                  key={key}
                  awardKey={key}
                  award={award}
                  achieved={achievedAwards.includes(key)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Achievement Showcase */}
        <AchievementShowcase />

        {/* Award Timeline */}
        <AwardTimeline />

        {/* Call to Action */}
        <section className={styles.callToAction}>
          <div className="container">
            <div className={styles.ctaContent}>
              <Heading as="h2">Comprehensive Excellence</Heading>
              <p>
                Our pursuit of awards isn't about trophies—it's about embodying FIRST values,
                creating community impact, and achieving engineering excellence that inspires others.
              </p>
              
              <div className={styles.ctaButtons}>
                <Link className="button button--primary button--lg" to="/awards/inspire">
                  View Inspire Award Evidence
                </Link>
                <Link className="button button--secondary button--lg" to="/team">
                  Meet Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}