/**
 * Community Hub Component
 * Comprehensive community engagement dashboard with outreach tracking and social impact
 */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface CommunityEvent {
  id: string;
  title: string;
  type: 'workshop' | 'demo' | 'mentoring' | 'competition' | 'outreach';
  date: string;
  location: string;
  audience: string;
  participants: number;
  impact: {
    preEventSurvey?: number;
    postEventSurvey?: number;
    followUpEngagement?: number;
    newSTEMInterest?: number;
  };
  status: 'upcoming' | 'completed' | 'cancelled';
  description: string;
  images?: string[];
  testimonials?: {
    content: string;
    author: string;
    role: string;
  }[];
}

interface Partnership {
  id: string;
  organization: string;
  type: 'school' | 'library' | 'community' | 'business' | 'nonprofit';
  relationship: string;
  startDate: string;
  status: 'active' | 'inactive' | 'pending';
  contributions: string[];
  impact: string;
  contactInfo?: {
    name: string;
    email: string;
    phone?: string;
  };
  projects: string[];
}

interface VolunteerOpportunity {
  id: string;
  title: string;
  category: 'mentoring' | 'events' | 'technical' | 'outreach' | 'logistics';
  timeCommitment: string;
  skills: string[];
  description: string;
  requirements: string[];
  contact: string;
  spots: {
    total: number;
    filled: number;
  };
}

interface CommunityHubProps {
  events?: CommunityEvent[];
  partnerships?: Partnership[];
  volunteerOpportunities?: VolunteerOpportunity[];
  showUpcoming?: boolean;
  showMetrics?: boolean;
  className?: string;
}

const CommunityHub: React.FC<CommunityHubProps> = ({
  events = [],
  partnerships = [],
  volunteerOpportunities = [],
  showUpcoming = true,
  showMetrics = true,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'partnerships' | 'volunteer' | 'impact'>('events');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<'all' | 'upcoming' | 'recent'>('upcoming');

  // Filter events based on time filter
  const filteredEvents = React.useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    switch (timeFilter) {
      case 'upcoming':
        return events.filter(event => 
          new Date(event.date) >= now && event.status === 'upcoming'
        );
      case 'recent':
        return events.filter(event => 
          new Date(event.date) >= thirtyDaysAgo && event.status === 'completed'
        );
      default:
        return events;
    }
  }, [events, timeFilter]);

  // Calculate community impact metrics
  const communityMetrics = React.useMemo(() => {
    const completedEvents = events.filter(e => e.status === 'completed');
    const totalParticipants = completedEvents.reduce((sum, e) => sum + e.participants, 0);
    const averageImpact = completedEvents.length > 0 
      ? completedEvents.reduce((sum, e) => sum + (e.impact.postEventSurvey || 0), 0) / completedEvents.length
      : 0;
    const activePartnerships = partnerships.filter(p => p.status === 'active').length;
    const availableVolunteerSpots = volunteerOpportunities.reduce(
      (sum, opp) => sum + (opp.spots.total - opp.spots.filled), 0
    );

    return {
      totalEvents: completedEvents.length,
      totalParticipants,
      averageImpact: Math.round(averageImpact),
      activePartnerships,
      availableVolunteerSpots,
      newSTEMInterest: completedEvents.reduce((sum, e) => sum + (e.impact.newSTEMInterest || 0), 0)
    };
  }, [events, partnerships, volunteerOpportunities]);

  // Get event type icon
  const getEventTypeIcon = (type: string) => {
    const icons = {
      workshop: '🛠️',
      demo: '🤖',
      mentoring: '🎓',
      competition: '🏆',
      outreach: '🤝'
    };
    return icons[type as keyof typeof icons] || '📅';
  };

  // Get partnership type icon
  const getPartnershipIcon = (type: string) => {
    const icons = {
      school: '🏫',
      library: '📚',
      community: '🏘️',
      business: '🏢',
      nonprofit: '🌟'
    };
    return icons[type as keyof typeof icons] || '🤝';
  };

  // Impact metrics display
  const ImpactMetrics = () => (
    <div className={styles.impactMetrics}>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🎯</div>
          <div className={styles.metricValue}>{communityMetrics.totalEvents}</div>
          <div className={styles.metricLabel}>Community Events</div>
          <div className={styles.metricDescription}>Completed this year</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>👥</div>
          <div className={styles.metricValue}>{communityMetrics.totalParticipants}</div>
          <div className={styles.metricLabel}>People Reached</div>
          <div className={styles.metricDescription}>Direct engagement</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📈</div>
          <div className={styles.metricValue}>{communityMetrics.averageImpact}%</div>
          <div className={styles.metricLabel}>Average Impact</div>
          <div className={styles.metricDescription}>Post-event satisfaction</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🤝</div>
          <div className={styles.metricValue}>{communityMetrics.activePartnerships}</div>
          <div className={styles.metricLabel}>Active Partnerships</div>
          <div className={styles.metricDescription}>Ongoing relationships</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🌟</div>
          <div className={styles.metricValue}>{communityMetrics.newSTEMInterest}</div>
          <div className={styles.metricLabel}>New STEM Interest</div>
          <div className={styles.metricDescription}>Students inspired</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🙋</div>
          <div className={styles.metricValue}>{communityMetrics.availableVolunteerSpots}</div>
          <div className={styles.metricLabel}>Volunteer Spots</div>
          <div className={styles.metricDescription}>Open opportunities</div>
        </div>
      </div>
    </div>
  );

  // Event details component
  const EventDetails = ({ event }: { event: CommunityEvent }) => (
    <div className={styles.eventDetails}>
      <div className={styles.eventHeader}>
        <div className={styles.eventMeta}>
          <h3>{event.title}</h3>
          <div className={styles.eventInfo}>
            <span className={styles.eventType}>
              {getEventTypeIcon(event.type)} {event.type}
            </span>
            <span className={styles.eventDate}>
              {new Date(event.date).toLocaleDateString()}
            </span>
            <span className={styles.eventLocation}>📍 {event.location}</span>
          </div>
        </div>
        
        <div className={styles.eventStats}>
          <div className={styles.participantCount}>
            <span className={styles.statNumber}>{event.participants}</span>
            <span className={styles.statLabel}>Participants</span>
          </div>
          <div className={clsx(styles.eventStatus, styles[event.status])}>
            {event.status}
          </div>
        </div>
      </div>

      <p className={styles.eventDescription}>{event.description}</p>

      <div className={styles.eventAudience}>
        <strong>Target Audience:</strong> {event.audience}
      </div>

      {event.impact && Object.keys(event.impact).length > 0 && (
        <div className={styles.impactSection}>
          <h4>📊 Measured Impact</h4>
          <div className={styles.impactGrid}>
            {event.impact.preEventSurvey && (
              <div className={styles.impactItem}>
                <span className={styles.impactLabel}>Pre-Event Interest</span>
                <span className={styles.impactValue}>{event.impact.preEventSurvey}%</span>
              </div>
            )}
            {event.impact.postEventSurvey && (
              <div className={styles.impactItem}>
                <span className={styles.impactLabel}>Post-Event Satisfaction</span>
                <span className={styles.impactValue}>{event.impact.postEventSurvey}%</span>
              </div>
            )}
            {event.impact.newSTEMInterest && (
              <div className={styles.impactItem}>
                <span className={styles.impactLabel}>New STEM Interest</span>
                <span className={styles.impactValue}>{event.impact.newSTEMInterest} students</span>
              </div>
            )}
            {event.impact.followUpEngagement && (
              <div className={styles.impactItem}>
                <span className={styles.impactLabel}>Follow-up Engagement</span>
                <span className={styles.impactValue}>{event.impact.followUpEngagement}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {event.testimonials && event.testimonials.length > 0 && (
        <div className={styles.testimonialsSection}>
          <h4>💬 Community Feedback</h4>
          {event.testimonials.map((testimonial, index) => (
            <blockquote key={index} className={styles.testimonial}>
              <p>"{testimonial.content}"</p>
              <cite>
                <strong>{testimonial.author}</strong>
                <br />
                {testimonial.role}
              </cite>
            </blockquote>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={clsx(styles.communityHub, className)}>
      {/* Header */}
      <div className={styles.hubHeader}>
        <div className={styles.headerTitle}>
          <h2>Community Engagement Hub</h2>
          <p>Building connections, inspiring futures, and strengthening our STEM community</p>
        </div>
        
        {showMetrics && <ImpactMetrics />}
      </div>

      {/* Navigation Tabs */}
      <div className={styles.hubNavigation}>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'events' })}
          onClick={() => setActiveTab('events')}
        >
          <span className={styles.tabIcon}>📅</span>
          Community Events
        </button>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'partnerships' })}
          onClick={() => setActiveTab('partnerships')}
        >
          <span className={styles.tabIcon}>🤝</span>
          Partnerships
        </button>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'volunteer' })}
          onClick={() => setActiveTab('volunteer')}
        >
          <span className={styles.tabIcon}>🙋</span>
          Volunteer Opportunities
        </button>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'impact' })}
          onClick={() => setActiveTab('impact')}
        >
          <span className={styles.tabIcon}>📈</span>
          Impact Stories
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className={styles.eventsSection}>
            <div className={styles.eventsHeader}>
              <h3>Community Events & Outreach</h3>
              
              <div className={styles.eventsControls}>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as typeof timeFilter)}
                  className={styles.timeFilter}
                >
                  <option value="upcoming">Upcoming Events</option>
                  <option value="recent">Recent Events</option>
                  <option value="all">All Events</option>
                </select>
              </div>
            </div>

            <div className={styles.eventsGrid}>
              <div className={styles.eventsList}>
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className={clsx(styles.eventCard, {
                      [styles.selected]: selectedEvent === event.id,
                      [styles[event.status]]: true
                    })}
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <div className={styles.eventCardHeader}>
                      <span className={styles.eventTypeIcon}>
                        {getEventTypeIcon(event.type)}
                      </span>
                      <div className={styles.eventCardMeta}>
                        <h4>{event.title}</h4>
                        <span className={styles.eventCardDate}>
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={styles.participantBadge}>
                        {event.participants} people
                      </span>
                    </div>
                    
                    <p className={styles.eventCardDesc}>{event.description}</p>
                    
                    <div className={styles.eventCardFooter}>
                      <span className={styles.eventLocation}>📍 {event.location}</span>
                      <span className={styles.eventAudienceBadge}>{event.audience}</span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedEvent && filteredEvents.find(e => e.id === selectedEvent) && (
                <EventDetails event={filteredEvents.find(e => e.id === selectedEvent)!} />
              )}
            </div>
          </div>
        )}

        {/* Partnerships Tab */}
        {activeTab === 'partnerships' && (
          <div className={styles.partnershipsSection}>
            <div className={styles.partnershipsHeader}>
              <h3>Community Partnerships</h3>
              <p>Building lasting relationships that strengthen our community impact</p>
            </div>

            <div className={styles.partnershipsGrid}>
              {partnerships.map((partnership) => (
                <div key={partnership.id} className={styles.partnershipCard}>
                  <div className={styles.partnershipHeader}>
                    <div className={styles.partnershipTitle}>
                      <span className={styles.partnershipIcon}>
                        {getPartnershipIcon(partnership.type)}
                      </span>
                      <h4>{partnership.organization}</h4>
                    </div>
                    <div className={styles.partnershipMeta}>
                      <span className={styles.partnershipType}>{partnership.type}</span>
                      <span className={clsx(styles.partnershipStatus, styles[partnership.status])}>
                        {partnership.status}
                      </span>
                    </div>
                  </div>

                  <p className={styles.partnershipRelation}>{partnership.relationship}</p>

                  <div className={styles.partnershipDetails}>
                    <div className={styles.contributionsSection}>
                      <h5>Key Contributions</h5>
                      <ul>
                        {partnership.contributions.slice(0, 3).map((contribution, index) => (
                          <li key={index}>{contribution}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.impactStatement}>
                      <strong>Impact:</strong> {partnership.impact}
                    </div>
                  </div>

                  <div className={styles.partnershipFooter}>
                    <div className={styles.partnershipDuration}>
                      Partnership since {new Date(partnership.startDate).getFullYear()}
                    </div>
                    <div className={styles.projectsCount}>
                      {partnership.projects.length} active projects
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteer Tab */}
        {activeTab === 'volunteer' && (
          <div className={styles.volunteerSection}>
            <div className={styles.volunteerHeader}>
              <h3>Volunteer Opportunities</h3>
              <p>Join our mission to inspire the next generation of STEM innovators</p>
            </div>

            <div className={styles.volunteerGrid}>
              {volunteerOpportunities.map((opportunity) => (
                <div key={opportunity.id} className={styles.volunteerCard}>
                  <div className={styles.volunteerHeader}>
                    <h4>{opportunity.title}</h4>
                    <span className={styles.volunteerCategory}>{opportunity.category}</span>
                  </div>

                  <div className={styles.volunteerMeta}>
                    <div className={styles.timeCommitment}>
                      <span className={styles.metaLabel}>Time:</span>
                      <span>{opportunity.timeCommitment}</span>
                    </div>
                    <div className={styles.spotsAvailable}>
                      <span className={styles.metaLabel}>Available:</span>
                      <span>{opportunity.spots.total - opportunity.spots.filled}/{opportunity.spots.total} spots</span>
                    </div>
                  </div>

                  <p className={styles.volunteerDescription}>{opportunity.description}</p>

                  <div className={styles.skillsRequired}>
                    <h5>Skills Needed</h5>
                    <div className={styles.skillsTags}>
                      {opportunity.skills.map((skill, index) => (
                        <span key={index} className={styles.skillTag}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.volunteerRequirements}>
                    <h5>Requirements</h5>
                    <ul>
                      {opportunity.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.volunteerFooter}>
                    <Link 
                      className={styles.volunteerApply}
                      href={`mailto:${opportunity.contact}?subject=Volunteer Application: ${opportunity.title}`}
                    >
                      Apply to Volunteer
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {volunteerOpportunities.length === 0 && (
              <div className={styles.noVolunteerOps}>
                <div className={styles.noOpsIcon}>🙋‍♀️</div>
                <h3>No current volunteer opportunities</h3>
                <p>Check back soon or contact us to discuss how you can help!</p>
              </div>
            )}
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className={styles.impactSection}>
            <div className={styles.impactHeader}>
              <h3>Community Impact Stories</h3>
              <p>Real stories of how our work is making a difference</p>
            </div>

            <div className={styles.impactStoriesGrid}>
              <div className={styles.storyCard}>
                <div className={styles.storyIcon}>🏫</div>
                <h4>Roosevelt Elementary Partnership</h4>
                <p>
                  After our first robotics demonstration, 15 students joined the after-school 
                  STEM club. The school now hosts an annual Robotics Day and considers us 
                  permanent STEM education partners.
                </p>
                <div className={styles.storyMetric}>
                  <strong>Result:</strong> 3 new FLL teams formed, 40+ students engaged annually
                </div>
              </div>

              <div className={styles.storyCard}>
                <div className={styles.storyIcon}>👩‍🏫</div>
                <h4>Teacher Training Impact</h4>
                <p>
                  Mrs. Martinez integrated our curriculum into her 5th grade classes. 
                  Student test scores in engineering concepts improved by 34%, and 
                  enrollment in advanced STEM courses increased significantly.
                </p>
                <div className={styles.storyMetric}>
                  <strong>Result:</strong> Curriculum adopted district-wide, 200+ students impacted
                </div>
              </div>

              <div className={styles.storyCard}>
                <div className={styles.storyIcon}>🎓</div>
                <h4>Career Pathway Influence</h4>
                <p>
                  Seven students from our outreach programs joined high school robotics teams. 
                  Three are now pursuing engineering degrees, directly citing our workshops 
                  as their inspiration.
                </p>
                <div className={styles.storyMetric}>
                  <strong>Result:</strong> Direct STEM career pathway influence for 7+ students
                </div>
              </div>

              <div className={styles.storyCard}>
                <div className={styles.storyIcon}>📚</div>
                <h4>Library Program Success</h4>
                <p>
                  Our robotics workshops at the Central Library became so popular they 
                  created a permanent "Maker Space" with 3D printers and robotics kits. 
                  The program now serves 50+ families monthly.
                </p>
                <div className={styles.storyMetric}>
                  <strong>Result:</strong> Permanent maker space, 600+ annual participants
                </div>
              </div>
            </div>

            <div className={styles.impactCallToAction}>
              <h3>Want to Make a Difference?</h3>
              <p>
                Join our community engagement efforts and help us inspire the next generation 
                of STEM innovators in our community.
              </p>
              <div className={styles.ctaButtons}>
                <Link className="button button--primary" to="/community/volunteer">
                  Volunteer With Us
                </Link>
                <Link className="button button--secondary" to="/community/request">
                  Request a Visit
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityHub;