import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface NotebookEntry {
  id: string;
  date: string;
  title: string;
  category: 'design' | 'programming' | 'testing' | 'strategy' | 'reflection' | 'meeting';
  author: string;
  content: string;
  images?: string[];
  attachments?: {
    name: string;
    url: string;
    type: 'cad' | 'code' | 'data' | 'document';
  }[];
  tags?: string[];
  status?: 'draft' | 'review' | 'approved' | 'implemented';
}

export interface TechnicalNotebookProps {
  entries: NotebookEntry[];
  layout?: 'journal' | 'category' | 'timeline';
  showFilters?: boolean;
  showStats?: boolean;
  entriesPerPage?: number;
  title?: string;
  subtitle?: string;
}

export default function TechnicalNotebook({
  entries,
  layout = 'journal',
  showFilters = true,
  showStats = true,
  entriesPerPage = 10,
  title = 'Engineering Notebook',
  subtitle = 'Documentation of our design process, testing results, and team reflections'
}: TechnicalNotebookProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = React.useState<string>('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [expandedEntry, setExpandedEntry] = React.useState<string | null>(null);

  const categories = ['all', 'design', 'programming', 'testing', 'strategy', 'reflection', 'meeting'];
  const authors = ['all', ...Array.from(new Set(entries.map(entry => entry.author)))];

  const filteredEntries = entries.filter(entry => {
    const categoryMatch = selectedCategory === 'all' || entry.category === selectedCategory;
    const authorMatch = selectedAuthor === 'all' || entry.author === selectedAuthor;
    return categoryMatch && authorMatch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + entriesPerPage);

  const notebookStats = {
    totalEntries: entries.length,
    byCategory: categories.slice(1).reduce((acc, category) => {
      acc[category] = entries.filter(entry => entry.category === category).length;
      return acc;
    }, {} as Record<string, number>),
    recentEntries: entries.filter(entry => 
      new Date(entry.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'design': return '📐';
      case 'programming': return '💻';
      case 'testing': return '🧪';
      case 'strategy': return '♟️';
      case 'reflection': return '💭';
      case 'meeting': return '📋';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'design': return 'var(--notebook-design)';
      case 'programming': return 'var(--notebook-programming)';
      case 'testing': return 'var(--notebook-testing)';
      case 'strategy': return 'var(--notebook-strategy)';
      case 'reflection': return 'var(--notebook-reflection)';
      case 'meeting': return 'var(--notebook-meeting)';
      default: return 'var(--ifm-color-primary)';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'draft': return '✏️';
      case 'review': return '👀';
      case 'approved': return '✅';
      case 'implemented': return '🚀';
      default: return '';
    }
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'cad': return '🔧';
      case 'code': return '💾';
      case 'data': return '📊';
      case 'document': return '📄';
      default: return '📎';
    }
  };

  const toggleEntry = (entryId: string) => {
    setExpandedEntry(expandedEntry === entryId ? null : entryId);
  };

  return (
    <div className={styles.technicalNotebook}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {showStats && (
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{notebookStats.totalEntries}</div>
            <div className={styles.statLabel}>Total Entries</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{notebookStats.recentEntries}</div>
            <div className={styles.statLabel}>Recent (30 days)</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{notebookStats.byCategory.design || 0}</div>
            <div className={styles.statLabel}>Design Entries</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{notebookStats.byCategory.programming || 0}</div>
            <div className={styles.statLabel}>Programming Entries</div>
          </div>
        </div>
      )}

      {showFilters && (
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : 
                    category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Author:</label>
            <select 
              value={selectedAuthor} 
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className={styles.filterSelect}
            >
              {authors.map(author => (
                <option key={author} value={author}>
                  {author === 'all' ? 'All Authors' : author}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className={clsx(styles.entriesContainer, styles[layout])}>
        {paginatedEntries.map((entry) => (
          <article key={entry.id} className={styles.notebookEntry}>
            <div className={styles.entryHeader}>
              <div className={styles.entryMeta}>
                <div 
                  className={styles.categoryBadge} 
                  style={{ backgroundColor: getCategoryColor(entry.category) }}
                >
                  <span className={styles.categoryIcon}>{getCategoryIcon(entry.category)}</span>
                  <span className={styles.categoryName}>{entry.category}</span>
                </div>
                <div className={styles.entryInfo}>
                  <time className={styles.entryDate}>
                    {new Date(entry.date).toLocaleDateString()}
                  </time>
                  <span className={styles.entryAuthor}>by {entry.author}</span>
                  {entry.status && (
                    <span className={styles.statusBadge}>
                      {getStatusIcon(entry.status)} {entry.status}
                    </span>
                  )}
                </div>
              </div>
              <button 
                className={styles.expandButton}
                onClick={() => toggleEntry(entry.id)}
                aria-expanded={expandedEntry === entry.id}
                aria-label={`${expandedEntry === entry.id ? 'Collapse' : 'Expand'} entry`}
              >
                {expandedEntry === entry.id ? '▼' : '▶'}
              </button>
            </div>

            <div className={styles.entryContent}>
              <h3 className={styles.entryTitle}>{entry.title}</h3>
              
              <div className={clsx(
                styles.entryBody,
                expandedEntry === entry.id && styles.expanded
              )}>
                <div className={styles.contentText}>
                  {entry.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {expandedEntry === entry.id && (
                  <div className={styles.expandedContent}>
                    {entry.images && entry.images.length > 0 && (
                      <div className={styles.entryImages}>
                        <h4>Images & Diagrams</h4>
                        <div className={styles.imageGrid}>
                          {entry.images.map((image, index) => (
                            <img 
                              key={index}
                              src={image} 
                              alt={`${entry.title} - Image ${index + 1}`}
                              className={styles.entryImage}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.attachments && entry.attachments.length > 0 && (
                      <div className={styles.entryAttachments}>
                        <h4>Attachments</h4>
                        <div className={styles.attachmentList}>
                          {entry.attachments.map((attachment, index) => (
                            <a 
                              key={index}
                              href={attachment.url}
                              className={styles.attachmentLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className={styles.attachmentIcon}>
                                {getAttachmentIcon(attachment.type)}
                              </span>
                              <span className={styles.attachmentName}>
                                {attachment.name}
                              </span>
                              <span className={styles.attachmentType}>
                                ({attachment.type})
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.tags && entry.tags.length > 0 && (
                      <div className={styles.entryTags}>
                        <h4>Tags</h4>
                        <div className={styles.tagList}>
                          {entry.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageButton}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className={styles.pageButton}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      {filteredEntries.length === 0 && (
        <div className={styles.noResults}>
          <p>No notebook entries found matching the selected filters.</p>
        </div>
      )}
    </div>
  );
}