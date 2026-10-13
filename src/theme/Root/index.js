import React, {useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeedbackWidget from '@site/src/components/FeedbackWidget';

// Wraps the whole app so the feedback widget shows on every page
// (docs, blog, portfolio, and Redoc API reference pages alike).
export default function Root({children}) {
  const {siteConfig} = useDocusaurusContext();
  const {posthogKey, posthogHost} = siteConfig.customFields;

  useEffect(() => {
    if (!posthogKey) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, ' +
          'this causes events to be silently missed. ' +
          'This error stops appearing once POSTHOG_PROJECT_TOKEN is configured'
        );
      }
      return;
    }

    // Owner opt-out: visit any page with ?internal=1 to stop PostHog from
    // recording this browser (remembered in localStorage); ?internal=0 undoes it.
    const INTERNAL_KEY = 'ph_internal_user';
    let isInternal = false;
    try {
      const flag = new URLSearchParams(window.location.search).get('internal');
      if (flag === '1') {
        window.localStorage.setItem(INTERNAL_KEY, '1');
      } else if (flag === '0') {
        window.localStorage.removeItem(INTERNAL_KEY);
      }
      isInternal = window.localStorage.getItem(INTERNAL_KEY) === '1';
    } catch (e) {
      // localStorage can be blocked; treat as a normal visitor.
    }

    // posthog-js is browser-only; this useEffect only runs client-side.
    import('posthog-js').then(({default: posthog}) => {
      if (posthog.__loaded) {
        return;
      }
      posthog.init(posthogKey, {
        api_host: posthogHost,
        defaults: '2025-05-24',
        capture_pageview: true,
        capture_pageleave: true,
        opt_out_capturing_by_default: isInternal,
      });
      // Expose for console use, e.g. posthog.opt_out_capturing().
      window.posthog = posthog;
      if (isInternal) {
        posthog.opt_out_capturing();
      } else if (new URLSearchParams(window.location.search).get('internal') === '0') {
        posthog.opt_in_capturing();
      }
    });
  }, [posthogKey, posthogHost]);

  // Delegate-capture the GitHub navbar link click.
  useEffect(() => {
    function handleNavbarClick(event) {
      const link = event.target.closest('a[href*="github.com/guyklages"]');
      if (link) {
        const ph = window.posthog;
        if (ph) {
          ph.capture('github_profile_clicked', {
            href: link.href,
          });
        }
      }
    }
    document.addEventListener('click', handleNavbarClick);
    return () => document.removeEventListener('click', handleNavbarClick);
  }, []);

  return (
    <>
      {children}
      <FeedbackWidget />
    </>
  );
}
