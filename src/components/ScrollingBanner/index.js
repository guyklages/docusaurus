import React from 'react';
import styles from './styles.module.css';

export default function ScrollingBanner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerTrack}>
        <span className={styles.bannerText}>
          Paragraph 1: Welcome to my site! This is a custom slow-scrolling banner built for Docusaurus.
        </span>
        <span className={styles.bannerText}>
          Paragraph 2: You can add multiple paragraphs or update this text with announcements, recent blog posts, or portfolio updates.
        </span>
        {/* Duplicate the text once to ensure a seamless infinite loop */}
        <span className={styles.bannerText}>
          Paragraph 1: Welcome to my site! This is a custom slow-scrolling banner built for Docusaurus.
        </span>
        <span className={styles.bannerText}>
          Paragraph 2: You can add multiple paragraphs or update this text with announcements, recent blog posts, or portfolio updates.
        </span>
      </div>
    </div>
  );
}