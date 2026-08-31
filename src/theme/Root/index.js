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
      });
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
