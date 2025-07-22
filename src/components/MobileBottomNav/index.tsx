/**
 * Mobile Bottom Navigation Component
 * Provides a bottom navigation bar optimized for mobile devices
 */

import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

interface NavItem {
  to: string;
  label: string;
  icon: JSX.Element;
}

// SVG Icons for better consistency and performance
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1.01L12 14l-2.99-4.99A2.5 2.5 0 0 0 7 8H5.46c-.81 0-1.54.59-1.42 1.37L6.5 16H9v6h2v-6h2v6h7z"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 3V1h10v2h5a2 2 0 0 1 2 2v3a5 5 0 0 1-5 5h-1.1a7.99 7.99 0 0 1-7.8 0H9a5 5 0 0 1-5-5V5a2 2 0 0 1 2-2h5zm12 2H5v3a3 3 0 0 0 3 3h1.11C9.51 9.66 10.71 9 12 9s2.49.66 2.89 2H16a3 3 0 0 0 3-3V5zM7 15h10v2a5 5 0 0 1-10 0v-2z"/>
  </svg>
);

const BlogIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const ResourcesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M5,19V5H19V19H5M17,17H7V15H17V17M17,13H7V11H17V13M17,9H7V7H17V9Z"/>
  </svg>
);

const CommunityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
  </svg>
);

const navItems: NavItem[] = [
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
    to: '/seasons/2024-25',
    label: 'Season',
    icon: <TrophyIcon />
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
  },
  {
    to: '/community',
    label: 'Community',
    icon: <CommunityIcon />
  }
];

export default function MobileBottomNav(): JSX.Element {
  const location = useLocation();
  
  const isActive = (to: string): boolean => {
    if (to === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(to);
  };

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.container}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={useBaseUrl(item.to)}
            className={`${styles.navItem} ${isActive(item.to) ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}