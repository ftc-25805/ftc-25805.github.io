import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export interface Sponsor {
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  website?: string;
  description?: string;
}

export interface SponsorShowcaseProps {
  title?: string;
  subtitle?: string;
  sponsors?: Sponsor[];
}

const defaultSponsors: Sponsor[] = [
  {
    name: "TechCorp Industries",
    logo: "/img/sponsor-placeholder.png",
    tier: "platinum",
    website: "#",
    description: "Leading technology solutions provider"
  },
  {
    name: "Engineering Solutions LLC",
    logo: "/img/sponsor-placeholder.png",
    tier: "gold",
    website: "#",
    description: "Innovative engineering consultancy"
  },
  {
    name: "Local Hardware Store",
    logo: "/img/sponsor-placeholder.png",
    tier: "silver",
    website: "#",
    description: "Supporting local robotics teams"
  }
];

export default function SponsorShowcase({ 
  title = "Our Sponsors",
  subtitle = "Thank you to our amazing sponsors who make our robotics journey possible",
  sponsors = defaultSponsors
}: SponsorShowcaseProps): React.JSX.Element {
  const tierColors = {
    platinum: '#E5E7EB',
    gold: '#FCD34D',
    silver: '#D1D5DB',
    bronze: '#CD7C2F'
  };

  return (
    <div className={styles.sponsorShowcase}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      
      <div className={styles.sponsorsGrid}>
        {sponsors.map((sponsor, index) => (
          <div 
            key={index} 
            className={`${styles.sponsorCard} ${styles[sponsor.tier]}`}
          >
            <div className={styles.tierBadge} style={{ backgroundColor: tierColors[sponsor.tier] }}>
              {sponsor.tier.toUpperCase()}
            </div>
            
            <div className={styles.logoContainer}>
              <img 
                src={sponsor.logo} 
                alt={`${sponsor.name} logo`}
                className={styles.sponsorLogo}
              />
            </div>
            
            <div className={styles.sponsorInfo}>
              <h4 className={styles.sponsorName}>{sponsor.name}</h4>
              {sponsor.description && (
                <p className={styles.sponsorDescription}>{sponsor.description}</p>
              )}
              {sponsor.website && (
                <Link 
                  to={sponsor.website}
                  className={styles.sponsorLink}
                  target="_blank"
                >
                  Visit Website →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.callToAction}>
        <div className={styles.ctaContent}>
          <h4 className={styles.ctaTitle}>Interested in Sponsoring Our Team?</h4>
          <p className={styles.ctaDescription}>
            Help us build the future through robotics education and competition. 
            Your support enables us to purchase materials, attend competitions, and inspire the next generation of engineers.
          </p>
          <Link 
            to="/sponsorship"
            className="button button--primary button--lg"
          >
            Become a Sponsor
          </Link>
        </div>
      </div>
    </div>
  );
}