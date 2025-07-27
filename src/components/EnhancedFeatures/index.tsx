/**
 * Enhanced Features Component
 * Demonstrates the new card system, animations, and typography
 */

import React from 'react';
import clsx from 'clsx';
import EnhancedCard, { CardTitle, CardDescription } from '@site/src/components/EnhancedCard';
import { PrimaryButton, SecondaryButton } from '@site/src/components/EnhancedButton';
import { useStaggeredAnimation } from '@site/src/hooks/useScrollAnimation';
import styles from './styles.module.css';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  gradient?: boolean;
  link?: string;
  stats?: {
    number: string;
    label: string;
  };
}

const features: FeatureItem[] = [
  {
    title: 'Advanced Robotics',
    description: 'Cutting-edge robot design with precision mechanics, computer vision, and autonomous navigation systems for competitive excellence.',
    icon: '🤖',
    gradient: true,
    link: '/seasons/2024-25#current-robot',
    stats: {
      number: '15+',
      label: 'Subsystems'
    }
  },
  {
    title: 'Programming Excellence',
    description: 'Modern software development with Java, OpenCV, and machine learning for intelligent robot behavior and telemetry.',
    icon: '💻',
    link: '/docs/programming',
    stats: {
      number: '5K+',
      label: 'Lines of Code'
    }
  },
  {
    title: 'Team Collaboration',
    description: 'Diverse team of engineers, programmers, and designers working together to solve complex challenges and innovate.',
    icon: '👥',
    link: '/team',
    stats: {
      number: '12',
      label: 'Team Members'
    }
  },
  {
    title: 'Competition Success',
    description: 'Consistent performance in regional and championship tournaments with multiple awards and recognitions.',
    icon: '🏆',
    link: '/competitions/awards',
    stats: {
      number: '3',
      label: 'Major Awards'
    }
  },
  {
    title: 'STEM Outreach',
    description: 'Active community engagement through workshops, demonstrations, and mentoring programs for aspiring engineers.',
    icon: '🌟',
    link: '/community/outreach',
    stats: {
      number: '500+',
      label: 'Students Reached'
    }
  },
  {
    title: 'Innovation Focus',
    description: 'Continuous research and development of new techniques, tools, and strategies for competitive advantage.',
    icon: '💡',
    link: '/docs/notebook',
    stats: {
      number: '25+',
      label: 'Innovations'
    }
  }
];

export default function EnhancedFeatures(): React.ReactElement {
  const { containerRef, visibleItems } = useStaggeredAnimation(features.length, 150, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className={styles.enhancedFeatures}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className="ftc-heading-2 ftc-text-center ftc-text-gradient">
            Innovation Through Engineering Excellence
          </h2>
          <p className="ftc-text-lead ftc-text-center ftc-text-secondary">
            Discover what makes FTC Team 25805 a leader in competitive robotics and STEM education
          </p>
        </div>

        {/* Feature Grid */}
        <div 
          ref={containerRef as React.RefObject<HTMLDivElement>} 
          className={styles.featuresGrid}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={clsx(
                styles.featureWrapper,
                visibleItems[index] && styles.visible
              )}
            >
              <EnhancedCard
                variant={feature.gradient ? 'gradient' : 'elevated'}
                hover="lift"
                to={feature.link}
                clickable
                className={styles.featureCard}
                badge={
                  feature.stats && (
                    <div className={styles.statBadge}>
                      <span className={styles.statNumber}>{feature.stats.number}</span>
                      <span className={styles.statLabel}>{feature.stats.label}</span>
                    </div>
                  )
                }
              >
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                
                <CardTitle className={styles.featureTitle}>
                  {feature.title}
                </CardTitle>
                
                <CardDescription className={styles.featureDescription}>
                  {feature.description}
                </CardDescription>
                
                <div className={styles.featureAction}>
                  <SecondaryButton
                    size="small"
                    iconPosition="right"
                    icon="→"
                  >
                    Learn More
                  </SecondaryButton>
                </div>
              </EnhancedCard>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className="ftc-heading-3 ftc-text-center">
              Ready to Join Our Mission?
            </h3>
            <p className="ftc-text-center ftc-text-secondary">
              Explore our work, meet our team, and discover how we're pushing the boundaries of robotics
            </p>
            
            <div className={styles.ctaButtons}>
              <PrimaryButton
                to="/team"
                size="large"
                icon="👥"
                glow
              >
                Meet Our Team
              </PrimaryButton>
              
              <SecondaryButton
                to="/seasons/2024-25"
                size="large"
                icon="🏆"
              >
                Current Season
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}