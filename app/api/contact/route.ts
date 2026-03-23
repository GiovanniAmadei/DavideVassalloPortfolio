import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campi obbligatori mancanti.' }, { status: 400 })
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@davidevassallo.net'
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  const { error } = await resend.emails.send({
    from: `Sito Davide Vassallo <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `[Contatto] ${subject || 'Nuovo messaggio dal sito'}`,
    html: `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Tipo di progetto:</strong> ${subject || '—'}</p>
      <p><strong>Messaggio:</strong></p>
      <p style="white-space: pre-wrap">${message}</p>
    `,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return NextResponse.json({ error: 'Errore nell\'invio. Riprova più tardi.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
