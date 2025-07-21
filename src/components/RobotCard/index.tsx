import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export interface TechnicalSpecs {
  drivebase: string;
  programming: string;
  sensors: string[];
  specialFeatures: string[];
}

export interface RobotCardProps {
  name: string;
  season: string;
  image: string;
  description: string;
  achievements: string[];
  specs?: TechnicalSpecs;
  buildLogUrl?: string;
  videoUrl?: string;
  className?: string;
}

export default function RobotCard({
  name,
  season,
  image,
  description,
  achievements,
  specs,
  buildLogUrl,
  videoUrl,
  className
}: RobotCardProps): ReactNode {
  return (
    <div className={clsx('ftc-card', styles.robotCard, className)}>
      <div className={styles.robotHeader}>
        <div className={styles.robotImage}>
          <img src={image} alt={`${name} robot`} loading="lazy" />
        </div>
        <div className={styles.robotInfo}>
          <h3 className={styles.robotName}>{name}</h3>
          <div className="ftc-badge ftc-badge--secondary">{season}</div>
        </div>
      </div>

      <div className={styles.robotContent}>
        <p className={styles.robotDescription}>{description}</p>

        {achievements.length > 0 && (
          <div className={styles.achievementsSection}>
            <h4>Achievements</h4>
            <ul className={styles.achievementsList}>
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {specs && (
          <div className={styles.specsSection}>
            <h4>Technical Specifications</h4>
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <strong>Drivebase:</strong> {specs.drivebase}
              </div>
              <div className={styles.specItem}>
                <strong>Programming:</strong> {specs.programming}
              </div>
              <div className={styles.specItem}>
                <strong>Sensors:</strong> {specs.sensors.join(', ')}
              </div>
              {specs.specialFeatures.length > 0 && (
                <div className={styles.specItem}>
                  <strong>Special Features:</strong>
                  <ul className={styles.featuresList}>
                    {specs.specialFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.robotActions}>
        {buildLogUrl && (
          <Link
            to={buildLogUrl}
            className="button button--outline button--primary"
          >
            Build Log
          </Link>
        )}
        {videoUrl && (
          <Link
            to={videoUrl}
            className="button button--outline button--secondary"
          >
            Watch Video
          </Link>
        )}
      </div>
    </div>
  );
}