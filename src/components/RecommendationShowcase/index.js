import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import testimonials from '@site/src/data/testimonials';
import styles from './styles.module.css';

// Auto-discover every static/img/logo-*.* file so new logos don't require code changes.
const logoContext = require.context(
  '@site/static/img',
  false,
  /^\.\/logo-.+\.(png|jpe?g|svg)$/,
);

const logos = logoContext.keys().reduce((acc, path) => {
  const key = path.replace('./logo-', '').replace(/\.(png|jpe?g|svg)$/, '');
  // Only show logos that have a matching testimonial entry.
  if (testimonials[key]) {
    acc.push({key, src: logoContext(path).default});
  }
  return acc;
}, []);

export default function RecommendationShowcase() {
  const [activeKey, setActiveKey] = useState(logos[0]?.key);
  const active = useMemo(() => testimonials[activeKey], [activeKey]);

  if (!active) {
    return null;
  }

  return (
    <section className={styles.showcase}>
      <div className={styles.textBox}>
        <p className={styles.quote}>&ldquo;{active.quote}&rdquo;</p>
        <p className={styles.attribution}>
          {active.link ? (
            <a href={active.link} target="_blank" rel="noopener noreferrer">
              {active.person}
            </a>
          ) : (
            active.person
          )}
          {' '}&mdash; {active.role} at {active.company}
        </p>
      </div>
      <div className={styles.logoRow}>
        {logos.map(({key, src}) => (
          <button
            key={key}
            type="button"
            className={clsx(styles.logoButton, key === activeKey && styles.logoButtonActive)}
            onMouseEnter={() => setActiveKey(key)}
            onFocus={() => setActiveKey(key)}
            aria-label={`Show recommendation from ${testimonials[key].company}`}>
            <img
              src={src}
              alt={`${testimonials[key].company} logo`}
              className={styles.logoImg}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
