import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import RobotSpotlight from '@site/src/components/RobotSpotlight';
import FTCDescription from '@site/src/components/FTCDescription';
import SponsorShowcase from '@site/src/components/SponsorShowcase';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <img 
            src="/logo.png" 
            alt="Reprogrammed Team Logo"
            className={styles.heroLogo}
          />
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/blog">
              Explore Our Journey
            </Link>
            <Link
              className="button button--primary button--lg"
              to="/sponsorship">
              Support Our Team
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - FTC Team 25805`}
      description="Welcome to Reprogrammed - FTC Team 25805. Learn about our robotics journey, competitive achievements, and innovative engineering solutions.">
      <HomepageHeader />
      <main>
        <section className={styles.featuresSection}>
          <div className="container">
            <div className={styles.featuresGrid}>
              <FTCDescription />
              <RobotSpotlight />
              <SponsorShowcase />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
