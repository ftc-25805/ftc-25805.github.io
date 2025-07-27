/**
 * Performance optimization utilities and configurations
 * Centralized performance enhancements for the FTC website
 */

// Bundle analyzer configuration for webpack
export const bundleAnalyzerConfig = {
  analyzerMode: 'static',
  openAnalyzer: false,
  generateStatsFile: true,
  statsFilename: 'bundle-stats.json',
  reportFilename: 'bundle-report.html',
};

// Webpack optimization configuration
export const webpackOptimizations = {
  splitChunks: {
    chunks: 'all' as const,
    cacheGroups: {
      // Vendor chunk for third-party libraries
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all' as const,
        priority: 10,
        reuseExistingChunk: true,
      },
      // Common chunk for shared components
      common: {
        name: 'common',
        minChunks: 2,
        chunks: 'all' as const,
        priority: 5,
        reuseExistingChunk: true,
        enforce: true,
      },
      // Large components chunk
      largeComponents: {
        test: /[\\/]src[\\/]components[\\/](TechnicalNotebook|ImageGallery|GameElementDemo)[\\/]/,
        name: 'large-components',
        chunks: 'all' as const,
        priority: 15,
        reuseExistingChunk: true,
      },
      // Mobile-specific chunk
      mobile: {
        test: /[\\/]src[\\/]components[\\/]MobileBottomNav[\\/]/,
        name: 'mobile',
        chunks: 'all' as const,
        priority: 12,
        reuseExistingChunk: true,
      },
    },
  },
  usedExports: true,
  sideEffects: false,
};

// CSS optimization configuration
export const cssOptimizations = {
  // PurgeCSS configuration for removing unused styles
  purgeCSS: {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './docs/**/*.{md,mdx}',
      './blog/**/*.{md,mdx}',
      './static/**/*.html',
    ],
    defaultExtractor: (content: string) => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: [
      // Docusaurus classes
      /^docusaurus/,
      /^theme/,
      /^navbar/,
      /^footer/,
      /^menu/,
      /^pagination/,
      /^breadcrumb/,
      /^dropdown/,
      /^alert/,
      /^admonition/,
      /^code/,
      /^prism/,
      // Custom classes
      /^ftc-/,
      /^hero/,
      /^feature/,
      /^card/,
      /^badge/,
      // Utility classes
      /^text-/,
      /^bg-/,
      /^border-/,
      /^rounded/,
      /^shadow/,
      /^hover:/,
      /^focus:/,
      /^active:/,
      // Animation classes
      /^animate/,
      /^transition/,
      /^transform/,
    ],
  },
};

// Image optimization configuration
export const imageOptimizations = {
  // Ideal image plugin settings
  quality: 75,
  max: 1200,
  min: 640,
  steps: 3,
  disableInDev: false,
  
  // WebP conversion settings
  webp: {
    quality: 80,
    method: 6,
  },
  
  // AVIF conversion settings (future)
  avif: {
    quality: 75,
    effort: 4,
  },
};

// Font optimization configuration
export const fontOptimizations = {
  // Google Fonts optimization
  googleFonts: {
    families: {
      'Inter': [300, 400, 500, 600, 700],
      'Space Grotesk': [400, 500, 600, 700],
      'JetBrains Mono': [400, 500],
    },
    display: 'swap',
    preconnect: true,
    prefetch: true,
  },
  
  // Font subsetting
  subsetting: {
    latin: true,
    latinExt: false,
    cyrillic: false,
    greek: false,
  },
};

// Performance monitoring configuration
export const performanceMonitoring = {
  // Core Web Vitals thresholds
  thresholds: {
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100,  // First Input Delay (ms)
    cls: 0.1,  // Cumulative Layout Shift
    fcp: 1800, // First Contentful Paint (ms)
    ttfb: 600, // Time to First Byte (ms)
  },
  
  // Bundle size thresholds
  bundleThresholds: {
    maxJSSize: 500 * 1024,    // 500KB
    maxCSSSize: 80 * 1024,    // 80KB
    maxChunkSize: 250 * 1024, // 250KB
    maxAssetSize: 100 * 1024, // 100KB
  },
};

// Critical resource hints
export const resourceHints = {
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  preload: [
    '/img/team-logo.svg',
    '/img/favicon.ico',
  ],
  prefetch: [
    // Prefetch likely next pages
    '/team',
    '/seasons/2024-25',
    '/docs/intro',
  ],
};

// Service Worker configuration for caching
export const serviceWorkerConfig = {
  cacheFirst: [
    // Static assets
    /\.(?:js|css|woff2?|eot|ttf|otf)$/,
    /\/img\/.*\.(png|jpg|jpeg|gif|svg|webp)$/,
  ],
  staleWhileRevalidate: [
    // HTML pages
    /\.(?:html)$/,
    // API responses (if any)
    /\/api\//,
  ],
  networkFirst: [
    // Dynamic content
    /\/blog\//,
    /\/docs\//,
  ],
  maxAgeSeconds: {
    static: 365 * 24 * 60 * 60, // 1 year
    pages: 7 * 24 * 60 * 60,    // 1 week
    api: 60 * 60,               // 1 hour
  },
};

// Development performance helpers
export const developmentOptimizations = {
  // Fast refresh settings
  fastRefresh: true,
  
  // Source map optimization
  sourceMap: 'eval-cheap-module-source-map',
  
  // Dev server optimization
  devServer: {
    compress: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
};

export default {
  bundleAnalyzerConfig,
  webpackOptimizations,
  cssOptimizations,
  imageOptimizations,
  fontOptimizations,
  performanceMonitoring,
  resourceHints,
  serviceWorkerConfig,
  developmentOptimizations,
};