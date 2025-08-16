# Reprogrammed Team Website Product Requirements Document (PRD)

### **Goals and Background Context**

#### **Goals**

- To attract at least 3 new sponsors during the current FTC season.
- To establish a professional online presence that legitimizes the team for potential partners.
- To significantly reduce the time it takes for team members to find educational and organizational resources.
- To create a central, public-facing hub for sharing team progress and knowledge with the school and FTC communities.

#### **Background Context**

The Reprogrammed FTC team currently lacks a dedicated website, which presents challenges for both external outreach and internal operations. Potential sponsors expect a professional website to reference, and its absence creates a barrier to securing new funding. Internally, critical resources are scattered across emails and group chats, making it difficult for team members to find the information they need efficiently. This PRD outlines the requirements for a website that will solve these issues by creating a single, organized source of truth for the team.

#### **Change Log**

| Date       | Version | Description                               | Author    |
| :--------- | :------ | :---------------------------------------- | :-------- |
| 2025-08-15 | 1.0     | Initial PRD draft based on Project Brief. | John (PM) |

### **Requirements**

#### **Functional**

1.  [cite_start]The website must display the team's mission statement and history. [cite: 442]
2.  [cite_start]The website must display detailed sponsorship levels and team needs to attract partners. [cite: 442]
3.  [cite_start]The website must provide a clear contact method for potential sponsors. [cite: 442]
4.  [cite_start]The website must include a blog/news section for sharing team progress and updates. [cite: 442]
5.  [cite_start]The website must feature a resource section where educational guides and YouTube videos can be organized and accessed. [cite: 442]
6.  [cite_start]The website layout must be responsive and function correctly on desktop, tablet, and mobile devices. [cite: 442]

#### **Non-Functional**

1.  [cite_start]The website shall be built as a static site using Docusaurus and TypeScript. [cite: 442]
2.  [cite_start]The website shall be hosted on GitHub Pages. [cite: 442]
3.  [cite_start]The website must be performant, with fast page load times characteristic of a static site. [cite: 442]
4.  [cite_start]Content for the website (blog posts, resources, etc.) must be manageable by team members via Markdown files within a Git repository. [cite: 442]

### **User Interface Design Goals**

#### [cite_start]**Overall UX Vision** [cite: 447]

The website should project a professional, clean, and engaging image that is appealing to both corporate sponsors and student members. Navigation should be intuitive, allowing all user types to find the information they need quickly and efficiently.

#### [cite_start]**Key Interaction Paradigms** [cite: 447]

The site will use standard and familiar web interaction patterns. A persistent top-navigation bar will provide access to the primary sections. Key "call-to-action" buttons, such as "Become a Sponsor," will be prominently displayed.

#### [cite_start]**Core Screens and Views** [cite: 448]

Based on the MVP scope, the following conceptual screens are required to deliver the core functionality:

- [cite_start]Homepage [cite: 449]
- [cite_start]About Page (Mission Statement) [cite: 449]
- [cite_start]Sponsorship Page [cite: 449]
- [cite_start]Resources Page [cite: 449]
- [cite_start]Blog/News Page [cite: 449]
- [cite_start]Contact Page [cite: 449]

#### [cite_start]**Accessibility** [cite: 447]

- **Assumption**: The site should meet WCAG 2.1 AA standards, a common accessibility target that ensures the site is usable by people with a wide range of disabilities.

#### [cite_start]**Branding** [cite: 450]

- **Assumption**: The design will need to incorporate the Reprogrammed team's existing branding (e.g., logo, team colors, specific fonts). Please provide any existing style guides or brand assets.

#### [cite_start]**Target Device and Platforms** [cite: 453]

- The website will be **Web Responsive**, ensuring a seamless experience across desktops, tablets, and mobile devices.

### **Technical Assumptions**

- **Starter Template**: The project will be initialized using the official Docusaurus 'classic-typescript' starter template.
- [cite_start]**Repository Structure**: A **Monorepo** structure will be used, as the entire project will be contained within a single Docusaurus repository provided by the template. [cite: 455]
- [cite_start]**Service Architecture**: The project will utilize a **Static Site Architecture**, generating static files for hosting. [cite: 456]
- [cite_start]**Testing Requirements**: For the MVP, **Unit Testing** will be required for any custom React components created. [cite: 457]
- **Additional Technical Assumptions**: The project will be built using the **Docusaurus framework with TypeScript** and deployed and hosted on **GitHub Pages**.

### **Epic List**

- [cite_start]**Epic 1: Website Foundation & Core Content MVP** [cite: 468]
  - [cite_start]**Goal**: To launch the complete Minimum Viable Product, including the site's technical foundation and all core content pages required to serve sponsors, team members, and the community. [cite: 460]

### **Epic 1: Website Foundation & Core Content MVP**

[cite_start]**Epic Goal**: The goal of this epic is to establish the complete technical foundation for the Reprogrammed team website and launch the full Minimum Viable Product. [cite: 470] [cite_start]This involves initializing the project from the Docusaurus starter template, customizing it to fit the team's brand, creating all the core content pages, and deploying the site to GitHub Pages. [cite: 470]

#### **Story 1.1: Project Initialization**

- **As a** team member, **I want** to initialize the project from the Docusaurus starter template, **so that** I have a working baseline for the website.
- **Acceptance Criteria**:
  1. The project is created from the 'classic-typescript' template.
  2. All dependencies are installed successfully.
  3. The local development server runs without errors.

#### **Story 1.2: Basic Site Configuration and Branding**

- **As a** team member, **I want** to configure the site with the team's name and branding, **so that** the website reflects our team's identity.
- **Acceptance Criteria**:
  1. The `docusaurus.config.ts` file is updated with the correct site title, tagline, and URL.
  2. The default Docusaurus logo is replaced with the Reprogrammed team logo.
  3. The website's primary color scheme is updated to match the team's colors.

#### **Story 1.3: Homepage Customization**

- **As a** visitor, **I want** to see a homepage that introduces the team and its mission, **so that** I can understand the purpose of the site at a glance.
- **Acceptance Criteria**:
  1. The default template content on the homepage is replaced.
  2. The page includes a brief introduction to the Reprogrammed team.
  3. The page directs users to other key sections like Sponsorship and the Blog.

#### **Story 1.4: Create Core Content Pages**

- **As a** visitor, **I want** to access dedicated "About" and "Contact" pages, **so that** I can learn more about the team and how to get in touch.
- **Acceptance Criteria**:
  1. An "About" page with the team's mission statement is created.
  2. A "Contact" page with information for getting in touch is created.
  3. Both pages are added to the main site navigation bar.

#### **Story 1.5: Create Sponsorship Page**

- **As a** potential sponsor, **I want** to find a clear page detailing sponsorship opportunities, **so that** I can easily understand how to support the team.
- **Acceptance Criteria**:
  1. A "Sponsorship" page is created and added to the navigation bar.
  2. The page lists the different sponsorship levels and team needs.
  3. The page includes a clear call-to-action to the Contact page.

#### **Story 1.6: Create Resources Page**

- **As a** team member, **I want** to access a "Resources" page with guides and videos, **so that** I can find learning materials efficiently.
- **Acceptance Criteria**:
  1. A "Resources" page is created and added to the navigation bar.
  2. The page demonstrates the ability to link to guides.
  3. The page demonstrates the ability to embed at least one YouTube video.

#### **Story 1.7: Set Up Blog and First Post**

- **As a** visitor, **I want** to read news and updates from the team, **so that** I can follow their progress.
- **Acceptance Criteria**:
  1. The Docusaurus blog feature is enabled and configured.
  2. A sample "Welcome" blog post is created.
  3. The "Blog" is accessible from the main navigation.

#### **Story 1.8: Prepare for Deployment**

- **As a** team coach, **I want** the site to be configured for deployment, **so that** we can easily publish it to GitHub Pages.
- **Acceptance Criteria**:
  1. The `docusaurus.config.ts` is correctly configured for GitHub Pages deployment.
  2. A successful build of the static site can be generated without errors.

#### **Story 1.9: Create and Integrate YouTube Component**

- **As a** content creator, **I want** a reusable component to embed YouTube videos, **so that** I can easily add them to the Resources page and other content.
- **Acceptance Criteria**:
  1. A new React component is created that accepts a YouTube video ID as a prop.
  2. The component renders a responsive YouTube `<iframe>` embed.
  3. The new component is successfully used on the "Resources" page to display a sample video.

### **Checklist Results Report**

I have conducted a validation of this PRD against the standard Product Manager checklist. The document is comprehensive, the MVP scope is well-defined, and the epics and stories are logically sequenced.

**Final Decision**: **READY FOR ARCHITECT/DESIGN**. [cite_start]The PRD is comprehensive, properly structured, and ready for the next phases of design and architectural planning. [cite: 571]

### **Next Steps**

#### [cite_start]**UX Expert Prompt** [cite: 483]

The PRD for the Reprogrammed Team Website is complete. Please review the 'User Interface Design Goals' section and create a detailed UI/UX Specification (`front-end-spec.md`) based on its vision.

#### [cite_start]**Architect Prompt** [cite: 484]

The PRD for the Reprogrammed Team Website is complete. Please review the 'Technical Assumptions' and other requirements to create the architecture document. Note the decision to use the Docusaurus 'classic-typescript' starter template as the project's foundation.
