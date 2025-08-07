/**
 * Social Media Hub Component
 * Centralized social media management, scheduling, and analytics dashboard
 */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface SocialMediaAccount {
  id: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin' | 'youtube' | 'tiktok';
  username: string;
  displayName: string;
  followerCount: number;
  isConnected: boolean;
  lastSync: string;
  profileImage?: string;
  verificationStatus: 'verified' | 'unverified' | 'pending';
}

interface SocialMediaPost {
  id: string;
  platform: string;
  content: string;
  media?: {
    type: 'image' | 'video' | 'gif';
    url: string;
    alt?: string;
  }[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledFor?: string;
  publishedAt?: string;
  createdAt: string;
  hashtags: string[];
  mentions: string[];
  analytics?: {
    reach: number;
    impressions: number;
    engagement: number;
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
  engagementRate?: number;
  campaigns: string[];
}

interface SocialMediaCampaign {
  id: string;
  name: string;
  type: 'event_promotion' | 'recruitment' | 'awards' | 'technical_showcase' | 'community_outreach';
  status: 'draft' | 'active' | 'completed' | 'paused';
  startDate: string;
  endDate: string;
  platforms: string[];
  hashtags: string[];
  goals: {
    metric: 'reach' | 'engagement' | 'followers' | 'clicks';
    target: number;
    current: number;
  }[];
  posts: string[];
  budget?: {
    allocated: number;
    spent: number;
  };
}

interface SocialMediaHubProps {
  accounts?: SocialMediaAccount[];
  posts?: SocialMediaPost[];
  campaigns?: SocialMediaCampaign[];
  showAnalytics?: boolean;
  showScheduler?: boolean;
  className?: string;
}

const SocialMediaHub: React.FC<SocialMediaHubProps> = ({
  accounts = [],
  posts = [],
  campaigns = [],
  showAnalytics = true,
  showScheduler = true,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'scheduler' | 'campaigns' | 'analytics'>('dashboard');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [postContent, setPostContent] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  // Calculate social media metrics
  const socialMetrics = React.useMemo(() => {
    const totalFollowers = accounts.reduce((sum, account) => sum + account.followerCount, 0);
    const connectedAccounts = accounts.filter(account => account.isConnected).length;
    const publishedPosts = posts.filter(post => post.status === 'published').length;
    const scheduledPosts = posts.filter(post => post.status === 'scheduled').length;
    const totalEngagement = posts.reduce((sum, post) => sum + (post.analytics?.engagement || 0), 0);
    const avgEngagement = publishedPosts > 0 ? Math.round(totalEngagement / publishedPosts) : 0;
    const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active').length;

    return {
      totalFollowers,
      connectedAccounts,
      publishedPosts,
      scheduledPosts,
      avgEngagement,
      activeCampaigns,
      totalReach: posts.reduce((sum, post) => sum + (post.analytics?.reach || 0), 0)
    };
  }, [accounts, posts, campaigns]);

  // Get platform configuration
  const getPlatformConfig = (platform: string) => {
    const configs = {
      twitter: { icon: '🐦', color: '#1DA1F2', name: 'Twitter', limit: 280 },
      instagram: { icon: '📷', color: '#E4405F', name: 'Instagram', limit: 2200 },
      facebook: { icon: '📘', color: '#4267B2', name: 'Facebook', limit: 63206 },
      linkedin: { icon: '💼', color: '#0077B5', name: 'LinkedIn', limit: 3000 },
      youtube: { icon: '🎥', color: '#FF0000', name: 'YouTube', limit: 5000 },
      tiktok: { icon: '🎵', color: '#000000', name: 'TikTok', limit: 2200 }
    };
    return configs[platform as keyof typeof configs] || { icon: '🔗', color: '#666', name: platform, limit: 1000 };
  };

  // Format number for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Social media metrics display
  const SocialMetrics = () => (
    <div className={styles.socialMetrics}>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>👥</div>
          <div className={styles.metricValue}>{formatNumber(socialMetrics.totalFollowers)}</div>
          <div className={styles.metricLabel}>Total Followers</div>
          <div className={styles.metricDescription}>Across all platforms</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📱</div>
          <div className={styles.metricValue}>{socialMetrics.connectedAccounts}/{accounts.length}</div>
          <div className={styles.metricLabel}>Connected Accounts</div>
          <div className={styles.metricDescription}>Active integrations</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📝</div>
          <div className={styles.metricValue}>{socialMetrics.publishedPosts}</div>
          <div className={styles.metricLabel}>Posts Published</div>
          <div className={styles.metricDescription}>This month</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>⏰</div>
          <div className={styles.metricValue}>{socialMetrics.scheduledPosts}</div>
          <div className={styles.metricLabel}>Scheduled Posts</div>
          <div className={styles.metricDescription}>Upcoming</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📊</div>
          <div className={styles.metricValue}>{formatNumber(socialMetrics.totalReach)}</div>
          <div className={styles.metricLabel}>Total Reach</div>
          <div className={styles.metricDescription}>This month</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🚀</div>
          <div className={styles.metricValue}>{socialMetrics.activeCampaigns}</div>
          <div className={styles.metricLabel}>Active Campaigns</div>
          <div className={styles.metricDescription}>Running now</div>
        </div>
      </div>
    </div>
  );

  // Account connection status
  const AccountCard = ({ account }: { account: SocialMediaAccount }) => {
    const config = getPlatformConfig(account.platform);
    
    return (
      <div className={clsx(styles.accountCard, { [styles.connected]: account.isConnected })}>
        <div className={styles.accountHeader}>
          <div className={styles.accountInfo}>
            <div 
              className={styles.platformIcon}
              style={{ backgroundColor: config.color }}
            >
              {config.icon}
            </div>
            <div className={styles.accountDetails}>
              <h4>{account.displayName}</h4>
              <span className={styles.username}>@{account.username}</span>
            </div>
          </div>
          
          <div className={styles.accountStatus}>
            {account.isConnected ? (
              <span className={styles.connected}>✅ Connected</span>
            ) : (
              <button className={styles.connectButton}>Connect</button>
            )}
          </div>
        </div>
        
        <div className={styles.accountStats}>
          <div className={styles.followerCount}>
            <span className={styles.statNumber}>{formatNumber(account.followerCount)}</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          
          <div className={styles.verificationStatus}>
            {account.verificationStatus === 'verified' && (
              <span className={styles.verified}>✓ Verified</span>
            )}
            {account.verificationStatus === 'pending' && (
              <span className={styles.pending}>⏳ Pending</span>
            )}
          </div>
        </div>
        
        {account.isConnected && (
          <div className={styles.lastSync}>
            Last sync: {new Date(account.lastSync).toLocaleDateString()}
          </div>
        )}
      </div>
    );
  };

  // Post composer
  const PostComposer = () => {
    const remainingChars = selectedAccounts.length > 0 
      ? Math.min(...selectedAccounts.map(id => {
          const account = accounts.find(a => a.id === id);
          const config = getPlatformConfig(account?.platform || '');
          return config.limit - postContent.length;
        }))
      : 280;

    return (
      <div className={styles.postComposer}>
        <div className={styles.composerHeader}>
          <h3>Create New Post</h3>
          <div className={styles.characterCount}>
            <span className={clsx({ [styles.warning]: remainingChars < 50, [styles.danger]: remainingChars < 0 })}>
              {remainingChars} characters remaining
            </span>
          </div>
        </div>
        
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's happening? Share your robotics journey..."
          className={styles.composerTextarea}
          rows={4}
        />
        
        <div className={styles.composerTools}>
          <div className={styles.mediaUpload}>
            <button className={styles.toolButton}>📷 Photo</button>
            <button className={styles.toolButton}>🎥 Video</button>
            <button className={styles.toolButton}>🎬 GIF</button>
          </div>
          
          <div className={styles.hashtagSuggestions}>
            {['#FTC', '#FIRST', '#robotics', '#STEM', '#team25805'].map((tag, index) => (
              <button 
                key={index}
                className={styles.hashtagButton}
                onClick={() => setPostContent(prev => prev + ' ' + tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.platformSelection}>
          <h4>Select Platforms</h4>
          <div className={styles.platformGrid}>
            {accounts.filter(account => account.isConnected).map((account) => {
              const config = getPlatformConfig(account.platform);
              const isSelected = selectedAccounts.includes(account.id);
              
              return (
                <label 
                  key={account.id}
                  className={clsx(styles.platformOption, { [styles.selected]: isSelected })}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAccounts(prev => [...prev, account.id]);
                      } else {
                        setSelectedAccounts(prev => prev.filter(id => id !== account.id));
                      }
                    }}
                  />
                  <div className={styles.platformInfo}>
                    <div 
                      className={styles.platformIcon}
                      style={{ backgroundColor: config.color }}
                    >
                      {config.icon}
                    </div>
                    <span>{config.name}</span>
                    <span className={styles.characterLimit}>
                      {Math.max(0, config.limit - postContent.length)} chars
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
        
        <div className={styles.composerActions}>
          <div className={styles.schedulingOptions}>
            <button className={styles.scheduleButton}>⏰ Schedule</button>
            <button className={styles.draftButton}>💾 Save Draft</button>
          </div>
          <button 
            className={styles.publishButton}
            disabled={!postContent.trim() || selectedAccounts.length === 0}
          >
            📤 Publish Now
          </button>
        </div>
      </div>
    );
  };

  // Post analytics display
  const PostAnalytics = ({ post }: { post: SocialMediaPost }) => {
    if (!post.analytics) return null;
    
    return (
      <div className={styles.postAnalytics}>
        <div className={styles.analyticsGrid}>
          <div className={styles.analyticStat}>
            <span className={styles.statIcon}>👁️</span>
            <span className={styles.statNumber}>{formatNumber(post.analytics.reach)}</span>
            <span className={styles.statLabel}>Reach</span>
          </div>
          <div className={styles.analyticStat}>
            <span className={styles.statIcon}>📊</span>
            <span className={styles.statNumber}>{formatNumber(post.analytics.impressions)}</span>
            <span className={styles.statLabel}>Impressions</span>
          </div>
          <div className={styles.analyticStat}>
            <span className={styles.statIcon}>❤️</span>
            <span className={styles.statNumber}>{formatNumber(post.analytics.likes)}</span>
            <span className={styles.statLabel}>Likes</span>
          </div>
          <div className={styles.analyticStat}>
            <span className={styles.statIcon}>🔄</span>
            <span className={styles.statNumber}>{formatNumber(post.analytics.shares)}</span>
            <span className={styles.statLabel}>Shares</span>
          </div>
          <div className={styles.analyticStat}>
            <span className={styles.statIcon}>💬</span>
            <span className={styles.statNumber}>{formatNumber(post.analytics.comments)}</span>
            <span className={styles.statLabel}>Comments</span>
          </div>
        </div>
        
        <div className={styles.engagementRate}>
          <span className={styles.rateLabel}>Engagement Rate:</span>
          <span className={styles.rateValue}>{post.engagementRate?.toFixed(1) || '0.0'}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(styles.socialMediaHub, className)}>
      {/* Header */}
      <div className={styles.hubHeader}>
        <div className={styles.headerTitle}>
          <h2>Social Media Command Center</h2>
          <p>Manage your digital presence across all platforms from one dashboard</p>
        </div>
        
        <SocialMetrics />
      </div>

      {/* Navigation */}
      <div className={styles.hubNavigation}>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'dashboard' })}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className={styles.tabIcon}>📊</span>
          Dashboard
        </button>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'posts' })}
          onClick={() => setActiveTab('posts')}
        >
          <span className={styles.tabIcon}>📝</span>
          Posts
        </button>
        {showScheduler && (
          <button
            className={clsx(styles.navTab, { [styles.active]: activeTab === 'scheduler' })}
            onClick={() => setActiveTab('scheduler')}
          >
            <span className={styles.tabIcon}>⏰</span>
            Scheduler
          </button>
        )}
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'campaigns' })}
          onClick={() => setActiveTab('campaigns')}
        >
          <span className={styles.tabIcon}>🚀</span>
          Campaigns
        </button>
        {showAnalytics && (
          <button
            className={clsx(styles.navTab, { [styles.active]: activeTab === 'analytics' })}
            onClick={() => setActiveTab('analytics')}
          >
            <span className={styles.tabIcon}>📈</span>
            Analytics
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className={styles.dashboardSection}>
            <div className={styles.dashboardGrid}>
              <div className={styles.accountsOverview}>
                <h3>Connected Accounts</h3>
                <div className={styles.accountsList}>
                  {accounts.map((account) => (
                    <AccountCard key={account.id} account={account} />
                  ))}
                </div>
                
                <div className={styles.addAccountSection}>
                  <h4>Add New Account</h4>
                  <div className={styles.availablePlatforms}>
                    {['twitter', 'instagram', 'facebook', 'linkedin', 'youtube', 'tiktok'].map((platform) => {
                      const config = getPlatformConfig(platform);
                      const hasAccount = accounts.some(acc => acc.platform === platform);
                      
                      return (
                        <button
                          key={platform}
                          className={clsx(styles.platformButton, { [styles.hasAccount]: hasAccount })}
                          disabled={hasAccount}
                        >
                          <span className={styles.platformIcon}>{config.icon}</span>
                          <span>{config.name}</span>
                          {hasAccount && <span className={styles.connectedBadge}>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.recentActivity}>
                <h3>Recent Activity</h3>
                <div className={styles.activityFeed}>
                  {posts
                    .filter(post => post.status === 'published')
                    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
                    .slice(0, 5)
                    .map((post) => {
                      const config = getPlatformConfig(post.platform);
                      
                      return (
                        <div key={post.id} className={styles.activityItem}>
                          <div className={styles.activityIcon} style={{ backgroundColor: config.color }}>
                            {config.icon}
                          </div>
                          <div className={styles.activityContent}>
                            <p className={styles.activityText}>
                              {post.content.substring(0, 100)}
                              {post.content.length > 100 && '...'}
                            </p>
                            <div className={styles.activityMeta}>
                              <span>{config.name}</span>
                              <span>•</span>
                              <span>{new Date(post.publishedAt || '').toLocaleDateString()}</span>
                              {post.analytics && (
                                <>
                                  <span>•</span>
                                  <span>{formatNumber(post.analytics.engagement)} engagement</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className={styles.postsSection}>
            <PostComposer />
            
            <div className={styles.postsHeader}>
              <h3>All Posts</h3>
              <div className={styles.postsFilters}>
                <select 
                  value={selectedPlatform} 
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className={styles.platformFilter}
                >
                  <option value="all">All Platforms</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.platform}>
                      {getPlatformConfig(account.platform).name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.postsGrid}>
              {posts
                .filter(post => selectedPlatform === 'all' || post.platform === selectedPlatform)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((post) => {
                  const config = getPlatformConfig(post.platform);
                  
                  return (
                    <div key={post.id} className={styles.postCard}>
                      <div className={styles.postHeader}>
                        <div className={styles.postPlatform}>
                          <div 
                            className={styles.platformIcon}
                            style={{ backgroundColor: config.color }}
                          >
                            {config.icon}
                          </div>
                          <span>{config.name}</span>
                        </div>
                        
                        <div className={clsx(styles.postStatus, styles[post.status])}>
                          {post.status === 'published' && '✅'}
                          {post.status === 'scheduled' && '⏰'}
                          {post.status === 'draft' && '📝'}
                          {post.status === 'failed' && '❌'}
                          <span>{post.status}</span>
                        </div>
                      </div>
                      
                      <div className={styles.postContent}>
                        <p>{post.content}</p>
                        
                        {post.hashtags.length > 0 && (
                          <div className={styles.postHashtags}>
                            {post.hashtags.map((hashtag, index) => (
                              <span key={index} className={styles.hashtag}>#{hashtag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {post.media && post.media.length > 0 && (
                        <div className={styles.postMedia}>
                          {post.media.map((media, index) => (
                            <div key={index} className={styles.mediaItem}>
                              {media.type === 'image' ? '📷' : '🎥'} {media.type}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className={styles.postMeta}>
                        <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                        {post.publishedAt && (
                          <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>
                        )}
                        {post.scheduledFor && (
                          <span>Scheduled: {new Date(post.scheduledFor).toLocaleDateString()}</span>
                        )}
                      </div>
                      
                      <PostAnalytics post={post} />
                      
                      <div className={styles.postActions}>
                        <button className={styles.editButton}>Edit</button>
                        <button className={styles.duplicateButton}>Duplicate</button>
                        <button className={styles.deleteButton}>Delete</button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Scheduler Tab */}
        {activeTab === 'scheduler' && showScheduler && (
          <div className={styles.schedulerSection}>
            <div className={styles.schedulerHeader}>
              <h3>Content Scheduler</h3>
              <p>Plan and schedule your content for optimal engagement</p>
            </div>
            
            <div className={styles.schedulerCalendar}>
              <div className={styles.calendarHeader}>
                <h4>Content Calendar</h4>
                <div className={styles.calendarControls}>
                  <button className={styles.calendarNav}>← Previous</button>
                  <span className={styles.currentMonth}>November 2024</span>
                  <button className={styles.calendarNav}>Next →</button>
                </div>
              </div>
              
              <div className={styles.calendarGrid}>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const scheduledForDay = posts.filter(post => {
                    if (!post.scheduledFor) return false;
                    return new Date(post.scheduledFor).getDate() === day;
                  });
                  
                  return (
                    <div key={day} className={styles.calendarDay}>
                      <div className={styles.dayNumber}>{day}</div>
                      {scheduledForDay.length > 0 && (
                        <div className={styles.scheduledPosts}>
                          {scheduledForDay.map((post, index) => (
                            <div key={index} className={styles.scheduledPost}>
                              <span className={styles.postPlatform}>
                                {getPlatformConfig(post.platform).icon}
                              </span>
                              <span className={styles.postTime}>
                                {new Date(post.scheduledFor!).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className={styles.optimalTimes}>
              <h4>🎯 Optimal Posting Times</h4>
              <div className={styles.timesGrid}>
                {accounts.filter(acc => acc.isConnected).map((account) => {
                  const config = getPlatformConfig(account.platform);
                  const optimalTimes = {
                    twitter: ['9:00 AM', '2:00 PM', '7:00 PM'],
                    instagram: ['11:00 AM', '1:00 PM', '5:00 PM'],
                    facebook: ['10:00 AM', '3:00 PM', '8:00 PM'],
                    linkedin: ['8:00 AM', '12:00 PM', '5:00 PM'],
                    youtube: ['2:00 PM', '8:00 PM', '9:00 PM'],
                    tiktok: ['6:00 AM', '10:00 AM', '7:00 PM']
                  };
                  
                  return (
                    <div key={account.id} className={styles.platformTimes}>
                      <div className={styles.platformHeader}>
                        <span className={styles.platformIcon} style={{ backgroundColor: config.color }}>
                          {config.icon}
                        </span>
                        <span>{config.name}</span>
                      </div>
                      <div className={styles.timesList}>
                        {(optimalTimes[account.platform as keyof typeof optimalTimes] || []).map((time, index) => (
                          <span key={index} className={styles.timeSlot}>{time}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className={styles.campaignsSection}>
            <div className={styles.campaignsHeader}>
              <h3>Social Media Campaigns</h3>
              <button className={styles.createButton}>
                <span>+</span> Create Campaign
              </button>
            </div>

            <div className={styles.campaignsGrid}>
              {campaigns.map((campaign) => (
                <div key={campaign.id} className={styles.campaignCard}>
                  <div className={styles.campaignHeader}>
                    <div className={styles.campaignInfo}>
                      <h4>{campaign.name}</h4>
                      <span className={styles.campaignType}>{campaign.type.replace(/_/g, ' ')}</span>
                    </div>
                    <span className={clsx(styles.campaignStatus, styles[campaign.status])}>
                      {campaign.status}
                    </span>
                  </div>
                  
                  <div className={styles.campaignDates}>
                    <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
                    <span>→</span>
                    <span>{new Date(campaign.endDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className={styles.campaignPlatforms}>
                    {campaign.platforms.map((platform, index) => {
                      const config = getPlatformConfig(platform);
                      return (
                        <span key={index} className={styles.platformBadge}>
                          {config.icon} {config.name}
                        </span>
                      );
                    })}
                  </div>
                  
                  <div className={styles.campaignGoals}>
                    <h5>Goals Progress</h5>
                    {campaign.goals.map((goal, index) => (
                      <div key={index} className={styles.goalProgress}>
                        <div className={styles.goalHeader}>
                          <span>{goal.metric}</span>
                          <span>{formatNumber(goal.current)} / {formatNumber(goal.target)}</span>
                        </div>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {campaign.budget && (
                    <div className={styles.campaignBudget}>
                      <h5>Budget</h5>
                      <div className={styles.budgetInfo}>
                        <span>Spent: ${campaign.budget.spent}</span>
                        <span>Allocated: ${campaign.budget.allocated}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={styles.campaignActions}>
                    <button className={styles.viewButton}>View Details</button>
                    <button className={styles.editButton}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && showAnalytics && (
          <div className={styles.analyticsSection}>
            <div className={styles.analyticsHeader}>
              <h3>Social Media Analytics</h3>
              <div className={styles.analyticsControls}>
                <select className={styles.timeRange}>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </div>

            <div className={styles.analyticsGrid}>
              <div className={styles.analyticsCard}>
                <h4>📊 Platform Performance</h4>
                <div className={styles.platformPerformance}>
                  {accounts.filter(acc => acc.isConnected).map((account) => {
                    const config = getPlatformConfig(account.platform);
                    const accountPosts = posts.filter(post => post.platform === account.platform && post.analytics);
                    const avgEngagement = accountPosts.length > 0 
                      ? accountPosts.reduce((sum, post) => sum + (post.analytics?.engagement || 0), 0) / accountPosts.length
                      : 0;
                    
                    return (
                      <div key={account.id} className={styles.platformPerformanceItem}>
                        <div className={styles.platformInfo}>
                          <span className={styles.platformIcon} style={{ backgroundColor: config.color }}>
                            {config.icon}
                          </span>
                          <span>{config.name}</span>
                        </div>
                        <div className={styles.performanceStats}>
                          <div className={styles.stat}>
                            <span className={styles.statValue}>{formatNumber(account.followerCount)}</span>
                            <span className={styles.statLabel}>Followers</span>
                          </div>
                          <div className={styles.stat}>
                            <span className={styles.statValue}>{formatNumber(avgEngagement)}</span>
                            <span className={styles.statLabel}>Avg Engagement</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.analyticsCard}>
                <h4>🏆 Top Performing Posts</h4>
                <div className={styles.topPosts}>
                  {posts
                    .filter(post => post.analytics)
                    .sort((a, b) => (b.analytics?.engagement || 0) - (a.analytics?.engagement || 0))
                    .slice(0, 5)
                    .map((post, index) => {
                      const config = getPlatformConfig(post.platform);
                      
                      return (
                        <div key={post.id} className={styles.topPostItem}>
                          <div className={styles.postRank}>{index + 1}</div>
                          <div className={styles.postInfo}>
                            <span className={styles.platformIcon} style={{ backgroundColor: config.color }}>
                              {config.icon}
                            </span>
                            <div className={styles.postDetails}>
                              <span className={styles.postContent}>
                                {post.content.substring(0, 60)}...
                              </span>
                              <span className={styles.postEngagement}>
                                {formatNumber(post.analytics?.engagement || 0)} engagement
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className={styles.analyticsCard}>
                <h4>📈 Engagement Trends</h4>
                <div className={styles.trendChart}>
                  <div className={styles.chartPlaceholder}>
                    <div className={styles.trendLine}>
                      {Array.from({ length: 7 }, (_, i) => (
                        <div 
                          key={i}
                          className={styles.dataPoint}
                          style={{ height: `${Math.random() * 80 + 20}%` }}
                        />
                      ))}
                    </div>
                    <div className={styles.chartLabels}>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <span key={index}>{day}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.analyticsCard}>
                <h4>🎯 Audience Insights</h4>
                <div className={styles.audienceInsights}>
                  <div className={styles.insightItem}>
                    <span className={styles.insightLabel}>Most Active Time:</span>
                    <span className={styles.insightValue}>2:00 PM - 4:00 PM</span>
                  </div>
                  <div className={styles.insightItem}>
                    <span className={styles.insightLabel}>Best Day:</span>
                    <span className={styles.insightValue}>Tuesday</span>
                  </div>
                  <div className={styles.insightItem}>
                    <span className={styles.insightLabel}>Top Hashtag:</span>
                    <span className={styles.insightValue}>#FTC</span>
                  </div>
                  <div className={styles.insightItem}>
                    <span className={styles.insightLabel}>Avg Engagement Rate:</span>
                    <span className={styles.insightValue}>4.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaHub;