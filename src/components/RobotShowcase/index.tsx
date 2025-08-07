/**
 * Robot Showcase Component
 * Interactive display of robot technical specifications, features, and performance metrics
 */

import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface RobotSpecification {
  category: string;
  specs: {
    name: string;
    value: string;
    unit?: string;
    description?: string;
  }[];
}

interface RobotFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  specifications: string[];
  advantages: string[];
  testResults?: {
    metric: string;
    value: string;
    improvement?: string;
  }[];
}

interface RobotShowcaseProps {
  robotName: string;
  robotImage?: string;
  specifications: RobotSpecification[];
  features: RobotFeature[];
  performanceMetrics?: {
    autonomous: number;
    teleop: number;
    endgame: number;
    overall: number;
  };
  className?: string;
}

const RobotShowcase: React.FC<RobotShowcaseProps> = ({
  robotName,
  robotImage,
  specifications,
  features,
  performanceMetrics,
  className
}) => {
  const [selectedFeature, setSelectedFeature] = useState<string>(features[0]?.id || '');
  const [activeView, setActiveView] = useState<'overview' | 'features' | 'specs' | 'performance'>('overview');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (robotImage && imageRef.current) {
      imageRef.current.onload = () => setIsImageLoaded(true);
    }
  }, [robotImage]);

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  // Performance visualization component
  const PerformanceRing = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div className={styles.performanceRing}>
      <div className={styles.ringContainer}>
        <svg className={styles.ring} width="120" height="120">
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="var(--ifm-color-emphasis-300)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - value / 100)}`}
            strokeLinecap="round"
            className={styles.progressCircle}
          />
        </svg>
        <div className={styles.ringValue}>
          <span className={styles.percentage}>{value}%</span>
        </div>
      </div>
      <span className={styles.ringLabel}>{label}</span>
    </div>
  );

  return (
    <div className={clsx(styles.robotShowcase, className)}>
      {/* Navigation Tabs */}
      <div className={styles.showcaseNav}>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeView === 'overview' })}
          onClick={() => setActiveView('overview')}
        >
          <span className={styles.tabIcon}>🤖</span>
          Overview
        </button>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeView === 'features' })}
          onClick={() => setActiveView('features')}
        >
          <span className={styles.tabIcon}>⚙️</span>
          Features
        </button>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeView === 'specs' })}
          onClick={() => setActiveView('specs')}
        >
          <span className={styles.tabIcon}>📊</span>
          Specifications
        </button>
        {performanceMetrics && (
          <button
            className={clsx(styles.navTab, { [styles.active]: activeView === 'performance' })}
            onClick={() => setActiveView('performance')}
          >
            <span className={styles.tabIcon}>📈</span>
            Performance
          </button>
        )}
      </div>

      {/* Content Areas */}
      <div className={styles.showcaseContent}>
        {/* Overview */}
        {activeView === 'overview' && (
          <div className={styles.overviewSection}>
            <div className={styles.overviewGrid}>
              <div className={styles.robotImageSection}>
                {robotImage ? (
                  <div className={styles.imageContainer}>
                    <img
                      ref={imageRef}
                      src={robotImage}
                      alt={`${robotName} robot`}
                      className={clsx(styles.robotImage, { [styles.loaded]: isImageLoaded })}
                    />
                    {!isImageLoaded && (
                      <div className={styles.imagePlaceholder}>
                        <div className={styles.loadingIcon}>🤖</div>
                        <span>Loading {robotName}...</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <div className={styles.robotIcon}>🤖</div>
                    <h3>{robotName}</h3>
                  </div>
                )}
              </div>
              
              <div className={styles.quickStats}>
                <h3>Quick Stats</h3>
                <div className={styles.statsList}>
                  {specifications.slice(0, 2).map((category, catIndex) => (
                    category.specs.slice(0, 3).map((spec, specIndex) => (
                      <div key={`${catIndex}-${specIndex}`} className={styles.quickStat}>
                        <span className={styles.statLabel}>{spec.name}</span>
                        <span className={styles.statValue}>
                          {spec.value} {spec.unit && <small>{spec.unit}</small>}
                        </span>
                      </div>
                    ))
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className={styles.featureHighlights}>
              <h3>Key Features</h3>
              <div className={styles.highlightGrid}>
                {features.slice(0, 4).map((feature) => (
                  <div key={feature.id} className={styles.highlightCard}>
                    <div className={styles.highlightIcon}>{feature.icon}</div>
                    <h4>{feature.name}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Detail */}
        {activeView === 'features' && (
          <div className={styles.featuresSection}>
            <div className={styles.featuresGrid}>
              <div className={styles.featuresList}>
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    className={clsx(styles.featureTab, {
                      [styles.active]: selectedFeature === feature.id
                    })}
                    onClick={() => setSelectedFeature(feature.id)}
                  >
                    <span className={styles.featureIcon}>{feature.icon}</span>
                    <div className={styles.featureTabContent}>
                      <span className={styles.featureName}>{feature.name}</span>
                      <span className={styles.featureDesc}>{feature.description}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className={styles.featureDetails}>
                {selectedFeatureData && (
                  <>
                    <div className={styles.featureHeader}>
                      <div className={styles.featureTitle}>
                        <span className={styles.titleIcon}>{selectedFeatureData.icon}</span>
                        <h3>{selectedFeatureData.name}</h3>
                      </div>
                      <p className={styles.featureDescription}>
                        {selectedFeatureData.description}
                      </p>
                    </div>

                    <div className={styles.featureContent}>
                      <div className={styles.featureSection}>
                        <h4>🔧 Technical Specifications</h4>
                        <ul className={styles.specsList}>
                          {selectedFeatureData.specifications.map((spec, index) => (
                            <li key={index}>{spec}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.featureSection}>
                        <h4>⚡ Advantages</h4>
                        <ul className={styles.advantagesList}>
                          {selectedFeatureData.advantages.map((advantage, index) => (
                            <li key={index}>{advantage}</li>
                          ))}
                        </ul>
                      </div>

                      {selectedFeatureData.testResults && (
                        <div className={styles.featureSection}>
                          <h4>📊 Test Results</h4>
                          <div className={styles.testResults}>
                            {selectedFeatureData.testResults.map((result, index) => (
                              <div key={index} className={styles.testResult}>
                                <span className={styles.testMetric}>{result.metric}</span>
                                <span className={styles.testValue}>{result.value}</span>
                                {result.improvement && (
                                  <span className={styles.testImprovement}>
                                    +{result.improvement} improvement
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Specifications */}
        {activeView === 'specs' && (
          <div className={styles.specificationsSection}>
            <div className={styles.specsGrid}>
              {specifications.map((category, index) => (
                <div key={index} className={styles.specCategory}>
                  <h3 className={styles.categoryTitle}>{category.category}</h3>
                  <div className={styles.specsTable}>
                    {category.specs.map((spec, specIndex) => (
                      <div key={specIndex} className={styles.specRow}>
                        <div className={styles.specName}>
                          {spec.name}
                          {spec.description && (
                            <span className={styles.specTooltip} title={spec.description}>
                              ℹ️
                            </span>
                          )}
                        </div>
                        <div className={styles.specValue}>
                          {spec.value}
                          {spec.unit && <span className={styles.specUnit}> {spec.unit}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance */}
        {activeView === 'performance' && performanceMetrics && (
          <div className={styles.performanceSection}>
            <div className={styles.performanceHeader}>
              <h3>Robot Performance Metrics</h3>
              <p>Competition performance data based on match analysis and testing</p>
            </div>

            <div className={styles.performanceGrid}>
              <PerformanceRing 
                value={performanceMetrics.autonomous} 
                label="Autonomous" 
                color="var(--ifm-color-primary)" 
              />
              <PerformanceRing 
                value={performanceMetrics.teleop} 
                label="TeleOp" 
                color="var(--ifm-color-success)" 
              />
              <PerformanceRing 
                value={performanceMetrics.endgame} 
                label="Endgame" 
                color="var(--ifm-color-warning)" 
              />
              <PerformanceRing 
                value={performanceMetrics.overall} 
                label="Overall" 
                color="var(--ifm-color-info)" 
              />
            </div>

            <div className={styles.performanceDetails}>
              <div className={styles.performanceCard}>
                <h4>🎯 Autonomous Performance</h4>
                <p>
                  Consistent {performanceMetrics.autonomous}% success rate in autonomous period 
                  with advanced path planning and sensor fusion.
                </p>
              </div>
              <div className={styles.performanceCard}>
                <h4>🎮 TeleOp Excellence</h4>
                <p>
                  {performanceMetrics.teleop}% efficiency during driver-controlled period 
                  through optimized control systems and driver training.
                </p>
              </div>
              <div className={styles.performanceCard}>
                <h4>🏁 Endgame Mastery</h4>
                <p>
                  {performanceMetrics.endgame}% endgame completion rate with reliable 
                  mechanisms and strategic positioning.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RobotShowcase;