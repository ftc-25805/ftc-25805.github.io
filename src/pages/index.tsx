import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SponsorShowcase from '@site/src/components/SponsorShowcase';
import Heading from '@theme/Heading';
import { loadSponsors } from '@site/src/data/sponsors';
import { getCurrentSeason } from '@site/src/data/seasons';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const currentSeason = getCurrentSeason();
  
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
              <span className={styles.seasonName}>
                {currentSeason ? `${currentSeason.game} ${currentSeason.year}` : 'INTO THE DEEP™ 2024-25'}
              </span>
            </div>
            <div className={styles.competitionStatus}>
              <span className={styles.statusIndicator}>🏆</span>
              <span>
                {currentSeason ? 
                  (currentSeason.status === 'active' ? 'Competition Season Active' : 'Season Complete') : 
                  'Competition Season Active'
                }
              </span>
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
              to={currentSeason ? currentSeason.path : "/seasons/2024-25"}>
              Current Season
            </Link>
            <Link
              className="button button--outline button--lg"
              to={currentSeason ? `${currentSeason.path}#current-robot` : "/seasons/2024-25#current-robot"}>
              Our Robot
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function CurrentSponsors() {
  // Load sponsors dynamically from repository files
  const currentSponsors = loadSponsors();

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
