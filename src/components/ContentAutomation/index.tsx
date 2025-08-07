/**
 * Content Automation Dashboard Component
 * Automated content generation and publishing workflow management
 */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface ContentTemplate {
  id: string;
  name: string;
  type: 'social' | 'blog' | 'newsletter' | 'award' | 'sponsor' | 'event';
  category: 'achievement' | 'event' | 'technical' | 'community' | 'sponsor';
  description: string;
  variables: {
    name: string;
    type: 'text' | 'number' | 'date' | 'select' | 'image' | 'list';
    required: boolean;
    options?: string[];
    placeholder?: string;
  }[];
  template: string;
  platforms: string[];
  tags: string[];
  schedule?: {
    enabled: boolean;
    timing: 'immediate' | 'optimal' | 'custom';
    customTime?: string;
  };
}

interface GeneratedContent {
  id: string;
  templateId: string;
  title: string;
  content: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  createdAt: string;
  scheduledFor?: string;
  publishedAt?: string;
  engagement?: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
  tags: string[];
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: 'match_result' | 'event_completion' | 'award_received' | 'milestone' | 'schedule';
  conditions: {
    field: string;
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
    value: string;
  }[];
  actions: {
    templateId: string;
    platforms: string[];
    schedule: string;
  }[];
  enabled: boolean;
  lastTriggered?: string;
  triggerCount: number;
}

interface ContentAutomationProps {
  templates?: ContentTemplate[];
  generatedContent?: GeneratedContent[];
  automationRules?: AutomationRule[];
  showAnalytics?: boolean;
  className?: string;
}

const ContentAutomation: React.FC<ContentAutomationProps> = ({
  templates = [],
  generatedContent = [],
  automationRules = [],
  showAnalytics = true,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'generated' | 'automation' | 'analytics'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [templateVariables, setTemplateVariables] = useState<Record<string, any>>({});
  const [previewContent, setPreviewContent] = useState<string>('');

  // Calculate automation metrics
  const automationMetrics = React.useMemo(() => {
    const activeRules = automationRules.filter(rule => rule.enabled).length;
    const totalTriggers = automationRules.reduce((sum, rule) => sum + rule.triggerCount, 0);
    const publishedContent = generatedContent.filter(content => content.status === 'published').length;
    const scheduledContent = generatedContent.filter(content => content.status === 'scheduled').length;
    const totalEngagement = generatedContent.reduce((sum, content) => {
      if (content.engagement) {
        return sum + content.engagement.views + content.engagement.likes + content.engagement.shares;
      }
      return sum;
    }, 0);

    return {
      activeRules,
      totalTriggers,
      publishedContent,
      scheduledContent,
      totalEngagement,
      avgEngagement: publishedContent > 0 ? Math.round(totalEngagement / publishedContent) : 0
    };
  }, [automationRules, generatedContent]);

  // Generate content preview
  useEffect(() => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (template && Object.keys(templateVariables).length > 0) {
      let preview = template.template;
      template.variables.forEach(variable => {
        const value = templateVariables[variable.name] || `{${variable.name}}`;
        preview = preview.replace(new RegExp(`\\{${variable.name}\\}`, 'g'), String(value));
      });
      setPreviewContent(preview);
    } else {
      setPreviewContent('');
    }
  }, [selectedTemplate, templateVariables, templates]);

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    const icons = {
      twitter: '🐦',
      instagram: '📷',
      facebook: '📘',
      linkedin: '💼',
      youtube: '🎥',
      website: '🌐',
      newsletter: '📧',
      blog: '📝'
    };
    return icons[platform.toLowerCase() as keyof typeof icons] || '🔗';
  };

  // Get status styling
  const getStatusStyling = (status: string) => {
    const styles = {
      draft: { color: '#6c757d', icon: '📝' },
      scheduled: { color: '#ffc107', icon: '⏰' },
      published: { color: '#28a745', icon: '✅' },
      archived: { color: '#dc3545', icon: '🗄️' }
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  // Automation metrics display
  const AutomationMetrics = () => (
    <div className={styles.automationMetrics}>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🤖</div>
          <div className={styles.metricValue}>{automationMetrics.activeRules}</div>
          <div className={styles.metricLabel}>Active Rules</div>
          <div className={styles.metricDescription}>Automation workflows</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>⚡</div>
          <div className={styles.metricValue}>{automationMetrics.totalTriggers}</div>
          <div className={styles.metricLabel}>Total Triggers</div>
          <div className={styles.metricDescription}>This month</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📝</div>
          <div className={styles.metricValue}>{automationMetrics.publishedContent}</div>
          <div className={styles.metricLabel}>Published Content</div>
          <div className={styles.metricDescription}>This month</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>⏰</div>
          <div className={styles.metricValue}>{automationMetrics.scheduledContent}</div>
          <div className={styles.metricLabel}>Scheduled Posts</div>
          <div className={styles.metricDescription}>Upcoming</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📊</div>
          <div className={styles.metricValue}>{(automationMetrics.totalEngagement / 1000).toFixed(1)}K</div>
          <div className={styles.metricLabel}>Total Engagement</div>
          <div className={styles.metricDescription}>All platforms</div>
        </div>
      </div>
    </div>
  );

  // Template variable input
  const VariableInput = ({ variable, value, onChange }: { 
    variable: ContentTemplate['variables'][0]; 
    value: any; 
    onChange: (value: any) => void; 
  }) => {
    switch (variable.type) {
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={styles.variableInput}
            required={variable.required}
          >
            <option value="">Select {variable.name}</option>
            {variable.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={styles.variableInput}
            required={variable.required}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={variable.placeholder}
            className={styles.variableInput}
            required={variable.required}
          />
        );
      case 'list':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value.split(',').map(item => item.trim()))}
            placeholder={variable.placeholder || 'Enter items separated by commas'}
            className={clsx(styles.variableInput, styles.textArea)}
            required={variable.required}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={variable.placeholder}
            className={styles.variableInput}
            required={variable.required}
          />
        );
    }
  };

  return (
    <div className={clsx(styles.contentAutomation, className)}>
      {/* Header */}
      <div className={styles.automationHeader}>
        <div className={styles.headerTitle}>
          <h2>Content Automation Center</h2>
          <p>Streamline content creation and social media management</p>
        </div>
        
        <AutomationMetrics />
      </div>

      {/* Navigation */}
      <div className={styles.automationNavigation}>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'templates' })}
          onClick={() => setActiveTab('templates')}
        >
          <span className={styles.tabIcon}>📄</span>
          Content Templates
        </button>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'generated' })}
          onClick={() => setActiveTab('generated')}
        >
          <span className={styles.tabIcon}>📝</span>
          Generated Content
        </button>
        <button
          className={clsx(styles.navTab, { [styles.active]: activeTab === 'automation' })}
          onClick={() => setActiveTab('automation')}
        >
          <span className={styles.tabIcon}>🤖</span>
          Automation Rules
        </button>
        {showAnalytics && (
          <button
            className={clsx(styles.navTab, { [styles.active]: activeTab === 'analytics' })}
            onClick={() => setActiveTab('analytics')}
          >
            <span className={styles.tabIcon}>📊</span>
            Analytics
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className={styles.templatesSection}>
            <div className={styles.templatesGrid}>
              <div className={styles.templatesList}>
                <div className={styles.templatesHeader}>
                  <h3>Content Templates</h3>
                  <button className={styles.createButton}>
                    <span>+</span> Create Template
                  </button>
                </div>
                
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={clsx(styles.templateCard, {
                      [styles.selected]: selectedTemplate === template.id
                    })}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className={styles.templateHeader}>
                      <div className={styles.templateInfo}>
                        <h4>{template.name}</h4>
                        <span className={styles.templateType}>{template.type}</span>
                      </div>
                      <span className={styles.templateCategory}>{template.category}</span>
                    </div>
                    
                    <p className={styles.templateDescription}>{template.description}</p>
                    
                    <div className={styles.templatePlatforms}>
                      {template.platforms.map((platform, index) => (
                        <span key={index} className={styles.platformBadge}>
                          {getPlatformIcon(platform)} {platform}
                        </span>
                      ))}
                    </div>
                    
                    <div className={styles.templateTags}>
                      {template.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className={styles.tagBadge}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Template Editor */}
              {selectedTemplate && (
                <div className={styles.templateEditor}>
                  {(() => {
                    const template = templates.find(t => t.id === selectedTemplate);
                    if (!template) return null;

                    return (
                      <>
                        <div className={styles.editorHeader}>
                          <h3>{template.name}</h3>
                          <div className={styles.editorActions}>
                            <button className={styles.previewButton}>Preview</button>
                            <button className={styles.generateButton}>Generate Content</button>
                          </div>
                        </div>

                        <div className={styles.editorContent}>
                          <div className={styles.variablesSection}>
                            <h4>Template Variables</h4>
                            <div className={styles.variablesGrid}>
                              {template.variables.map((variable, index) => (
                                <div key={index} className={styles.variableGroup}>
                                  <label className={styles.variableLabel}>
                                    {variable.name}
                                    {variable.required && <span className={styles.required}>*</span>}
                                  </label>
                                  <VariableInput
                                    variable={variable}
                                    value={templateVariables[variable.name]}
                                    onChange={(value) => setTemplateVariables(prev => ({
                                      ...prev,
                                      [variable.name]: value
                                    }))}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {previewContent && (
                            <div className={styles.previewSection}>
                              <h4>Content Preview</h4>
                              <div className={styles.contentPreview}>
                                {previewContent.split('\n').map((line, index) => (
                                  <p key={index}>{line}</p>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className={styles.publishingOptions}>
                            <h4>Publishing Options</h4>
                            <div className={styles.platformSelection}>
                              <h5>Target Platforms</h5>
                              <div className={styles.platformGrid}>
                                {template.platforms.map((platform, index) => (
                                  <label key={index} className={styles.platformOption}>
                                    <input type="checkbox" defaultChecked />
                                    <span>{getPlatformIcon(platform)} {platform}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className={styles.schedulingOptions}>
                              <h5>Scheduling</h5>
                              <div className={styles.scheduleGrid}>
                                <label className={styles.scheduleOption}>
                                  <input type="radio" name="schedule" value="immediate" defaultChecked />
                                  <span>Publish Immediately</span>
                                </label>
                                <label className={styles.scheduleOption}>
                                  <input type="radio" name="schedule" value="optimal" />
                                  <span>Optimal Time</span>
                                </label>
                                <label className={styles.scheduleOption}>
                                  <input type="radio" name="schedule" value="custom" />
                                  <span>Custom Time</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Generated Content Tab */}
        {activeTab === 'generated' && (
          <div className={styles.generatedSection}>
            <div className={styles.generatedHeader}>
              <h3>Generated Content</h3>
              <div className={styles.contentFilters}>
                <select className={styles.statusFilter}>
                  <option value="">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                <select className={styles.platformFilter}>
                  <option value="">All Platforms</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </div>

            <div className={styles.contentGrid}>
              {generatedContent.map((content) => {
                const statusStyling = getStatusStyling(content.status);
                
                return (
                  <div key={content.id} className={styles.contentCard}>
                    <div className={styles.contentCardHeader}>
                      <div className={styles.contentTitle}>
                        <h4>{content.title}</h4>
                        <span 
                          className={styles.contentStatus}
                          style={{ color: statusStyling.color }}
                        >
                          {statusStyling.icon} {content.status}
                        </span>
                      </div>
                      <div className={styles.contentDate}>
                        {new Date(content.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className={styles.contentBody}>
                      <p className={styles.contentText}>
                        {content.content.substring(0, 200)}
                        {content.content.length > 200 && '...'}
                      </p>
                    </div>

                    <div className={styles.contentPlatforms}>
                      {content.platforms.map((platform, index) => (
                        <span key={index} className={styles.platformBadge}>
                          {getPlatformIcon(platform)}
                        </span>
                      ))}
                    </div>

                    {content.engagement && (
                      <div className={styles.contentEngagement}>
                        <div className={styles.engagementStats}>
                          <span>👁️ {content.engagement.views}</span>
                          <span>❤️ {content.engagement.likes}</span>
                          <span>🔄 {content.engagement.shares}</span>
                          <span>💬 {content.engagement.comments}</span>
                        </div>
                      </div>
                    )}

                    <div className={styles.contentTags}>
                      {content.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className={styles.tagBadge}>#{tag}</span>
                      ))}
                    </div>

                    <div className={styles.contentActions}>
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

        {/* Automation Rules Tab */}
        {activeTab === 'automation' && (
          <div className={styles.automationSection}>
            <div className={styles.automationHeader}>
              <h3>Automation Rules</h3>
              <button className={styles.createButton}>
                <span>+</span> Create Rule
              </button>
            </div>

            <div className={styles.rulesGrid}>
              {automationRules.map((rule) => (
                <div key={rule.id} className={styles.ruleCard}>
                  <div className={styles.ruleHeader}>
                    <div className={styles.ruleInfo}>
                      <h4>{rule.name}</h4>
                      <span className={clsx(styles.ruleStatus, {
                        [styles.enabled]: rule.enabled,
                        [styles.disabled]: !rule.enabled
                      })}>
                        {rule.enabled ? '✅ Enabled' : '⏸️ Disabled'}
                      </span>
                    </div>
                    
                    <button className={styles.toggleButton}>
                      {rule.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>

                  <div className={styles.ruleDetails}>
                    <div className={styles.triggerInfo}>
                      <h5>Trigger</h5>
                      <p>{rule.trigger.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                    </div>

                    <div className={styles.conditionsInfo}>
                      <h5>Conditions</h5>
                      <ul>
                        {rule.conditions.map((condition, index) => (
                          <li key={index}>
                            {condition.field} {condition.operator} "{condition.value}"
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.actionsInfo}>
                      <h5>Actions</h5>
                      <ul>
                        {rule.actions.map((action, index) => (
                          <li key={index}>
                            Generate content using template and publish to {action.platforms.join(', ')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.ruleStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{rule.triggerCount}</span>
                      <span className={styles.statLabel}>Times Triggered</span>
                    </div>
                    {rule.lastTriggered && (
                      <div className={styles.statItem}>
                        <span className={styles.statValue}>
                          {new Date(rule.lastTriggered).toLocaleDateString()}
                        </span>
                        <span className={styles.statLabel}>Last Triggered</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.ruleActions}>
                    <button className={styles.editButton}>Edit Rule</button>
                    <button className={styles.testButton}>Test Rule</button>
                    <button className={styles.deleteButton}>Delete</button>
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
              <h3>Content Performance Analytics</h3>
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
                <h4>📊 Engagement Overview</h4>
                <div className={styles.engagementChart}>
                  <div className={styles.chartPlaceholder}>
                    <div className={styles.chartBars}>
                      <div className={styles.chartBar} style={{ height: '60%' }}>
                        <span>Views</span>
                        <span>1.2K</span>
                      </div>
                      <div className={styles.chartBar} style={{ height: '40%' }}>
                        <span>Likes</span>
                        <span>485</span>
                      </div>
                      <div className={styles.chartBar} style={{ height: '30%' }}>
                        <span>Shares</span>
                        <span>142</span>
                      </div>
                      <div className={styles.chartBar} style={{ height: '20%' }}>
                        <span>Comments</span>
                        <span>67</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.analyticsCard}>
                <h4>🎯 Top Performing Content</h4>
                <div className={styles.topContent}>
                  {generatedContent
                    .filter(c => c.engagement)
                    .sort((a, b) => {
                      const aTotal = (a.engagement?.views || 0) + (a.engagement?.likes || 0);
                      const bTotal = (b.engagement?.views || 0) + (b.engagement?.likes || 0);
                      return bTotal - aTotal;
                    })
                    .slice(0, 5)
                    .map((content, index) => (
                      <div key={content.id} className={styles.topContentItem}>
                        <div className={styles.contentRank}>{index + 1}</div>
                        <div className={styles.contentInfo}>
                          <span className={styles.contentTitle}>{content.title}</span>
                          <span className={styles.contentEngagement}>
                            {(content.engagement?.views || 0) + (content.engagement?.likes || 0)} total engagement
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className={styles.analyticsCard}>
                <h4>📱 Platform Performance</h4>
                <div className={styles.platformStats}>
                  {['twitter', 'instagram', 'facebook', 'linkedin'].map((platform) => (
                    <div key={platform} className={styles.platformStat}>
                      <div className={styles.platformHeader}>
                        <span>{getPlatformIcon(platform)}</span>
                        <span>{platform}</span>
                      </div>
                      <div className={styles.platformMetrics}>
                        <div className={styles.metric}>
                          <span className={styles.metricValue}>
                            {Math.floor(Math.random() * 1000)}
                          </span>
                          <span className={styles.metricLabel}>Avg Engagement</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.analyticsCard}>
                <h4>⏱️ Optimal Posting Times</h4>
                <div className={styles.optimalTimes}>
                  <div className={styles.timeSlot}>
                    <span className={styles.timeHour}>9 AM</span>
                    <span className={styles.timeDay}>Monday - Friday</span>
                    <span className={styles.timeEngagement}>High Engagement</span>
                  </div>
                  <div className={styles.timeSlot}>
                    <span className={styles.timeHour}>2 PM</span>
                    <span className={styles.timeDay}>Tuesday - Thursday</span>
                    <span className={styles.timeEngagement}>Peak Engagement</span>
                  </div>
                  <div className={styles.timeSlot}>
                    <span className={styles.timeHour}>7 PM</span>
                    <span className={styles.timeDay}>Weekends</span>
                    <span className={styles.timeEngagement}>Good Engagement</span>
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

export default ContentAutomation;