// Wraps the stock navbar color-mode toggle and adds a search icon to its left.
// The icon is only visible on mobile (see MobileSearch styles); desktop is unchanged.

import React from 'react';
import OriginalNavbarColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import MobileSearch from '@site/src/components/MobileSearch';

export default function NavbarColorModeToggle(props) {
  return (
    <>
      <MobileSearch />
      <OriginalNavbarColorModeToggle {...props} />
    </>
  );
}
