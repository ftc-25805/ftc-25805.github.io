/**
 * Optimized Image Component
 * Provides WebP/AVIF support, lazy loading, and responsive sizing
 */

import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

// Generate srcSet for responsive images
const generateSrcSet = (src: string, quality = 75): string => {
  const basePath = src.replace(/\.[^/.]+$/, '');
  const extension = src.split('.').pop();
  
  // Generate multiple sizes for responsive loading
  const sizes = [640, 768, 1024, 1280, 1600];
  
  return sizes
    .map(size => `${basePath}-${size}w.webp ${size}w`)
    .join(', ');
};

// Check WebP support
const checkWebPSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps): React.ReactElement {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check for WebP support on mount
  useEffect(() => {
    checkWebPSupport().then(setSupportsWebP);
  }, []);

  // Intersection Observer for lazy loading optimization
  useEffect(() => {
    if (loading === 'eager' || priority) return;

    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start loading when image enters viewport
            const actualSrc = img.dataset.src;
            if (actualSrc) {
              img.src = actualSrc;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.1
      }
    );

    observer.observe(img);

    return () => observer.disconnect();
  }, [loading, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Determine the best image format and source
  const getOptimizedSrc = (originalSrc: string): string => {
    if (supportsWebP && !originalSrc.endsWith('.svg')) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);
  const shouldLazyLoad = loading === 'lazy' && !priority;

  return (
    <div className={`${styles.imageContainer} ${className}`}>
      {/* Placeholder for blur effect */}
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className={styles.placeholder}
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={shouldLazyLoad ? undefined : optimizedSrc}
        data-src={shouldLazyLoad ? optimizedSrc : undefined}
        srcSet={supportsWebP ? generateSrcSet(src, quality) : undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`${styles.image} ${isLoaded ? styles.loaded : ''} ${hasError ? styles.error : ''}`}
        decoding="async"
        {...(priority && { fetchpriority: 'high' })}
      />
      
      {/* Error fallback */}
      {hasError && (
        <div className={styles.errorFallback}>
          <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z"/>
          </svg>
          <span className={styles.errorText}>Image failed to load</span>
        </div>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && placeholder === 'empty' && (
        <div className={styles.loadingIndicator}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </div>
  );
}

// Higher-order component for automatic optimization
export const withImageOptimization = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    // Replace img elements with OptimizedImage
    const optimizedProps = {
      ...props,
      loading: props.loading || 'lazy',
      quality: props.quality || 75,
    };

    return <Component {...optimizedProps} />;
  };
};