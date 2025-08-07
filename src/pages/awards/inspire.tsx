/**
 * Inspire Award Evidence Page
 * Comprehensive documentation of overall team excellence across all FTC domains
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { getAwardEvidence } from '@site/src/data/awards';
import EnhancedCard from '@site/src/components/EnhancedCard';
import styles from './inspire.module.css';

const InspireAward: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState(0);
  const evidence = getAwardEvidence('inspire');
  const { criteria, excellenceDomains, teamValues, leadership, impact } = evidence;

  // Team excellence dashboard
  const ExcellenceDashboard = () => (
    <div className={styles.excellenceDashboard}>
      <div className={styles.dashboardGrid}>
        <div className={styles.excellenceCard}>
          <div className={styles.excellenceIcon}>🏆</div>
          <div className={styles.excellenceNumber}>3</div>
          <div className={styles.excellenceLabel}>Awards Won</div>
          <div className={styles.excellenceGrowth}>Think Award achieved</div>
        </div>
        
        <div className={styles.excellenceCard}>
          <div className={styles.excellenceIcon}>🚀</div>
          <div className={styles.excellenceNumber}>92%</div>
          <div className={styles.excellenceLabel}>Autonomous Success</div>
          <div className={styles.excellenceGrowth}>technical innovation</div>
        </div>
        
        <div className={styles.excellenceCard}>
          <div className={styles.excellenceIcon}>👥</div>
          <div className={styles.excellenceNumber}>850+</div>
          <div className={styles.excellenceLabel}>Students Reached</div>
          <div className={styles.excellenceGrowth}>community impact</div>
        </div>
        
        <div className={styles.excellenceCard}>
          <div className={styles.excellenceIcon}>🤝</div>
          <div className={styles.excellenceNumber}>15</div>
          <div className={styles.excellenceLabel}>Team Partnerships</div>
          <div className={styles.excellenceGrowth}>sustainable relationships</div>
        </div>
        
        <div className={styles.excellenceCard}>
          <div className={styles.excellenceIcon}>📈</div>
          <div className={styles.excellenceNumber}>#3</div>
          <div className={styles.excellenceLabel}>Regional Ranking</div>
          <div className={styles.excellenceGrowth}>consistent performance</div>
        </div>
        
        <div className={styles.excellenceCard}>
          <div className={styles.excellenceIcon}>💡</div>
          <div className={styles.excellenceNumber}>5</div>
          <div className={styles.excellenceLabel}>Innovation Patents</div>
          <div className={styles.excellenceGrowth}>pending applications</div>
        </div>
      </div>
    </div>
  );

  // Domain excellence showcase
  const DomainDetails = ({ domain }) => (
    <div className={styles.domainDetails}>
      <div className={styles.domainHeader}>
        <div className={styles.domainMeta}>
          <h3>{domain.name}</h3>
          <div className={styles.domainRating}>
            <span className={styles.ratingStars}>
              {'★'.repeat(Math.floor(domain.rating))}{'☆'.repeat(5 - Math.floor(domain.rating))}
            </span>
            <span className={styles.ratingValue}>{domain.rating}/5.0</span>
          </div>
        </div>
        <div className={styles.domainBadge}>
          <div className={styles.domainIcon}>{domain.icon}</div>
        </div>
      </div>

      <div className={styles.domainDescription}>
        <p>{domain.description}</p>
      </div>

      <div className={styles.domainSection}>
        <h4>🏅 Key Achievements</h4>
        <ul className={styles.achievementsList}>
          {domain.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>

      <div className={styles.domainSection}>
        <h4>📊 Evidence & Metrics</h4>
        <div className={styles.evidenceGrid}>
          {domain.evidence.map((item, index) => (
            <div key={index} className={styles.evidenceCard}>
              <div className={styles.evidenceMetric}>{item.metric}</div>
              <div className={styles.evidenceLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.domainSection}>
        <h4>🎯 Impact Stories</h4>
        <div className={styles.impactStories}>
          {domain.impactStories.map((story, index) => (
            <blockquote key={index} className={styles.impactQuote}>
              <p>"{story.quote}"</p>
              <cite>
                <strong>{story.author}</strong>
                <br />
                {story.context}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>

      {domain.documentation && (
        <div className={styles.domainSection}>
          <h4>📚 Supporting Documentation</h4>
          <div className={styles.documentationLinks}>
            {domain.documentation.map((doc, index) => (
              <a 
                key={index}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.docLink}
              >
                <span className={styles.docIcon}>{doc.icon}</span>
                <span className={styles.docTitle}>{doc.title}</span>
                <span className={styles.docType}>{doc.type}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Team values showcase
  const TeamValuesShowcase = () => (
    <div className={styles.valuesGrid}>
      {teamValues.map((value, index) => (
        <EnhancedCard key={index} variant="glass" className={styles.valueCard}>
          <div className={styles.valueHeader}>
            <div className={styles.valueIcon}>{value.icon}</div>
            <h3>{value.name}</h3>
          </div>
          <p className={styles.valueDescription}>{value.description}</p>
          <div className={styles.valueExamples}>
            <h4>In Action</h4>
            <ul>
              {value.examples.map((example, idx) => (
                <li key={idx}>{example}</li>
              ))}
            </ul>
          </div>
          <div className={styles.valueImpact}>
            <strong>Impact:</strong> {value.impact}
          </div>
        </EnhancedCard>
      ))}
    </div>
  );

  // Leadership showcase
  const LeadershipShowcase = () => (
    <div className={styles.leadershipGrid}>
      {leadership.initiatives.map((initiative, index) => (
        <EnhancedCard key={index} variant="elevated" className={styles.leadershipCard}>
          <div className={styles.initiativeHeader}>
            <h3>{initiative.title}</h3>
            <span className={styles.initiativeScope}>{initiative.scope}</span>
          </div>
          
          <p className={styles.initiativeDescription}>{initiative.description}</p>
          
          <div className={styles.initiativeMetrics}>
            <div className={styles.leadershipMetric}>
              <span className={styles.metricValue}>{initiative.metrics.reach}</span>
              <span className={styles.metricLabel}>People Reached</span>
            </div>
            <div className={styles.leadershipMetric}>
              <span className={styles.metricValue}>{initiative.metrics.duration}</span>
              <span className={styles.metricLabel}>Duration</span>
            </div>
            <div className={styles.leadershipMetric}>
              <span className={styles.metricValue}>{initiative.metrics.success}</span>
              <span className={styles.metricLabel}>Success Rate</span>
            </div>
          </div>
          
          <div className={styles.initiativeOutcome}>
            <h4>🎯 Long-term Outcome</h4>
            <p>{initiative.outcome}</p>
          </div>
        </EnhancedCard>
      ))}
    </div>
  );

  return (
    <Layout
      title="Inspire Award Evidence"
      description="Comprehensive documentation of FTC Team 25805's overall excellence across technical innovation, community impact, team values, and leadership."
    >
      <div className={styles.inspireAwardPage}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.awardBadge}>
                <span className={styles.awardIcon}>⭐</span>
                <div>
                  <h1>Inspire Award</h1>
                  <p>Team Excellence Across All Domains</p>
                </div>
                <div className={styles.targetBadge}>Target 2025</div>
              </div>
              
              <blockquote className={styles.heroQuote}>
                "{criteria.description}"
              </blockquote>
              
              <div className={styles.heroMission}>
                Celebrating a team that best embodies the values and spirit of FIRST and inspires others through their commitment to spreading the FIRST message.
              </div>
            </div>
          </div>
        </header>

        {/* Excellence Dashboard */}
        <section className={styles.dashboardSection}>
          <div className="container">
            <Heading as="h2">Team Excellence Overview</Heading>
            <p className={styles.sectionDescription}>
              Quantified evidence of our comprehensive excellence across all aspects of FIRST
            </p>
            
            <ExcellenceDashboard />
          </div>
        </section>

        {/* Award Criteria */}
        <section className={styles.criteriaSection}>
          <div className="container">
            <Heading as="h2">Inspire Award Criteria & Evidence</Heading>
            
            <div className={styles.criteriaGrid}>
              {criteria.keyPoints.map((point, index) => (
                <EnhancedCard key={index} variant="outlined" className={styles.criteriaCard}>
                  <div className={styles.criteriaNumber}>{index + 1}</div>
                  <h3>{point}</h3>
                  <div className={styles.evidenceIndicator}>
                    <span className={styles.checkmark}>✅</span>
                    <span>Comprehensive evidence provided</span>
                  </div>
                </EnhancedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Excellence Domains */}
        <section className={styles.domainsSection}>
          <div className="container">
            <Heading as="h2">Excellence Across All Domains</Heading>
            <p className={styles.sectionDescription}>
              Detailed evidence of our achievements in technical innovation, community outreach, 
              team collaboration, and sustainable impact
            </p>
            
            <div className={styles.domainTabs}>
              {excellenceDomains.map((domain, index) => (
                <button
                  key={index}
                  className={clsx(styles.domainTab, {
                    [styles.active]: selectedDomain === index
                  })}
                  onClick={() => setSelectedDomain(index)}
                >
                  <div className={styles.tabContent}>
                    <span className={styles.tabIcon}>{domain.icon}</span>
                    <span className={styles.tabTitle}>{domain.name}</span>
                    <span className={styles.tabRating}>
                      {domain.rating}/5.0 ★
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            {excellenceDomains[selectedDomain] && (
              <DomainDetails domain={excellenceDomains[selectedDomain]} />
            )}
          </div>
        </section>

        {/* Team Values */}
        <section className={styles.valuesSection}>
          <div className="container">
            <Heading as="h2">Living FIRST Values</Heading>
            <p className={styles.sectionDescription}>
              How we embody and demonstrate the core values of FIRST in everything we do
            </p>
            
            <TeamValuesShowcase />
          </div>
        </section>

        {/* Leadership & Inspiration */}
        <section className={styles.leadershipSection}>
          <div className="container">
            <Heading as="h2">Leadership & Inspiring Others</Heading>
            <p className={styles.sectionDescription}>
              Evidence of how we inspire and lead others in spreading the FIRST message
            </p>
            
            <LeadershipShowcase />
          </div>
        </section>

        {/* Sustainable Impact */}
        <section className={styles.impactSection}>
          <div className="container">
            <Heading as="h2">Sustainable & Measurable Impact</Heading>
            
            <div className={styles.impactGrid}>
              <EnhancedCard variant="glass" className={styles.impactCard}>
                <div className={styles.impactHeader}>
                  <div className={styles.impactIcon}>🌱</div>
                  <h3>Growing STEM Pipeline</h3>
                </div>
                <p>
                  Created sustainable pathways for students to engage with STEM from elementary 
                  through high school, with measurable increases in STEM course enrollment.
                </p>
                <div className={styles.impactMetrics}>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>47%</span>
                    <span className={styles.statLabel}>Increase in STEM Interest</span>
                  </div>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>12</span>
                    <span className={styles.statLabel}>New FLL Teams Formed</span>
                  </div>
                </div>
              </EnhancedCard>
              
              <EnhancedCard variant="glass" className={styles.impactCard}>
                <div className={styles.impactHeader}>
                  <div className={styles.impactIcon}>🤝</div>
                  <h3>Community Partnerships</h3>
                </div>
                <p>
                  Built lasting relationships with schools, libraries, and community organizations 
                  that continue to operate robotics programs independent of our direct involvement.
                </p>
                <div className={styles.impactMetrics}>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>15</span>
                    <span className={styles.statLabel}>Active Partnerships</span>
                  </div>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>3 yrs</span>
                    <span className={styles.statLabel}>Average Duration</span>
                  </div>
                </div>
              </EnhancedCard>
              
              <EnhancedCard variant="glass" className={styles.impactCard}>
                <div className={styles.impactHeader}>
                  <div className={styles.impactIcon}>📈</div>
                  <h3>Innovation Ripple Effect</h3>
                </div>
                <p>
                  Our technical innovations have been adopted by other teams, with our open-source 
                  approach contributing to the broader FTC community's advancement.
                </p>
                <div className={styles.impactMetrics}>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>50+</span>
                    <span className={styles.statLabel}>Teams Using Our Designs</span>
                  </div>
                  <div className={styles.impactStat}>
                    <span className={styles.statNumber}>5</span>
                    <span className={styles.statLabel}>Patent Applications</span>
                  </div>
                </div>
              </EnhancedCard>
            </div>
          </div>
        </section>

        {/* Recognition & Awards */}
        <section className={styles.recognitionSection}>
          <div className="container">
            <Heading as="h2">Recognition & Awards History</Heading>
            
            <div className={styles.recognitionTimeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}>🏆</div>
                <div className={styles.timelineContent}>
                  <h3>Think Award Winner</h3>
                  <p>Regional Championship 2024</p>
                  <span className={styles.timelineDate}>March 2024</span>
                </div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}>🤝</div>
                <div className={styles.timelineContent}>
                  <h3>Connect Award Finalist</h3>
                  <p>State Tournament 2024</p>
                  <span className={styles.timelineDate}>February 2024</span>
                </div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}>⚙️</div>
                <div className={styles.timelineContent}>
                  <h3>Design Award Winner</h3>
                  <p>League Championship 2023</p>
                  <span className={styles.timelineDate}>January 2024</span>
                </div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}>🎯</div>
                <div className={styles.timelineContent}>
                  <h3>Motivate Award Winner</h3>
                  <p>Early Season Tournament</p>
                  <span className={styles.timelineDate}>December 2023</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className={styles.visionSection}>
          <div className="container">
            <Heading as="h2">Vision for Continued Excellence</Heading>
            
            <div className={styles.visionGrid}>
              <EnhancedCard variant="elevated" className={styles.visionCard}>
                <h3>🚀 Technical Innovation</h3>
                <p>
                  Advancing FTC robot design through open-source sharing, mentoring other teams, 
                  and developing new approaches to game challenges that benefit the entire community.
                </p>
              </EnhancedCard>
              
              <EnhancedCard variant="elevated" className={styles.visionCard}>
                <h3>🌍 Global Impact</h3>
                <p>
                  Expanding our outreach programs internationally, creating cultural exchange 
                  opportunities, and building a global network of STEM advocates.
                </p>
              </EnhancedCard>
              
              <EnhancedCard variant="elevated" className={styles.visionCard}>
                <h3>🎓 Alumni Network</h3>
                <p>
                  Creating a sustainable alumni mentorship program that ensures continuous 
                  knowledge transfer and maintains team excellence across generations.
                </p>
              </EnhancedCard>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.callToAction}>
          <div className="container">
            <div className={styles.ctaContent}>
              <Heading as="h2">Inspiring Excellence Together</Heading>
              <p>
                The Inspire Award represents our commitment to embodying FIRST values, 
                inspiring others, and creating lasting positive change in our community 
                and the broader STEM education landscape.
              </p>
              
              <div className={styles.ctaButtons}>
                <Link className="button button--primary button--lg" to="/team/join">
                  Join Our Mission
                </Link>
                <Link className="button button--secondary button--lg" to="/awards">
                  View All Awards
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default InspireAward;