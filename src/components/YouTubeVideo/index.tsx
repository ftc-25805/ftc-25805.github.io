/**
 * YouTube Video Component
 * Responsive YouTube video embedder with privacy controls and accessibility features
 */

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface YouTubeVideoProps {
  /** YouTube video ID (from the URL: https://youtube.com/watch?v={videoId}) */
  videoId: string;
  
  /** Video title for accessibility and display */
  title?: string;
  
  /** Video description */
  description?: string;
  
  /** Aspect ratio of the video */
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'custom';
  
  /** Custom width and height (only used when aspectRatio is 'custom') */
  width?: number;
  height?: number;
  
  /** Whether to show video controls */
  controls?: boolean;
  
  /** Whether to enable privacy-enhanced mode (youtube-nocookie.com) */
  privacyMode?: boolean;
  
  /** Auto-play video (note: most browsers block autoplay with sound) */
  autoplay?: boolean;
  
  /** Start time in seconds */
  startTime?: number;
  
  /** End time in seconds */
  endTime?: number;
  
  /** Whether to show suggested videos at the end */
  showSuggested?: boolean;
  
  /** Whether to show video information */
  showInfo?: boolean;
  
  /** Video thumbnail quality */
  thumbnailQuality?: 'default' | 'medium' | 'high' | 'standard' | 'maxres';
  
  /** Whether to show a play button overlay before loading the iframe */
  showPlayButton?: boolean;
  
  /** Custom CSS class */
  className?: string;
  
  /** Loading state */
  loading?: boolean;
  
  /** Error callback */
  onError?: (error: string) => void;
  
  /** Load callback */
  onLoad?: () => void;
}

// Utility function to extract video ID from various YouTube URL formats
export const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/live\/([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
};

// Utility function to validate YouTube video ID format
const isValidVideoId = (videoId: string): boolean => {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
};

// Loading skeleton component
const VideoSkeleton = ({ aspectRatio }: { aspectRatio: string }) => (
  <div className={clsx(styles.videoContainer, styles[`aspect-${aspectRatio.replace(':', '-')}`])}>
    <div className={styles.skeleton}>
      <div className={styles.skeletonPlay}>
        <div className={styles.skeletonPlayButton}></div>
      </div>
      <div className={styles.skeletonOverlay}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonDescription}></div>
      </div>
    </div>
  </div>
);

// Play button overlay component
const PlayButtonOverlay = ({ 
  onPlay, 
  title, 
  description, 
  thumbnailUrl 
}: { 
  onPlay: () => void;
  title?: string;
  description?: string;
  thumbnailUrl: string;
}) => (
  <div className={styles.playOverlay} onClick={onPlay}>
    <div className={styles.thumbnail}>
      <img 
        src={thumbnailUrl} 
        alt={title ? `Thumbnail for ${title}` : 'Video thumbnail'}
        className={styles.thumbnailImage}
      />
      <div className={styles.playButtonContainer}>
        <button 
          className={styles.playButton}
          aria-label={`Play video${title ? `: ${title}` : ''}`}
          type="button"
        >
          <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
      {(title || description) && (
        <div className={styles.videoInfo}>
          {title && <h3 className={styles.videoTitle}>{title}</h3>}
          {description && <p className={styles.videoDescription}>{description}</p>}
        </div>
      )}
    </div>
  </div>
);

// Error display component
const VideoError = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className={styles.errorContainer}>
    <div className={styles.errorIcon}>📺</div>
    <div className={styles.errorMessage}>{message}</div>
    {onRetry && (
      <button className={styles.retryButton} onClick={onRetry} type="button">
        Try Again
      </button>
    )}
  </div>
);

export default function YouTubeVideo({
  videoId,
  title = '',
  description = '',
  aspectRatio = '16:9',
  width,
  height,
  controls = true,
  privacyMode = true,
  autoplay = false,
  startTime,
  endTime,
  showSuggested = false,
  showInfo = true,
  thumbnailQuality = 'high',
  showPlayButton = true,
  className = '',
  loading = false,
  onError,
  onLoad,
}: YouTubeVideoProps): React.ReactElement {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldLoad, setShouldLoad] = useState(!showPlayButton);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Validate video ID
  useEffect(() => {
    if (!isValidVideoId(videoId)) {
      const error = `Invalid YouTube video ID: ${videoId}`;
      setErrorMessage(error);
      setHasError(true);
      onError?.(error);
    } else {
      setHasError(false);
      setErrorMessage('');
    }
  }, [videoId, onError]);

  // Build YouTube embed URL
  const getEmbedUrl = (): string => {
    const baseUrl = privacyMode 
      ? 'https://www.youtube-nocookie.com/embed' 
      : 'https://www.youtube.com/embed';
    
    const params = new URLSearchParams();
    
    if (!controls) params.set('controls', '0');
    if (autoplay) params.set('autoplay', '1');
    if (startTime) params.set('start', startTime.toString());
    if (endTime) params.set('end', endTime.toString());
    if (!showSuggested) params.set('rel', '0');
    if (!showInfo) params.set('showinfo', '0');
    
    // Enable JavaScript API for better integration
    params.set('enablejsapi', '1');
    params.set('origin', window.location.origin);
    
    const queryString = params.toString();
    return `${baseUrl}/${videoId}${queryString ? `?${queryString}` : ''}`;
  };

  // Get thumbnail URL
  const getThumbnailUrl = (): string => {
    const qualityMap = {
      default: 'default',
      medium: 'mqdefault', 
      high: 'hqdefault',
      standard: 'sddefault',
      maxres: 'maxresdefault'
    };
    
    const quality = qualityMap[thumbnailQuality];
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle iframe error
  const handleIframeError = () => {
    const error = 'Failed to load YouTube video';
    setErrorMessage(error);
    setHasError(true);
    onError?.(error);
  };

  // Handle play button click
  const handlePlay = () => {
    setShouldLoad(true);
  };

  // Handle retry
  const handleRetry = () => {
    setHasError(false);
    setErrorMessage('');
    setIsLoaded(false);
    setShouldLoad(true);
  };

  // Get container style for custom dimensions
  const getContainerStyle = (): React.CSSProperties => {
    if (aspectRatio === 'custom' && width && height) {
      return { width: `${width}px`, height: `${height}px` };
    }
    return {};
  };

  const containerClasses = clsx(
    styles.videoContainer,
    styles[`aspect-${aspectRatio.replace(':', '-')}`],
    {
      [styles.loading]: loading,
      [styles.loaded]: isLoaded,
      [styles.hasError]: hasError,
      [styles.customSize]: aspectRatio === 'custom',
    },
    className
  );

  // Show loading skeleton
  if (loading) {
    return <VideoSkeleton aspectRatio={aspectRatio} />;
  }

  // Show error state
  if (hasError) {
    return (
      <div className={containerClasses} style={getContainerStyle()}>
        <VideoError message={errorMessage} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className={containerClasses} style={getContainerStyle()}>
      {!shouldLoad ? (
        <PlayButtonOverlay
          onPlay={handlePlay}
          title={title}
          description={description}
          thumbnailUrl={getThumbnailUrl()}
        />
      ) : (
        <iframe
          ref={iframeRef}
          className={styles.iframe}
          src={getEmbedUrl()}
          title={title || `YouTube video ${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}
      
      {shouldLoad && !isLoaded && !hasError && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <span className={styles.loadingText}>Loading video...</span>
        </div>
      )}
    </div>
  );
}

// Pre-configured component variants
export const YouTubeVideoWide = (props: Omit<YouTubeVideoProps, 'aspectRatio'>) => (
  <YouTubeVideo {...props} aspectRatio="16:9" />
);

export const YouTubeVideoSquare = (props: Omit<YouTubeVideoProps, 'aspectRatio'>) => (
  <YouTubeVideo {...props} aspectRatio="1:1" />
);

export const YouTubeVideoClassic = (props: Omit<YouTubeVideoProps, 'aspectRatio'>) => (
  <YouTubeVideo {...props} aspectRatio="4:3" />
);

// Utility component for multiple videos
export const YouTubePlaylist = ({ 
  videos, 
  className = '',
  ...props 
}: { 
  videos: Array<{ videoId: string; title?: string; description?: string }>;
  className?: string;
} & Omit<YouTubeVideoProps, 'videoId' | 'title' | 'description'>) => (
  <div className={clsx(styles.playlist, className)}>
    {videos.map((video, index) => (
      <YouTubeVideo
        key={video.videoId}
        videoId={video.videoId}
        title={video.title}
        description={video.description}
        {...props}
      />
    ))}
  </div>
);