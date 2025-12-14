import Joi from 'joi'
import nodemailer from 'nodemailer'
import { $fetch } from 'ofetch'
import type { InvestApplicationPayload } from '~/util/types'

const smtpHost: string = process.env.SMTP_HOST || ''
const smtpPortTLS: number = Number(process.env.SMTP_PORT_TLS)
const smtpUserName: string = process.env.SMTP_USER_NAME || ''
const smtpUserPassword: string = process.env.SMTP_USER_PASSWORD || ''
const contactFormSenderName: string = process.env.CONTACT_FORM_SENDER_NAME || ''
const contactFormSenderAddress: string =
  process.env.CONTACT_FORM_SENDER_ADDRESS || ''
const officialContactAddress: string =
  process.env.MAIL_RECEIVER_CONTACT_FORM || ''
const investApiBase: string = process.env.INVEST_APP_API_URL || ''
const investApiServiceToken: string = process.env.INVEST_APP_SERVICE_TOKEN || ''
const appOrigin: string =
  process.env.APP_ORIGIN || 'https://www.einhaus-leipzig.de'
const normalizedInvestApiBase =
  investApiBase && !investApiBase.endsWith('/')
    ? `${investApiBase}/`
    : investApiBase
const investApiEndpoint =
  normalizedInvestApiBase &&
  new URL('invest-applications', normalizedInvestApiBase).toString()

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPortTLS,
  secure: true,
  auth: {
    user: smtpUserName,
    pass: smtpUserPassword,
  },
})

const payloadSchema = Joi.object<InvestApplicationPayload>({
  salutation: Joi.string().valid('', 'frau', 'herr', 'divers').default(''),
  firstName: Joi.string().min(1).max(120).trim().required(),
  lastName: Joi.string().min(1).max(120).trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().allow('').max(120).trim().default(''),
  birthDate: Joi.string().isoDate().required(),
  taxId: Joi.string()
    .pattern(/^\d{11}$/)
    .trim()
    .required(),
  street: Joi.string().min(1).max(200).trim().required(),
  postalCode: Joi.string().min(2).max(20).trim().required(),
  city: Joi.string().min(1).max(120).trim().required(),
  country: Joi.string().min(1).max(120).trim().required(),
  shares: Joi.number().integer().min(1).required(),
  confirmInfo: Joi.boolean().valid(true).required(),
  dataConsent: Joi.boolean().valid(true).required(),
  newsletter: Joi.boolean().default(false),
  iban: Joi.string().min(4).max(34).trim().required(),
  accountHolder: Joi.string().min(1).max(120).trim().required(),
  bic: Joi.string().allow('').max(11).trim(),
}).options({ stripUnknown: true })

async function sendNotificationMail(payload: InvestApplicationPayload) {
  const subject = 'Neue Anfrage: investierende Mitgliedschaft'
  const text = `Neue Anfrage für investierende Mitgliedschaft

Name: ${payload.firstName} ${payload.lastName}
Geburtsdatum: ${payload.birthDate}
Steuer-ID: ${payload.taxId}
E-Mail: ${payload.email}
Anteile: ${payload.shares}
Kommentar: ${payload.comment || '—'}
`

  return transporter.sendMail({
    from: `"${contactFormSenderName}" <${contactFormSenderAddress}>`,
    to: officialContactAddress,
    replyTo: `"${payload.firstName} ${payload.lastName}" <${payload.email}>`,
    subject,
    text,
  })
}

async function sendConfirmationMail(payload: InvestApplicationPayload) {
  const subject = 'Wir haben deinen Antrag erhalten'
  const text = `Hallo ${payload.firstName},

wir haben deinen Antrag als investierendes Mitglied erhalten.
Wir prüfen ihn und melden uns bei dir.

Zusammenfassung:
- E-Mail: ${payload.email}
- Geburtsdatum: ${payload.birthDate}
- Steuer-ID: ${payload.taxId}
- Anteile: ${payload.shares}


Viele Grüße
EinHaus Reichpietschstraße 13 eG`

  return transporter.sendMail({
    from: `"${contactFormSenderName}" <${contactFormSenderAddress}>`,
    to: payload.email,
    replyTo: officialContactAddress,
    subject,
    text,
  })
}

export default defineEventHandler(async event => {
  const rawBody = await readBody(event)

  try {
    const validated = await payloadSchema.validateAsync(rawBody, {
      abortEarly: true,
    })

    // send data to API
    if (investApiEndpoint) {
      try {
        await $fetch(investApiEndpoint, {
          method: 'POST',
          body: validated,
          headers: {
            'X-Service-Token': investApiServiceToken,
            Origin: appOrigin,
          },
        })
      } catch (err: unknown) {
        const status =
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          (err as { response?: { status?: number } }).response?.status

        if (status === 400 || status === 409) {
          console.warn('Invest application API rejected payload', { status })
        }
        throw err
      }
    }

    await sendNotificationMail(validated)
    await sendConfirmationMail(validated)

    return { statusCode: 200, body: { ok: true } }
  } catch (error: unknown) {
    console.error(error)

    throw createError({
      statusCode: 400,
      message:
        typeof error === 'object' &&
        error !== null &&
        'details' in error &&
        Array.isArray((error as { details?: unknown }).details) &&
        (error as { details: Array<{ message?: string }> }).details[0]?.message
          ? ((error as { details: Array<{ message?: string }> }).details[0]
              ?.message ?? 'Der Antrag konnte nicht gesendet werden.')
          : 'Der Antrag konnte nicht gesendet werden.',
    })
  }
})
