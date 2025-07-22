# Dynamic Content System

This website now features a dynamic content system that automatically loads sponsors and seasons information from repository files. This allows for easy content management without needing to edit code directly.

## Overview

The system consists of:
- **Dynamic Sponsors**: Loaded from markdown files in `/sponsors/` directory
- **Dynamic Seasons Navigation**: Automatically generated from season pages in `/src/pages/seasons/`
- **Automatic Data Generation**: Build-time processing that creates JSON data files
- **Fallback System**: Graceful degradation if files are missing or malformed

## Sponsors System

### File Structure
```
sponsors/
├── README.md                    # Documentation
├── techvantage-solutions.md     # Example sponsor
├── precision-manufacturing.md   # Example sponsor
└── innovation-labs.md          # Example sponsor
```

### Sponsor File Format
Each sponsor should be a markdown file with frontmatter:

```yaml
---
id: unique-sponsor-id
name: Sponsor Name
logo: /img/sponsor-logo.png
tier: title | platinum | gold | silver | bronze | supporter
website: https://sponsor-website.com (optional)
since: "2023" (optional)
featured: true | false (optional, default: false)
active: true | false (optional, default: true)
contribution: Description of sponsor contribution (optional)
---

# Sponsor Name

Detailed description of the sponsor and their contribution.
```

### Sponsor Tiers
- **title** ($5000+): Title sponsors with prominent placement
- **platinum** ($2500+): Premium sponsors with high visibility
- **gold** ($1000+): Gold tier sponsors
- **silver** ($500+): Silver tier sponsors  
- **bronze** ($250+): Bronze tier sponsors
- **supporter**: In-kind or community supporters

### Usage
- Sponsors are automatically loaded on the homepage
- Featured sponsors appear in special sections
- Inactive sponsors (`active: false`) are hidden
- Sponsors are sorted by tier and then alphabetically

## Seasons System

### File Structure
```
src/pages/seasons/
├── seasons.mdx          # Dynamic seasons overview page
├── 2024-25.md          # Current season
├── 2023-24.md          # Previous season
└── 2022-23.md          # Previous season
```

### Season File Format
Each season page should include frontmatter:

```yaml
---
title: Game Name 2024-25
year: 2024-25
game: Game Name
status: active | complete | upcoming
robotName: Robot Name (optional)
order: 202425 (for sorting)
achievements:
  - List of achievements
  - Awards won
  - Notable accomplishments
---

# Season Content

Detailed season information...
```

### Navigation Generation
The navigation dropdown is automatically generated with:
- Current season (if marked as active)
- "All Seasons" link
- Recent seasons (up to 3 most recent)

## Build Process

### Data Generation
The system uses a build-time script to process markdown files:

```bash
npm run generate-data
```

This creates:
- `src/data/generated/sponsors.json`
- `src/data/generated/seasons.json`

### Automatic Generation
Data is automatically generated before:
- `npm start` - Development server
- `npm run build` - Production build
- `npm run deploy` - Deployment

### Manual Generation
You can manually regenerate data:
```bash
npm run generate-data
```

## File Locations

### Source Files
- `scripts/generate-data.js` - Data generation script
- `src/data/sponsors.ts` - Sponsor data interface
- `src/data/seasons.ts` - Season data interface

### Generated Files
- `src/data/generated/sponsors.json` - Generated sponsor data
- `src/data/generated/seasons.json` - Generated season data

### Configuration
- `docusaurus.config.ts` - Navigation configuration
- `package.json` - Build script configuration

## Adding New Content

### Adding a New Sponsor
1. Create a new `.md` file in `/sponsors/`
2. Use the sponsor frontmatter format
3. Add sponsor logo to `/static/img/`
4. Run `npm run generate-data` or next build

### Adding a New Season
1. Create a new `.md` file in `/src/pages/seasons/`
2. Use the season frontmatter format
3. Update the current season's status if needed
4. Run `npm run generate-data` or next build

### Updating Existing Content
1. Edit the relevant markdown file
2. Run `npm run generate-data` or next build
3. Changes will be reflected on next page load

## Error Handling

### Missing Files
- System falls back to default/hardcoded content
- Warnings are logged to console
- Build continues successfully

### Malformed Data
- Invalid files are skipped
- Error messages logged for debugging
- System continues with valid files

### No Dynamic Content
- If no sponsors directory exists, uses fallback sponsors
- If no seasons found, uses minimal navigation
- System always provides working navigation

## Development Tips

### Testing Changes
1. Edit sponsor or season files
2. Run `npm run generate-data`
3. Check generated JSON files
4. Start development server to see changes

### Debugging
- Check console for error messages
- Verify frontmatter syntax
- Ensure file paths are correct
- Check generated JSON files

### Performance
- Data is generated at build time, not runtime
- No filesystem access in browser code
- Minimal impact on page load times
- Fallback systems prevent failures

## Migration Notes

### From Static to Dynamic
The system maintains backward compatibility:
- Existing hardcoded data serves as fallbacks
- No breaking changes to existing pages
- Gradual migration possible

### Content Updates
- Old hardcoded sponsor data replaced with dynamic loading
- Navigation automatically updates with new seasons
- Homepage sponsor section now pulls from files

## Future Enhancements

Potential improvements:
- Content validation during build
- Automated sponsor logo optimization
- Season statistics and analytics
- Content management interface
- Multi-language support for sponsor content