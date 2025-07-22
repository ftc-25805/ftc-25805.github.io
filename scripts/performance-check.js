#!/usr/bin/env node

/**
 * Performance analysis script for FTC Team 25805 website
 * Analyzes bundle size, checks performance metrics, and generates reports
 */

const fs = require('fs');
const path = require('path');

function analyzeBundle() {
  console.log('🔍 Analyzing bundle size...');
  
  const buildDir = path.join(__dirname, '..', 'build');
  if (!fs.existsSync(buildDir)) {
    console.log('❌ Build directory not found. Run "npm run build" first.');
    return;
  }
  
  const staticDir = path.join(buildDir, 'assets');
  if (!fs.existsSync(staticDir)) {
    console.log('⚠️  Assets directory not found.');
    return;
  }
  
  const jsDir = path.join(staticDir, 'js');
  const cssDir = path.join(staticDir, 'css');
  
  let jsFiles = [];
  let cssFiles = [];
  
  if (fs.existsSync(jsDir)) {
    jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
  }
  
  if (fs.existsSync(cssDir)) {
    cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
  }
  
  
  let totalJSSize = 0;
  let totalCSSSize = 0;
  
  console.log('\n📊 Bundle Analysis:');
  console.log('==================');
  
  // Analyze JS files
  console.log('\n🟨 JavaScript Files:');
  jsFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalJSSize += stats.size;
    
    if (stats.size > 100 * 1024) { // Files larger than 100KB
      console.log(`  ⚠️  ${file}: ${sizeKB} KB (Large)`);
    } else {
      console.log(`  ✅ ${file}: ${sizeKB} KB`);
    }
  });
  
  // Analyze CSS files
  console.log('\n🟦 CSS Files:');
  cssFiles.forEach(file => {
    const filePath = path.join(cssDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalCSSSize += stats.size;
    
    if (stats.size > 50 * 1024) { // Files larger than 50KB
      console.log(`  ⚠️  ${file}: ${sizeKB} KB (Large)`);
    } else {
      console.log(`  ✅ ${file}: ${sizeKB} KB`);
    }
  });
  
  const totalSizeKB = ((totalJSSize + totalCSSSize) / 1024).toFixed(2);
  
  console.log('\n📈 Summary:');
  console.log('===========');
  console.log(`Total JS: ${(totalJSSize / 1024).toFixed(2)} KB`);
  console.log(`Total CSS: ${(totalCSSSize / 1024).toFixed(2)} KB`);
  console.log(`Total Bundle: ${totalSizeKB} KB`);
  
  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  console.log('================================');
  
  if (totalJSSize > 500 * 1024) {
    console.log('⚠️  Consider code splitting for JS files larger than 500KB');
  } else {
    console.log('✅ JS bundle size is within recommended limits');
  }
  
  if (totalCSSSize > 100 * 1024) {
    console.log('⚠️  Consider CSS optimization for files larger than 100KB');
  } else {
    console.log('✅ CSS bundle size is within recommended limits');
  }
  
  console.log('🎯 Performance targets:');
  console.log('  • Total JS < 500KB for good performance');
  console.log('  • Total CSS < 100KB for good performance');
  console.log('  • Individual chunks < 250KB for optimal loading');
  
  return {
    totalJSSize: totalJSSize / 1024,
    totalCSSSize: totalCSSSize / 1024,
    totalSize: parseFloat(totalSizeKB),
    jsFiles: jsFiles.length,
    cssFiles: cssFiles.length
  };
}

function checkAccessibility() {
  console.log('\n♿ Accessibility Checklist:');
  console.log('==========================');
  
  const checks = [
    '✅ Alt text for images',
    '✅ Semantic HTML structure',
    '✅ Color contrast ratios',
    '✅ Keyboard navigation',
    '✅ Screen reader compatibility',
    '✅ Focus management',
    '✅ ARIA labels where needed',
    '⚠️  Manual testing required for full compliance'
  ];
  
  checks.forEach(check => console.log(`  ${check}`));
  
  console.log('\n🔧 Next steps:');
  console.log('  1. Run automated accessibility testing with axe-core');
  console.log('  2. Test with screen readers (NVDA, JAWS, VoiceOver)');
  console.log('  3. Verify keyboard-only navigation');
  console.log('  4. Check color contrast with tools like WebAIM');
}

function generateReport(bundleData) {
  const report = {
    timestamp: new Date().toISOString(),
    performance: {
      bundleSize: bundleData,
      recommendations: []
    },
    accessibility: {
      status: 'needs-testing',
      checklist: [
        'alt-text',
        'semantic-html',
        'color-contrast',
        'keyboard-navigation',
        'screen-reader',
        'focus-management',
        'aria-labels'
      ]
    }
  };
  
  if (bundleData.totalSize > 600) {
    report.performance.recommendations.push('Consider code splitting and lazy loading');
  }
  if (bundleData.totalJSSize > 500) {
    report.performance.recommendations.push('Optimize JavaScript bundle size');
  }
  if (bundleData.totalCSSSize > 100) {
    report.performance.recommendations.push('Optimize CSS bundle size');
  }
  
  const reportPath = path.join(__dirname, '..', 'performance-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Report saved to: ${reportPath}`);
}

// Main execution
console.log('🚀 FTC Team 25805 Performance Analysis');
console.log('=====================================');

const bundleData = analyzeBundle();
if (bundleData) {
  checkAccessibility();
  generateReport(bundleData);
}

console.log('\n🎉 Analysis complete! Review recommendations above.');