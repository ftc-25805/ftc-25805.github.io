/**
 * Performance Dashboard Component
 * Interactive analytics dashboard for team and robot performance metrics
 */

import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface MatchData {
  id: string;
  event: string;
  matchType: 'qualification' | 'semifinal' | 'final';
  matchNumber: number;
  date: string;
  alliance: 'red' | 'blue';
  position: 1 | 2;
  score: {
    auto: number;
    teleop: number;
    endgame: number;
    penalty: number;
    total: number;
  };
  allianceScore: number;
  won: boolean;
  ranking?: number;
}

interface SeasonStats {
  totalMatches: number;
  winRate: number;
  avgScore: number;
  avgRanking: number;
  highestScore: number;
  bestRanking: number;
  autoSuccessRate: number;
  endgameSuccessRate: number;
}

interface TrendData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface PerformanceDashboardProps {
  matches?: MatchData[];
  seasonStats?: SeasonStats;
  className?: string;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  matches = [],
  seasonStats,
  className
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'score' | 'auto' | 'teleop' | 'endgame'>('score');
  const [timeRange, setTimeRange] = useState<'all' | 'recent' | 'season'>('season');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter matches based on time range
  const filteredMatches = useMemo(() => {
    const now = new Date();
    const filterDate = new Date();
    
    switch (timeRange) {
      case 'recent':
        filterDate.setDate(now.getDate() - 30); // Last 30 days
        return matches.filter(match => new Date(match.date) >= filterDate);
      case 'season':
        filterDate.setMonth(now.getMonth() - 6); // Current season (6 months)
        return matches.filter(match => new Date(match.date) >= filterDate);
      default:
        return matches;
    }
  }, [matches, timeRange]);

  // Calculate trend data
  const trendData: TrendData[] = useMemo(() => {
    if (filteredMatches.length < 2) return [];

    const recentMatches = filteredMatches.slice(-5);
    const olderMatches = filteredMatches.slice(-10, -5);

    const calculateAverage = (matches: MatchData[], metric: keyof MatchData['score'] | 'total') => {
      if (matches.length === 0) return 0;
      return matches.reduce((sum, match) => sum + (match.score[metric as keyof MatchData['score']] || match.score.total), 0) / matches.length;
    };

    const metrics = [
      { key: 'total', label: 'Total Score' },
      { key: 'auto', label: 'Autonomous' },
      { key: 'teleop', label: 'TeleOp' },
      { key: 'endgame', label: 'Endgame' }
    ];

    return metrics.map(({ key, label }) => {
      const recentAvg = calculateAverage(recentMatches, key as keyof MatchData['score']);
      const olderAvg = calculateAverage(olderMatches, key as keyof MatchData['score']);
      const change = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;
      
      return {
        label,
        value: Math.round(recentAvg),
        change: Math.round(change * 10) / 10,
        trend: change > 5 ? 'up' : change < -5 ? 'down' : 'stable'
      };
    });
  }, [filteredMatches]);

  // Chart data for selected metric
  const chartData = useMemo(() => {
    return filteredMatches.slice(-10).map((match, index) => ({
      x: index,
      y: selectedMetric === 'score' ? match.score.total : match.score[selectedMetric],
      label: `Match ${match.matchNumber}`,
      date: match.date,
      won: match.won
    }));
  }, [filteredMatches, selectedMetric]);

  // Performance rings component
  const PerformanceRing = ({ 
    value, 
    maxValue, 
    label, 
    color, 
    size = 120 
  }: { 
    value: number; 
    maxValue: number; 
    label: string; 
    color: string; 
    size?: number; 
  }) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={styles.performanceRing}>
        <div className={styles.ringContainer} style={{ width: size, height: size }}>
          <svg width={size} height={size} className={styles.ringSvg}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="var(--ifm-color-emphasis-300)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={isAnimated ? strokeDashoffset : circumference}
              strokeLinecap="round"
              className={styles.progressCircle}
            />
          </svg>
          <div className={styles.ringValue}>
            <span className={styles.ringNumber}>{value}</span>
            <span className={styles.ringMax}>/{maxValue}</span>
          </div>
        </div>
        <span className={styles.ringLabel}>{label}</span>
      </div>
    );
  };

  // Trend indicator component
  const TrendIndicator = ({ trend, change }: { trend: string; change: number }) => (
    <div className={clsx(styles.trendIndicator, styles[trend])}>
      <span className={styles.trendIcon}>
        {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
      </span>
      <span className={styles.trendValue}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
  );

  // Mini chart component
  const MiniChart = ({ data }: { data: typeof chartData }) => {
    if (data.length < 2) return <div className={styles.noData}>Not enough data</div>;

    const maxY = Math.max(...data.map(d => d.y));
    const minY = Math.min(...data.map(d => d.y));
    const range = maxY - minY || 1;

    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 200;
      const y = 60 - ((point.y - minY) / range) * 60;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className={styles.chartContainer}>
        <svg width="200" height="80" className={styles.miniChart}>
          <polyline
            points={points}
            stroke="var(--ifm-color-primary)"
            strokeWidth="2"
            fill="none"
            className={styles.chartLine}
          />
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 200;
            const y = 60 - ((point.y - minY) / range) * 60;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill={point.won ? 'var(--ifm-color-success)' : 'var(--ifm-color-danger)'}
                className={styles.chartPoint}
              />
            );
          })}
        </svg>
        <div className={styles.chartLabels}>
          <span>Min: {minY}</span>
          <span>Max: {maxY}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(styles.performanceDashboard, className)}>
      {/* Header Controls */}
      <div className={styles.dashboardHeader}>
        <div className={styles.headerTitle}>
          <h2>Performance Analytics</h2>
          <p>Real-time insights into team performance and match data</p>
        </div>
        
        <div className={styles.headerControls}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className={styles.timeRangeSelect}
          >
            <option value="season">This Season</option>
            <option value="recent">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={styles.metricsSection}>
        <h3>Key Performance Indicators</h3>
        
        {seasonStats && (
          <div className={styles.metricsGrid}>
            <PerformanceRing
              value={seasonStats.totalMatches}
              maxValue={50}
              label="Matches Played"
              color="var(--ifm-color-primary)"
            />
            <PerformanceRing
              value={Math.round(seasonStats.winRate)}
              maxValue={100}
              label="Win Rate %"
              color="var(--ifm-color-success)"
            />
            <PerformanceRing
              value={seasonStats.avgScore}
              maxValue={200}
              label="Avg Score"
              color="var(--ifm-color-warning)"
            />
            <PerformanceRing
              value={seasonStats.bestRanking}
              maxValue={20}
              label="Best Ranking"
              color="var(--ifm-color-info)"
            />
          </div>
        )}
      </div>

      {/* Performance Trends */}
      <div className={styles.trendsSection}>
        <h3>Performance Trends</h3>
        
        <div className={styles.trendsGrid}>
          {trendData.map((trend, index) => (
            <div key={index} className={styles.trendCard}>
              <div className={styles.trendHeader}>
                <span className={styles.trendLabel}>{trend.label}</span>
                <TrendIndicator trend={trend.trend} change={trend.change} />
              </div>
              <div className={styles.trendValue}>{trend.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h3>Match Performance Over Time</h3>
          
          <div className={styles.metricSelector}>
            {[
              { key: 'score', label: 'Total Score' },
              { key: 'auto', label: 'Autonomous' },
              { key: 'teleop', label: 'TeleOp' },
              { key: 'endgame', label: 'Endgame' }
            ].map(({ key, label }) => (
              <button
                key={key}
                className={clsx(styles.metricButton, {
                  [styles.active]: selectedMetric === key
                })}
                onClick={() => setSelectedMetric(key as typeof selectedMetric)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.chartContent}>
          <MiniChart data={chartData} />
        </div>
      </div>

      {/* Recent Matches */}
      <div className={styles.matchesSection}>
        <h3>Recent Match Results</h3>
        
        <div className={styles.matchesList}>
          {filteredMatches.slice(-5).reverse().map((match) => (
            <div key={match.id} className={clsx(styles.matchCard, {
              [styles.won]: match.won,
              [styles.lost]: !match.won
            })}>
              <div className={styles.matchHeader}>
                <div className={styles.matchInfo}>
                  <span className={styles.matchTitle}>
                    {match.event} - Match {match.matchNumber}
                  </span>
                  <span className={styles.matchDate}>
                    {new Date(match.date).toLocaleDateString()}
                  </span>
                </div>
                <div className={styles.matchResult}>
                  <span className={styles.resultIcon}>
                    {match.won ? '🏆' : '📊'}
                  </span>
                  <span className={styles.resultText}>
                    {match.won ? 'Won' : 'Lost'}
                  </span>
                </div>
              </div>
              
              <div className={styles.matchScores}>
                <div className={styles.scoreBreakdown}>
                  <div className={styles.scoreItem}>
                    <span className={styles.scoreLabel}>Auto</span>
                    <span className={styles.scoreValue}>{match.score.auto}</span>
                  </div>
                  <div className={styles.scoreItem}>
                    <span className={styles.scoreLabel}>TeleOp</span>
                    <span className={styles.scoreValue}>{match.score.teleop}</span>
                  </div>
                  <div className={styles.scoreItem}>
                    <span className={styles.scoreLabel}>Endgame</span>
                    <span className={styles.scoreValue}>{match.score.endgame}</span>
                  </div>
                  <div className={styles.scoreItem}>
                    <span className={styles.scoreLabel}>Total</span>
                    <span className={styles.scoreTotalValue}>{match.score.total}</span>
                  </div>
                </div>
              </div>
              
              {match.ranking && (
                <div className={styles.matchRanking}>
                  Ranking: #{match.ranking}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      {seasonStats && (
        <div className={styles.summarySection}>
          <h3>Season Summary</h3>
          
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>🎯</div>
              <div className={styles.summaryContent}>
                <div className={styles.summaryValue}>{seasonStats.autoSuccessRate}%</div>
                <div className={styles.summaryLabel}>Autonomous Success Rate</div>
              </div>
            </div>
            
            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>🏁</div>
              <div className={styles.summaryContent}>
                <div className={styles.summaryValue}>{seasonStats.endgameSuccessRate}%</div>
                <div className={styles.summaryLabel}>Endgame Success Rate</div>
              </div>
            </div>
            
            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>📊</div>
              <div className={styles.summaryContent}>
                <div className={styles.summaryValue}>{seasonStats.highestScore}</div>
                <div className={styles.summaryLabel}>Highest Single Match Score</div>
              </div>
            </div>
            
            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>⭐</div>
              <div className={styles.summaryContent}>
                <div className={styles.summaryValue}>#{seasonStats.bestRanking}</div>
                <div className={styles.summaryLabel}>Best Event Ranking</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;