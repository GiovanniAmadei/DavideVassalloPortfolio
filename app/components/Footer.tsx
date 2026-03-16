import Image from 'next/image'

export default function Footer({ globalSettings, tinaField }: { globalSettings?: any, tinaField?: any }) {
  return (
    <footer className="site-footer" style={{ padding: '2.5rem', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
      <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <span data-tina-field={tinaField ? tinaField(globalSettings, 'email') : undefined}>{globalSettings?.email || 'info@davidevassallo.net'}</span>
        <span data-tina-field={tinaField ? tinaField(globalSettings, 'telefono') : undefined}>{globalSettings?.telefono || '+39 333 217 4750'}</span>
        <span data-tina-field={tinaField ? tinaField(globalSettings, 'indirizzo') : undefined}>{globalSettings?.indirizzo || 'Milano, Italia'}</span>
      </div>
      <div className="footer-social">
        <a href={globalSettings?.instagram || "https://instagram.com"} target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href={globalSettings?.linkedin || "https://linkedin.com"} target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a href={globalSettings?.youtube || "https://youtube.com"} target="_blank" rel="noopener" aria-label="YouTube">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.545 3.5 12 3.5 12 3.5s-7.545 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.455 20.5 12 20.5 12 20.5s7.545 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
        <a href={globalSettings?.facebook || "https://facebook.com"} target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
          </svg>
        </a>
      </div>
      <div className="footer-content">
        <div className="footer-bottom" data-tina-field={tinaField ? tinaField(globalSettings, 'copyright') : undefined}>{globalSettings?.copyright || '\u00A9 2026 Davide Vassallo. All rights reserved.'}</div>
        <a href="http://amadevs.eu" target="_blank" rel="noopener noreferrer" className="footer-powered">
          <span>Powered by</span>
          <Image src="/assets/amadevs.png" alt="Amadevs" width={80} height={20} style={{ objectFit: 'contain' }} />
        </a>
      </div>
    </footer>
  )
}
