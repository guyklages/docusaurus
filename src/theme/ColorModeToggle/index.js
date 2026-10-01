// Swizzled (ejected) from @docusaurus/theme-classic ColorModeToggle.
// Replaces the single cycling icon with a three-option segmented control
// (Light / Dark / System), with all three icons visible at once.

import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import styles from './styles.module.css';

// Monitor icon for the "System" option (replaces the default half-filled
// circle). Stroke-based so it inherits the button's text color.
function IconSystemColorMode(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

const OPTIONS = [
  {
    value: 'light',
    Icon: IconLightMode,
    label: translate({
      message: 'Light',
      id: 'theme.colorToggle.ariaLabel.mode.light',
    }),
  },
  {
    value: 'dark',
    Icon: IconDarkMode,
    label: translate({
      message: 'Dark',
      id: 'theme.colorToggle.ariaLabel.mode.dark',
    }),
  },
  {
    value: null, // null = follow the operating system setting
    Icon: IconSystemColorMode,
    label: translate({
      message: 'System',
      id: 'theme.colorToggle.ariaLabel.mode.system',
    }),
  },
];

function ColorModeToggle({
  className,
  buttonClassName,
  respectPrefersColorScheme,
  value,
  onChange,
}) {
  const isBrowser = useIsBrowser();
  // Without respectPrefersColorScheme there is no "system" choice.
  const options = respectPrefersColorScheme
    ? OPTIONS
    : OPTIONS.filter((option) => option.value !== null);

  return (
    <div
      role="radiogroup"
      aria-label={translate({
        message: 'Color theme',
        id: 'theme.colorToggle.groupLabel',
      })}
      className={clsx(styles.toggle, className)}>
      {options.map(({value: optionValue, Icon, label}) => (
        <button
          key={label}
          type="button"
          role="radio"
          // Active state is styled from <html data-theme-choice> so it is
          // correct before React hydrates; aria-checked follows React state.
          data-choice={optionValue ?? 'system'}
          aria-checked={isBrowser ? value === optionValue : undefined}
          aria-label={label}
          title={label}
          disabled={!isBrowser}
          className={clsx(
            'clean-btn',
            styles.option,
            !isBrowser && styles.optionDisabled,
            buttonClassName,
          )}
          onClick={() => onChange(optionValue)}>
          <Icon aria-hidden className={styles.icon} />
        </button>
      ))}
    </div>
  );
}

export default React.memo(ColorModeToggle);
