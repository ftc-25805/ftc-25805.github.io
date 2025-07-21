import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'supporter';
  website?: string;
  description?: string;
  contribution?: string;
  since?: string;
  featured?: boolean;
}

export interface SponsorShowcaseProps {
  sponsors: Sponsor[];
  title?: string;
  showDescription?: boolean;
  showContribution?: boolean;
  layout?: 'grid' | 'tiered' | 'carousel';
  className?: string;
}

const tierInfo = {
  title: {
    label: 'Title Sponsor',
    color: '#FFD700',
    minAmount: '$5000+',
    benefits: ['Logo on robot', 'Featured website placement', 'Competition recognition']
  },
  platinum: {
    label: 'Platinum Sponsor',
    color: '#E5E4E2',
    minAmount: '$2500+',
    benefits: ['Logo on team materials', 'Website recognition', 'Event invitations']
  },
  gold: {
    label: 'Gold Sponsor',
    color: '#FFD700',
    minAmount: '$1000+',
    benefits: ['Website listing', 'Social media recognition', 'Newsletter updates']
  },
  silver: {
    label: 'Silver Sponsor',
    color: '#C0C0C0',
    minAmount: '$500+',
    benefits: ['Website recognition', 'Thank you communications']
  },
  bronze: {
    label: 'Bronze Sponsor',
    color: '#CD7F32',
    minAmount: '$250+',
    benefits: ['Website listing', 'Appreciation recognition']
  },
  supporter: {
    label: 'Team Supporter',
    color: '#6C757D',
    minAmount: 'In-Kind',
    benefits: ['Community recognition', 'Team gratitude']
  }
};

const tierOrder: Sponsor['tier'][] = ['title', 'platinum', 'gold', 'silver', 'bronze', 'supporter'];

export default function SponsorShowcase({
  sponsors,
  title = "Our Sponsors",
  showDescription = true,
  showContribution = false,
  layout = 'tiered',
  className
}: SponsorShowcaseProps): ReactNode {
  const groupedSponsors = tierOrder.reduce((acc, tier) => {
    acc[tier] = sponsors.filter(sponsor => sponsor.tier === tier);
    return acc;
  }, {} as Record<Sponsor['tier'], Sponsor[]>);

  const featuredSponsors = sponsors.filter(sponsor => sponsor.featured);

  const SponsorCard = ({ sponsor, compact = false }: { sponsor: Sponsor; compact?: boolean }) => {
    const CardContent = (
      <div className={clsx(styles.sponsorCard, styles[`tier${sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)}`], {
        [styles.compact]: compact,
        [styles.featured]: sponsor.featured
      })}>
        <div className={styles.sponsorLogo}>
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            loading="lazy"
          />
        </div>
        
        <div className={styles.sponsorInfo}>
          <h4 className={styles.sponsorName}>{sponsor.name}</h4>
          
          <div className={styles.sponsorTier}>
            <span 
              className={styles.tierBadge}
              style={{ backgroundColor: tierInfo[sponsor.tier].color, color: sponsor.tier === 'silver' || sponsor.tier === 'platinum' ? '#000' : '#fff' }}
            >
              {tierInfo[sponsor.tier].label}
            </span>
            {sponsor.since && (
              <span className={styles.sponsorSince}>Since {sponsor.since}</span>
            )}
          </div>
          
          {showDescription && sponsor.description && (
            <p className={styles.sponsorDescription}>{sponsor.description}</p>
          )}
          
          {showContribution && sponsor.contribution && (
            <div className={styles.sponsorContribution}>
              <strong>Contribution:</strong> {sponsor.contribution}
            </div>
          )}
        </div>
        
        {sponsor.featured && (
          <div className={styles.featuredBadge}>⭐ Featured</div>
        )}
      </div>
    );

    return sponsor.website ? (
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.sponsorLink}
      >
        {CardContent}
      </a>
    ) : CardContent;
  };

  const renderTieredLayout = () => (
    <div className={styles.tieredLayout}>
      {tierOrder.map(tier => {
        const tierSponsors = groupedSponsors[tier];
        if (tierSponsors.length === 0) return null;

        return (
          <div key={tier} className={styles.tierSection}>
            <h3 className={styles.tierTitle}>
              <span 
                className={styles.tierLabel}
                style={{ color: tierInfo[tier].color }}
              >
                {tierInfo[tier].label}
              </span>
              <span className={styles.tierAmount}>{tierInfo[tier].minAmount}</span>
            </h3>
            
            <div className={clsx(styles.sponsorsGrid, styles[`tier${tier.charAt(0).toUpperCase() + tier.slice(1)}Grid`])}>
              {tierSponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderGridLayout = () => (
    <div className={styles.gridLayout}>
      {sponsors.map(sponsor => (
        <SponsorCard key={sponsor.id} sponsor={sponsor} compact />
      ))}
    </div>
  );

  const renderCarouselLayout = () => (
    <div className={styles.carouselLayout}>
      <div className={styles.carousel}>
        {sponsors.map(sponsor => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} compact />
        ))}
      </div>
    </div>
  );

  return (
    <div className={clsx('ftc-card', styles.sponsorShowcase, className)}>
      <div className={styles.showcaseHeader}>
        <h2 className={styles.showcaseTitle}>{title}</h2>
        <p className={styles.showcaseSubtitle}>
          Thank you to our amazing sponsors who make our robotics program possible!
        </p>
      </div>

      {featuredSponsors.length > 0 && layout === 'tiered' && (
        <div className={styles.featuredSection}>
          <h3 className={styles.featuredTitle}>Featured Sponsors</h3>
          <div className={styles.featuredGrid}>
            {featuredSponsors.map(sponsor => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}

      <div className={styles.sponsorsContent}>
        {layout === 'tiered' && renderTieredLayout()}
        {layout === 'grid' && renderGridLayout()}
        {layout === 'carousel' && renderCarouselLayout()}
      </div>

      {sponsors.length === 0 && (
        <div className={styles.emptyState}>
          <p>We're actively seeking sponsors to support our robotics program.</p>
          <p>Interested in partnering with us? <a href="/contact">Contact us</a> to learn more!</p>
        </div>
      )}

      <div className={styles.callToAction}>
        <h3>Become a Sponsor</h3>
        <p>Join our community of supporters and help inspire the next generation of engineers!</p>
        <a href="/community/sponsors" className="button button--primary">
          Learn About Sponsorship
        </a>
      </div>
    </div>
  );
}