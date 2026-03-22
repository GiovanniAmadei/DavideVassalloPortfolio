'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: 'var(--background, #f9f8f6)',
        border: '1px solid var(--border, #e0ddd8)',
        padding: '1.25rem 1.5rem',
        maxWidth: '560px',
        width: 'calc(100vw - 3rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '0.78rem',
        letterSpacing: '0.04em',
        color: 'var(--foreground, #111111)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      <p style={{ margin: 0, lineHeight: '1.6' }}>
        Questo sito utilizza cookie tecnici necessari al suo funzionamento.
        Per maggiori informazioni consulta la nostra{' '}
        <a
          href="/privacy"
          style={{
            color: 'inherit',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          Privacy Policy
        </a>
        .
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button
          onClick={decline}
          style={{
            background: 'transparent',
            border: '1px solid var(--border, #e0ddd8)',
            padding: '0.4rem 1rem',
            fontFamily: 'inherit',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            color: 'var(--muted, #888888)',
          }}
        >
          Rifiuta
        </button>
        <button
          onClick={accept}
          style={{
            background: 'var(--foreground, #111111)',
            border: '1px solid var(--foreground, #111111)',
            padding: '0.4rem 1rem',
            fontFamily: 'inherit',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            color: 'var(--background, #f9f8f6)',
          }}
        >
          Accetta
        </button>
      </div>
    </div>
  )
}
