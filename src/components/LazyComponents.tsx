/**
 * Lazy-loaded components for code splitting and performance optimization
 * This file centralizes all lazy component imports for better bundle management
 */

import { lazy, Suspense, ComponentType } from 'react';

// Lazy component imports for code splitting
export const LazyTechnicalNotebook = lazy(() => import('./TechnicalNotebook'));
export const LazyImageGallery = lazy(() => import('./ImageGallery'));
export const LazyGameElementDemo = lazy(() => import('./GameElementDemo'));
export const LazyAwardShowcase = lazy(() => import('./AwardShowcase'));
export const LazyCompetitionResults = lazy(() => import('./CompetitionResults'));
export const LazyProgressTimeline = lazy(() => import('./ProgressTimeline'));
export const LazySponsorShowcase = lazy(() => import('./SponsorShowcase'));
export const LazyFTCCodeBlock = lazy(() => import('./FTCCodeBlock'));

// Loading fallback component with consistent styling
const LoadingSpinner = ({ height = '200px' }: { height?: string }) => (
  <div 
    style={{ 
      display: 'flex',
      alignItems: 'center', 
      justifyContent: 'center',
      height,
      minHeight: height,
      background: 'var(--ifm-background-surface-color)',
      borderRadius: '12px',
      border: '1px solid var(--ifm-color-emphasis-200)'
    }}
  >
    <div 
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--ifm-color-emphasis-300)',
        borderTop: '3px solid var(--ifm-color-primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// Higher-order component for consistent lazy loading
export const withLazyLoading = <T extends Record<string, any>>(
  Component: ComponentType<T>,
  fallbackHeight?: string
) => {
  return (props: T) => (
    <Suspense fallback={<LoadingSpinner height={fallbackHeight} />}>
      <Component {...props} />
    </Suspense>
  );
};

// Pre-configured lazy components with appropriate loading heights
export const TechnicalNotebook = withLazyLoading(LazyTechnicalNotebook, '400px');
export const ImageGallery = withLazyLoading(LazyImageGallery, '300px');
export const GameElementDemo = withLazyLoading(LazyGameElementDemo, '350px');
export const AwardShowcase = withLazyLoading(LazyAwardShowcase, '250px');
export const CompetitionResults = withLazyLoading(LazyCompetitionResults, '300px');
export const ProgressTimeline = withLazyLoading(LazyProgressTimeline, '400px');
export const SponsorShowcase = withLazyLoading(LazySponsorShowcase, '350px');
export const FTCCodeBlock = withLazyLoading(LazyFTCCodeBlock, '300px');

// Mobile navigation is now handled directly in Layout component

// Preload function for critical components
export const preloadComponents = () => {
  // Preload components that are likely to be needed soon
  if (typeof window !== 'undefined') {
    // Preload on user interaction or after initial load
    const preloadOnInteraction = () => {
      // Preload lazy components by triggering imports
      import('./ImageGallery');
      import('./GameElementDemo');
      import('./SponsorShowcase');
      import('./FTCCodeBlock');
    };

    // Preload on scroll or user interaction
    window.addEventListener('scroll', preloadOnInteraction, { once: true });
    window.addEventListener('mousemove', preloadOnInteraction, { once: true });
    window.addEventListener('touchstart', preloadOnInteraction, { once: true });

    // Preload after 3 seconds if no interaction
    setTimeout(preloadOnInteraction, 3000);
  }
};

// Component size estimation for bundle analysis
export const componentSizes = {
  TechnicalNotebook: '~45KB',
  ImageGallery: '~35KB', 
  GameElementDemo: '~40KB',
  AwardShowcase: '~25KB',
  CompetitionResults: '~30KB',
  ProgressTimeline: '~25KB',
  SponsorShowcase: '~30KB',
  FTCCodeBlock: '~20KB'
} as const;

export default {
  TechnicalNotebook,
  ImageGallery,
  GameElementDemo,
  AwardShowcase,
  CompetitionResults,
  ProgressTimeline,
  SponsorShowcase,
  FTCCodeBlock,
  preloadComponents,
  componentSizes
};