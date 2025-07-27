/**
 * Simplified Mobile Navigation Component
 * Clean, reliable mobile navigation without complex hooks
 */

import React from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

interface NavItem {
  label: string;
  to: string;
  icon: string;
}

const navigationItems: NavItem[] = [
  {
    label: 'Home',
    to: '/',
    icon: '🏠',
  },
  {
    label: 'Team',
    to: '/team',
    icon: '👥',
  },
  {
    label: 'Seasons',
    to: '/seasons',
    icon: '🏆',
  },
  {
    label: 'Resources',
    to: '/docs/intro',
    icon: '📚',
  },
  {
    label: 'More',
    to: '/community',
    icon: '⚡',
  },
];

export default function MobileNav(): React.ReactElement {
  const location = useLocation();

  // Simple active item detection
  const getActiveItem = (currentPath: string): string => {
    const activeNav = navigationItems.find(item => {
      if (item.to === '/') {
        return currentPath === '/';
      }
      return currentPath.startsWith(item.to);
    });
    return activeNav?.to || '';
  };

  const activeItem = getActiveItem(location.pathname);

  return (
    <nav 
      className={styles.mobileNav}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className={styles.navContainer}>
        {navigationItems.map((item) => {
          const isActive = activeItem === item.to;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                styles.navItem,
                {
                  [styles.active]: isActive,
                }
              )}
              aria-label={`Navigate to ${item.label}`}
            >
              <span 
                className={styles.navIcon}
                role="img"
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className={styles.navLabel}>
                {item.label}
              </span>
              {isActive && (
                <div className={styles.activeIndicator} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}