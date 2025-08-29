import type { ReactNode } from 'react';
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
    const { siteConfig } = useDocusaurusContext();
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
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title} - FTC Team 25805`}
            description="Welcome to Reprogrammed - FTC Team 25805. Learn about our robotics journey, competitive achievements, and innovative engineering solutions.">
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <HomepageHeader />
            <main id="main-content">
                <section className={styles.featuresSection}>
                    <div className="container">
                        <div className={styles.featuresGrid}>
                            <div className="animate-on-scroll"><FTCDescription /></div>
                            <div className="animate-on-scroll"><RobotSpotlight robotImage='/img/robot_2425.jpeg' robotName='2024-25 Robot' /></div>
                            <div className="animate-on-scroll"><SponsorShowcase sponsors={[
                                {
                                    name: "Leidos",
                                    logo: "/img/leidos.svg",
                                    tier: "gold",
                                    website: "https://leidos.com",
                                    // description: ""
                                },
                                {
                                    name: "Google",
                                    logo: "/img/google.svg",
                                    tier: "silver",
                                    website: "https://google.com",
                                    // description: ""
                                },
                                {
                                    name: "DOD STEM",
                                    logo: "/img/dod-stem.svg",
                                    tier: "bronze",
                                    website: "https://www.dodstem.us/",
                                    // description: ""
                                },
                                {
                                    name: "Brenda Wilson",
                                    logo: "",
                                    tier: "gold",
                                    // website: "#",
                                    // description: ""
                                },
                            ]} /></div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
