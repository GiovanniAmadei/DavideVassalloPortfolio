'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import { useTranslations } from 'next-intl'
import type { ContattiQuery } from "../../../tina/__generated__/types"
import Reveal from './Reveal'

interface ContattiContentProps {
  data: ContattiQuery
  query: string
  variables: object
}

export default function ContattiContent(props: ContattiContentProps) {
  const t = useTranslations('contact')

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const contatti = data?.contatti || {} as any

  return (
    <>
      <div className="page-hero">
        <Reveal tag="p" className="page-hero-label" data-tina-field={tinaField(contatti, 'sottotitoloPagina')}>{contatti.sottotitoloPagina || t('pageLabel')}</Reveal>
        <Reveal tag="h1" className="page-hero-title" data-tina-field={tinaField(contatti, 'titoloPagina')}>{contatti.titoloPagina || t('pageTitle')}</Reveal>
      </div>

      <section className="section">
        <div className="contact-grid">
          <Reveal className="contact-info">
            <h2 data-tina-field={tinaField(contatti, 'titoloSezione')}>{contatti.titoloSezione ? <span dangerouslySetInnerHTML={{ __html: contatti.titoloSezione.replace('\n', '<br />') }} /> : <span dangerouslySetInnerHTML={{ __html: t('sectionTitle').replace('\n', '<br />') }} />}</h2>
            <p data-tina-field={tinaField(contatti, 'testoSottoTitolo')}>{contatti.testoSottoTitolo || t('studioLabel')}</p>
            <p data-tina-field={tinaField(contatti, 'indirizzoStudio')}>{contatti.indirizzoStudio || 'Via Tortona 31, Milano'}</p>

            <p style={{ marginTop: '1rem' }}>{t('phoneLabel')}</p>
            <p data-tina-field={tinaField(contatti, 'telefono')}>{contatti.telefono || '+39 333 217 4750'}</p>

            <a href={`mailto:${contatti.email || 'info@davidevassallo.net'}`} className="email-link" data-tina-field={tinaField(contatti, 'email')}>
              {contatti.email || 'info@davidevassallo.net'}
            </a>

            <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="about-detail-row"><span className="about-detail-label">{t('portraitLabel')}</span><span data-tina-field={tinaField(contatti, 'orariRitratto')}>{contatti.orariRitratto}</span></div>
              <div className="about-detail-row"><span className="about-detail-label">{t('reportageLabel')}</span><span data-tina-field={tinaField(contatti, 'orariReportage')}>{contatti.orariReportage}</span></div>
              <div className="about-detail-row"><span className="about-detail-label">{t('researchLabel')}</span><span data-tina-field={tinaField(contatti, 'orariRicerca')}>{contatti.orariRicerca}</span></div>
            </div>
          </Reveal>

          <Reveal className="contact-form" style={{ transitionDelay: '.15s' }} tag="form">
            <div className="form-field">
              <label htmlFor="name" data-tina-field={tinaField(contatti, 'formName')}>{contatti.formName || t('formName')}</label>
              <input id="name" type="text" placeholder={t('placeholderName')} required />
            </div>
            <div className="form-field">
              <label htmlFor="email" data-tina-field={tinaField(contatti, 'formEmail')}>{contatti.formEmail || t('formEmail')}</label>
              <input id="email" type="email" placeholder={t('placeholderEmail')} required />
            </div>
            <div className="form-field">
              <label htmlFor="subject" data-tina-field={tinaField(contatti, 'formSubject')}>{contatti.formSubject || t('formSubject')}</label>
              <input id="subject" type="text" placeholder={t('placeholderSubject')} />
            </div>
            <div className="form-field">
              <label htmlFor="message" data-tina-field={tinaField(contatti, 'formMessage')}>{contatti.formMessage || t('formMessage')}</label>
              <textarea id="message" placeholder={t('placeholderMessage')} required />
            </div>
            <button type="submit" className="submit-btn" data-tina-field={tinaField(contatti, 'formSubmit')}>{contatti.formSubmit || t('formSubmit')}</button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
