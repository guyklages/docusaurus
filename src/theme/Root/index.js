import React from 'react';
import FeedbackWidget from '@site/src/components/FeedbackWidget';

// Wraps the whole app so the feedback widget shows on every page
// (docs, blog, portfolio, and Redoc API reference pages alike).
export default function Root({children}) {
  return (
    <>
      {children}
      <FeedbackWidget />
    </>
  );
}
