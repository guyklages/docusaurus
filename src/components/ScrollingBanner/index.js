import React from 'react';
import styles from './styles.module.css';

export default function ScrollingBanner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerTrack}>
        
        {/* --- SET 1 --- */}
        <div className={styles.bannerText}>
          "Guy was our lead and only tech writer and was an important part of my team. His work was clear, organized and thoughtful, across all product areas. As a former software engineer, he wrote in a way our engineers and customers' engineers understood easily, and his passion for perfectionism was appreciated by many. I hope to work with Guy (and his sense of humor) again in the future." <br/> <br/> <a href="https://www.linkedin.com/in/joneisenstein/" target="_blank" rel="noopener noreferrer">Jon Eisenstein, Manager of Guy at FIS Global</a>
        </div>
        <div className={styles.bannerText}>
          "Guy is an outstanding technical writer who consistently turns complex information into clear, accessible content. His ability to collaborate across teams and understand technical nuances makes him a trusted communicator and a key asset to any project. Working with him has been seamless and insightful. I would highly recommend him to any team looking for top-tier documentation and communication skills." <br/> <br/> <a href="https://www.linkedin.com/in/jeyshree-k-s/" target="_blank" rel="nooperer noreferrer">Jeyshree Krishnaswarmy Sundararajan, coworker of Guy from another team at FIS Global</a>
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