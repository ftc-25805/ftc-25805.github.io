/**
 * Social Sharing Component
 * Optimized sharing for robotics content with mobile-friendly interface
 */

import React, { useState } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SocialShareProps {
  title?: string;
  description?: string;
  image?: string;
  hashtags?: string[];
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'buttons' | 'dropdown' | 'floating';
}

interface SharePlatform {
  name: string;
  icon: string;
  color: string;
  getUrl: (data: ShareData) => string;
  ariaLabel: string;
}

interface ShareData {
  url: string;
  title: string;
  description: string;
  hashtags: string;
  image?: string;
}

const sharePlatforms: SharePlatform[] = [
  {
    name: 'Twitter',
    icon: '🐦',
    color: '#1DA1F2',
    ariaLabel: 'Share on Twitter',
    getUrl: (data) => 
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.title)}&hashtags=${encodeURIComponent(data.hashtags)}`,
  },
  {
    name: 'Facebook',
    icon: '📘',
    color: '#4267B2',
    ariaLabel: 'Share on Facebook',
    getUrl: (data) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}&quote=${encodeURIComponent(data.title + ' - ' + data.description)}`,
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0e76a8',
    ariaLabel: 'Share on LinkedIn',
    getUrl: (data) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}&title=${encodeURIComponent(data.title)}&summary=${encodeURIComponent(data.description)}`,
  },
  {
    name: 'Reddit',
    icon: '🤖',
    color: '#FF5700',
    ariaLabel: 'Share on Reddit',
    getUrl: (data) => 
      `https://www.reddit.com/submit?url=${encodeURIComponent(data.url)}&title=${encodeURIComponent(data.title)}`,
  },
  {
    name: 'WhatsApp',
    icon: '💬',
    color: '#25D366',
    ariaLabel: 'Share on WhatsApp',
    getUrl: (data) => 
      `https://wa.me/?text=${encodeURIComponent(data.title + ' - ' + data.url)}`,
  },
  {
    name: 'Telegram',
    icon: '✈️',
    color: '#0088cc',
    ariaLabel: 'Share on Telegram',
    getUrl: (data) => 
      `https://t.me/share/url?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.title)}`,
  },
];

export default function SocialShare({
  title,
  description,
  image,
  hashtags = ['FTC', 'Robotics', 'STEM', 'FTC25805'],
  className,
  size = 'medium',
  variant = 'buttons',
}: SocialShareProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();

  const shareData: ShareData = {
    url: `${siteConfig.url}${location.pathname}`,
    title: title || siteConfig.title,
    description: description || siteConfig.tagline,
    hashtags: hashtags.join(','),
    image: image ? `${siteConfig.url}${image}` : undefined,
  };

  const handleShare = async (platform: SharePlatform) => {
    // Check if Web Share API is available (mobile)
    if (navigator.share && platform.name === 'Native') {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: shareData.url,
        });
        return;
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }

    // Fallback to URL sharing
    const shareUrl = platform.getUrl(shareData);
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'share', {
        method: platform.name.toLowerCase(),
        content_type: 'page',
        content_id: location.pathname,
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
      
      // Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'share', {
          method: 'copy_link',
          content_type: 'page',
          content_id: location.pathname,
        });
      }
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const renderButton = (platform: SharePlatform, index: number) => (
    <button
      key={platform.name}
      onClick={() => handleShare(platform)}
      className={clsx(styles.shareButton, styles[size])}
      style={{
        '--platform-color': platform.color,
        '--delay': `${index * 0.1}s`,
      } as React.CSSProperties}
      aria-label={platform.ariaLabel}
      title={platform.ariaLabel}
    >
      <span className={styles.shareIcon} role="img" aria-hidden="true">
        {platform.icon}
      </span>
      {size === 'large' && (
        <span className={styles.shareLabel}>{platform.name}</span>
      )}
    </button>
  );

  if (variant === 'dropdown') {
    return (
      <div className={clsx(styles.shareDropdown, className)}>
        <button
          className={clsx(styles.shareToggle, styles[size])}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Share this page"
          aria-expanded={isOpen}
        >
          <span className={styles.shareIcon} role="img" aria-hidden="true">
            📤
          </span>
          Share
        </button>
        
        {isOpen && (
          <div className={styles.shareDropdownContent}>
            {sharePlatforms.map((platform, index) => renderButton(platform, index))}
            
            <button
              onClick={handleCopyLink}
              className={clsx(styles.shareButton, styles[size], {
                [styles.copied]: copiedToClipboard,
              })}
              aria-label="Copy link to clipboard"
            >
              <span className={styles.shareIcon} role="img" aria-hidden="true">
                {copiedToClipboard ? '✅' : '🔗'}
              </span>
              {copiedToClipboard ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className={clsx(styles.shareFloating, className)}>
        <button
          className={styles.shareFloatingToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Share this page"
          aria-expanded={isOpen}
        >
          <span className={styles.shareIcon} role="img" aria-hidden="true">
            📤
          </span>
        </button>
        
        {isOpen && (
          <div className={styles.shareFloatingContent}>
            {sharePlatforms.slice(0, 4).map((platform, index) => (
              <button
                key={platform.name}
                onClick={() => handleShare(platform)}
                className={styles.shareFloatingButton}
                style={{
                  '--platform-color': platform.color,
                  '--delay': `${index * 0.1}s`,
                } as React.CSSProperties}
                aria-label={platform.ariaLabel}
                title={platform.ariaLabel}
              >
                <span className={styles.shareIcon} role="img" aria-hidden="true">
                  {platform.icon}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default buttons variant
  return (
    <div className={clsx(styles.shareContainer, styles[size], className)}>
      <span className={styles.shareLabel}>Share this page:</span>
      <div className={styles.shareButtons}>
        {sharePlatforms.map((platform, index) => renderButton(platform, index))}
        
        <button
          onClick={handleCopyLink}
          className={clsx(styles.shareButton, styles[size], {
            [styles.copied]: copiedToClipboard,
          })}
          aria-label="Copy link to clipboard"
          title="Copy link to clipboard"
        >
          <span className={styles.shareIcon} role="img" aria-hidden="true">
            {copiedToClipboard ? '✅' : '🔗'}
          </span>
          {size === 'large' && (
            <span className={styles.shareLabel}>
              {copiedToClipboard ? 'Copied!' : 'Copy'}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

// Helper component for blog posts and articles
export function BlogShareButtons({ 
  title, 
  description, 
  tags 
}: { 
  title: string; 
  description?: string; 
  tags?: string[]; 
}): React.ReactElement {
  return (
    <SocialShare
      title={title}
      description={description}
      hashtags={tags || ['FTC', 'Robotics', 'Blog', 'FTC25805']}
      size="small"
      variant="buttons"
    />
  );
}

// Helper component for competition results
export function CompetitionShareButtons({ 
  season, 
  competition, 
  result 
}: { 
  season: string; 
  competition: string; 
  result?: string; 
}): React.ReactElement {
  return (
    <SocialShare
      title={`FTC Team 25805 ${competition} Results`}
      description={`Check out our ${result || 'performance'} at ${competition} during the ${season} season!`}
      hashtags={['FTC', 'Competition', 'Robotics', 'FTC25805', season.replace(/\s+/g, '')]}
      size="medium"
      variant="buttons"
    />
  );
}