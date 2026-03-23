'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import type { ContattiQuery } from "../../../tina/__generated__/types"
import Reveal from './Reveal'
import { loc } from '../lib/i18n'

interface ContattiContentProps {
  data: ContattiQuery
  query: string
  variables: object
}

export default function ContattiContent(props: ContattiContentProps) {
  const t = useTranslations('contact')
  const locale = useLocale()

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error || 'Errore nell\'invio.')
        setStatus('error')
      } else {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      }
    } catch {
      setErrorMsg('Errore di rete. Riprova più tardi.')
      setStatus('error')
    }
  }

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const contatti = data?.contatti || {} as any

  const sectionTitle = loc(contatti, 'titoloSezione', locale)

  return (
    <>
      <div className="page-hero">
        <Reveal tag="p" className="page-hero-label" data-tina-field={tinaField(contatti, locale === 'en' ? 'sottotitoloPagina_en' : 'sottotitoloPagina')}>
          {loc(contatti, 'sottotitoloPagina', locale) || t('pageLabel')}
        </Reveal>
        <Reveal tag="h1" className="page-hero-title" data-tina-field={tinaField(contatti, locale === 'en' ? 'titoloPagina_en' : 'titoloPagina')}>
          {loc(contatti, 'titoloPagina', locale) || t('pageTitle')}
        </Reveal>
      </div>

      <section className="section">
        <div className="contact-grid">
          <Reveal className="contact-info">
            <h2 data-tina-field={tinaField(contatti, locale === 'en' ? 'titoloSezione_en' : 'titoloSezione')}>
              {sectionTitle
                ? <span dangerouslySetInnerHTML={{ __html: sectionTitle.replace('\n', '<br />') }} />
                : <span dangerouslySetInnerHTML={{ __html: t('sectionTitle').replace('\n', '<br />') }} />
              }
            </h2>
            <p data-tina-field={tinaField(contatti, locale === 'en' ? 'testoSottoTitolo_en' : 'testoSottoTitolo')}>
              {loc(contatti, 'testoSottoTitolo', locale) || t('studioLabel')}
            </p>
            <p data-tina-field={tinaField(contatti, 'indirizzoStudio')}>{contatti.indirizzoStudio || 'Via Tortona 31, Milano'}</p>

            <p style={{ marginTop: '1rem' }}>{t('phoneLabel')}</p>
            <p data-tina-field={tinaField(contatti, 'telefono')}>{contatti.telefono || '+39 333 217 4750'}</p>

            <a href={`mailto:${contatti.email || 'info@davidevassallo.net'}`} className="email-link" data-tina-field={tinaField(contatti, 'email')}>
              {contatti.email || 'info@davidevassallo.net'}
            </a>

            <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="about-detail-row">
                <span className="about-detail-label">{t('portraitLabel')}</span>
                <span data-tina-field={tinaField(contatti, locale === 'en' ? 'orariRitratto_en' : 'orariRitratto')}>
                  {loc(contatti, 'orariRitratto', locale)}
                </span>
              </div>
              <div className="about-detail-row">
                <span className="about-detail-label">{t('reportageLabel')}</span>
                <span data-tina-field={tinaField(contatti, locale === 'en' ? 'orariReportage_en' : 'orariReportage')}>
                  {loc(contatti, 'orariReportage', locale)}
                </span>
              </div>
              <div className="about-detail-row">
                <span className="about-detail-label">{t('researchLabel')}</span>
                <span data-tina-field={tinaField(contatti, locale === 'en' ? 'orariRicerca_en' : 'orariRicerca')}>
                  {loc(contatti, 'orariRicerca', locale)}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className="contact-form" style={{ transitionDelay: '.15s' }} tag="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name" data-tina-field={tinaField(contatti, locale === 'en' ? 'formName_en' : 'formName')}>
                {loc(contatti, 'formName', locale) || t('formName')}
              </label>
              <input id="name" type="text" placeholder={t('placeholderName')} required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-field">
              <label htmlFor="email" data-tina-field={tinaField(contatti, 'formEmail')}>
                {contatti.formEmail || t('formEmail')}
              </label>
              <input id="email" type="email" placeholder={t('placeholderEmail')} required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-field">
              <label htmlFor="subject" data-tina-field={tinaField(contatti, locale === 'en' ? 'formSubject_en' : 'formSubject')}>
                {loc(contatti, 'formSubject', locale) || t('formSubject')}
              </label>
              <input id="subject" type="text" placeholder={t('placeholderSubject')} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
            </div>
            <div className="form-field">
              <label htmlFor="message" data-tina-field={tinaField(contatti, locale === 'en' ? 'formMessage_en' : 'formMessage')}>
                {loc(contatti, 'formMessage', locale) || t('formMessage')}
              </label>
              <textarea id="message" placeholder={t('placeholderMessage')} required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </div>
            {status === 'success' && (
              <p style={{ color: 'green', fontSize: '0.9rem' }}>Messaggio inviato! Ti risponderò presto.</p>
            )}
            {status === 'error' && (
              <p style={{ color: 'red', fontSize: '0.9rem' }}>{errorMsg}</p>
            )}
            <button type="submit" className="submit-btn" disabled={status === 'loading'} data-tina-field={tinaField(contatti, locale === 'en' ? 'formSubmit_en' : 'formSubmit')}>
              {status === 'loading' ? 'Invio in corso...' : (loc(contatti, 'formSubmit', locale) || t('formSubmit'))}
            </button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
