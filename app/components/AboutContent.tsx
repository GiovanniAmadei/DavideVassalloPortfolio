'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import { useTranslations, useLocale } from 'next-intl'
import type { ChiSonoQuery } from "../../../tina/__generated__/types"
import Reveal from './Reveal'
import { loc } from '../lib/i18n'

interface AboutContentProps {
  data: ChiSonoQuery
  query: string
  variables: object
}

export default function AboutContent(props: AboutContentProps) {
  const t = useTranslations('about')
  const locale = useLocale()

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const chiSono = data?.chiSono || {} as any

  return (
    <>
      <div className="page-hero">
        <Reveal tag="p" className="page-hero-label" data-tina-field={tinaField(chiSono, locale === 'en' ? 'sottotitolo_en' : 'sottotitolo')}>
          {loc(chiSono, 'sottotitolo', locale) || t('label')}
        </Reveal>
        <Reveal tag="h1" className="page-hero-title" data-tina-field={tinaField(chiSono, locale === 'en' ? 'titolo_en' : 'titolo')}>
          {loc(chiSono, 'titolo', locale) || t('title')}
        </Reveal>
      </div>

      <section className="section">
        <div className="about-grid">
          <Reveal className="about-image" data-tina-field={tinaField(chiSono, "fotoProfilo")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chiSono.fotoProfilo || "/assets/DSC_0222-Enhanced-NR-2-2.jpg"} alt="Davide Vassallo" />
          </Reveal>
          <Reveal className="about-text" style={{ transitionDelay: '.15s' }}>
            <h2 data-tina-field={tinaField(chiSono, locale === 'en' ? 'titolo_en' : 'titolo')}>
              {loc(chiSono, 'titolo', locale) || 'Davide Vassallo'}
            </h2>

            <div data-tina-field={tinaField(chiSono, locale === 'en' ? 'descrizione_en' : 'descrizione')}>
              {(() => {
                const desc = locale === 'en' ? chiSono.descrizione_en : chiSono.descrizione
                return desc ? (
                  <div style={{ whiteSpace: 'pre-line' }}>{JSON.stringify(desc)}</div>
                ) : (
                  <>
                    <p>{t('bio1')}</p>
                    <p>{t('bio2')}</p>
                    <p>{t('bio3')}</p>
                  </>
                )
              })()}
            </div>

            <div className="about-details">
              {(chiSono.esperienze?.length > 0 ? chiSono.esperienze : [
                { anno: t('detailBase'), titolo: t('detailBaseValue') },
                { anno: t('detailSpec'), titolo: t('detailSpecValue') },
                { anno: t('detailGear'), titolo: t('detailGearValue') },
                { anno: t('detailAvail'), titolo: t('detailAvailValue') }
              ]).map((esp: any, i: number) => (
                <div className="about-detail-row" key={i} data-tina-field={tinaField(esp)}>
                  <span className="about-detail-label" data-tina-field={tinaField(esp, "anno")}>{esp.anno}</span>
                  <span data-tina-field={tinaField(esp, locale === 'en' ? 'titolo_en' : 'titolo')}>
                    {loc(esp, 'titolo', locale) || esp.titolo}
                    {esp.luogo ? ` - ${esp.luogo}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="philosophy">
        <div className="philosophy-inner">
          <Reveal className="section-header" style={{ marginBottom: '3rem' }}>
            <span className="section-label" data-tina-field={tinaField(chiSono, locale === 'en' ? 'filosofiaTitolo_en' : 'filosofiaTitolo')}>
              {loc(chiSono, 'filosofiaTitolo', locale) || t('philosophyTitle')}
            </span>
            <div className="section-rule" />
          </Reveal>
          <Reveal tag="blockquote" className="philosophy-quote" data-tina-field={tinaField(chiSono, locale === 'en' ? 'filosofiaCitazione_en' : 'filosofiaCitazione')}>
            {loc(chiSono, 'filosofiaCitazione', locale) || t('philosophyQuote')}
          </Reveal>
          <Reveal tag="p" className="philosophy-attr" style={{ transitionDelay: '.15s' }} data-tina-field={tinaField(chiSono, "filosofiaAutore")}>
            — {chiSono.filosofiaAutore || t('philosophyAuthor')}
          </Reveal>
          <Reveal tag="p" style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '640px', marginTop: '2.5rem', transitionDelay: '.25s' }} data-tina-field={tinaField(chiSono, locale === 'en' ? 'filosofiaDescrizione_en' : 'filosofiaDescrizione')}>
            {loc(chiSono, 'filosofiaDescrizione', locale) || t('philosophyDesc')}
          </Reveal>
        </div>
      </section>
    </>
  )
}
