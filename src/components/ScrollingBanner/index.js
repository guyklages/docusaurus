import React from 'react';
import styles from './styles.module.css';

export default function ScrollingBanner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerTrack}>
        
        {/* --- SET 1 --- */}
        <div className={styles.bannerText}>
          "Your 650-character LinkedIn recommendation text goes here. It will automatically wrap into 5 or 6 lines beautifully based on the 480px width set in the CSS file."
        </div>
        <div className={styles.bannerText}>
          "Your second long LinkedIn recommendation text goes here..."
        </div>

        {/* --- DUPLICATE SET FOR INFINITE LOOP --- */}
        <div className={styles.bannerText}>
          "Your 650-character LinkedIn recommendation text goes here. It will automatically wrap into 5 or 6 lines beautifully based on the 480px width set in the CSS file."
        </div>
        <div className={styles.bannerText}>
          "Your second long LinkedIn recommendation text goes here..."
        </div>

      </div>
    </div>
  );
}