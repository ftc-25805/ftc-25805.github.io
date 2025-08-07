/**
 * YouTubeVideo Component Examples
 * Demonstration of various usage patterns
 */

import React from 'react';
import YouTubeVideo, { 
  YouTubeVideoWide, 
  YouTubeVideoSquare, 
  YouTubeVideoClassic,
  YouTubePlaylist,
  extractVideoId 
} from './index';

// Example usage in a page or component
export const YouTubeVideoExamples = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>YouTube Video Component Examples</h2>
      
      {/* Basic Example */}
      <section style={{ marginBottom: '3rem' }}>
        <h3>Basic Video</h3>
        <YouTubeVideo 
          videoId="dQw4w9WgXcQ"
          title="Never Gonna Give You Up - Rick Astley"
          description="The classic 1987 hit that became an internet phenomenon"
        />
      </section>

      {/* FTC Robot Example */}
      <section style={{ marginBottom: '3rem' }}>
        <h3>FTC Team Robot Showcase</h3>
        <YouTubeVideo 
          videoId="your-robot-video-id-here"
          title="FTC Team 25805 - INTO THE DEEP Robot Reveal"
          description="Our 2024-25 season robot featuring innovative specimen manipulation and autonomous navigation"
          aspectRatio="16:9"
          showPlayButton={true}
          privacyMode={true}
        />
      </section>

      {/* Different Aspect Ratios */}
      <section style={{ marginBottom: '3rem' }}>
        <h3>Different Aspect Ratios</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <YouTubeVideoWide 
            videoId="dQw4w9WgXcQ"
            title="16:9 Widescreen"
          />
          <YouTubeVideoSquare 
            videoId="dQw4w9WgXcQ"
            title="1:1 Square"
          />
          <YouTubeVideoClassic 
            videoId="dQw4w9WgXcQ"
            title="4:3 Classic"
          />
        </div>
      </section>

      {/* Playlist Example */}
      <section style={{ marginBottom: '3rem' }}>
        <h3>Video Playlist</h3>
        <YouTubePlaylist
          videos={[
            { 
              videoId: "your-match-highlights-id", 
              title: "Regional Tournament Highlights",
              description: "Best moments from our regional competition"
            },
            { 
              videoId: "your-team-interview-id", 
              title: "Team Interview - Engineering Process",
              description: "Behind the scenes of our robot development"
            },
            { 
              videoId: "your-outreach-video-id", 
              title: "Community Outreach Program",
              description: "Teaching STEM to local elementary schools"
            }
          ]}
          aspectRatio="16:9"
          showPlayButton={true}
        />
      </section>

      {/* Advanced Example with Error Handling */}
      <section style={{ marginBottom: '3rem' }}>
        <h3>Advanced Usage with Error Handling</h3>
        <YouTubeVideo 
          videoId="dQw4w9WgXcQ"
          title="Advanced Example"
          description="This example shows error handling and event callbacks"
          startTime={30}
          endTime={90}
          onLoad={() => console.log('Video loaded successfully!')}
          onError={(error) => console.error('Video error:', error)}
          className="custom-video-styling"
        />
      </section>

      {/* URL Extraction Example */}
      <section style={{ marginBottom: '3rem' }}>
        <h3>URL Extraction Example</h3>
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '1rem' }}>
          <code>
            const videoId = extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
            <br />
            // Result: 'dQw4w9WgXcQ'
          </code>
        </div>
        <YouTubeVideo 
          videoId={extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ') || 'dQw4w9WgXcQ'}
          title="Video from extracted URL"
        />
      </section>
    </div>
  );
};

// Example for MDX/Markdown usage
export const MDXExample = `
# Using YouTube Videos in MDX

You can easily embed YouTube videos in your MDX content:

\`\`\`tsx
import YouTubeVideo from '@site/src/components/YouTubeVideo';

<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  title="Never Gonna Give You Up"
  aspectRatio="16:9"
/>
\`\`\`

## FTC Team Video Examples

### Robot Reveal
<YouTubeVideo 
  videoId="your-robot-reveal-id"
  title="FTC Team 25805 - Robot Reveal 2024-25"
  description="Our INTO THE DEEP robot showcase"
/>

### Match Highlights
<YouTubeVideo 
  videoId="your-match-id"
  title="Regional Tournament - Match Highlights"
  description="Best moments from competition"
  startTime={45}
/>
`;

export default YouTubeVideoExamples;