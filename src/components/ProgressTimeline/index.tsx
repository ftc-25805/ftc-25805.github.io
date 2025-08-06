import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'competition' | 'build' | 'outreach' | 'achievement';
  images?: string[];
  status?: 'completed' | 'in-progress' | 'upcoming' | 'cancelled';
  link?: string;
  location?: string;
  participants?: string[];
  details?: string;
}

export interface ProgressTimelineProps {
  events: TimelineEvent[];
  title?: string;
  className?: string;
  showImages?: boolean;
  compact?: boolean;
  layout?: 'vertical' | 'horizontal';
  interactive?: boolean;
}

const getEventIcon = (type: TimelineEvent['type']): string => {
  switch (type) {
    case 'milestone': return '🎯';
    case 'competition': return '🏆';
    case 'build': return '🔧';
    case 'outreach': return '🤝';
    case 'achievement': return '⭐';
    default: return '📅';
  }
};

const getEventTypeLabel = (type: TimelineEvent['type']): string => {
  switch (type) {
    case 'milestone': return 'Milestone';
    case 'competition': return 'Competition';
    case 'build': return 'Build';
    case 'outreach': return 'Outreach';
    case 'achievement': return 'Achievement';
    default: return 'Event';
  }
};

const getStatusIcon = (status: TimelineEvent['status']): string => {
  switch (status) {
    case 'completed': return '✅';
    case 'in-progress': return '🔄';
    case 'upcoming': return '⏳';
    case 'cancelled': return '❌';
    default: return '📅';
  }
};

export default function ProgressTimeline({
  events,
  title = "Team Timeline",
  className,
  showImages = true,
  compact = false,
  layout = 'vertical',
  interactive = true
}: ProgressTimelineProps): ReactNode {
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleEventClick = (eventId: string) => {
    if (interactive) {
      setSelectedEvent(selectedEvent === eventId ? null : eventId);
    }
  };

  return (
    <div className={clsx('ftc-card', styles.timelineContainer, className, {
      [styles.compact]: compact,
      [styles.horizontal]: layout === 'horizontal'
    })}>
      <h3 className={styles.timelineTitle}>{title}</h3>
      
      <div className={clsx(styles.timeline, {
        [styles.timelineHorizontal]: layout === 'horizontal'
      })}>
        {sortedEvents.map((event, index) => (
          <div
            key={event.id}
            className={clsx(styles.timelineItem, {
              [styles.completed]: event.status === 'completed',
              [styles.inProgress]: event.status === 'in-progress',
              [styles.upcoming]: event.status === 'upcoming',
              [styles.cancelled]: event.status === 'cancelled',
              [styles.interactive]: interactive,
              [styles.selected]: selectedEvent === event.id
            })}
            onClick={() => handleEventClick(event.id)}
          >
            <div className={styles.timelineMarker}>
              <div className={styles.timelineIcon}>
                <span className={styles.typeIcon}>{getEventIcon(event.type)}</span>
                {event.status && (
                  <span className={styles.statusIcon}>{getStatusIcon(event.status)}</span>
                )}
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
              
              {event.location && (
                <div className={styles.eventLocation}>
                  📍 {event.location}
                </div>
              )}

              {event.participants && event.participants.length > 0 && (
                <div className={styles.eventParticipants}>
                  👥 {event.participants.join(', ')}
                </div>
              )}
              
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

              {selectedEvent === event.id && event.details && (
                <div className={styles.eventDetails}>
                  <div className={styles.detailsContent}>
                    {event.details}
                  </div>
                </div>
              )}
              
              {event.link && (
                <a
                  href={event.link}
                  className={styles.eventLink}
                  target={event.link.startsWith('http') ? '_blank' : '_self'}
                  rel={event.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={(e) => e.stopPropagation()}
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
          <div className={styles.emptyIcon}>📅</div>
          <p>No timeline events to display</p>
        </div>
      )}
    </div>
  );
}