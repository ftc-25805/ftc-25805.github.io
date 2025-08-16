Of course. Here is the complete, updated Frontend Architecture Document (v2.0) that reflects all Phase 2 enhancement requirements and the requested folder structure change.

This document is the definitive blueprint for development.

---

# Reprogrammed Team Website Frontend Architecture Document

### **Change Log**

| Date       | Version | Description                                                                          | Author              |
| :--------- | :------ | :----------------------------------------------------------------------------------- | :------------------ |
| 2025-08-16 | 1.0     | Initial draft based on PRD and UI/UX Specification.                                  | Winston (Architect) |
| 2025-08-16 | 2.0     | Updated for Phase 2 Enhancement (Epic 2) and renamed content folder to `/resources`. | Winston (Architect) |

### **Section 1: Template and Framework Selection**

Based on my review of the `prd.md`, the foundational decisions for this project are explicitly defined. The project will be built using a pre-defined starter template, which significantly informs the architecture.

- **Starter Template**: The project will be initialized using the official Docusaurus 'classic-typescript' starter template.
- **Analysis**: This choice establishes Docusaurus as the core framework, React as the component library, and TypeScript as the primary language. The template provides a pre-configured project structure, build tooling, and core functionality (like docs, blog, and pages) which our architecture must align with and extend.

### **Section 2: Frontend Tech Stack**

This table defines the definitive technology stack for the project.

| Category             | Technology                   | Version | Purpose                                      | Rationale                                                                                                         |
| :------------------- | :--------------------------- | :------ | :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Framework**        | Docusaurus                   | `^3.x`  | Core static site generation framework.       | Explicitly required by the PRD for its content-focused features.                                                  |
| **Language**         | TypeScript                   | `^5.x`  | Primary language for all custom code.        | Required by the PRD and provided by the starter template.                                                         |
| **UI Library**       | React.js                     | `^18.x` | Library for building custom components.      | Docusaurus is built on React; this is the default and required choice.                                            |
| **Styling**          | CSS Modules + Infima         | `^1.0`  | Styling components and the overall theme.    | This is the built-in Docusaurus styling system. It supports custom styling while maintaining consistency.         |
| **State Management** | React Context API            | `N/A`   | Managing simple shared state if needed.      | Sufficient for the MVP's needs. Avoids adding a heavier state management library before it's required.            |
| **Testing**          | Jest + React Testing Library | `^29.x` | Unit testing custom React components.        | The industry standard for testing React applications. Directly fulfills the PRD's unit testing requirement.       |
| **Deployment**       | GitHub Pages                 | `N/A`   | Hosting the static website.                  | Explicitly required by the PRD.                                                                                   |
| **CI/CD**            | GitHub Actions               | `N/A`   | Automating the build and deployment process. | The native solution for a project hosted on GitHub, providing seamless integration for deploying to GitHub Pages. |

### **Section 3: Project Structure**

The project's directory structure is based on the **Docusaurus 'classic-typescript' starter template** and has been modified to use a `resources` directory for documentation content.

_Note: The BMad-Method's own planning documents (like the PRD and this architecture file) will be stored in a root folder named `/bmad-files/` to avoid conflict with the Docusaurus content directory below._

```plaintext
/reprogrammed-website/
|
├── blog/
│   └── ... (Markdown files for blog posts reside here)
|
├── resources/
│   └── ... (Markdown files for the 'Resources' section reside here)
|
├── src/
│   ├── components/
│   │   ├── MemberCard/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── SponsorShowcase/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   └── YouTube/
│   │       ├── index.tsx
│   │       └── styles.module.css
│   │
│   ├── css/
│   │   └── custom.css         # Main stylesheet for site-wide brand customizations.
│   │
│   ├── pages/
│   │   ├── about.mdx
│   │   └── sponsorship.mdx
│   │
│   └── services/
│       └── contactService.ts  # Logic for the contact form
|
├── static/
│   └── img/
│       └── logo.png           # Static assets like images and the team logo.
|
├── docusaurus.config.ts       # Main site configuration file.
├── package.json               # Project dependencies and scripts.
└── tsconfig.json              # TypeScript configuration.
```

### **Section 4: Component Standards**

These standards ensure consistency and maintainability for all custom React components.

#### **Component Template**

All new custom React components must follow this template.

```typescript
// src/components/MyComponent/index.tsx
import React from 'react';
import styles from './styles.module.css';

// Define the component's props with TypeScript
export interface MyComponentProps {
  title: string;
  // ... other props
}

// Functional component definition
export default function MyComponent({ title }: MyComponentProps): JSX.Element {
  return (
    <div className={styles.myComponentContainer}>
      <h2>{title}</h2>
      {/* ... component JSX */}
    </div>
  );
}
```

#### **Naming Conventions**

- **Component Files**: `PascalCase` (e.g., `/YouTube/index.tsx`)
- **Component Functions**: `PascalCase` (e.g., `function YouTube(...)`)
- **CSS Module Files**: `styles.module.css`
- **Non-Component Files**: `camelCase` (e.g., `src/utils/formatDate.ts`)

### **Section 5: State Management**

We will use React's built-in **Context API** for any simple shared state.

#### **Store Structure**

Shared state contexts will be organized in a dedicated `contexts` directory.

```plaintext
/src/
├── components/
├── contexts/
│   └── AppContext.tsx   # Example context for simple, app-wide state
└── pages/
```

#### **State Management Template**

This template provides a type-safe context, a provider, and a custom hook for consumption.

```typescript
// src/contexts/AppContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define the shape of the context's state and functions
interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Create the Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 4. Create a custom hook for easy consumption
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
```

### **Section 6: API Integration**

The primary need for external communication is the contact form. We will use a third-party form handling service (e.g., Formspree) to manage submissions for our static site.

#### **API Client Configuration**

The service endpoint URL will be stored as an environment variable.

```typescript
// .env file (example - not committed)
DOCUSAURUS_CONTACT_FORM_ENDPOINT = "https://formspree.io/f/your_unique_id";
```

#### **Service Template**

A helper function will encapsulate the form submission logic.

```typescript
// src/services/contactService.ts

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(
  formData: ContactFormData,
): Promise<{ success: boolean }> {
  const endpoint = process.env.DOCUSAURUS_CONTACT_FORM_ENDPOINT;

  if (!endpoint) {
    console.error("Contact form endpoint is not configured.");
    return { success: false };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return { success: response.ok };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false };
  }
}
```

### **Section 7: Routing**

Docusaurus uses a **file-based routing** system for files in the `src/pages` directory. The **Blog** and **Resources** sections are handled automatically by their respective plugins. There are **no protected routes** in this application.

#### **Route Configuration**

| URL Route        | File Path                   | Type   | Notes                                  |
| :--------------- | :-------------------------- | :----- | :------------------------------------- |
| `/`              | `src/pages/index.tsx`       | Page   | The main homepage of the site.         |
| `/about`         | `src/pages/about.mdx`       | Page   | The "About the Team" page.             |
| `/sponsorship`   | `src/pages/sponsorship.mdx` | Page   | The "Sponsorship" page.                |
| `/contact`       | `src/pages/contact.mdx`     | Page   | The "Contact" page.                    |
| `/blog`          | _Automatic_                 | Plugin | Handled by the Docusaurus Blog Plugin. |
| `/resources/...` | _Automatic_                 | Plugin | Handled by the Docusaurus Docs Plugin. |

### **Section 8: Styling Guidelines**

#### **Styling Approach**

1.  **Global Theme Customization**: Brand-wide styles (colors, fonts) will be configured in `src/css/custom.css` by overriding Docusaurus's Infima theme variables.
2.  **Component-Specific Styles**: Styles local to a single component will use **CSS Modules** (`styles.module.css`).

#### **Global Theme Variables**

The following will be added to `src/css/custom.css` to implement the brand's dark theme.

```css
/* src/css/custom.css */
:root {
  /* Brand Colors from UI/UX Spec */
  --ifm-color-primary: #9b59b6; /* Main brand purple */
  --ifm-color-secondary: #f1c40f; /* Accent yellow for highlights */

  /* Set the default dark theme background */
  --ifm-background-color: #1a1a1d; /* Dark charcoal gray */

  /* Typography from UI/UX Spec */
  --ifm-font-family-base: "Roboto", sans-serif;
  --ifm-heading-font-family: "Exo 2", sans-serif;

  /* Ensure text is readable on dark background */
  --ifm-font-color-base: #efefef;
}
```

### **Section 9: Testing Requirements**

To ensure quality, we will adhere to the unit testing requirement from the PRD.

#### **Component Test Template**

All new component tests will follow this template using Jest and React Testing Library.

```typescript
// src/components/MyComponent/index.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MyComponent, { MyComponentProps } from './index';

describe('MyComponent', () => {
  const defaultProps: MyComponentProps = {
    title: 'Hello World',
  };

  it('renders the title correctly', () => {
    render(<MyComponent {...defaultProps} />);

    const headingElement = screen.getByRole('heading', { name: /Hello World/i });
    expect(headingElement).toBeInTheDocument();
  });
});
```

#### **Testing Best Practices**

- **Co-location**: Test files should be located alongside the component they are testing.
- **User-Centric Tests**: Tests should verify what the user sees and interacts with, not internal implementation details.
- **Isolation**: Mock any external dependencies to ensure component tests are independent.
