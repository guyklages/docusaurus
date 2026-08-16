import React, { createContext, useContext, useState } from 'react';

const DefinitionContext = createContext(null);

/**
 * Wrap a table (or any section) in this. It holds the shared "currently
 * shown definition" state so multiple DefTerm instances can all update
 * one DefinitionPanel.
 */
export function DefinitionProvider({
  children,
  placeholder = 'Hover or tap a term to see its definition here.',
}) {
  const [activeDef, setActiveDef] = useState(null);
  return (
    <DefinitionContext.Provider value={{ activeDef, setActiveDef, placeholder }}>
      {children}
    </DefinitionContext.Provider>
  );
}

/**
 * Wrap any word/phrase in this inside a table cell (or anywhere) to make
 * it interactive. Pass the explanation text via the `def` prop.
 *
 * Usage inside a markdown table cell:
 *   <DefTerm def="A fintech company specializing in cross-border payments.">Nium</DefTerm>
 */
export function DefTerm({ def, children }) {
  const ctx = useContext(DefinitionContext);
  if (!ctx) {
    throw new Error('<DefTerm> must be used inside a <DefinitionProvider>.');
  }
  const { setActiveDef } = ctx;
  const show = () => setActiveDef(def);

  return (
    <span
      tabIndex={0}
      role="button"
      aria-describedby="definition-panel"
      onMouseEnter={show}
      onFocus={show}
      onClick={show}
      style={{
        textDecoration: 'underline dotted',
        textUnderlineOffset: '3px',
        cursor: 'pointer',
      }}
    >
      {children}
    </span>
  );
}

/**
 * Place this once, right after the table it explains. It shows whichever
 * DefTerm was most recently hovered/tapped/focused.
 */
export function DefinitionPanel() {
  const ctx = useContext(DefinitionContext);
  if (!ctx) {
    throw new Error('<DefinitionPanel> must be used inside a <DefinitionProvider>.');
  }
  const { activeDef, placeholder } = ctx;

  return (
    <div
      id="definition-panel"
      style={{
        marginTop: '1rem',
        padding: '1rem 1.25rem',
        background: 'var(--ifm-color-emphasis-100)',
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: 'var(--ifm-color-emphasis-800)',
        minHeight: '1.5rem',
      }}
    >
      {activeDef || placeholder}
    </div>
  );
}