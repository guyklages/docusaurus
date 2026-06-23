import React from 'react';
import styles from './styles.module.css';

export default function ScrollingBanner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerTrack}>
        
        {/* --- SET 1 --- */}
        <div className={styles.bannerText}>
          "Guy was our lead and only tech writer and was an important part of my team. His work was clear, organized and thoughtful, across all product areas. As a former software engineer, he wrote in a way our engineers and customers' engineers understood easily, and his passion for perfectionism was appreciated by many. I hope to work with Guy (and his sense of humor) again in the future." <br/> <br/> <a href="https://www.linkedin.com/in/joneisenstein/" target="_blank" rel="noopener noreferrer">Jon Eisenstein <br/> Manager at FIS Global</a>
        </div>
        <div className={styles.bannerText}>
          "Guy is an outstanding technical writer who consistently turns complex information into clear, accessible content. His ability to collaborate across teams and understand technical nuances makes him a trusted communicator and a key asset to any project. Working with him has been seamless and insightful. I would highly recommend him to any team looking for top-tier documentation and communication skills." <br/> <br/> <a href="https://www.linkedin.com/in/jeyshree-k-s/" target="_blank" rel="nooperer noreferrer">Jeyshree Krishnaswarmy Sundararajan <br/> Coworker at FIS Global</a>
        </div>
        <div className={styles.bannerText}>
          "Guy consistently demonstrates a high level of professionalism, and dedication. He has a collaborative spirit, always willing to go the extra mile to ensure the success of our projects. Guy has a positive attitude and strong work ethic. It's been a pleasure working alongside Guy, and I am confident that he will continue to excel in his future endeavors." <br/><br/> <a href="https://www.linkedin.com/in/krantitalluri/" target="_blank" rel="noopener noreferrer">Kranti Talluri <br/> Manager at Nium</a>
        </div>
        <div className={styles.bannerText}>
          "I enjoyed working with Guy very much. His sense of humor and flexibility to join late-night meetings helped us finish before deadlines. His ability to turn vague product documents to developer friendly technical content is miraculously. I hope to work with him again in the future." <br/><br/> <a href="https://www.linkedin.com/in/abhishek-nallana/" target="_blank" rel="noopener noreferrer">Nallana Abhishek <br/> Coworker at Nium</a>
        </div>

        {/* --- DUPLICATE SET FOR INFINITE LOOP --- */}
        <div className={styles.bannerText}>
          "Guy was our lead and only tech writer and was an important part of my team. His work was clear, organized and thoughtful, across all product areas. As a former software engineer, he wrote in a way our engineers and customers' engineers understood easily, and his passion for perfectionism was appreciated by many. I hope to work with Guy (and his sense of humor) again in the future." <br/> <br/> <a href="https://www.linkedin.com/in/joneisenstein/" target="_blank" rel="noopener noreferrer">Jon Eisenstein <br/> Manager at FIS Global</a>
        </div>
        <div className={styles.bannerText}>
          "Guy is an outstanding technical writer who consistently turns complex information into clear, accessible content. His ability to collaborate across teams and understand technical nuances makes him a trusted communicator and a key asset to any project. Working with him has been seamless and insightful. I would highly recommend him to any team looking for top-tier documentation and communication skills." <br/> <br/> <a href="https://www.linkedin.com/in/jeyshree-k-s/" target="_blank" rel="nooperer noreferrer">Jeyshree Krishnaswarmy Sundararajan <br/> Coworker at FIS Global</a>
        </div>
        <div className={styles.bannerText}>
          "Guy consistently demonstrates a high level of professionalism, and dedication. He has a collaborative spirit, always willing to go the extra mile to ensure the success of our projects. Guy has a positive attitude and strong work ethic. It's been a pleasure working alongside Guy, and I am confident that he will continue to excel in his future endeavors." <br/><br/> <a href="https://www.linkedin.com/in/krantitalluri/" target="_blank" rel="noopener noreferrer">Kranti Talluri <br/> Manager at Nium</a>
        </div>
        <div className={styles.bannerText}>
          "I enjoyed working with Guy very much. His sense of humor and flexibility to join late-night meetings helped us finish before deadlines. His ability to turn vague product documents to developer friendly technical content is miraculously. I hope to work with him again in the future." <br/><br/> <a href="https://www.linkedin.com/in/abhishek-nallana/" target="_blank" rel="noopener noreferrer">Nallana Abhishek <br/> Coworker at Nium</a>
        </div>

      </div>
    </div>
  );
}