/**
 * Enhanced Layout Component with Simplified Mobile Navigation
 * Clean implementation without complex hooks
 */

import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import MobileNav from '@site/src/components/MobileNav';
import useIsBrowser from '@docusaurus/useIsBrowser';
import type { WrapperProps } from '@docusaurus/types';
import type LayoutType from '@theme/Layout';

type Props = WrapperProps<typeof LayoutType>;

export default function Layout(props: Props): React.ReactElement {
  const isBrowser = useIsBrowser();

  return (
    <>
      <OriginalLayout {...props} />
      {isBrowser && <MobileNav />}
      
      {/* Add safe area spacing for mobile nav */}
      <style>
        {`
          /* Ensure content doesn't overlap with mobile nav */
          @media (max-width: 996px) {
            .main-wrapper {
              padding-bottom: 85px;
            }
            
            .footer {
              padding-bottom: calc(var(--ifm-footer-padding-vertical) + 85px);
            }
            
            html {
              scroll-padding-bottom: 85px;
            }
          }
        `}
      </style>
    </>
  );
}