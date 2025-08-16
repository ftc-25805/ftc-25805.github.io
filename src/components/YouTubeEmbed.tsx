import React from 'react';

type YouTubeEmbedProps = {
  videoId: string;
  width?: string | number;
  height?: string | number;
  title?: string;
};

export default function YouTubeEmbed({ 
  videoId, 
  width = '100%', 
  height = 315,
  title = 'YouTube video player'
}: YouTubeEmbedProps): React.JSX.Element {
  // Validate video ID format (basic YouTube video ID pattern)
  const isValidVideoId = /^[a-zA-Z0-9_-]{11}$/.test(videoId);
  
  if (!isValidVideoId) {
    console.warn(`Invalid YouTube video ID: ${videoId}`);
    return (
      <div className="youtube-embed-error">
        <p>Invalid YouTube video ID provided</p>
      </div>
    );
  }

  return (
    <div className="youtube-embed-container">
      <iframe
        className="youtube-embed-iframe"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
      />
    </div>
  );
}