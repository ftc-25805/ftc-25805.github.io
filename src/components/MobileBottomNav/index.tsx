/**
 * Enhanced Mobile Bottom Navigation Component
 * Modern, comprehensive bottom navigation with all main navbar functionality
 */

import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

interface NavItem {
  to?: string;
  href?: string;
  label: string;
  icon: JSX.Element;
  badge?: string | number;
  isExternal?: boolean;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  onClick?: () => void;
}

interface DropdownItem {
  to: string;
  label: string;
  badge?: string;
}

// Enhanced SVG Icons with modern design and consistency
const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={styles.navIcon}>
    <path d="M12 2.1l8.4 8.4h-2.8v9.4h-4.2v-6.3h-3.2v6.3h-4.2v-9.4h-2.8l8.8-8.4z"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={styles.navIcon}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const SeasonsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={styles.navIcon}>
    <path d="M7 3V1h10v2h5a2 2 0 0 1 2 2v3a5 5 0 0 1-5 5h-1.1a7.99 7.99 0 0 1-7.8 0H9a5 5 0 0 1-5-5V5a2 2 0 0 1 2-2h5zm12 2H5v3a3 3 0 0 0 3 3h1.11C9.51 9.66 10.71 9 12 9s2.49.66 2.89 2H16a3 3 0 0 0 3-3V5zM7 15h10v2a5 5 0 0 1-10 0v-2z"/>
  </svg>
);

const BlogIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={styles.navIcon}>
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
  </svg>
);

const ResourcesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={styles.navIcon}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={styles.navIcon}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={styles.navIcon}>
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

const MoreIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={styles.navIcon}>
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
  </svg>
);

// Enhanced navigation items with all main navbar functionality
const getNavItems = (): NavItem[] => [
  {
    to: '/',
    label: 'Home',
    icon: <HomeIcon />
  },
  {
    to: '/team',
    label: 'Team',
    icon: <TeamIcon />
  },
  {
    label: 'Seasons',
    icon: <SeasonsIcon />,
    isDropdown: true,
    dropdownItems: [
      { to: '/seasons/2024-25', label: 'Current (2024-25)', badge: 'Active' },
      { to: '/seasons', label: 'All Seasons' },
      { to: '/seasons/2023-24', label: '2023-24' },
      { to: '/seasons/2022-23', label: '2022-23' },
    ]
  },
  {
    to: '/docs/intro',
    label: 'Resources',
    icon: <ResourcesIcon />
  },
  {
    to: '/blog',
    label: 'Blog',
    icon: <BlogIcon />
  }
];

const getSecondaryItems = (): NavItem[] => [
  {
    label: 'Search',
    icon: <SearchIcon />,
    onClick: () => {
      // Trigger search modal or navigate to search page
      const searchInput = document.querySelector('.DocSearch-Button') as HTMLElement;
      if (searchInput) {
        searchInput.click();
      } else {
        // Fallback: focus on search input if available
        const fallbackSearch = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (fallbackSearch) {
          fallbackSearch.focus();
        }
      }
    }
  },
  {
    href: 'https://github.com/ftc-25805',
    label: 'GitHub',
    icon: <GitHubIcon />,
    isExternal: true
  },
  {
    label: 'More',
    icon: <MoreIcon />,
    isDropdown: true,
    dropdownItems: [
      { to: '/community', label: 'Community' },
      { to: '/contact', label: 'Contact' },
      { to: '/community/sponsors', label: 'Sponsors' },
      { to: '/community/outreach', label: 'Outreach' },
    ]
  }
];

export default function MobileBottomNav(): JSX.Element {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);
  
  const isActive = (to?: string, dropdownItems?: DropdownItem[]): boolean => {
    if (!to && dropdownItems) {
      // Check if any dropdown item is active
      return dropdownItems.some(item => {
        if (item.to === '/') {
          return location.pathname === '/';
        }
        return location.pathname.startsWith(item.to);
      });
    }
    if (to === '/') {
      return location.pathname === '/';
    }
    return to ? location.pathname.startsWith(to) : false;
  };

  const handleDropdownToggle = (label: string) => {
    setShowDropdown(showDropdown === label ? null : label);
  };

  const renderNavItem = (item: NavItem, key: string, isSecondary = false) => {
    if (item.isDropdown && item.dropdownItems) {
      const isDropdownActive = isActive(undefined, item.dropdownItems);
      const isDropdownOpen = showDropdown === item.label;
      
      return (
        <div key={key} className={styles.dropdownContainer}>
          <button
            className={`${styles.navItem} ${isDropdownActive ? styles.active : ''} ${styles.dropdownToggle}`}
            onClick={() => handleDropdownToggle(item.label)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            <span className={`${styles.chevron} ${isDropdownOpen ? styles.chevronUp : ''}`}>
              <ChevronUpIcon />
            </span>
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              {item.dropdownItems.map((dropdownItem, index) => (
                <Link
                  key={index}
                  to={useBaseUrl(dropdownItem.to)}
                  className={`${styles.dropdownItem} ${isActive(dropdownItem.to) ? styles.active : ''}`}
                  onClick={() => setShowDropdown(null)}
                >
                  <span className={styles.dropdownLabel}>{dropdownItem.label}</span>
                  {dropdownItem.badge && <span className={styles.dropdownBadge}>{dropdownItem.badge}</span>}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.onClick) {
      return (
        <button
          key={key}
          className={styles.navItem}
          onClick={item.onClick}
          aria-label={item.label}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
          {item.badge && <span className={styles.badge}>{item.badge}</span>}
        </button>
      );
    }

    const linkProps = item.isExternal
      ? {
          href: item.href,
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      : {
          to: useBaseUrl(item.to!)
        };

    return (
      <Link
        key={key}
        {...linkProps}
        className={`${styles.navItem} ${isActive(item.to) ? styles.active : ''}`}
      >
        <span className={styles.icon}>{item.icon}</span>
        <span className={styles.label}>{item.label}</span>
        {item.badge && <span className={styles.badge}>{item.badge}</span>}
      </Link>
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(null);
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDropdown]);

  const primaryItems = getNavItems();
  const secondaryItems = getSecondaryItems();

  return (
    <>
      {/* Main Navigation */}
      <nav className={styles.bottomNav} role="navigation" aria-label="Mobile navigation">
        <div className={styles.container}>
          {primaryItems.map((item, index) => renderNavItem(item, `primary-${index}`))}
          <button
            className={`${styles.navItem} ${styles.moreToggle} ${showSecondaryNav ? styles.active : ''}`}
            onClick={() => setShowSecondaryNav(!showSecondaryNav)}
            aria-expanded={showSecondaryNav}
            aria-label="More options"
          >
            <span className={styles.icon}>
              <div className={`${styles.moreIconWrapper} ${showSecondaryNav ? styles.rotated : ''}`}>
                <MoreIcon />
              </div>
            </span>
            <span className={styles.label}>More</span>
          </button>
        </div>
      </nav>

      {/* Secondary Navigation */}
      {showSecondaryNav && (
        <div className={styles.secondaryNav}>
          <div className={styles.secondaryContainer}>
            {secondaryItems.map((item, index) => renderNavItem(item, `secondary-${index}`, true))}
          </div>
        </div>
      )}
    </>
  );
}