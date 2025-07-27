/**
 * Enhanced Card Component System
 * Standardized card design with advanced interactions and variants
 */

import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface EnhancedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
  rounded?: 'none' | 'small' | 'medium' | 'large' | 'full';
  hover?: 'lift' | 'glow' | 'scale' | 'tilt' | 'none';
  clickable?: boolean;
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  badge?: React.ReactNode;
  loading?: boolean;
  skeleton?: boolean;
}

// Card skeleton loader
const CardSkeleton = ({ padding }: { padding: string }) => (
  <div className={clsx(styles.skeleton, styles[`padding-${padding}`])}>
    <div className={styles.skeletonHeader}></div>
    <div className={styles.skeletonLine}></div>
    <div className={styles.skeletonLine}></div>
    <div className={styles.skeletonLineShort}></div>
  </div>
);

// Card image component
const CardImage = ({ 
  src, 
  alt, 
  loading 
}: { 
  src: string; 
  alt: string; 
  loading?: boolean; 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.imageContainer}>
      {!imageLoaded && !imageError && (
        <div className={styles.imagePlaceholder}>
          <div className={styles.imageLoader}></div>
        </div>
      )}
      
      {!imageError && (
        <img
          src={src}
          alt={alt}
          className={clsx(styles.cardImage, { [styles.loaded]: imageLoaded })}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading={loading ? 'eager' : 'lazy'}
        />
      )}
      
      {imageError && (
        <div className={styles.imageError}>
          <span className={styles.imageErrorIcon}>🖼️</span>
          <span className={styles.imageErrorText}>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default function EnhancedCard({
  children,
  variant = 'default',
  padding = 'medium',
  rounded = 'medium',
  hover = 'lift',
  clickable = false,
  href,
  to,
  onClick,
  className = '',
  header,
  footer,
  image,
  imageAlt = '',
  badge,
  loading = false,
  skeleton = false,
}: EnhancedCardProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLElement>(null);

  // Handle mouse movement for tilt effect
  const handleMouseMove = (event: React.MouseEvent) => {
    if (hover !== 'tilt' || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  // Calculate tilt transform
  const getTiltStyle = () => {
    if (hover !== 'tilt' || !isHovered || !cardRef.current) {
      return {};
    }

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (mousePosition.y - centerY) / centerY * -10;
    const rotateY = (mousePosition.x - centerX) / centerX * 10;

    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    };
  };

  const cardClasses = clsx(
    styles.enhancedCard,
    styles[variant],
    styles[`padding-${padding}`],
    styles[`rounded-${rounded}`],
    styles[`hover-${hover}`],
    {
      [styles.clickable]: clickable || href || to || onClick,
      [styles.hovered]: isHovered,
      [styles.loading]: loading,
      [styles.hasImage]: image,
      [styles.hasHeader]: header,
      [styles.hasFooter]: footer,
      [styles.hasBadge]: badge,
    },
    className
  );

  const cardProps = {
    className: cardClasses,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onMouseMove: handleMouseMove,
    style: getTiltStyle(),
  };

  const cardContent = (
    <>
      {skeleton ? (
        <CardSkeleton padding={padding} />
      ) : (
        <>
          {image && <CardImage src={image} alt={imageAlt} loading={loading} />}
          
          {badge && (
            <div className={styles.badgeContainer}>
              {badge}
            </div>
          )}
          
          <div className={styles.cardBody}>
            {header && (
              <div className={styles.cardHeader}>
                {header}
              </div>
            )}
            
            <div className={styles.cardContent}>
              {children}
            </div>
            
            {footer && (
              <div className={styles.cardFooter}>
                {footer}
              </div>
            )}
          </div>
          
          {loading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}
        </>
      )}
    </>
  );

  // Handle click events
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // External link
  if (href) {
    return (
      <a
        {...cardProps}
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {cardContent}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link
        {...cardProps}
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        to={to}
        onClick={handleClick}
      >
        {cardContent}
      </Link>
    );
  }

  // Clickable card
  if (clickable || onClick) {
    return (
      <div
        {...cardProps}
        ref={cardRef as React.RefObject<HTMLDivElement>}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {cardContent}
      </div>
    );
  }

  // Static card
  return (
    <div 
      {...cardProps}
      ref={cardRef as React.RefObject<HTMLDivElement>}
    >
      {cardContent}
    </div>
  );
}

// Pre-configured card variants
export const ElevatedCard = (props: Omit<EnhancedCardProps, 'variant'>) => (
  <EnhancedCard {...props} variant="elevated" />
);

export const GlassCard = (props: Omit<EnhancedCardProps, 'variant'>) => (
  <EnhancedCard {...props} variant="glass" />
);

export const GradientCard = (props: Omit<EnhancedCardProps, 'variant'>) => (
  <EnhancedCard {...props} variant="gradient" />
);

export const ClickableCard = (props: Omit<EnhancedCardProps, 'clickable'>) => (
  <EnhancedCard {...props} clickable hover="lift" />
);

// Card header and footer components
export const CardHeader = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <div className={clsx(styles.cardHeaderStandalone, className)}>
    {children}
  </div>
);

export const CardFooter = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <div className={clsx(styles.cardFooterStandalone, className)}>
    {children}
  </div>
);

export const CardTitle = ({ 
  children, 
  className = '',
  as = 'h3'
}: { 
  children: React.ReactNode; 
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}) => {
  const Component = as;
  return (
    <Component className={clsx(styles.cardTitle, className)}>
      {children}
    </Component>
  );
};

export const CardDescription = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <p className={clsx(styles.cardDescription, className)}>
    {children}
  </p>
);