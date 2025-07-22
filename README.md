# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Blog Management

### Creating Blog Posts

Blog posts are located in the `/blog` directory and use Markdown format with frontmatter metadata.

#### Basic Blog Post Structure

```markdown
---
slug: post-url-slug
title: Your Post Title
authors: [author-id]
tags: [tag1, tag2, tag3]
image: /img/blog/post-image.jpg
---

Post excerpt content here...

<!-- truncate -->

Full post content continues here...
```

#### Available Frontmatter Fields

- `slug`: URL-friendly identifier for the post
- `title`: Post title displayed on the page
- `authors`: Array of author IDs from `/blog/authors.yml`
- `tags`: Array of tag IDs from `/blog/tags.yml`
- `image`: Featured image path (optional)
- `draft`: Set to `true` to mark post as draft (optional)

### Draft Posts

You can mark blog posts as drafts by adding `draft: true` to the frontmatter:

```markdown
---
slug: my-draft-post
title: Work in Progress Post
authors: [team-captain]
tags: [team-update]
draft: true
---

This post is still being written...
```

**Draft Behavior:**
- **Development mode** (`yarn start`): Draft posts are visible and can be previewed
- **Production build** (`yarn build`): Draft posts are excluded from the built site
- **RSS/Atom feeds**: Draft posts are never included in feeds

This allows team members to collaborate on posts and preview them locally before publishing.

### Managing Authors and Tags

- **Authors**: Edit `/blog/authors.yml` to add or modify team member profiles
- **Tags**: Edit `/blog/tags.yml` to add new categories and topics

### Content Guidelines

- Use the `<!-- truncate -->` comment to separate the excerpt from the full content
- Include meaningful tags to help users find related content
- Add featured images to `/static/img/blog/` and reference them in frontmatter
- Follow the established naming convention: `YYYY-MM-DD-post-slug.md`
