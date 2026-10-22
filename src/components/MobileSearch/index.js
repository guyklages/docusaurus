// Mobile-only search: a magnifier button in the top bar that opens a full-width
// search panel under the navbar. Reuses the desktop PageSearch component.

import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import PageSearch from '@site/src/components/PageSearch';
import styles from './styles.module.css';

export default function MobileSearch() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const location = useLocation();

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
        onClick={() => setOpen((o) => !o)}>
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
      {open && (
        <div ref={panelRef} className={styles.panel}>
          <PageSearch mobile />
        </div>
      )}
    </>
  );
}
