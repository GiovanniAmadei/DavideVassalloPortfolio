import Image from 'next/image'

export default function Footer({ globalSettings, tinaField }: { globalSettings?: any, tinaField?: any }) {
  return (
    <footer className="site-footer" style={{ padding: '2.5rem', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
      <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '2rem' }}>
        <span data-tina-field={tinaField ? tinaField(globalSettings, 'email') : undefined}>{globalSettings?.email || 'info@davidevassallo.net'}</span>
        <span style={{ margin: '0 0.8rem', color: 'var(--muted)' }}>&bull;</span>
        <span data-tina-field={tinaField ? tinaField(globalSettings, 'telefono') : undefined}>{globalSettings?.telefono || '+39 333 217 4750'}</span>
        <span style={{ margin: '0 0.8rem', color: 'var(--muted)' }}>&bull;</span>
        <span data-tina-field={tinaField ? tinaField(globalSettings, 'indirizzo') : undefined}>{globalSettings?.indirizzo || 'Milano, Italia'}</span>
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
