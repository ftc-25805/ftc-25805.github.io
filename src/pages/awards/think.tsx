/**
 * Think Award Evidence Page
 * Comprehensive documentation of engineering design process and technical excellence
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { getAwardEvidence } from '@site/src/data/awards';
import EnhancedCard from '@site/src/components/EnhancedCard';
import styles from './think.module.css';

const ThinkAward: React.FC = () => {
  const [selectedIteration, setSelectedIteration] = useState(0);
  const evidence = getAwardEvidence('think');
  const { criteria, designIterations, achievements, testResults } = evidence;

  // Design process visualization component
  const DesignProcessFlow = () => (
    <div className={styles.processFlow}>
      <div className={styles.processSteps}>
        {[
          { step: '1', title: 'Problem Identification', description: 'Analyze game challenges and constraints' },
          { step: '2', title: 'Research & Ideation', description: 'Brainstorm solutions and research approaches' },
          { step: '3', title: 'Concept Design', description: 'Create initial design concepts and evaluate trade-offs' },
          { step: '4', title: 'Prototyping', description: 'Build and test proof-of-concept mechanisms' },
          { step: '5', title: 'Testing & Analysis', description: 'Collect data and analyze performance' },
          { step: '6', title: 'Iteration', description: 'Refine design based on test results' },
          { step: '7', title: 'Implementation', description: 'Build final version with quality materials' },
          { step: '8', title: 'Validation', description: 'Comprehensive testing and competition readiness' }
        ].map((process, index) => (
          <div key={index} className={styles.processStep}>
            <div className={styles.stepNumber}>{process.step}</div>
            <div className={styles.stepContent}>
              <h4>{process.title}</h4>
              <p>{process.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Design iteration detailed view
  const IterationDetails = ({ iteration }) => (
    <div className={styles.iterationDetails}>
      <div className={styles.iterationHeader}>
        <div className={styles.iterationMeta}>
          <h3>{iteration.title}</h3>
          <span className={styles.iterationDate}>
            {new Date(iteration.date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className={styles.iterationContent}>
        <div className={styles.challengeSection}>
          <h4>🎯 Challenge</h4>
          <p>{iteration.challenge}</p>
        </div>

        <div className={styles.solutionSection}>
          <h4>💡 Solution</h4>
          <p>{iteration.solution}</p>
        </div>

        <div className={styles.resultsSection}>
          <h4>📊 Results</h4>
          <p>{iteration.results}</p>
        </div>

        {iteration.testData && iteration.testData.length > 0 && (
          <div className={styles.testDataSection}>
            <h4>🧪 Test Data</h4>
            {iteration.testData.map((test, index) => (
              <div key={index} className={styles.testResult}>
                <h5>{test.testName}</h5>
                <div className={styles.testMeta}>
                  <span>Date: {new Date(test.date).toLocaleDateString()}</span>
                </div>
                
                <div className={styles.testParameters}>
                  <strong>Parameters:</strong>
                  <ul>
                    {Object.entries(test.parameters).map(([key, value]) => (
                      <li key={key}>
                        {key.replace(/_/g, ' ')}: {Array.isArray(value) ? value.join(', ') : String(value)}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.testResults}>
                  <strong>Results:</strong>
                  <ul>
                    {Object.entries(test.results).map(([key, value]) => (
                      <li key={key}>
                        {key.replace(/_/g, ' ')}: {typeof value === 'number' && value < 1 ? (value * 100).toFixed(1) + '%' : String(value)}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.testConclusion}>
                  <strong>Conclusion:</strong> {test.conclusion}
                </div>
              </div>
            ))}
          </div>
        )}

        {iteration.cadModels && (
          <div className={styles.cadSection}>
            <h4>🔧 CAD Models</h4>
            <div className={styles.cadLinks}>
              {iteration.cadModels.map((model, index) => (
                <a 
                  key={index}
                  href={model}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cadLink}
                >
                  View Interactive 3D Model →
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout
      title="Think Award Evidence"
      description="Comprehensive documentation of FTC Team 25805's engineering design process, showcasing systematic problem-solving and iterative development approach."
    >
      <div className={styles.thinkAwardPage}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.awardBadge}>
                <span className={styles.awardIcon}>🧠</span>
                <div>
                  <h1>Think Award</h1>
                  <p>Engineering Design Process Excellence</p>
                </div>
                <div className={styles.achievedBadge}>Achieved 2024</div>
              </div>
              
              <blockquote className={styles.heroQuote}>
                "{criteria.description}"
              </blockquote>
            </div>
          </div>
        </header>

        {/* Award Criteria */}
        <section className={styles.criteriaSection}>
          <div className="container">
            <Heading as="h2">Award Criteria & Our Evidence</Heading>
            
            <div className={styles.criteriaGrid}>
              {criteria.keyPoints.map((point, index) => (
                <EnhancedCard key={index} variant="outlined" className={styles.criteriaCard}>
                  <div className={styles.criteriaNumber}>{index + 1}</div>
                  <h3>{point}</h3>
                  <div className={styles.evidenceIndicator}>
                    <span className={styles.checkmark}>✅</span>
                    <span>Documented with evidence</span>
                  </div>
                </EnhancedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className={styles.processSection}>
          <div className="container">
            <Heading as="h2">Our Engineering Design Process</Heading>
            <p className={styles.sectionDescription}>
              We follow a systematic, iterative approach to robot development that emphasizes 
              continuous improvement and data-driven decision making.
            </p>
            
            <DesignProcessFlow />
          </div>
        </section>

        {/* Design Iterations */}
        <section className={styles.iterationsSection}>
          <div className="container">
            <Heading as="h2">Design Iterations & Evidence</Heading>
            <p className={styles.sectionDescription}>
              Each iteration represents a complete cycle of problem-solving, 
              with detailed documentation of challenges, solutions, and results.
            </p>
            
            <div className={styles.iterationTabs}>
              {designIterations.map((iteration, index) => (
                <button
                  key={index}
                  className={clsx(styles.iterationTab, {
                    [styles.active]: selectedIteration === index
                  })}
                  onClick={() => setSelectedIteration(index)}
                >
                  <div className={styles.tabContent}>
                    <span className={styles.tabTitle}>{iteration.title}</span>
                    <span className={styles.tabDate}>
                      {new Date(iteration.date).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            {designIterations[selectedIteration] && (
              <IterationDetails iteration={designIterations[selectedIteration]} />
            )}
          </div>
        </section>

        {/* Technical Excellence Metrics */}
        <section className={styles.metricsSection}>
          <div className="container">
            <Heading as="h2">Technical Excellence Metrics</Heading>
            
            <div className={styles.metricsGrid}>
              <EnhancedCard variant="glass" className={styles.metricCard}>
                <div className={styles.metricIcon}>📝</div>
                <div className={styles.metricValue}>147</div>
                <div className={styles.metricLabel}>Engineering Notebook Pages</div>
              </EnhancedCard>
              
              <EnhancedCard variant="glass" className={styles.metricCard}>
                <div className={styles.metricIcon}>🔄</div>
                <div className={styles.metricValue}>{designIterations.length}</div>
                <div className={styles.metricLabel}>Major Design Iterations</div>
              </EnhancedCard>
              
              <EnhancedCard variant="glass" className={styles.metricCard}>
                <div className={styles.metricIcon}>🧪</div>
                <div className={styles.metricValue}>{testResults?.length || 0}</div>
                <div className={styles.metricLabel}>Documented Test Results</div>
              </EnhancedCard>
              
              <EnhancedCard variant="glass" className={styles.metricCard}>
                <div className={styles.metricIcon}>⏱️</div>
                <div className={styles.metricValue}>95%</div>
                <div className={styles.metricLabel}>Final Design Success Rate</div>
              </EnhancedCard>
            </div>
          </div>
        </section>

        {/* Innovation Highlights */}
        <section className={styles.innovationSection}>
          <div className="container">
            <Heading as="h2">Innovation & Creative Problem Solving</Heading>
            
            <div className={styles.innovationGrid}>
              <EnhancedCard variant="elevated" className={styles.innovationCard}>
                <h3>🎯 Precision Intake System</h3>
                <p>
                  Developed a novel dual-stage intake mechanism that improved game piece 
                  acquisition success rate from 67% to 95% through innovative use of 
                  compliant materials and active positioning.
                </p>
                <div className={styles.innovationMetrics}>
                  <span>28% improvement</span> over previous design
                </div>
              </EnhancedCard>
              
              <EnhancedCard variant="elevated" className={styles.innovationCard}>
                <h3>🤖 Adaptive Autonomous</h3>
                <p>
                  Implemented sensor fusion approach combining AprilTags, IMU, and 
                  encoder data for robust field navigation that adapts to field 
                  variations and alliance partner positions.
                </p>
                <div className={styles.innovationMetrics}>
                  <span>92% success rate</span> across all field positions
                </div>
              </EnhancedCard>
              
              <EnhancedCard variant="elevated" className={styles.innovationCard}>
                <h3>⚙️ Modular Design Philosophy</h3>
                <p>
                  Created a modular robot architecture allowing rapid mechanism 
                  swapping and testing. Reduced iteration time from 3 days to 4 hours.
                </p>
                <div className={styles.innovationMetrics}>
                  <span>82% faster</span> iteration cycles
                </div>
              </EnhancedCard>
            </div>
          </div>
        </section>

        {/* Documentation Access */}
        <section className={styles.documentationSection}>
          <div className="container">
            <Heading as="h2">Complete Documentation</Heading>
            
            <div className={styles.docGrid}>
              <EnhancedCard variant="outlined" className={styles.docCard} clickable>
                <div className={styles.docIcon}>📚</div>
                <h3>Engineering Notebook</h3>
                <p>Complete 147-page engineering notebook with detailed design process documentation</p>
                <div className={styles.docMeta}>PDF • 23.4 MB</div>
              </EnhancedCard>
              
              <EnhancedCard variant="outlined" className={styles.docCard} clickable>
                <div className={styles.docIcon}>🔧</div>
                <h3>CAD Models</h3>
                <p>Interactive 3D models showing design evolution and final robot assembly</p>
                <div className={styles.docMeta}>OnShape • Interactive</div>
              </EnhancedCard>
              
              <EnhancedCard variant="outlined" className={styles.docCard} clickable>
                <div className={styles.docIcon}>📊</div>
                <h3>Test Data Archive</h3>
                <p>Complete testing data with analysis, graphs, and performance metrics</p>
                <div className={styles.docMeta}>Spreadsheet • Charts</div>
              </EnhancedCard>
              
              <EnhancedCard variant="outlined" className={styles.docCard} clickable>
                <div className={styles.docIcon}>🎥</div>
                <h3>Build Process Videos</h3>
                <p>Time-lapse videos showing construction process and testing sessions</p>
                <div className={styles.docMeta}>Video • 45 min</div>
              </EnhancedCard>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.callToAction}>
          <div className="container">
            <div className={styles.ctaContent}>
              <Heading as="h2">Engineering Excellence Continues</Heading>
              <p>
                Our Think Award achievement represents just the beginning of our 
                commitment to engineering excellence and systematic problem-solving.
              </p>
              
              <div className={styles.ctaButtons}>
                <Link className="button button--primary button--lg" to="/awards/inspire">
                  View Inspire Award Evidence
                </Link>
                <Link className="button button--secondary button--lg" to="/seasons/2024-25">
                  See Current Season
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ThinkAward;