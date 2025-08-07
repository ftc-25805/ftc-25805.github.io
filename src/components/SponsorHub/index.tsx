/**
 * Sponsor Hub Component
 * Professional sponsor relationship management and showcase platform
 */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface Sponsor {
  id: string;
  name: string;
  logo?: string;
  tier: 'title' | 'presenting' | 'gold' | 'silver' | 'bronze' | 'supporter';
  category: 'technology' | 'manufacturing' | 'education' | 'community' | 'individual';
  website?: string;
  description: string;
  partnership: {
    startDate: string;
    renewalDate: string;
    status: 'active' | 'renewal' | 'inactive';
    duration: number; // years
  };
  contributions: {
    type: 'financial' | 'equipment' | 'mentorship' | 'facilities' | 'materials';
    description: string;
    value?: string;
  }[];
  impact: {
    studentsBenefited: number;
    programsEnabled: string[];
    specificOutcomes: string[];
  };
  contact?: {
    name: string;
    role: string;
    email: string;
    phone?: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
}

interface SponsorshipPackage {
  tier: string;
  annualInvestment: string;
  benefits: string[];
  recognition: string[];
  engagement: string[];
  available: number;
  sold: number;
  featured?: boolean;
}

interface SponsorHubProps {
  sponsors?: Sponsor[];
  packages?: SponsorshipPackage[];
  showPackages?: boolean;
  showTestimonials?: boolean;
  className?: string;
}

const SponsorHub: React.FC<SponsorHubProps> = ({
  sponsors = [],
  packages = [],
  showPackages = true,
  showTestimonials = true,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'sponsors' | 'packages' | 'impact' | 'contact'>('sponsors');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedSponsor, setSelectedSponsor] = useState<string>('');

  // Filter sponsors by tier
  const filteredSponsors = React.useMemo(() => {
    if (selectedTier === 'all') return sponsors;
    return sponsors.filter(sponsor => sponsor.tier === selectedTier);
  }, [sponsors, selectedTier]);

  // Sponsor tier configuration
  const tierConfig = {
    title: { 
      label: 'Title Sponsor', 
      color: '#FFD700', 
      icon: '👑',
      minValue: 10000 
    },
    presenting: { 
      label: 'Presenting Sponsor', 
      color: '#C0C0C0', 
      icon: '🏆',
      minValue: 5000 
    },
    gold: { 
      label: 'Gold Sponsor', 
      color: '#FFD700', 
      icon: '🥇',
      minValue: 2500 
    },
    silver: { 
      label: 'Silver Sponsor', 
      color: '#C0C0C0', 
      icon: '🥈',
      minValue: 1000 
    },
    bronze: { 
      label: 'Bronze Sponsor', 
      color: '#CD7F32', 
      icon: '🥉',
      minValue: 500 
    },
    supporter: { 
      label: 'Team Supporter', 
      color: '#4CAF50', 
      icon: '🤝',
      minValue: 100 
    }
  };

  // Calculate sponsor metrics
  const sponsorMetrics = React.useMemo(() => {
    const activeSponsorCount = sponsors.filter(s => s.partnership.status === 'active').length;
    const totalFunding = sponsors.reduce((sum, sponsor) => {
      const tierMin = tierConfig[sponsor.tier as keyof typeof tierConfig]?.minValue || 0;
      return sum + tierMin;
    }, 0);
    const averagePartnership = sponsors.length > 0 
      ? sponsors.reduce((sum, s) => sum + s.partnership.duration, 0) / sponsors.length 
      : 0;
    const totalStudentsBenefited = sponsors.reduce((sum, s) => sum + s.impact.studentsBenefited, 0);

    return {
      activeSponsorCount,
      totalFunding,
      averagePartnership: Math.round(averagePartnership * 10) / 10,
      totalStudentsBenefited,
      renewalRate: sponsors.length > 0 
        ? Math.round((sponsors.filter(s => s.partnership.status === 'active').length / sponsors.length) * 100) 
        : 0
    };
  }, [sponsors, tierConfig]);

  // Get tier styling
  const getTierStyling = (tier: string) => {
    const config = tierConfig[tier as keyof typeof tierConfig];
    return {
      color: config?.color || '#666',
      icon: config?.icon || '🤝',
      label: config?.label || tier
    };
  };

  // Sponsor metrics display
  const SponsorMetrics = () => (
    <div className={styles.sponsorMetrics}>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🤝</div>
          <div className={styles.metricValue}>{sponsorMetrics.activeSponsorCount}</div>
          <div className={styles.metricLabel}>Active Sponsors</div>
          <div className={styles.metricDescription}>Current partnerships</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>💰</div>
          <div className={styles.metricValue}>${(sponsorMetrics.totalFunding / 1000).toFixed(0)}K+</div>
          <div className={styles.metricLabel}>Annual Support</div>
          <div className={styles.metricDescription}>Estimated value</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📅</div>
          <div className={styles.metricValue}>{sponsorMetrics.averagePartnership} yrs</div>
          <div className={styles.metricLabel}>Avg Partnership</div>
          <div className={styles.metricDescription}>Long-term relationships</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>👥</div>
          <div className={styles.metricValue}>{sponsorMetrics.totalStudentsBenefited}</div>
          <div className={styles.metricLabel}>Students Impacted</div>
          <div className={styles.metricDescription}>Direct beneficiaries</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🔄</div>
          <div className={styles.metricValue}>{sponsorMetrics.renewalRate}%</div>
          <div className={styles.metricLabel}>Renewal Rate</div>
          <div className={styles.metricDescription}>Sponsor satisfaction</div>
        </div>
      </div>
    </div>
  );

  // Sponsor detail component
  const SponsorDetail = ({ sponsor }: { sponsor: Sponsor }) => {
    const tierStyling = getTierStyling(sponsor.tier);
    
    return (
      <div className={styles.sponsorDetail}>
        <div className={styles.sponsorDetailHeader}>
          <div className={styles.sponsorLogo}>
            {sponsor.logo ? (
              <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
            ) : (
              <div className={styles.logoPlaceholder}>
                {sponsor.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className={styles.sponsorInfo}>
            <h3>{sponsor.name}</h3>
            <div className={styles.sponsorTier}>
              <span 
                className={styles.tierBadge}
                style={{ backgroundColor: tierStyling.color }}
              >
                {tierStyling.icon} {tierStyling.label}
              </span>
              <span className={styles.sponsorCategory}>{sponsor.category}</span>
            </div>
            {sponsor.website && (
              <Link 
                href={sponsor.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.sponsorWebsite}
              >
                🌐 Visit Website
              </Link>
            )}
          </div>
        </div>

        <p className={styles.sponsorDescription}>{sponsor.description}</p>

        {/* Partnership Details */}
        <div className={styles.partnershipSection}>
          <h4>📋 Partnership Details</h4>
          <div className={styles.partnershipGrid}>
            <div className={styles.partnershipItem}>
              <span className={styles.partnershipLabel}>Started:</span>
              <span>{new Date(sponsor.partnership.startDate).getFullYear()}</span>
            </div>
            <div className={styles.partnershipItem}>
              <span className={styles.partnershipLabel}>Duration:</span>
              <span>{sponsor.partnership.duration} years</span>
            </div>
            <div className={styles.partnershipItem}>
              <span className={styles.partnershipLabel}>Status:</span>
              <span className={clsx(styles.partnershipStatus, styles[sponsor.partnership.status])}>
                {sponsor.partnership.status}
              </span>
            </div>
          </div>
        </div>

        {/* Contributions */}
        <div className={styles.contributionsSection}>
          <h4>🎁 Contributions & Support</h4>
          <div className={styles.contributionsList}>
            {sponsor.contributions.map((contribution, index) => (
              <div key={index} className={styles.contributionItem}>
                <div className={styles.contributionType}>
                  {contribution.type === 'financial' && '💰'}
                  {contribution.type === 'equipment' && '🔧'}
                  {contribution.type === 'mentorship' && '🎓'}
                  {contribution.type === 'facilities' && '🏢'}
                  {contribution.type === 'materials' && '📦'}
                  <span>{contribution.type}</span>
                </div>
                <div className={styles.contributionDescription}>
                  {contribution.description}
                  {contribution.value && (
                    <span className={styles.contributionValue}>({contribution.value})</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className={styles.impactSection}>
          <h4>📈 Measured Impact</h4>
          <div className={styles.impactDetails}>
            <div className={styles.impactMetric}>
              <span className={styles.impactNumber}>{sponsor.impact.studentsBenefited}</span>
              <span className={styles.impactLabel}>Students Benefited</span>
            </div>
            
            <div className={styles.programsEnabled}>
              <h5>Programs Enabled:</h5>
              <ul>
                {sponsor.impact.programsEnabled.map((program, index) => (
                  <li key={index}>{program}</li>
                ))}
              </ul>
            </div>
            
            <div className={styles.specificOutcomes}>
              <h5>Specific Outcomes:</h5>
              <ul>
                {sponsor.impact.specificOutcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        {sponsor.testimonial && (
          <div className={styles.testimonialSection}>
            <h4>💬 Partnership Testimonial</h4>
            <blockquote className={styles.sponsorTestimonial}>
              <p>"{sponsor.testimonial.quote}"</p>
              <cite>
                <strong>{sponsor.testimonial.author}</strong>
                <br />
                {sponsor.testimonial.title}
              </cite>
            </blockquote>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={clsx(styles.sponsorHub, className)}>
      {/* Header */}
      <div className={styles.hubHeader}>
        <div className={styles.headerTitle}>
          <h2>Sponsor Partnership Hub</h2>
          <p>Building lasting partnerships that fuel innovation and inspire future engineers</p>
        </div>
        
        <SponsorMetrics />
      </div>

      {/* Navigation */}
      <div className={styles.hubNavigation}>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'sponsors' })}
          onClick={() => setActiveTab('sponsors')}
        >
          <span className={styles.tabIcon}>🏢</span>
          Our Sponsors
        </button>
        {showPackages && (
          <button
            className={clsx(styles.navTab, { [styles.active]: activeTab === 'packages' })}
            onClick={() => setActiveTab('packages')}
          >
            <span className={styles.tabIcon}>📦</span>
            Sponsorship Packages
          </button>
        )}
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'impact' })}
          onClick={() => setActiveTab('impact')}
        >
          <span className={styles.tabIcon}>📊</span>
          Impact Report
        </button>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'contact' })}
          onClick={() => setActiveTab('contact')}
        >
          <span className={styles.tabIcon}>📞</span>
          Partner With Us
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Sponsors Tab */}
        {activeTab === 'sponsors' && (
          <div className={styles.sponsorsSection}>
            <div className={styles.sponsorsHeader}>
              <h3>Our Valued Partners</h3>
              
              <div className={styles.tierFilters}>
                <button
                  className={clsx(styles.tierFilter, { [styles.active]: selectedTier === 'all' })}
                  onClick={() => setSelectedTier('all')}
                >
                  All Sponsors
                </button>
                {Object.entries(tierConfig).map(([tier, config]) => (
                  <button
                    key={tier}
                    className={clsx(styles.tierFilter, { [styles.active]: selectedTier === tier })}
                    onClick={() => setSelectedTier(tier)}
                    style={{ '--tier-color': config.color } as React.CSSProperties}
                  >
                    {config.icon} {config.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.sponsorsGrid}>
              <div className={styles.sponsorsList}>
                {filteredSponsors.map((sponsor) => {
                  const tierStyling = getTierStyling(sponsor.tier);
                  
                  return (
                    <div
                      key={sponsor.id}
                      className={clsx(styles.sponsorCard, {
                        [styles.selected]: selectedSponsor === sponsor.id,
                        [styles[sponsor.partnership.status]]: true
                      })}
                      onClick={() => setSelectedSponsor(sponsor.id)}
                    >
                      <div className={styles.sponsorCardHeader}>
                        <div className={styles.sponsorCardLogo}>
                          {sponsor.logo ? (
                            <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
                          ) : (
                            <div className={styles.cardLogoPlaceholder}>
                              {sponsor.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        
                        <div className={styles.sponsorCardInfo}>
                          <h4>{sponsor.name}</h4>
                          <span 
                            className={styles.cardTierBadge}
                            style={{ backgroundColor: tierStyling.color }}
                          >
                            {tierStyling.icon} {tierStyling.label}
                          </span>
                        </div>
                      </div>
                      
                      <p className={styles.sponsorCardDesc}>{sponsor.description}</p>
                      
                      <div className={styles.sponsorCardFooter}>
                        <span className={styles.partnershipDuration}>
                          {sponsor.partnership.duration} year partnership
                        </span>
                        <span className={styles.studentsImpacted}>
                          {sponsor.impact.studentsBenefited} students impacted
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedSponsor && filteredSponsors.find(s => s.id === selectedSponsor) && (
                <SponsorDetail sponsor={filteredSponsors.find(s => s.id === selectedSponsor)!} />
              )}
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && showPackages && (
          <div className={styles.packagesSection}>
            <div className={styles.packagesHeader}>
              <h3>Partnership Opportunities</h3>
              <p>Join our mission to inspire the next generation of innovators</p>
            </div>

            <div className={styles.packagesGrid}>
              {packages.map((pkg, index) => (
                <div 
                  key={index} 
                  className={clsx(styles.packageCard, { [styles.featured]: pkg.featured })}
                >
                  {pkg.featured && (
                    <div className={styles.featuredBadge}>Most Popular</div>
                  )}
                  
                  <div className={styles.packageHeader}>
                    <h4>{pkg.tier}</h4>
                    <div className={styles.packagePrice}>{pkg.annualInvestment}</div>
                    <div className={styles.packageAvailability}>
                      {pkg.available - pkg.sold} of {pkg.available} available
                    </div>
                  </div>

                  <div className={styles.packageBenefits}>
                    <h5>Benefits Include:</h5>
                    <ul>
                      {pkg.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.packageRecognition}>
                    <h5>Recognition:</h5>
                    <ul>
                      {pkg.recognition.map((recognition, idx) => (
                        <li key={idx}>{recognition}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.packageEngagement}>
                    <h5>Engagement Opportunities:</h5>
                    <ul>
                      {pkg.engagement.map((engagement, idx) => (
                        <li key={idx}>{engagement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.packageFooter}>
                    <Link 
                      className={clsx(styles.packageCTA, { [styles.featured]: pkg.featured })}
                      href="/sponsors/contact"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className={styles.impactSection}>
            <div className={styles.impactHeader}>
              <h3>Sponsor Impact Report</h3>
              <p>Demonstrating the tangible impact of our partnerships</p>
            </div>

            <div className={styles.impactStories}>
              <div className={styles.impactStoryCard}>
                <div className={styles.storyIcon}>🎓</div>
                <h4>Educational Excellence</h4>
                <p>
                  Through our sponsor partnerships, we've directly impacted {sponsorMetrics.totalStudentsBenefited} students 
                  across {sponsors.length} different programs. Our sponsors enable hands-on STEM education 
                  that wouldn't be possible otherwise.
                </p>
                <div className={styles.impactNumbers}>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>{sponsorMetrics.totalStudentsBenefited}</span>
                    <span className={styles.statLabel}>Students Impacted</span>
                  </div>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>15</span>
                    <span className={styles.statLabel}>Partner Schools</span>
                  </div>
                </div>
              </div>

              <div className={styles.impactStoryCard}>
                <div className={styles.storyIcon}>🤖</div>
                <h4>Technology Innovation</h4>
                <p>
                  Equipment and technology donations from our sponsors have enabled cutting-edge robotics 
                  development. Students work with industry-standard tools, preparing them for future careers.
                </p>
                <div className={styles.impactNumbers}>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>$50K+</span>
                    <span className={styles.statLabel}>Equipment Value</span>
                  </div>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>8</span>
                    <span className={styles.statLabel}>Tech Sponsors</span>
                  </div>
                </div>
              </div>

              <div className={styles.impactStoryCard}>
                <div className={styles.storyIcon}>🌟</div>
                <h4>Community Growth</h4>
                <p>
                  Sponsor support has enabled our community outreach programs, inspiring hundreds of 
                  students to pursue STEM careers and creating lasting partnerships with local organizations.
                </p>
                <div className={styles.impactNumbers}>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>25</span>
                    <span className={styles.statLabel}>Community Events</span>
                  </div>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>500+</span>
                    <span className={styles.statLabel}>Event Participants</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI for Sponsors */}
            <div className={styles.roiSection}>
              <h3>Return on Investment</h3>
              <div className={styles.roiGrid}>
                <div className={styles.roiCard}>
                  <h4>Brand Visibility</h4>
                  <p>Average 10,000+ impressions per event, social media exposure, and community recognition</p>
                </div>
                <div className={styles.roiCard}>
                  <h4>Talent Pipeline</h4>
                  <p>Direct access to motivated students for internships, mentoring, and future recruitment</p>
                </div>
                <div className={styles.roiCard}>
                  <h4>Community Impact</h4>
                  <p>Measurable contribution to STEM education and community development</p>
                </div>
                <div className={styles.roiCard}>
                  <h4>Long-term Partnership</h4>
                  <p>{sponsorMetrics.renewalRate}% renewal rate demonstrates strong sponsor satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className={styles.contactSection}>
            <div className={styles.contactHeader}>
              <h3>Partner With Us</h3>
              <p>Join our mission to inspire and educate the next generation of innovators</p>
            </div>

            <div className={styles.partnershipValue}>
              <h4>Why Partner With FTC Team 25805?</h4>
              <div className={styles.valueProps}>
                <div className={styles.valueProp}>
                  <div className={styles.valueIcon}>🎯</div>
                  <h5>Targeted Impact</h5>
                  <p>Direct engagement with motivated STEM students in our community</p>
                </div>
                <div className={styles.valueProp}>
                  <div className={styles.valueIcon}>📈</div>
                  <h5>Measurable Results</h5>
                  <p>Quantifiable impact through detailed reporting and success metrics</p>
                </div>
                <div className={styles.valueProp}>
                  <div className={styles.valueIcon}>🤝</div>
                  <h5>Authentic Partnership</h5>
                  <p>Genuine collaboration focused on mutual benefit and shared values</p>
                </div>
                <div className={styles.valueProp}>
                  <div className={styles.valueIcon}>🌟</div>
                  <h5>Community Recognition</h5>
                  <p>Positive brand association with innovation and educational excellence</p>
                </div>
              </div>
            </div>

            <div className={styles.contactActions}>
              <h4>Ready to Make a Difference?</h4>
              <div className={styles.actionButtons}>
                <Link 
                  className="button button--primary button--lg"
                  href="/sponsors/proposal"
                >
                  Request Partnership Proposal
                </Link>
                <Link 
                  className="button button--secondary button--lg"
                  href="mailto:sponsors@team25805.org"
                >
                  Email Our Sponsor Coordinator
                </Link>
              </div>
              
              <div className={styles.contactInfo}>
                <h5>Direct Contact</h5>
                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <strong>Sponsor Coordinator:</strong> Sarah Chen
                  </div>
                  <div className={styles.contactItem}>
                    <strong>Email:</strong> sponsors@team25805.org
                  </div>
                  <div className={styles.contactItem}>
                    <strong>Phone:</strong> (555) 123-4567
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorHub;