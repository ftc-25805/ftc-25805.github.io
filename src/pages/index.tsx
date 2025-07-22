import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SponsorShowcase from '@site/src/components/SponsorShowcase';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.teamNumber}>
            <span className={styles.ftcLabel}>FTC</span>
            <span className={styles.number}>25805</span>
          </div>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          
          <div className={styles.seasonInfo}>
            <div className={styles.currentSeason}>
              <span className={styles.seasonLabel}>Current Season:</span>
              <span className={styles.seasonName}>INTO THE DEEP™ 2024-25</span>
            </div>
            <div className={styles.competitionStatus}>
              <span className={styles.statusIndicator}>🏆</span>
              <span>Competition Season Active</span>
            </div>
          </div>

          <div className={styles.quickStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>6</span>
              <span className={styles.statLabel}>Years Active</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>25+</span>
              <span className={styles.statLabel}>Competitions</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Awards</span>
            </div>
          </div>

          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/team">
              Meet Our Team
            </Link>
            <Link
              className="button button--primary button--lg"
              to="/seasons/2024-25">
              Current Season
            </Link>
            <Link
              className="button button--outline button--lg"
              to="/seasons/2024-25#current-robot">
              Our Robot
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function CurrentSponsors() {
  const currentSponsors = [
    {
      id: '1',
      name: 'TechVantage Solutions',
      logo: '/img/team-placeholder.svg',
      tier: 'title' as const,
      description: 'Leading technology partner providing cutting-edge engineering mentorship and resources.',
      since: '2023',
      featured: true,
      website: 'https://example.com'
    },
    {
      id: '2',
      name: 'Precision Manufacturing Inc',
      logo: '/img/team-placeholder.svg',
      tier: 'platinum' as const,
      description: 'Professional manufacturing services and machining expertise for robot components.',
      since: '2024',
      contribution: 'CNC machining services and aluminum stock'
    },
    {
      id: '3',
      name: 'Innovation Labs',
      logo: '/img/team-placeholder.svg',
      tier: 'gold' as const,
      description: '3D printing services and rapid prototyping support.',
      since: '2023',
      website: 'https://example.com'
    },
    {
      id: '4',
      name: 'STEM Education Foundation',
      logo: '/img/team-placeholder.svg',
      tier: 'gold' as const,
      description: 'Supporting STEM education and robotics programs in our community.',
      since: '2022'
    },
    {
      id: '5',
      name: 'Local Hardware Store',
      logo: '/img/team-placeholder.svg',
      tier: 'silver' as const,
      description: 'Providing essential tools and materials for robot construction.',
      since: '2024'
    },
    {
      id: '6',
      name: 'Community Tech Club',
      logo: '/img/team-placeholder.svg',
      tier: 'supporter' as const,
      description: 'Volunteer mentors and meeting space support.',
      since: '2023'
    }
  ];

  return (
    <section className={styles.sponsors}>
      <div className="container">
        <div className="row">
          <div className="col">
            <SponsorShowcase
              sponsors={currentSponsors}
              title="Our Current Sponsors"
              layout="grid"
              showDescription={false}
              className={styles.homepageSponsors}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentAchievements() {
  return (
    <section className={styles.achievements}>
      <div className="container">
        <div className="row">
          <div className="col">
            <Heading as="h2" className={styles.sectionTitle}>
              Recent Achievements & Updates
            </Heading>
            <div className={styles.achievementGrid}>
              <div className={styles.achievementCard}>
                <div className={styles.achievementIcon}>🏆</div>
                <h3>Regional Tournament</h3>
                <p>Advanced to Championship with Think Award for innovative autonomous navigation system</p>
                <span className={styles.achievementDate}>December 2024</span>
              </div>
              <div className={styles.achievementCard}>
                <div className={styles.achievementIcon}>🤖</div>
                <h3>Robot Reveal</h3>
                <p>Unveiled our INTO THE DEEP robot featuring advanced specimen manipulation and deep zone scoring</p>
                <span className={styles.achievementDate}>November 2024</span>
              </div>
              <div className={styles.achievementCard}>
                <div className={styles.achievementIcon}>🌟</div>
                <h3>Community Outreach</h3>
                <p>Hosted robotics workshop for 200+ elementary students at local STEM fair</p>
                <span className={styles.achievementDate}>October 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - FIRST Tech Challenge Team`}
      description="FTC Team 25805 - Innovation through Engineering Excellence. Competitive robotics team dedicated to STEM education and community outreach.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CurrentSponsors />
        <RecentAchievements />
      </main>
    </Layout>
  );
}
