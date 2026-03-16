'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import type { ContattiQuery } from "../../../tina/__generated__/types"
import Reveal from './Reveal'

interface ContattiContentProps {
  data: ContattiQuery
  query: string
  variables: object
}

export default function ContattiContent(props: ContattiContentProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  // fallback if Tina lacks data
  const contatti = data?.contatti || {} as any

  return (
    <>
      <div className="page-hero">
        <Reveal tag="p" className="page-hero-label" data-tina-field={tinaField(contatti, 'sottotitoloPagina')}>{contatti.sottotitoloPagina || 'Parliamoci'}</Reveal>
        <Reveal tag="h1" className="page-hero-title" data-tina-field={tinaField(contatti, 'titoloPagina')}>{contatti.titoloPagina || 'Contatti'}</Reveal>
      </div>

      <section className="section">
        <div className="contact-grid">
          <Reveal className="contact-info">
            <h2 data-tina-field={tinaField(contatti, 'titoloSezione')}>{contatti.titoloSezione ? <span dangerouslySetInnerHTML={{__html: contatti.titoloSezione.replace('\n', '<br />')}} /> : <>Creiamo<br />insieme</>}</h2>
            <p data-tina-field={tinaField(contatti, 'testoSottoTitolo')}>{contatti.testoSottoTitolo || 'Studio Fotografico'}</p>
            <p data-tina-field={tinaField(contatti, 'indirizzoStudio')}>{contatti.indirizzoStudio || 'Via Tortona 31, Milano'}</p>
            
            <p style={{ marginTop: '1rem' }}>Telefono</p>
            <p data-tina-field={tinaField(contatti, 'telefono')}>{contatti.telefono || '+39 333 217 4750'}</p>
            
            <a href={`mailto:${contatti.email || 'info@davidevassallo.net'}`} className="email-link" data-tina-field={tinaField(contatti, 'email')}>
              {contatti.email || 'info@davidevassallo.net'}
            </a>
            
            <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="about-detail-row"><span className="about-detail-label">Ritratto</span><span data-tina-field={tinaField(contatti, 'orariRitratto')}>{contatti.orariRitratto || "Disponibile tutto l'anno"}</span></div>
              <div className="about-detail-row"><span className="about-detail-label">Reportage</span><span data-tina-field={tinaField(contatti, 'orariReportage')}>{contatti.orariReportage || "Su prenotazione"}</span></div>
              <div className="about-detail-row"><span className="about-detail-label">Ricerca</span><span data-tina-field={tinaField(contatti, 'orariRicerca')}>{contatti.orariRicerca || "Progetti selezionati"}</span></div>
            </div>
          </Reveal>

          <Reveal className="contact-form" style={{ transitionDelay: '.15s' }} tag="form">
            <div className="form-field">
              <label htmlFor="name" data-tina-field={tinaField(contatti, 'formName')}>{contatti.formName || 'Nome'}</label>
              <input id="name" type="text" placeholder="Mario Rossi" required />
            </div>
            <div className="form-field">
              <label htmlFor="email" data-tina-field={tinaField(contatti, 'formEmail')}>{contatti.formEmail || 'Email'}</label>
              <input id="email" type="email" placeholder="mario@rossi.it" required />
            </div>
            <div className="form-field">
              <label htmlFor="subject" data-tina-field={tinaField(contatti, 'formSubject')}>{contatti.formSubject || 'Tipo di Progetto'}</label>
              <input id="subject" type="text" placeholder="Ritratto / Reportage / Editoriale" />
            </div>
            <div className="form-field">
              <label htmlFor="message" data-tina-field={tinaField(contatti, 'formMessage')}>{contatti.formMessage || 'Messaggio'}</label>
              <textarea id="message" placeholder="Raccontami il tuo progetto..." required />
            </div>
            <button type="submit" className="submit-btn" data-tina-field={tinaField(contatti, 'formSubmit')}>{contatti.formSubmit || 'Invia Messaggio'}</button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
