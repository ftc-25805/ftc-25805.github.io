/**
 * Asset Optimization Script
 * Optimizes images, fonts, and other static assets for production
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Configuration
const config = {
  staticDir: path.join(__dirname, '../static'),
  outputDir: path.join(__dirname, '../static/optimized'),
  imageExtensions: ['.jpg', '.jpeg', '.png', '.gif'],
  targetSizes: [640, 768, 1024, 1280, 1600],
  webpQuality: 80,
  jpegQuality: 85,
  pngQuality: 90,
};

// Ensure output directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Get file size in KB
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

// Find all images in static directory
function findImages(dir, images = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && file !== 'optimized') {
      findImages(fullPath, images);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (config.imageExtensions.includes(ext)) {
        images.push(fullPath);
      }
    }
  }
  
  return images;
}

// Check if ImageMagick is available
function checkImageMagick() {
  try {
    execSync('magick -version', { stdio: 'ignore' });
    return true;
  } catch {
    try {
      execSync('convert -version', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }
}

// Optimize single image
function optimizeImage(inputPath) {
  const relativePath = path.relative(config.staticDir, inputPath);
  const outputDir = path.join(config.outputDir, path.dirname(relativePath));
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const originalSize = getFileSize(inputPath);
  
  ensureDir(outputDir);
  
  let totalSaved = 0;
  const results = [];
  
  try {
    // Generate WebP version
    const webpOutput = path.join(outputDir, `${baseName}.webp`);
    const webpCommand = `magick "${inputPath}" -quality ${config.webpQuality} "${webpOutput}"`;
    execSync(webpCommand, { stdio: 'ignore' });
    
    const webpSize = getFileSize(webpOutput);
    const webpSaved = originalSize - webpSize;
    totalSaved += webpSaved;
    
    results.push({
      format: 'WebP',
      size: webpSize,
      saved: webpSaved,
      path: webpOutput
    });
    
    // Generate responsive sizes for WebP
    for (const size of config.targetSizes) {
      const responsiveOutput = path.join(outputDir, `${baseName}-${size}w.webp`);
      const responsiveCommand = `magick "${inputPath}" -resize ${size}x -quality ${config.webpQuality} "${responsiveOutput}"`;
      
      try {
        execSync(responsiveCommand, { stdio: 'ignore' });
        results.push({
          format: `WebP ${size}w`,
          size: getFileSize(responsiveOutput),
          saved: 0, // Don't count responsive versions in savings
          path: responsiveOutput
        });
      } catch (error) {
        // Skip if image is smaller than target size
      }
    }
    
    // Optimize original format
    const ext = path.extname(inputPath).toLowerCase();
    const optimizedOutput = path.join(outputDir, `${baseName}${ext}`);
    
    let optimizeCommand;
    if (ext === '.jpg' || ext === '.jpeg') {
      optimizeCommand = `magick "${inputPath}" -quality ${config.jpegQuality} -strip "${optimizedOutput}"`;
    } else if (ext === '.png') {
      optimizeCommand = `magick "${inputPath}" -quality ${config.pngQuality} -strip "${optimizedOutput}"`;
    } else {
      // Copy as-is for other formats
      fs.copyFileSync(inputPath, optimizedOutput);
    }
    
    if (optimizeCommand) {
      execSync(optimizeCommand, { stdio: 'ignore' });
      const optimizedSize = getFileSize(optimizedOutput);
      const optimizedSaved = originalSize - optimizedSize;
      totalSaved += optimizedSaved;
      
      results.push({
        format: 'Optimized Original',
        size: optimizedSize,
        saved: optimizedSaved,
        path: optimizedOutput
      });
    }
    
    return {
      input: inputPath,
      originalSize,
      totalSaved,
      results
    };
    
  } catch (error) {
    log(`❌ Error optimizing ${relativePath}: ${error.message}`, colors.red);
    return null;
  }
}

// Main optimization function
async function optimizeAssets() {
  log(`🚀 Starting Asset Optimization`, colors.cyan);
  log(`📁 Static directory: ${config.staticDir}`, colors.blue);
  log(`📁 Output directory: ${config.outputDir}`, colors.blue);
  
  // Check dependencies
  if (!checkImageMagick()) {
    log(`❌ ImageMagick not found. Please install ImageMagick to optimize images.`, colors.red);
    log(`   Install: https://imagemagick.org/script/download.php`, colors.yellow);
    return;
  }
  
  // Find all images
  const images = findImages(config.staticDir);
  log(`🔍 Found ${images.length} images to optimize`, colors.blue);
  
  if (images.length === 0) {
    log(`✅ No images found to optimize`, colors.green);
    return;
  }
  
  // Optimize each image
  let totalOriginalSize = 0;
  let totalSaved = 0;
  let optimizedCount = 0;
  
  for (const imagePath of images) {
    const result = optimizeImage(imagePath);
    
    if (result) {
      totalOriginalSize += result.originalSize;
      totalSaved += result.totalSaved;
      optimizedCount++;
      
      const relativePath = path.relative(config.staticDir, result.input);
      const savedPercent = result.originalSize > 0 ? Math.round((result.totalSaved / result.originalSize) * 100) : 0;
      
      log(`✅ ${relativePath} (${result.originalSize}KB → saved ${result.totalSaved}KB, ${savedPercent}%)`, colors.green);
      
      // Log each generated format
      for (const format of result.results) {
        if (format.saved > 0) {
          log(`   └─ ${format.format}: ${format.size}KB (saved ${format.saved}KB)`, colors.yellow);
        } else {
          log(`   └─ ${format.format}: ${format.size}KB`, colors.yellow);
        }
      }
    }
  }
  
  // Summary
  log(`\n📊 Optimization Summary`, colors.cyan);
  log(`══════════════════════`, colors.cyan);
  log(`📸 Images processed: ${optimizedCount}/${images.length}`, colors.blue);
  log(`💾 Original total size: ${totalOriginalSize}KB`, colors.blue);
  log(`💰 Total saved: ${totalSaved}KB`, colors.green);
  
  if (totalOriginalSize > 0) {
    const savedPercent = Math.round((totalSaved / totalOriginalSize) * 100);
    log(`📈 Total savings: ${savedPercent}%`, colors.green);
  }
  
  // Generate usage instructions
  log(`\n📝 Usage Instructions`, colors.cyan);
  log(`════════════════════`, colors.cyan);
  log(`1. Replace image imports with optimized versions from /static/optimized/`, colors.yellow);
  log(`2. Use OptimizedImage component for automatic format selection`, colors.yellow);
  log(`3. Implement responsive images with generated size variants`, colors.yellow);
  
  log(`\n🎉 Asset optimization complete!`, colors.green);
}

// Font optimization function
function optimizeFonts() {
  log(`🔤 Font optimization recommendations:`, colors.cyan);
  log(`1. Use font-display: swap for better loading performance`, colors.yellow);
  log(`2. Subset fonts to include only required characters`, colors.yellow);
  log(`3. Use woff2 format for modern browsers`, colors.yellow);
  log(`4. Consider system fonts for better performance`, colors.yellow);
}

// Run optimization
if (require.main === module) {
  optimizeAssets()
    .then(() => {
      optimizeFonts();
      process.exit(0);
    })
    .catch((error) => {
      log(`❌ Optimization failed: ${error.message}`, colors.red);
      process.exit(1);
    });
}

module.exports = {
  optimizeAssets,
  optimizeFonts,
  config
};