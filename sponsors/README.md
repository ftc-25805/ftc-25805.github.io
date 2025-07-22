# Dynamic Sponsors System

This directory contains markdown files that define the sponsors displayed on the website. Each markdown file represents a sponsor and should follow the format below.

## File Structure

Each sponsor should be in a separate `.md` file with the following frontmatter:

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
```

## Sponsor Tiers

- **title** ($5000+): Title sponsors with prominent placement
- **platinum** ($2500+): Premium sponsors with high visibility
- **gold** ($1000+): Gold tier sponsors
- **silver** ($500+): Silver tier sponsors  
- **bronze** ($250+): Bronze tier sponsors
- **supporter**: In-kind or community supporters

## Example File

```yaml
---
id: example-sponsor
name: Example Company
logo: /img/example-logo.png
tier: gold
website: https://example.com
since: "2023"
featured: false
active: true
contribution: 3D printing services and materials
---

# Example Company

Description of the sponsor and their contribution to the team.

## Partnership Details
- Services provided
- Impact on the team
- Partnership history
```

## Usage

- Sponsors marked as `active: false` will not appear on the website
- Featured sponsors appear in the special featured section
- Sponsors are automatically sorted by tier and then by name
- The homepage loads sponsors dynamically from this directory
- If no sponsors directory exists, the system falls back to default sponsors

## Adding New Sponsors

1. Create a new `.md` file in this directory
2. Use the sponsor's name or company slug as the filename
3. Fill in the frontmatter with sponsor information
4. Add description content below the frontmatter
5. The sponsor will automatically appear on the website

## Removing Sponsors

- Set `active: false` to temporarily hide a sponsor
- Delete the file to permanently remove a sponsor