import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import testimonials from '@site/src/data/testimonials';
import styles from './styles.module.css';

const DISPLAY_MS = 10000;
const FADE_MS = 700;

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const activeKey = logos[activeIndex]?.key;
  const active = useMemo(() => testimonials[activeKey], [activeKey]);

  // After DISPLAY_MS of being shown (and not paused by hover/focus), start the fade-out.
  useEffect(() => {
    if (paused || logos.length === 0) {
      return undefined;
    }
    const displayTimer = setTimeout(() => setVisible(false), DISPLAY_MS);
    return () => clearTimeout(displayTimer);
  }, [activeIndex, paused]);

  // Once faded out, advance to the next recommendation (wrapping around) and fade back in.
  useEffect(() => {
    if (visible) {
      return undefined;
    }
    const fadeTimer = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % logos.length);
      setVisible(true);
    }, FADE_MS);
    return () => clearTimeout(fadeTimer);
  }, [visible]);

  if (!active) {
    return null;
  }

  const selectLogo = (index, company) => {
    setActiveIndex(index);
    setVisible(true);
    const ph = typeof window !== 'undefined' ? window.posthog : undefined;
    if (ph && company) {
      ph.capture('recommendation_logo_selected', {
        company,
      });
    }
  };

  return (
    <section className={styles.showcase}>
      <div className={styles.textBox}>
        <div
          className={styles.fadeContent}
          style={{opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms`}}>
          <p className={styles.quote}>&ldquo;{active.quote}&rdquo;</p>
          <p className={styles.attribution}>
            {active.link ? (
              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  const ph = typeof window !== 'undefined' ? window.posthog : undefined;
                  if (ph) {
                    ph.capture('recommendation_link_clicked', {
                      company: active.company,
                      role: active.role,
                    });
                  }
                }}>
                {active.person}
              </a>
            ) : (
              active.person
            )}
            {' '}&mdash; {active.role} at {active.company}
          </p>
        </div>
      </div>
      <div
        className={styles.logoRow}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}>
        {logos.map(({key, src}, index) => (
          <button
            key={key}
            type="button"
            className={clsx(styles.logoButton, key === activeKey && styles.logoButtonActive)}
            onMouseEnter={() => selectLogo(index, testimonials[key].company)}
            onFocus={() => selectLogo(index, testimonials[key].company)}
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
