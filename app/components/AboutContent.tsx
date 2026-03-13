'use client'

import { useTina } from "tinacms/dist/react"
import type { ChiSonoQuery } from "../../../tina/__generated__/types"
import Reveal from './Reveal'
import { tinaField } from "tinacms/dist/react"

interface AboutContentProps {
  data: ChiSonoQuery
  query: string
  variables: object
}

export default function AboutContent(props: AboutContentProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  // fallback to original static data if Tina is empty (in reality should use data.chiSono)
  const chiSono = data?.chiSono || {} as any

  return (
    <>
      <div className="page-hero">
        <Reveal tag="p" className="page-hero-label" data-tina-field={tinaField(chiSono, "sottotitolo")}>
          {chiSono.sottotitolo || 'Il Fotografo'}
        </Reveal>
        <Reveal tag="h1" className="page-hero-title" data-tina-field={tinaField(chiSono, "titolo")}>
          {chiSono.titolo || 'Chi Sono'}
        </Reveal>
      </div>

      <section className="section">
        <div className="about-grid">
          <Reveal className="about-image" data-tina-field={tinaField(chiSono, "fotoProfilo")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chiSono.fotoProfilo || "/assets/DSC_0222-Enhanced-NR-2-2.jpg"} alt="Davide Vassallo" />
          </Reveal>
          <Reveal className="about-text" style={{ transitionDelay: '.15s' }}>
            <h2 data-tina-field={tinaField(chiSono, "titolo")}>{chiSono.titolo || 'Davide\nVassallo'}</h2>
            
            <div data-tina-field={tinaField(chiSono, "descrizione")}>
              {chiSono.descrizione ? (
                // Tina's rich text can be rendered with TinaMarkdown, but we just want to avoid crashing
                <div style={{ whiteSpace: 'pre-line' }}>{JSON.stringify(chiSono.descrizione)}</div>
              ) : (
                <>
                  <p>Sono Davide Vassallo, fotografo con base a Milano. Definisco il mio linguaggio attraverso sottrazione, rigore geometrico e una costante ricerca sull&apos;identità e lo spazio.</p>
                  <p>Con oltre dieci anni di esperienza tra editoria e set commerciali, intreccio il candore della fotografia documentaristica al rigore del ritratto in studio. Il mio sguardo è plasmato dalla tradizione del fotogiornalismo europeo e dall&apos;estetica minimalista giapponese.</p>
                  <p>Collaboro con agenzie di comunicazione, brand di lusso, istituzioni culturali e testate editoriali. Ogni progetto è un dialogo aperto tra chi sono e chi mi guarda.</p>
                </>
              )}
            </div>

            <div className="about-details">
              {(chiSono.esperienze?.length > 0 ? chiSono.esperienze : [
                { anno: 'Base', titolo: 'Milano, Italia' },
                { anno: 'Specializzazione', titolo: 'Ritratto, Reportage, Ricerca' },
                { anno: 'Attrezzatura', titolo: 'Nikon Z Series, Leica M' },
                { anno: 'Disponibilità', titolo: 'Italia & Europa' }
              ]).map((esp: any, i: number) => (
                <div className="about-detail-row" key={i} data-tina-field={tinaField(esp)}>
                  <span className="about-detail-label" data-tina-field={tinaField(esp, "anno")}>{esp.anno}</span>
                  <span data-tina-field={tinaField(esp, "titolo")}>{esp.titolo} <span data-tina-field={tinaField(esp, "luogo")}>{esp.luogo ? `- ${esp.luogo}` : ''}</span></span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="philosophy">
        <div className="philosophy-inner">
          <Reveal className="section-header" style={{ marginBottom: '3rem' }}>
            <span className="section-label" data-tina-field={tinaField(chiSono, "filosofiaTitolo")}>{chiSono.filosofiaTitolo || 'Filosofia di Scatto'}</span>
            <div className="section-rule" />
          </Reveal>
          <Reveal tag="blockquote" className="philosophy-quote" data-tina-field={tinaField(chiSono, "filosofiaCitazione")}>
            {chiSono.filosofiaCitazione || '“Fotografare non significa catturare ciò che c’è, ma decidere rigorosamente cosa lasciare fuori dall’inquadratura. L’essenza si trova nell’ombra.”'}
          </Reveal>
          <Reveal tag="p" className="philosophy-attr" style={{ transitionDelay: '.15s' }} data-tina-field={tinaField(chiSono, "filosofiaAutore")}>— {chiSono.filosofiaAutore || 'Davide Vassallo'}</Reveal>
          <Reveal tag="p" style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '640px', marginTop: '2.5rem', transitionDelay: '.25s' }} data-tina-field={tinaField(chiSono, "filosofiaDescrizione")}>
            {chiSono.filosofiaDescrizione || 'La mia ricerca si muove tra il documento e la costruzione, tra il paesaggio urbano e il corpo. Cerco la tensione nello spazio bianco, il significato nella pausa.'}
          </Reveal>
        </div>
      </section>
    </>
  )
}
