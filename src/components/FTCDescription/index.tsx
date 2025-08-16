import React from 'react';
import styles from './styles.module.css';

export interface FTCDescriptionProps {
  title?: string;
  subtitle?: string;
}

export default function FTCDescription({ 
  title = "What is FIRST Tech Challenge?",
  subtitle = "More than robots, building the future"
}: FTCDescriptionProps): React.JSX.Element {
  return (
    <div className={styles.ftcDescription}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        
        <div className={styles.description}>
          <p>
            FIRST Tech Challenge (FTC) is a robotics competition for students in grades 7-12. 
            Teams design, build, and program robots to compete in head-to-head challenges in a 
            sport-like atmosphere while developing STEM skills and practicing engineering principles.
          </p>
        </div>
        
        <div className={styles.highlights}>
          <div className={styles.highlight}>
            <div className={styles.icon}>🤖</div>
            <div className={styles.highlightText}>
              <h4>Robot Design</h4>
              <p>Build and program autonomous robots using Java, Blocks, or OnBot Java</p>
            </div>
          </div>
          
          <div className={styles.highlight}>
            <div className={styles.icon}>🏆</div>
            <div className={styles.highlightText}>
              <h4>Competition</h4>
              <p>Compete in regional, state, and world championship tournaments</p>
            </div>
          </div>
          
          <div className={styles.highlight}>
            <div className={styles.icon}>🤝</div>
            <div className={styles.highlightText}>
              <h4>Community Impact</h4>
              <p>Engage in outreach projects that positively impact local communities</p>
            </div>
          </div>
        </div>
        
        <div className={styles.coreValues}>
          <h4 className={styles.valuesTitle}>FIRST Core Values</h4>
          <div className={styles.values}>
            <span className={styles.value}>Gracious Professionalism</span>
            <span className={styles.value}>Coopertition</span>
            <span className={styles.value}>Discovery</span>
            <span className={styles.value}>Innovation</span>
            <span className={styles.value}>Impact</span>
            <span className={styles.value}>Inclusion</span>
            <span className={styles.value}>Teamwork</span>
            <span className={styles.value}>Fun</span>
          </div>
        </div>
      </div>
    </div>
  );
}