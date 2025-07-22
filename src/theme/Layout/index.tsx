/**
 * Custom Layout Wrapper
 * Extends default Docusaurus layout with mobile bottom navigation
 */

import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import MobileBottomNav from '../../components/MobileBottomNav';
import type { WrapperProps } from '@docusaurus/types';
import type LayoutType from '@theme/Layout';

type Props = WrapperProps<typeof LayoutType>;

export default function Layout(props: Props): JSX.Element {
  return (
    <>
      <OriginalLayout {...props} />
      <MobileBottomNav />
    </>
  );
}