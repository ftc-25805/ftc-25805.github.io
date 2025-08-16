import React from 'react';
import styles from './styles.module.css';

export interface TeamMemberProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  skills?: string[];
  joinDate?: string;
}

export interface TeamMemberProfileProps {
  member: TeamMemberProfile;
}

export default function TeamMemberProfile({ member }: TeamMemberProfileProps): React.JSX.Element {
  return (
    <div className={styles.memberCard}>
      <div className={styles.photoContainer}>
        {member.photoUrl ? (
          <img 
            src={member.photoUrl} 
            alt={`${member.name} profile photo`}
            className={styles.memberPhoto}
          />
        ) : (
          <div className={styles.placeholderPhoto}>
            <span className={styles.initials}>
              {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
        )}
      </div>
      
      <div className={styles.memberInfo}>
        <h3 className={styles.memberName}>{member.name}</h3>
        <p className={styles.memberRole}>{member.role}</p>
        <p className={styles.memberBio}>{member.bio}</p>
        
        {member.skills && member.skills.length > 0 && (
          <div className={styles.skillsContainer}>
            <h4 className={styles.skillsTitle}>Skills</h4>
            <div className={styles.skillsList}>
              {member.skills.map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {member.joinDate && (
          <p className={styles.joinDate}>
            Team member since: {member.joinDate}
          </p>
        )}
      </div>
    </div>
  );
}