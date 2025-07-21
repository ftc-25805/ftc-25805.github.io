import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
  portfolio?: string;
}

export interface TeamMemberProps {
  name: string;
  role: string;
  grade: number;
  bio: string;
  image?: string;
  specialties: string[];
  social?: SocialLinks;
  isLead?: boolean;
  className?: string;
}

export default function TeamMember({
  name,
  role,
  grade,
  bio,
  image,
  specialties,
  social,
  isLead = false,
  className
}: TeamMemberProps): ReactNode {
  const defaultImage = '/img/team-placeholder.svg';
  const memberImage = image || defaultImage;

  return (
    <div className={clsx('ftc-card', styles.memberCard, className, {
      [styles.memberCardLead]: isLead
    })}>
      <div className={styles.memberHeader}>
        <div className={styles.memberImage}>
          <img src={memberImage} alt={`${name} profile`} loading="lazy" />
          {isLead && <div className={styles.leadBadge}>Team Lead</div>}
        </div>
        <div className={styles.memberInfo}>
          <h3 className={styles.memberName}>{name}</h3>
          <div className={styles.memberRole}>{role}</div>
          <div className={styles.memberGrade}>Grade {grade}</div>
        </div>
      </div>

      <div className={styles.memberContent}>
        <p className={styles.memberBio}>{bio}</p>

        {specialties.length > 0 && (
          <div className={styles.specialtiesSection}>
            <h4>Specialties</h4>
            <div className={styles.specialtiesTags}>
              {specialties.map((specialty, index) => (
                <span key={index} className="ftc-badge ftc-badge--accent">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {social && Object.keys(social).length > 0 && (
          <div className={styles.socialSection}>
            <h4>Connect</h4>
            <div className={styles.socialLinks}>
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`${name}'s GitHub profile`}
                >
                  GitHub
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`${name}'s LinkedIn profile`}
                >
                  LinkedIn
                </a>
              )}
              {social.portfolio && (
                <a
                  href={social.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`${name}'s portfolio`}
                >
                  Portfolio
                </a>
              )}
              {social.email && (
                <a
                  href={`mailto:${social.email}`}
                  className={styles.socialLink}
                  aria-label={`Email ${name}`}
                >
                  Email
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}