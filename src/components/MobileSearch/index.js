// Mobile-only search: a magnifier button in the top bar that opens a full-width
// search panel under the navbar. Reuses the desktop PageSearch component.

import React, {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useLocation} from '@docusaurus/router';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import PageSearch from '@site/src/components/PageSearch';
import styles from './styles.module.css';

export default function MobileSearch() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const location = useLocation();
  const sidebar = useNavbarMobileSidebar();
  // Wide content (e.g. tables) can stretch the layout viewport past the screen,
  // so size the panel to what is actually visible instead of left/right: 0.
  const [box, setBox] = useState(null);
  useEffect(() => {
    if (!open) return undefined;
    const vv = window.visualViewport;
    const update = () =>
      setBox(vv ? {left: vv.offsetLeft, width: vv.width} : null);
    update();
    vv?.addEventListener('resize', update);
    vv?.addEventListener('scroll', update);
    return () => {
      vv?.removeEventListener('resize', update);
      vv?.removeEventListener('scroll', update);
    };
  }, [open]);

  // Close after navigating (e.g. tapping a search result).
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector('input')?.focus();
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`clean-btn ${styles.iconButton}`}
        aria-label="Search"
        aria-expanded={open}
        onClick={() => {
          // The icon also shows next to the toggle inside the hamburger menu;
          // close that menu so the search panel isn't hidden behind it.
          if (sidebar.shown) sidebar.toggle();
          setOpen((o) => !o);
        }}>
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </button>
      {open &&
        createPortal(
          <div
            ref={panelRef}
            className={styles.panel}
            style={box ? {left: box.left, right: 'auto', width: box.width} : undefined}>
            <PageSearch mobile />
          </div>,
          document.body,
        )}
    </>
  );
}
