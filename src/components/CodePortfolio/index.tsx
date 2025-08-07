/**
 * Code Portfolio Component
 * Interactive showcase of team's programming achievements with syntax highlighting
 */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  category: 'autonomous' | 'teleop' | 'vision' | 'hardware' | 'utility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  code: string;
  features: string[];
  performance?: {
    metric: string;
    value: string;
    improvement?: string;
  }[];
  documentation?: string;
  repository?: string;
}

interface CodePortfolioProps {
  examples: CodeExample[];
  showCategories?: boolean;
  showDifficulty?: boolean;
  maxExamples?: number;
  className?: string;
}

const CodePortfolio: React.FC<CodePortfolioProps> = ({
  examples,
  showCategories = true,
  showDifficulty = true,
  maxExamples,
  className
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedExample, setSelectedExample] = useState<string>(examples[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter examples based on selections
  const filteredExamples = React.useMemo(() => {
    let filtered = examples;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ex => ex.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(ex => ex.difficulty === selectedDifficulty);
    }

    if (searchQuery) {
      filtered = filtered.filter(ex => 
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return maxExamples ? filtered.slice(0, maxExamples) : filtered;
  }, [examples, selectedCategory, selectedDifficulty, searchQuery, maxExamples]);

  const selectedExampleData = filteredExamples.find(ex => ex.id === selectedExample);

  // Auto-select first example when filters change
  useEffect(() => {
    if (filteredExamples.length > 0 && !filteredExamples.find(ex => ex.id === selectedExample)) {
      setSelectedExample(filteredExamples[0].id);
    }
  }, [filteredExamples, selectedExample]);

  // Category configuration
  const categories = [
    { key: 'all', label: 'All Code', icon: '💻' },
    { key: 'autonomous', label: 'Autonomous', icon: '🤖' },
    { key: 'teleop', label: 'TeleOp', icon: '🎮' },
    { key: 'vision', label: 'Computer Vision', icon: '👁️' },
    { key: 'hardware', label: 'Hardware Control', icon: '⚙️' },
    { key: 'utility', label: 'Utilities', icon: '🔧' }
  ];

  const difficulties = [
    { key: 'all', label: 'All Levels', color: 'var(--ifm-color-emphasis-600)' },
    { key: 'beginner', label: 'Beginner', color: 'var(--ifm-color-success)' },
    { key: 'intermediate', label: 'Intermediate', color: 'var(--ifm-color-warning)' },
    { key: 'advanced', label: 'Advanced', color: 'var(--ifm-color-danger)' }
  ];

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    const diffConfig = difficulties.find(d => d.key === difficulty);
    return diffConfig?.color || 'var(--ifm-color-emphasis-600)';
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const catConfig = categories.find(c => c.key === category);
    return catConfig?.icon || '💻';
  };

  return (
    <div className={clsx(styles.codePortfolio, className)}>
      {/* Header and Controls */}
      <div className={styles.portfolioHeader}>
        <div className={styles.headerTitle}>
          <h2>Code Portfolio</h2>
          <p>Showcasing our programming excellence and innovative solutions</p>
        </div>
        
        <div className={styles.headerStats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{examples.length}</span>
            <span className={styles.statLabel}>Code Examples</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {new Set(examples.map(ex => ex.language)).size}
            </span>
            <span className={styles.statLabel}>Languages</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {examples.filter(ex => ex.performance).length}
            </span>
            <span className={styles.statLabel}>With Metrics</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.portfolioControls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search code examples..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        {showCategories && (
          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category.key}
                className={clsx(styles.filterButton, {
                  [styles.active]: selectedCategory === category.key
                })}
                onClick={() => setSelectedCategory(category.key)}
              >
                <span className={styles.filterIcon}>{category.icon}</span>
                <span className={styles.filterLabel}>{category.label}</span>
              </button>
            ))}
          </div>
        )}

        {showDifficulty && (
          <div className={styles.difficultyFilters}>
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.key}
                className={clsx(styles.difficultyButton, {
                  [styles.active]: selectedDifficulty === difficulty.key
                })}
                onClick={() => setSelectedDifficulty(difficulty.key)}
                style={{ '--difficulty-color': difficulty.color } as React.CSSProperties}
              >
                {difficulty.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
        <div className={styles.resultsInfo}>
          Showing {filteredExamples.length} of {examples.length} code examples
          {searchQuery && <span> for "{searchQuery}"</span>}
        </div>
      )}

      {/* Main Content */}
      <div className={styles.portfolioContent}>
        {/* Code List */}
        <div className={styles.codeList}>
          {filteredExamples.map((example) => (
            <div
              key={example.id}
              className={clsx(styles.codeCard, {
                [styles.selected]: selectedExample === example.id
              })}
              onClick={() => setSelectedExample(example.id)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.categoryIcon}>
                    {getCategoryIcon(example.category)}
                  </span>
                  <h3>{example.title}</h3>
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.language}>{example.language}</span>
                  <span 
                    className={styles.difficulty}
                    style={{ color: getDifficultyColor(example.difficulty) }}
                  >
                    {example.difficulty}
                  </span>
                </div>
              </div>
              
              <p className={styles.cardDescription}>{example.description}</p>
              
              <div className={styles.cardFeatures}>
                {example.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className={styles.featureTag}>
                    {feature}
                  </span>
                ))}
                {example.features.length > 3 && (
                  <span className={styles.featureCount}>
                    +{example.features.length - 3} more
                  </span>
                )}
              </div>

              {example.performance && (
                <div className={styles.cardPerformance}>
                  <span className={styles.performanceIcon}>📈</span>
                  <span className={styles.performanceText}>
                    {example.performance[0]?.metric}: {example.performance[0]?.value}
                  </span>
                </div>
              )}
            </div>
          ))}

          {filteredExamples.length === 0 && (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>No code examples found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Code Details */}
        {selectedExampleData && (
          <div className={styles.codeDetails}>
            <div className={styles.detailsHeader}>
              <div className={styles.detailsTitle}>
                <span className={styles.titleIcon}>
                  {getCategoryIcon(selectedExampleData.category)}
                </span>
                <h3>{selectedExampleData.title}</h3>
                <span 
                  className={styles.detailsDifficulty}
                  style={{ color: getDifficultyColor(selectedExampleData.difficulty) }}
                >
                  {selectedExampleData.difficulty}
                </span>
              </div>
              
              <div className={styles.detailsMeta}>
                <span className={styles.detailsLanguage}>
                  {selectedExampleData.language}
                </span>
                {selectedExampleData.repository && (
                  <a
                    href={selectedExampleData.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repoLink}
                  >
                    <span className={styles.repoIcon}>📁</span>
                    View Repository
                  </a>
                )}
              </div>
            </div>

            <p className={styles.detailsDescription}>
              {selectedExampleData.description}
            </p>

            {/* Features */}
            <div className={styles.detailsSection}>
              <h4>🚀 Key Features</h4>
              <div className={styles.featuresList}>
                {selectedExampleData.features.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>
                    <span className={styles.featureBullet}>▸</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            {selectedExampleData.performance && (
              <div className={styles.detailsSection}>
                <h4>📊 Performance Metrics</h4>
                <div className={styles.performanceMetrics}>
                  {selectedExampleData.performance.map((metric, index) => (
                    <div key={index} className={styles.metricItem}>
                      <span className={styles.metricName}>{metric.metric}</span>
                      <span className={styles.metricValue}>{metric.value}</span>
                      {metric.improvement && (
                        <span className={styles.metricImprovement}>
                          +{metric.improvement} improvement
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Block */}
            <div className={styles.detailsSection}>
              <h4>💻 Source Code</h4>
              <div className={styles.codeContainer}>
                <CodeBlock
                  language={selectedExampleData.language.toLowerCase()}
                  title={`${selectedExampleData.title}.${selectedExampleData.language === 'Java' ? 'java' : 'py'}`}
                  showLineNumbers
                >
                  {selectedExampleData.code}
                </CodeBlock>
              </div>
            </div>

            {/* Documentation */}
            {selectedExampleData.documentation && (
              <div className={styles.detailsSection}>
                <h4>📚 Documentation</h4>
                <div className={styles.documentationContent}>
                  {selectedExampleData.documentation}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePortfolio;