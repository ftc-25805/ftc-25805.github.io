import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div 
      className="optimized-image-container"
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'var(--ifm-color-emphasis-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ifm-color-emphasis-600)',
            fontSize: '14px',
            zIndex: 1
          }}
        >
          Loading...
        </div>
      )}
      
      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.3s ease',
          opacity: isLoaded ? 1 : 0,
          zIndex: 2,
          position: 'relative'
        }}
      />
      
      {/* Error state */}
      {hasError && (
        <div
          className="image-error"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'var(--ifm-color-danger-lightest)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ifm-color-danger)',
            fontSize: '14px',
            zIndex: 3
          }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;