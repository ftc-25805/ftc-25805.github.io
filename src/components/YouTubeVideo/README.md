# YouTubeVideo Component

A fully-featured, accessible, and responsive YouTube video embedding component for React with TypeScript support.

## Features

- 🎬 **Multiple Video Formats**: Supports regular videos, live streams, and shorts
- 🔒 **Privacy First**: Uses YouTube's privacy-enhanced mode by default
- 📱 **Responsive Design**: Adaptive layouts for all screen sizes
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 🎯 **Performance**: Lazy loading with optional play button overlay
- 🎨 **Customizable**: Multiple aspect ratios and styling options
- 🚀 **Error Handling**: Comprehensive error states and recovery
- 🌙 **Dark Mode**: Full support for light/dark themes
- ⚡ **TypeScript**: Complete type safety and IntelliSense

## Basic Usage

```tsx
import YouTubeVideo from '@site/src/components/YouTubeVideo';

// Simple video embed
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  title="Never Gonna Give You Up"
/>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoId` | `string` | **required** | YouTube video ID (11 characters) |
| `title` | `string` | `''` | Video title for accessibility |
| `description` | `string` | `''` | Video description |
| `aspectRatio` | `'16:9' \| '4:3' \| '1:1' \| 'custom'` | `'16:9'` | Video aspect ratio |
| `width` | `number` | `undefined` | Custom width (only with aspectRatio='custom') |
| `height` | `number` | `undefined` | Custom height (only with aspectRatio='custom') |
| `controls` | `boolean` | `true` | Show video controls |
| `privacyMode` | `boolean` | `true` | Use youtube-nocookie.com domain |
| `autoplay` | `boolean` | `false` | Auto-play video (limited browser support) |
| `startTime` | `number` | `undefined` | Start time in seconds |
| `endTime` | `number` | `undefined` | End time in seconds |
| `showSuggested` | `boolean` | `false` | Show suggested videos at end |
| `showInfo` | `boolean` | `true` | Show video information |
| `thumbnailQuality` | `'default' \| 'medium' \| 'high' \| 'standard' \| 'maxres'` | `'high'` | Thumbnail image quality |
| `showPlayButton` | `boolean` | `true` | Show play button overlay before loading iframe |
| `className` | `string` | `''` | Custom CSS class |
| `loading` | `boolean` | `false` | Show loading skeleton |
| `onError` | `(error: string) => void` | `undefined` | Error callback |
| `onLoad` | `() => void` | `undefined` | Load callback |

## Usage Examples

### Basic Video

```tsx
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  title="Never Gonna Give You Up"
  description="Rick Astley's classic hit from 1987"
/>
```

### Custom Aspect Ratio

```tsx
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  aspectRatio="4:3"
  title="Classic 4:3 Video"
/>
```

### Square Video (for social media)

```tsx
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  aspectRatio="1:1"
  title="Square Format Video"
/>
```

### Custom Dimensions

```tsx
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  aspectRatio="custom"
  width={800}
  height={450}
  title="Custom Sized Video"
/>
```

### Autoplay with Time Range

```tsx
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  autoplay={true}
  startTime={30}
  endTime={120}
  title="Video segment (30s-2min)"
/>
```

### No Privacy Mode (full YouTube features)

```tsx
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  privacyMode={false}
  showSuggested={true}
  title="Full YouTube Experience"
/>
```

### Immediate Loading (no play button)

```tsx
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  showPlayButton={false}
  title="Immediately Load Video"
/>
```

### With Error Handling

```tsx
<YouTubeVideo 
  videoId="invalid-id"
  title="This will show an error"
  onError={(error) => console.error('Video failed:', error)}
  onLoad={() => console.log('Video loaded successfully')}
/>
```

## Pre-configured Variants

The component includes several pre-configured variants for common use cases:

### YouTubeVideoWide (16:9)

```tsx
import { YouTubeVideoWide } from '@site/src/components/YouTubeVideo';

<YouTubeVideoWide 
  videoId="dQw4w9WgXcQ"
  title="Widescreen Video"
/>
```

### YouTubeVideoSquare (1:1)

```tsx
import { YouTubeVideoSquare } from '@site/src/components/YouTubeVideo';

<YouTubeVideoSquare 
  videoId="dQw4w9WgXcQ"
  title="Square Video"
/>
```

### YouTubeVideoClassic (4:3)

```tsx
import { YouTubeVideoClassic } from '@site/src/components/YouTubeVideo';

<YouTubeVideoClassic 
  videoId="dQw4w9WgXcQ"
  title="Classic 4:3 Video"
/>
```

## YouTube Playlist

For multiple videos:

```tsx
import { YouTubePlaylist } from '@site/src/components/YouTubeVideo';

<YouTubePlaylist
  videos={[
    { videoId: "dQw4w9WgXcQ", title: "Never Gonna Give You Up" },
    { videoId: "oHg5SJYRHA0", title: "Never Gonna Let You Down" },
    { videoId: "iik25wqIuFo", title: "Never Gonna Run Around" }
  ]}
  aspectRatio="16:9"
  showPlayButton={true}
/>
```

## Utility Functions

### Extract Video ID from URL

```tsx
import { extractVideoId } from '@site/src/components/YouTubeVideo';

const videoId = extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
// Returns: 'dQw4w9WgXcQ'

// Works with various YouTube URL formats:
extractVideoId('https://youtu.be/dQw4w9WgXcQ'); // ✅
extractVideoId('https://youtube.com/embed/dQw4w9WgXcQ'); // ✅
extractVideoId('https://youtube.com/watch?v=dQw4w9WgXcQ&t=30s'); // ✅
extractVideoId('https://youtube.com/shorts/dQw4w9WgXcQ'); // ✅
extractVideoId('https://youtube.com/live/dQw4w9WgXcQ'); // ✅
```

## Advanced Usage

### With Custom Styling

```tsx
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  title="Custom Styled Video"
  className="my-custom-video"
  style={{ borderRadius: '20px', maxWidth: '600px' }}
/>
```

### Loading State Management

```tsx
const [isLoading, setIsLoading] = useState(true);

<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  loading={isLoading}
  onLoad={() => setIsLoading(false)}
  onError={() => setIsLoading(false)}
/>
```

### Integration with FTC Team Videos

```tsx
// Example for FTC team robot reveal
<YouTubeVideo 
  videoId="your-robot-reveal-id"
  title="FTC Team 25805 - Robot Reveal 2024-25"
  description="Our INTO THE DEEP robot featuring advanced specimen manipulation"
  aspectRatio="16:9"
  showPlayButton={true}
  privacyMode={true}
/>
```

### Responsive Grid Layout

```tsx
<div className="video-grid">
  <YouTubeVideo videoId="robot-reveal" title="Robot Reveal" />
  <YouTubeVideo videoId="match-highlights" title="Match Highlights" />
  <YouTubeVideo videoId="team-interview" title="Team Interview" />
</div>

<style>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
</style>
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for play button and controls
- **Screen Reader Support**: Proper ARIA labels and video titles
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Reduced Motion**: Respects user's motion preferences

## Performance Considerations

- **Lazy Loading**: Videos load only when needed
- **Play Button Overlay**: Prevents automatic iframe loading for better performance
- **Optimized Thumbnails**: Automatic thumbnail quality selection
- **Privacy Mode**: Uses youtube-nocookie.com for enhanced privacy
- **Error Recovery**: Graceful handling of network issues and invalid video IDs

## Browser Support

- Modern browsers with ES2018+ support
- Graceful fallbacks for older browsers
- Automatic aspect-ratio polyfill for unsupported browsers

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import YouTubeVideo, { YouTubeVideoProps } from '@site/src/components/YouTubeVideo';

const videoProps: YouTubeVideoProps = {
  videoId: "dQw4w9WgXcQ",
  title: "Type-safe video",
  aspectRatio: "16:9", // Type-checked
  onError: (error: string) => console.error(error), // Typed callback
};
```

## Common Issues

### Invalid Video ID
```tsx
// ❌ Wrong - Full URL
<YouTubeVideo videoId="https://youtube.com/watch?v=dQw4w9WgXcQ" />

// ✅ Correct - Just the ID
<YouTubeVideo videoId="dQw4w9WgXcQ" />

// ✅ Or use the utility function
<YouTubeVideo videoId={extractVideoId("https://youtube.com/watch?v=dQw4w9WgXcQ")} />
```

### Privacy and Autoplay
```tsx
// Note: Autoplay may not work due to browser policies
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  autoplay={true} // May be blocked by browser
  privacyMode={true} // Recommended for GDPR compliance
/>
```

## Contributing

When contributing to this component:

1. Maintain TypeScript strict mode compliance
2. Add comprehensive prop documentation
3. Include accessibility testing
4. Test across different browsers and devices
5. Follow the existing code style and patterns

## License

This component is part of the FTC Team 25805 website project.