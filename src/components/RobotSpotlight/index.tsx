import React from 'react';
import styles from './styles.module.css';

export interface RobotSpotlightProps {
    robotName?: string;
    robotImage?: string;
    description?: string;
}

export default function RobotSpotlight({
    robotName = "Competition Bot 2024",
    robotImage = "/img/robot-placeholder.png",
    description = "Our latest competition robot featuring advanced autonomous navigation, precision scoring mechanisms, and innovative engineering solutions designed for the current FTC season."
}: RobotSpotlightProps): React.JSX.Element {
    return (
        <div className={styles.robotSpotlight}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img
                        src={robotImage}
                        alt={robotName}
                        className={styles.robotImage}
                        width={200}
                        height={200}
                        loading="lazy"
                    />
                </div>
                <div className={styles.textContent}>
                    <h3 className={styles.robotName}>{robotName}</h3>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.specs}>
                        <div className={styles.spec}>
                            <span className={styles.specLabel}>Drive System:</span>
                            <span className={styles.specValue}>Tank</span>
                        </div>
                        <div className={styles.spec}>
                            <span className={styles.specLabel}>Programming:</span>
                            <span className={styles.specValue}>Java & Blocks</span>
                        </div>
                        <div className={styles.spec}>
                            <span className={styles.specLabel}>Control Hub:</span>
                            <span className={styles.specValue}>REV Control Hub</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
