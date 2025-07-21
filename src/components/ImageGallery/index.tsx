import type { ReactNode } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
  date?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  showCategories?: boolean;
  showCaptions?: boolean;
  columns?: 2 | 3 | 4;
  aspectRatio?: 'square' | 'landscape' | 'auto';
  lightbox?: boolean;
  className?: string;
}

export default function ImageGallery({
  images,
  title,
  showCategories = true,
  showCaptions = true,
  columns = 3,
  aspectRatio = 'landscape',
  lightbox = true,
  className
}: ImageGalleryProps): ReactNode {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(images.filter(img => img.category).map(img => img.category!)))];

  // Filter images by category
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    if (lightbox) {
      setSelectedImage(image);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!selectedImage) return;
    
    switch (event.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox('prev');
        break;
      case 'ArrowRight':
        navigateLightbox('next');
        break;
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={clsx('ftc-card', styles.galleryContainer, className)}>
      {title && (
        <h3 className={styles.galleryTitle}>{title}</h3>
      )}

      {showCategories && categories.length > 1 && (
        <div className={styles.categoryFilter}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={clsx(styles.categoryButton, {
                [styles.active]: selectedCategory === category
              })}
            >
              {category === 'all' ? 'All Images' : category}
            </button>
          ))}
        </div>
      )}

      <div className={clsx(styles.imageGrid, {
        [styles.columns2]: columns === 2,
        [styles.columns3]: columns === 3,
        [styles.columns4]: columns === 4,
        [styles.aspectSquare]: aspectRatio === 'square',
        [styles.aspectLandscape]: aspectRatio === 'landscape',
        [styles.aspectAuto]: aspectRatio === 'auto'
      })}>
        {filteredImages.map(image => (
          <div
            key={image.id}
            className={styles.imageItem}
            onClick={() => openLightbox(image)}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(image)}
            tabIndex={0}
            role="button"
            aria-label={`View ${image.alt} in lightbox`}
          >
            <div className={styles.imageWrapper}>
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={styles.image}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayIcon}>🔍</div>
              </div>
            </div>
            
            {(showCaptions && (image.caption || image.date)) && (
              <div className={styles.imageCaption}>
                {image.caption && (
                  <div className={styles.captionText}>{image.caption}</div>
                )}
                {image.date && (
                  <div className={styles.captionDate}>{formatDate(image.date)}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className={styles.emptyState}>
          <p>No images found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightbox && selectedImage && (
        <div
          className={styles.lightboxOverlay}
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            
            {filteredImages.length > 1 && (
              <>
                <button
                  className={clsx(styles.lightboxNav, styles.lightboxPrev)}
                  onClick={() => navigateLightbox('prev')}
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  className={clsx(styles.lightboxNav, styles.lightboxNext)}
                  onClick={() => navigateLightbox('next')}
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}
            
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className={styles.lightboxImage}
            />
            
            {(selectedImage.caption || selectedImage.date) && (
              <div className={styles.lightboxCaption}>
                {selectedImage.caption && (
                  <div className={styles.lightboxCaptionText}>
                    {selectedImage.caption}
                  </div>
                )}
                {selectedImage.date && (
                  <div className={styles.lightboxCaptionDate}>
                    {formatDate(selectedImage.date)}
                  </div>
                )}
              </div>
            )}
            
            <div className={styles.lightboxCounter}>
              {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}