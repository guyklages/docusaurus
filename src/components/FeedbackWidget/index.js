import React, {useState, useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

// Formspree form endpoint (guy.klages@gmail.com's form at formspree.io).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeajvlqn';

const STATE = {
  PROMPT: 'prompt',
  EXPANDED: 'expanded',
  SENDING: 'sending',
  SENT: 'sent',
  ERROR: 'error',
};

function ThumbUpIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M2 21h3V9H2v12zM23 10.5c0-.83-.67-1.5-1.5-1.5H15l1.02-4.94.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.5z"
      />
    </svg>
  );
}

function ThumbDownIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M22 3h-3v12h3V3zM1 13.5c0 .83.67 1.5 1.5 1.5H9l-1.02 4.94-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2H6c-.83 0-1.54.5-1.84 1.22L1.14 11.27c-.09.23-.14.47-.14.73v1.5z"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"
      />
    </svg>
  );
}

export default function FeedbackWidget() {
  const location = useLocation();
  const [state, setState] = useState(STATE.PROMPT);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [dismissed, setDismissed] = useState(false);

  // Reset to a fresh prompt whenever the visitor navigates to a new page.
  useEffect(() => {
    setState(STATE.PROMPT);
    setRating(null);
    setComment('');
    setDismissed(false);
  }, [location.pathname]);

  if (dismissed) {
    return null;
  }

  function selectRating(value) {
    setRating(value);
    setState(STATE.EXPANDED);
  }

  async function submitFeedback(event) {
    event.preventDefault();
    setState(STATE.SENDING);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'Website feedback',
          rating: rating === 'up' ? 'Useful' : 'Not useful',
          comment,
          page: typeof window !== 'undefined' ? window.location.href : location.pathname,
        }),
      });
      if (!response.ok) {
        throw new Error('Formspree submission failed');
      }
      setState(STATE.SENT);
    } catch (error) {
      setState(STATE.ERROR);
    }
  }

  return (
    <div className={styles.widget} role="complementary" aria-label="Page feedback">
      <button
        type="button"
        className={styles.closeButton}
        aria-label="Dismiss feedback widget"
        onClick={() => setDismissed(true)}
      >
        <CloseIcon />
      </button>

      {state === STATE.PROMPT && (
        <div className={styles.promptRow}>
          <span className={styles.promptText}>Was this page useful?</span>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Yes, this page was useful"
            onClick={() => selectRating('up')}
          >
            <ThumbUpIcon />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="No, this page was not useful"
            onClick={() => selectRating('down')}
          >
            <ThumbDownIcon />
          </button>
        </div>
      )}

      {(state === STATE.EXPANDED || state === STATE.SENDING || state === STATE.ERROR) && (
        <form className={styles.form} onSubmit={submitFeedback}>
          <div className={styles.promptRow}>
            <span className={styles.promptText}>
              {rating === 'up' ? 'Glad it helped!' : 'Sorry to hear that.'}
            </span>
            <button
              type="button"
              className={`${styles.iconButton} ${rating === 'up' ? styles.iconButtonActive : ''}`}
              aria-label="Yes, this page was useful"
              aria-pressed={rating === 'up'}
              onClick={() => setRating('up')}
            >
              <ThumbUpIcon />
            </button>
            <button
              type="button"
              className={`${styles.iconButton} ${rating === 'down' ? styles.iconButtonActive : ''}`}
              aria-label="No, this page was not useful"
              aria-pressed={rating === 'down'}
              onClick={() => setRating('down')}
            >
              <ThumbDownIcon />
            </button>
          </div>
          <textarea
            className={styles.textarea}
            rows={2}
            placeholder="Add a comment (optional)"
            aria-label="Feedback comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            disabled={state === STATE.SENDING}
          />
          {state === STATE.ERROR && (
            <p className={styles.errorText}>
              Something went wrong sending your feedback. Please try again.
            </p>
          )}
          <button type="submit" className={styles.sendButton} disabled={state === STATE.SENDING}>
            {state === STATE.SENDING ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}

      {state === STATE.SENT && (
        <p className={styles.thanksText}>Thanks for your feedback!</p>
      )}
    </div>
  );
}
