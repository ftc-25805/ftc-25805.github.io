import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'competition' | 'build' | 'outreach' | 'award';
  images?: string[];
  status?: 'completed' | 'in-progress' | 'upcoming';
  link?: string;
}

export interface ProgressTimelineProps {
  events: TimelineEvent[];
  title?: string;
  className?: string;
  showImages?: boolean;
  compact?: boolean;
}

const getEventIcon = (type: TimelineEvent['type']): string => {
  switch (type) {
    case 'milestone': return '🎯';
    case 'competition': return '🏆';
    case 'build': return '🔧';
    case 'outreach': return '🤝';
    case 'award': return '🏅';
    default: return '📅';
  }
};

const getEventTypeLabel = (type: TimelineEvent['type']): string => {
  switch (type) {
    case 'milestone': return 'Milestone';
    case 'competition': return 'Competition';
    case 'build': return 'Build';
    case 'outreach': return 'Outreach';
    case 'award': return 'Award';
    default: return 'Event';
  }
};

export default function ProgressTimeline({
  events,
  title = "Team Timeline",
  className,
  showImages = true,
  compact = false
}: ProgressTimelineProps): ReactNode {
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={clsx('ftc-card', styles.timelineContainer, className, {
      [styles.compact]: compact
    })}>
      <h3 className={styles.timelineTitle}>{title}</h3>
      
      <div className={styles.timeline}>
        {sortedEvents.map((event, index) => (
          <div
            key={event.id}
            className={clsx(styles.timelineItem, {
              [styles.completed]: event.status === 'completed',
              [styles.inProgress]: event.status === 'in-progress',
              [styles.upcoming]: event.status === 'upcoming'
            })}
          >
            <div className={styles.timelineMarker}>
              <div className={styles.timelineIcon}>
                {getEventIcon(event.type)}
              </div>
              <div className={styles.timelineDate}>
                {formatDate(event.date)}
              </div>
            </div>
            
            <div className={styles.timelineContent}>
              <div className={styles.eventHeader}>
                <h4 className={styles.eventTitle}>{event.title}</h4>
                <span className={clsx(styles.eventType, styles[`type${event.type.charAt(0).toUpperCase() + event.type.slice(1)}`])}>
                  {getEventTypeLabel(event.type)}
                </span>
              </div>
              
              <p className={styles.eventDescription}>{event.description}</p>
              
              {showImages && event.images && event.images.length > 0 && (
                <div className={styles.eventImages}>
                  {event.images.slice(0, compact ? 2 : 4).map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${event.title} image ${imgIndex + 1}`}
                      className={styles.eventImage}
                      loading="lazy"
                    />
                  ))}
                  {event.images.length > (compact ? 2 : 4) && (
                    <div className={styles.moreImages}>
                      +{event.images.length - (compact ? 2 : 4)} more
                    </div>
                  )}
                </div>
              )}
              
              {event.link && (
                <a
                  href={event.link}
                  className={styles.eventLink}
                  target={event.link.startsWith('http') ? '_blank' : '_self'}
                  rel={event.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  Learn More →
                </a>
              )}
              
              {event.status && (
                <div className={clsx(styles.statusBadge, styles[`status${event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('-', '')}`])}>
                  {event.status.replace('-', ' ').toUpperCase()}
                </div>
              )}
            </div>
            
            {index < sortedEvents.length - 1 && (
              <div className={styles.timelineConnector} />
            )}
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div className={styles.emptyState}>
          <p>No timeline events to display.</p>
        </div>
      )}
    </div>
  );
}