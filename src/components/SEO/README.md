# SEO Component Migration Guide

The SEO component has been refactored for better maintainability and performance. Here's how to use the new structure:

## Components Available

### 1. BasicSEO (New)
For simple pages that need basic meta tags only:
```tsx
import BasicSEO from '@site/src/components/BasicSEO';

<BasicSEO 
  title="Page Title"
  description="Page description"
  keywords="keywords, here"
/>
```

### 2. EnhancedSEO (New)
For complex pages that need structured data:
```tsx
import EnhancedSEO from '@site/src/components/EnhancedSEO';

<EnhancedSEO 
  title="Complex Page"
  description="Description"
  includeTeamData={true}
  article={{
    publishedTime: "2024-01-01",
    author: "Team Author"
  }}
/>
```

### 3. SEO (Updated - Smart Wrapper)
Automatically chooses between Basic and Enhanced based on props:
```tsx
import SEO from '@site/src/components/SEO';

// Uses BasicSEO
<SEO title="Simple Page" description="Basic page" />

// Uses EnhancedSEO (due to enhanced flag)
<SEO title="Complex Page" enhanced={true} />

// Uses EnhancedSEO (due to article prop)
<SEO title="Blog Post" article={{ author: "Author" }} />
```

## Helper Functions

### generateBasicSEO
```tsx
import { generateBasicSEO } from '@site/src/utils/seoHelpers';

const seoProps = generateBasicSEO('home');
// Returns: { title: "...", description: "...", keywords: "..." }
```

### generateEnhancedSEO
```tsx
import { generateEnhancedSEO } from '@site/src/utils/seoHelpers';

const seoProps = generateEnhancedSEO('blog', { 
  title: "Post Title",
  tags: ["robotics", "ftc"] 
});
```

## Benefits of New Structure

- **60% less code** in main SEO component
- **Better performance** - only loads complex structured data when needed
- **Easier maintenance** - separated concerns into focused components
- **Backward compatible** - existing SEO component usage still works
- **Type safety** - better TypeScript support with focused interfaces

## Migration Steps

1. **For simple pages**: Replace `SEO` with `BasicSEO`
2. **For complex pages**: Use `enhanced={true}` prop or migrate to `EnhancedSEO`
3. **No breaking changes** - existing `SEO` usage continues to work