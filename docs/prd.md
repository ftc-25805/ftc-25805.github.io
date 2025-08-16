Of course. I have reviewed the new project brief for the "Phase 2 Enhancement" and will now update the existing PRD to reflect the new scope of work.

This update will include a new epic to capture the required enhancements, such as the site-wide dark theme, the homepage revamp, the restructuring of the Resources page, and the expansion of the "About the Team" page.

Here is the updated Product Requirements Document for your review.

---

# Reprogrammed Team Website Product Requirements Document (PRD)

| Date       | Version | Description                                                                                      | Author    |
| :--------- | :------ | :----------------------------------------------------------------------------------------------- | :-------- |
| 2025-08-15 | 1.0     | Initial PRD draft based on Project Brief.                                                        | John (PM) |
| 2025-08-16 | 2.0     | Updated for Phase 2 Enhancement project. Added Epic 2 for visual redesign and content expansion. | John (PM) |

### **Goals and Background Context**

#### **Goals**

- To attract at least 3 new sponsors during the current FTC season.
- To establish a professional, modern, and engaging online presence that legitimizes the team for potential partners.
- To significantly reduce the time it takes for team members to find educational and organizational resources through a restructured, multi-page guide.
- To create a central, public-facing hub for sharing team progress and knowledge with the school and FTC communities.
- To better showcase the talented individuals on the team, including members, mentors, and alumni, to foster a stronger community connection.

#### **Background Context**

The Reprogrammed FTC team website currently serves as a functional Minimum Viable Product (MVP). While successful in establishing a baseline presence, it lacks the professional polish and engaging features necessary to meet the team's evolving goals. The current design is visually uninspired and does not fully capture the team's innovative spirit. This second phase of development aims to address these shortcomings by implementing a comprehensive visual and structural redesign. This will transform the website into a powerful tool for sponsorship, recruitment, and community engagement.

### **Requirements**

#### **Functional**

1.  [cite_start]The website must display the team's mission statement and history. [cite: 442]
2.  [cite_start]The website must display detailed sponsorship levels and team needs to attract partners. [cite: 442]
3.  [cite_start]The website must provide a clear contact method for potential sponsors. [cite: 442]
4.  [cite_start]The website must include a blog/news section for sharing team progress and updates. [cite: 442]
5.  [cite_start]The website must feature a resource section where educational guides and YouTube videos can be organized and accessed. [cite: 442]
6.  [cite_start]The website layout must be responsive and function correctly on desktop, tablet, and mobile devices. [cite: 442]
7.  **New:** The homepage must be redesigned to feature a robot spotlight, a description of the FTC program, and a component to showcase sponsors.
8.  **New:** The Resources page must be re-architected into a multi-page guide using a sidebar for navigation.
9.  **New:** The "About" page must be expanded to include dedicated sections for current team members, mentors, and alumni.

#### **Non-Functional**

1.  [cite_start]The website shall be built as a static site using Docusaurus and TypeScript. [cite: 442]
2.  [cite_start]The website shall be hosted on GitHub Pages. [cite: 442]
3.  [cite_start]The website must be performant, with fast page load times characteristic of a static site. [cite: 442]
4.  [cite_start]Content for the website (blog posts, resources, etc.) must be manageable by team members via Markdown files within a Git repository. [cite: 442]
5.  **New:** A "clean, modern, fun, innovative" dark theme with colorful accents shall be applied consistently across the entire website.

### **User Interface Design Goals**

#### **Overall UX Vision**

[cite_start]The website should project a professional, clean, and engaging image that is appealing to both corporate sponsors and student members. [cite: 447] The enhanced design will feature a modern dark theme with colorful accents to better reflect the team's innovative and fun personality. [cite_start]Navigation should be intuitive, allowing all user types to find the information they need quickly and efficiently. [cite: 447]

#### **Key Interaction Paradigms**

[cite_start]The site will use standard and familiar web interaction patterns. [cite: 447] [cite_start]A persistent top-navigation bar will provide access to the primary sections. [cite: 447] [cite_start]Key "call-to-action" buttons, such as "Become a Sponsor," will be prominently displayed. [cite: 447]

#### **Core Screens and Views**

Based on the project scope, the following conceptual screens are required:

- Homepage (Redesigned)
- About Page (Expanded with Member, Mentor, Alumni sections)
- Sponsorship Page
- Resources Section (Re-architected as a multi-page documentation section)
- Blog/News Page
- Contact Page

#### **Accessibility**

- **Assumption**: The site should meet WCAG 2.1 AA standards.

#### **Branding**

- **Assumption**: The design will incorporate the Reprogrammed team's existing branding (logo, fonts) within the new dark theme.

#### **Target Device and Platforms**

- [cite_start]The website will be **Web Responsive**, ensuring a seamless experience across desktops, tablets, and mobile devices. [cite: 453]

### **Technical Assumptions**

- **Starter Template**: The project will continue to be built upon the foundation created from the Docusaurus 'classic-typescript' starter template.
- [cite_start]**Repository Structure**: A **Monorepo** structure will be maintained. [cite: 455]
- [cite_start]**Service Architecture**: The project will continue to utilize a **Static Site Architecture**. [cite: 456]
- **Testing Requirements**: **Unit Testing** will be required for any new custom React components created.
- **Additional Technical Assumptions**: The project will continue to be built using the **Docusaurus framework with TypeScript** and deployed and hosted on **GitHub Pages**.

### **Epic List**

- **Epic 1: Website Foundation & Core Content MVP** - **CLOSED** ✅
  - [cite_start]**Goal**: To launch the complete Minimum Viable Product, including the site's technical foundation and all core content pages required to serve sponsors, team members, and the community. [cite: 460]
  - **Status**: Completed 2025-08-16 - All stories delivered, QA approved, MVP deployed.
- **New Epic 2: Phase 2 Visual Redesign and Content Expansion**
  - **Goal**: To implement a comprehensive visual redesign of the website and expand key content sections to create a more professional, engaging, and useful platform for sponsors and team members.

### **Epic 2: Phase 2 Visual Redesign and Content Expansion**

**Epic Goal**: The goal of this epic is to enhance the existing MVP by applying a new site-wide dark theme, redesigning the homepage with more dynamic content, re-architecting the Resources section into a scalable multi-page guide, and expanding the "About" page to properly showcase the team's talent.

#### **Story 2.1: Implement Site-Wide Dark Theme**

- **As a** visitor, **I want** to experience a clean and modern dark theme across the website, **so that** the site feels more professional and innovative.
- **Acceptance Criteria**:
  1.  A dark theme with colorful accents is implemented as the default theme.
  2.  The theme is applied consistently to all existing pages and components (Header, Footer, Homepage, etc.).
  3.  Text is legible with sufficient color contrast to meet WCAG 2.1 AA standards.

#### **Story 2.2: Redesign Homepage**

- **As a** visitor, **I want** to see a redesigned homepage with dynamic content, **so that** I am immediately engaged and understand the team's mission.
- **Acceptance Criteria**:
  1.  The homepage layout is updated to a new, modern design.
  2.  The hero section prominently features the team logo and a compelling tagline.
  3.  New components for a "Robot Spotlight," a description of FTC, and a "Sponsor Showcase" are created and integrated into the page.

#### **Story 2.3: Re-architect Resources Section**

- **As a** team member, **I want** the Resources section to be a multi-page guide with sidebar navigation, **so that** I can easily find and browse tutorials and documents.
- **Acceptance Criteria**:
  1.  The existing single "Resources" page is removed.
  2.  The Docusaurus `docs` plugin is configured to serve as the new Resources section.
  3.  Content is organized into categories that appear in the sidebar.
  4.  Existing resource content (including embedded videos) is migrated to the new format.

#### **Story 2.4: Expand "About the Team" Page**

- **As a** visitor, **I want** to learn about the people on the team, **so that** I can connect with their story and see their contributions.
- **Acceptance Criteria**:
  1.  The "About" page is redesigned to accommodate new sections.
  2.  A new component is created to display profiles for current team members.
  3.  A new section is added to showcase team mentors.
  4.  A new section is added to feature notable team alumni.

### **Checklist Results Report**

This PRD has been updated for the Phase 2 enhancement. The new epic and stories are logically structured to deliver the features outlined in the project brief.

**Final Decision**: **READY FOR ARCHITECT/DESIGN**. [cite_start]The PRD is comprehensive, properly structured, and ready for the next phases of design and architectural planning for the enhancement work. [cite: 571]

### **Next Steps**

#### **UX Expert Prompt**

The PRD for the Reprogrammed Team Website has been updated for Phase 2. Please review the 'User Interface Design Goals' and the new requirements for Epic 2 to create a detailed UI/UX Specification (`front-end-spec.md`).

#### **Architect Prompt**

The PRD for the Reprogrammed Team Website has been updated for Phase 2. Please review the 'Technical Assumptions' and the new stories in Epic 2 to create an architecture document that details the implementation of these new components and structural changes.
