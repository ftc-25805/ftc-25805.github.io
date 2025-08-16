import React from 'react';
import styles from './styles.module.css';

export interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: number;
  achievements: string[];
  currentPursuit: string;
  photoUrl?: string;
  bio: string;
}

export interface AlumniProfileProps {
  alumni: AlumniProfile;
}

export default function AlumniProfile({ alumni }: AlumniProfileProps): React.JSX.Element {
  return (
    <div className={styles.alumniCard}>
      <div className={styles.alumniHeader}>
        <div className={styles.alumniBadge}>
          <span className={styles.badgeText}>Alumni</span>
        </div>
        <div className={styles.graduationYear}>
          Class of {alumni.graduationYear}
        </div>
      </div>
      
      <div className={styles.photoContainer}>
        {alumni.photoUrl ? (
          <img 
            src={alumni.photoUrl} 
            alt={`${alumni.name} profile photo`}
            className={styles.alumniPhoto}
          />
        ) : (
          <div className={styles.placeholderPhoto}>
            <span className={styles.initials}>
              {alumni.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
        )}
      </div>
      
      <div className={styles.alumniInfo}>
        <h3 className={styles.alumniName}>{alumni.name}</h3>
        <p className={styles.currentPursuit}>{alumni.currentPursuit}</p>
        <p className={styles.alumniBio}>{alumni.bio}</p>
        
        <div className={styles.achievementsContainer}>
          <h4 className={styles.achievementsTitle}>Notable Achievements</h4>
          <ul className={styles.achievementsList}>
            {alumni.achievements.map((achievement, index) => (
              <li key={index} className={styles.achievementItem}>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}