# Project Brief: Reprogrammed Team Website

### **Executive Summary**

The project is to create a dedicated team website for the FTC robotics team, Reprogrammed. Currently, the team lacks an online presence, making it difficult to engage with key audiences. The proposed solution is a comprehensive website that will serve as a central online hub to promote the team, share information with sponsors and the community, and provide resources for internal team members. The primary value is to establish a professional digital footprint, fostering community engagement and supporting team operations.

### **Problem Statement**

The Reprogrammed FTC robotics team currently operates without a centralized online presence, creating several distinct challenges. Firstly, the team faces difficulties in effectively communicating with and securing potential sponsors, as most companies expect a professional website to reference for legitimacy and information. This may lead to missed funding and partnership opportunities. Secondly, internal team members struggle to find important educational resources and team information, which is currently scattered across emails and group chats.

The existing ad-hoc methods of communication, such as email and group chats, are insufficient as they lack a persistent, organized, and publicly accessible platform. This inefficiency impacts both external outreach and internal operations. With the new robotics season starting on September 2nd, there is a clear urgency to establish this online presence to support recruitment, sponsorship efforts, and team preparedness for the upcoming competitions.

### **Proposed Solution**

The proposed solution is to design and develop a centralized, public-facing website for the Reprogrammed FTC robotics team. This website will serve as the official "single source of truth" for all team-related information.

The core approach is to create a professional and engaging online platform that consolidates resources, showcases team achievements, and clearly presents information for sponsors. Unlike the current fragmented use of emails and group chats, the website will provide a persistent, organized, and easily accessible hub for all target audiences. This solution will succeed by directly addressing the primary pain points: it establishes the credible online presence required by sponsors and creates the centralized resource library needed by team members.

The long-term vision is for the website to become the digital home for the team, helping to build the Reprogrammed brand, attract new talent, and create a lasting archive of the team's legacy.

### **Target Users**

#### **Primary User Segment: Team Members & Sponsors**

- **Sponsors (Potential & Current)**
  - **Profile**: This group includes local businesses, technology companies, and community organizations looking to support STEM education and local youth initiatives.
  - **Needs & Pains**: They are often busy and need to quickly assess the legitimacy and mission of an organization before committing funds. Their current pain point is the lack of a central, professional-looking source of information, which makes it difficult to evaluate the team as a potential investment.
  - **Goals**: To easily find the team's mission statement, understand the specific needs of the team, view clear sponsorship levels, and see the benefits of partnership.
- **Team Members**
  - **Profile**: Students on the robotics team and their mentors.
  - **Needs & Pains**: Members need access to a wide range of technical and organizational information. Their primary pain is the inefficiency of searching through old emails and chat threads to find specific build guides, code examples, or tutorial videos. This is especially challenging for new members.
  - **Goals**: To have a single, organized repository where they can quickly find educational resources like guides and "how-to" videos, check team schedules, and access other essential team documents.

#### **Secondary User Segment: School Community & Other FTC Teams**

- **Profile**: This audience includes students, faculty, and families within the school community, as well as peer and competitor FTC teams.
- **Needs & Pains**: This group currently has limited visibility into the team's activities, progress, and learnings. There is no simple way for them to follow the team's journey or benefit from their shared knowledge.
- **Goals**: To follow the team's progress throughout the competition season, learn from their public project documentation and shared knowledge, and understand the impact of the robotics program on the school community.

### **Goals & Success Metrics**

#### **Business Objectives**

- Attract at least 3 new sponsors before the end of the current FTC season.

#### **User Success Metrics**

- Sponsors are able to easily locate and understand the sponsorship level information within one minute of landing on the site.
- Team members report a significant, measurable reduction in the time required to find learning resources compared to previous methods (email/group chats).

#### **Key Performance Indicators (KPIs)**

- **Monthly Unique Visitors**: The total number of unique individuals visiting the website each month.
- **Blog Post Engagement**: Each new blog post achieves a minimum of 50 views within its first month of being published.
- **Sponsor Leads**: The number of sponsorship inquiries received through the website's contact form or sponsorship page.

### **MVP Scope**

#### **Core Features (Must Have)**

- **Homepage**: A main landing page that provides a compelling introduction to the Reprogrammed team and directs visitors to key areas of the site.
- **About Page**: A dedicated page containing the team's mission statement and history to build identity and credibility.
- **Sponsorship Page**: A clear and concise page detailing the different sponsorship levels, the team's material and financial needs, and a simple way to make contact.
- **Resources Page**: An organized repository for team members to easily access educational resources, such as embedded YouTube videos and links to build guides.
- **Blog/News Page**: A simple blog to post updates on the team's progress, achievements, and knowledge-sharing articles.
- **Contact Page**: A page with clear contact information or a simple form to capture inquiries, particularly from potential sponsors.

#### **Out of Scope for MVP**

- A members-only login section for private resources.
- An interactive, multi-album photo or video gallery.
- A complex, integrated team calendar with scheduling features (a simple embedded Google Calendar will be used for the MVP).

#### **MVP Success Criteria**

The MVP will be considered successful if it is launched by the start of the season (September 2nd) and achieves the core goals previously defined. This means the website must effectively provide sponsors with the information they need, allow team members to easily access resources, and begin tracking KPIs such as monthly visitors, blog post views, and sponsor leads.

### **Post-MVP Vision**

#### **Phase 2 Features**

- **Interactive Photo/Video Gallery**: A dedicated, multi-album gallery to professionally showcase the team's robot, events, and members.
- **Members-Only Area**: A secure, login-protected section for private team documents, detailed build logs, or internal announcements.
- **Integrated Team Calendar**: A more advanced calendar with features beyond the basic embedded view, potentially including event RSVPs or detailed schedules.

#### **Long-term Vision**

In the long term, the website will evolve from an informational hub into an integral part of the team's identity and operations. It will serve as a historical archive of past seasons, a primary tool for alumni engagement, and a platform for sharing the team's expertise with the broader FTC community, solidifying Reprogrammed's reputation as a well-respected and professional team.

#### **Expansion Opportunities**

- **Alumni Network**: A portal for past team members to stay connected and support the current team.
- **Hosted Workshops**: A section for hosting virtual workshops or sharing in-depth technical articles with the wider robotics community.

### **Technical Considerations**

#### **Platform Requirements**

- **Target Platforms**: The website must be fully responsive and provide an excellent user experience on desktops, tablets, and mobile phones.
- **Browser Support**: The site should support the latest versions of all modern evergreen browsers (Chrome, Firefox, Safari, Edge).
- **Performance Requirements**: As a static site, it should be highly performant with fast page load times.

#### **Technology Preferences**

- **Frontend**: The website will be built using the Docusaurus static site generator with TypeScript.
- **Backend**: Not applicable, as this will be a static site.
- **Database**: Not applicable.
- **Hosting/Infrastructure**: The project will be hosted on GitHub Pages.

#### **Architecture Considerations**

- **Repository Structure**: A single Git repository will contain the entire Docusaurus project.
- **Service Architecture**: The project will follow a Static Site Architecture, with content being pre-built into HTML, CSS, and JavaScript files.
- **Integration Requirements**: The primary integration will be embedding YouTube videos for the team's "how-to" resources.

### **Constraints & Assumptions**

#### **Constraints**

- **Budget**: There is no budget allocated for this project. This reinforces the decision to use free, open-source technologies like Docusaurus and free hosting platforms like GitHub Pages.
- **Timeline**: The desired launch date is by the start of the season (target: September 2nd, 2025), but this is a soft target, not a hard deadline.
- **Resources**: The website development, content creation, and ongoing maintenance will be handled by student team members and mentors, dependent on their availability and skill sets.

#### **Key Assumptions**

- It is assumed that team members are responsible for and capable of producing all necessary website content (e.g., text, blog posts, resource links) as Markdown files.
- It is assumed that the features and capabilities of the chosen Docusaurus and GitHub Pages platform are sufficient to meet all the requirements defined for the MVP.
- It is assumed the September 2nd target date is for the launch of the defined MVP, with additional features and content to be added over time in subsequent phases.

### **Risks & Open Questions**

#### **Key Risks**

- **Team Member Availability**: As a student-run project, development progress may slow down significantly during peak build-season or due to school-related commitments.
- **Content Readiness**: The website's launch is dependent on the timely creation of high-quality content (blog posts, resource descriptions). A delay in content creation could become a bottleneck.
- **Technical Skill Gap**: There is a risk that team members tasked with development may find Docusaurus or TypeScript more complex than anticipated, potentially impacting the timeline.

#### **Open Questions**

- **Who will be the primary owner for the website after launch?**
  - **Answer**: The team coaches.
- **What is the process for publishing new content?**
  - **Answer**: Content will be published via a standard Git commit or a pull request workflow.
- **Who will manage the GitHub repository and hosting settings?**
  - **Answer**: The team coaches.

### **Appendices**

#### **C. References**

- **Docusaurus**: [https://docusaurus.io/](https://docusaurus.io/)
- **GitHub Pages**: [https://pages.github.com/](https://pages.github.com/)

### **Next Steps**

#### **Immediate Actions**

1.  Finalize and approve this Project Brief.
2.  Create the GitHub repository to host the Docusaurus project.
3.  Begin drafting the initial content for the main pages (Homepage, About, Sponsorship) as Markdown files.

#### **PM Handoff**

This Project Brief provides the full context for the Reprogrammed Team Website. The next step is to hand this off to the Product Manager (PM) to begin creating the Product Requirements Document (PRD). The PM will review the brief thoroughly and work with you to create the PRD section by section.
