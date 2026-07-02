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

const logoPathByKey = logoContext.keys().reduce((acc, path) => {
  const key = path.replace('./logo-', '').replace(/\.(png|jpe?g|svg)$/, '');
  acc[key] = path;
  return acc;
}, {});

// Order follows the key order of testimonials.js, so reordering that file
// reorders the logos here. Only keys with a matching logo file are shown.
const logos = Object.keys(testimonials).reduce((acc, key) => {
  const path = logoPathByKey[key];
  if (path) {
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
