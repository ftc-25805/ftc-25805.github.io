import React from 'react';
import styles from './styles.module.css';

export interface MentorProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl?: string;
  expertise: string[];
  yearsWithTeam: number;
}

export interface TeamMentorProfileProps {
  mentor: MentorProfile;
}

export default function TeamMentorProfile({ mentor }: TeamMentorProfileProps): React.JSX.Element {
  return (
    <div className={styles.mentorCard}>
      <div className={styles.mentorBadge}>
        <span className={styles.badgeText}>Mentor</span>
      </div>
      
      <div className={styles.photoContainer}>
        {mentor.photoUrl ? (
          <img 
            src={mentor.photoUrl} 
            alt={`${mentor.name} profile photo`}
            className={styles.mentorPhoto}
          />
        ) : (
          <div className={styles.placeholderPhoto}>
            <span className={styles.initials}>
              {mentor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
        )}
      </div>
      
      <div className={styles.mentorInfo}>
        <h3 className={styles.mentorName}>{mentor.name}</h3>
        <p className={styles.mentorTitle}>{mentor.title}</p>
        <p className={styles.mentorBio}>{mentor.bio}</p>
        
        <div className={styles.expertiseContainer}>
          <h4 className={styles.expertiseTitle}>Areas of Expertise</h4>
          <div className={styles.expertiseList}>
            {mentor.expertise.map((area, index) => (
              <span key={index} className={styles.expertiseTag}>
                {area}
              </span>
            ))}
          </div>
        </div>
        
        <div className={styles.experienceContainer}>
          <span className={styles.experienceText}>
            {mentor.yearsWithTeam} {mentor.yearsWithTeam === 1 ? 'year' : 'years'} with the team
          </span>
        </div>
      </div>
    </div>
  );
}