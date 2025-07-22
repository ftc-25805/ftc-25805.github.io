const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function loadSeasons() {
  const seasonsDir = path.join(process.cwd(), 'src', 'pages', 'seasons');
  
  if (!fs.existsSync(seasonsDir)) {
    return [];
  }

  const seasons = [];
  
  try {
    const files = fs.readdirSync(seasonsDir)
      .filter(file => (file.endsWith('.md') || file.endsWith('.mdx')) && file !== 'index.md');

    for (const file of files) {
      const filePath = path.join(seasonsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontMatter } = matter(fileContent);
      
      const seasonId = path.basename(file, path.extname(file));
      
      const seasonInfo = {
        id: seasonId,
        title: frontMatter.title || `Season ${seasonId}`,
        year: frontMatter.year || seasonId,
        game: frontMatter.game || 'Game TBD',
        status: frontMatter.status || 'complete',
        robotName: frontMatter.robotName,
        achievements: frontMatter.achievements || [],
        path: `/seasons/${seasonId}`,
        order: frontMatter.order || parseInt(seasonId.replace(/\D/g, '')) || 0,
      };

      seasons.push(seasonInfo);
    }

    seasons.sort((a, b) => b.order - a.order);
    return seasons;
  } catch (error) {
    console.error('Error loading seasons:', error);
    return [];
  }
}

function loadSponsors() {
  const sponsorsDir = path.join(process.cwd(), 'sponsors');
  
  if (!fs.existsSync(sponsorsDir)) {
    console.warn('Sponsors directory not found. Using fallback sponsors.');
    return [];
  }

  const sponsors = [];
  
  try {
    const files = fs.readdirSync(sponsorsDir)
      .filter(file => (file.endsWith('.md') || file.endsWith('.mdx')) && !file.startsWith('README'));

    for (const file of files) {
      const filePath = path.join(sponsorsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontMatter, content } = matter(fileContent);
      
      const sponsorData = {
        id: frontMatter.id || path.basename(file, path.extname(file)),
        name: frontMatter.name || 'Unknown Sponsor',
        logo: frontMatter.logo || '/img/team-placeholder.svg',
        tier: frontMatter.tier || 'supporter',
        website: frontMatter.website,
        description: frontMatter.description || content.slice(0, 200).replace(/\n/g, ' ').trim(),
        contribution: frontMatter.contribution,
        since: frontMatter.since,
        featured: frontMatter.featured || false,
        active: frontMatter.active !== false,
      };

      if (sponsorData.active) {
        sponsors.push(sponsorData);
      }
    }

    const tierOrder = ['title', 'platinum', 'gold', 'silver', 'bronze', 'supporter'];
    sponsors.sort((a, b) => {
      const tierComparison = tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
      if (tierComparison !== 0) return tierComparison;
      return a.name.localeCompare(b.name);
    });

    return sponsors;
  } catch (error) {
    console.error('Error loading sponsors:', error);
    return [];
  }
}

function generateData() {
  const seasons = loadSeasons();
  const sponsors = loadSponsors();
  
  // Generate seasons data
  const seasonsData = {
    seasons,
    currentSeason: seasons.find(season => season.status === 'active') || null,
    completedSeasons: seasons.filter(season => season.status === 'complete'),
  };
  
  // Generate sponsors data
  const sponsorsData = {
    sponsors,
    featuredSponsors: sponsors.filter(sponsor => sponsor.featured),
  };
  
  // Write data files
  const dataDir = path.join(process.cwd(), 'src', 'data', 'generated');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(dataDir, 'seasons.json'),
    JSON.stringify(seasonsData, null, 2)
  );
  
  fs.writeFileSync(
    path.join(dataDir, 'sponsors.json'),
    JSON.stringify(sponsorsData, null, 2)
  );
  
  console.log('Generated data files:');
  console.log(`- ${seasons.length} seasons`);
  console.log(`- ${sponsors.length} sponsors`);
}

if (require.main === module) {
  generateData();
}

module.exports = { generateData, loadSeasons, loadSponsors };