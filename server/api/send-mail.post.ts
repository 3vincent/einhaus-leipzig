import Joi from 'joi'
import nodemailer from 'nodemailer'
import { sanitizer } from '~~/util/sanitizer'

const smtpHost: string = process.env.SMTP_HOST || ''
const smtpPortTLS: number = Number(process.env.SMTP_PORT_TLS)
const smtpUserName: string = process.env.SMTP_USER_NAME || ''
const smtpUserPassword: string = process.env.SMTP_USER_PASSWORD || ''
const contactFormSenderName: string = process.env.CONTACT_FORM_SENDER_NAME || ''
const contactFormSenderAddress: string =
  process.env.CONTACT_FORM_SENDER_ADDRESS || ''
const mailReceiver: string =
  process.env.NODE_ENV === 'production'
    ? process.env.MAIL_RECEIVER_CONTACT_FORM || ''
    : process.env.MAIL_RECEIVER_FALLBACK || ''

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPortTLS,
  secure: true,
  auth: {
    user: smtpUserName,
    pass: smtpUserPassword,
  },
})

const FORM_MINIMUM_AGE_MS = 2500
const FORM_MAXIMUM_AGE_MS = 2 * 60 * 60 * 1000
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map<string, number[]>()

export interface PayloadData {
  name: string
  email: string
  message: string
  gdpr: boolean
  companyWebsite: string
  formStartedAt: number
}

async function validatePayload(payload: PayloadData): Promise<PayloadData> {
  const schema = Joi.object({
    name: Joi.string().min(1).max(120).required().trim(),
    email: Joi.string().email().required().trim(),
    message: Joi.string().min(1).max(4000).required().trim(),
    gdpr: Joi.boolean().valid(true).required(),
    companyWebsite: Joi.string().allow('').max(0).required(),
    formStartedAt: Joi.number().integer().positive().required(),
  })

  return await schema.validateAsync(payload)
}

async function sendMail(payload: PayloadData): Promise<string> {
  try {
    const info = await transporter.sendMail({
      from: `"${contactFormSenderName}" <${contactFormSenderAddress}>`,
      to: mailReceiver,
      replyTo: `"${payload.name}" <${payload.email}>`,
      subject: 'Kontaktformular',
      text: JSON.stringify(payload),
      html: `<b>Name:</b><br />${payload.name}<br /><br />
    <b>Email Adresse:</b><br />${payload.email}<br /><br />
    <b>Datenschutzerklärung bestätigt:</b><br />${payload.gdpr}<br /><br />
    <b>Nachricht:</b><br />${payload.message}<br />`,
    })

    return info.messageId
  } catch (error) {
    console.log(error)

    throw new Error('Error sending message', { cause: error })
  }
}

export default defineEventHandler(async event => {
  const requestBody = await readBody<Partial<PayloadData>>(event)

  const hasAntiSpamFields =
    Object.hasOwn(requestBody, 'companyWebsite') &&
    Object.hasOwn(requestBody, 'formStartedAt')
  const formAge = Date.now() - Number(requestBody.formStartedAt)
  const looksAutomated =
    !hasAntiSpamFields ||
    typeof requestBody.companyWebsite !== 'string' ||
    requestBody.companyWebsite.length > 0 ||
    !Number.isFinite(formAge) ||
    formAge < FORM_MINIMUM_AGE_MS ||
    formAge > FORM_MAXIMUM_AGE_MS

  // Return a convincing success response without sending mail so bots do not
  // learn which part of the trap they triggered.
  if (looksAutomated) {
    return successResponse()
  }

  const payload: PayloadData = {
    name: requestBody?.name || '',
    email: requestBody?.email || '',
    message: requestBody?.message || '',
    gdpr: requestBody?.gdpr || false,
    companyWebsite: requestBody.companyWebsite ?? '',
    formStartedAt: Number(requestBody.formStartedAt),
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()
  const recentRequests = (requestLog.get(ip) || []).filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS
  )

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    throw createError({
      statusCode: 429,
      message: 'Too many contact requests. Please try again later.',
    })
  }

  try {
    const sanitizedPayload = await sanitizer(payload)

    await validatePayload(sanitizedPayload)

    requestLog.set(ip, [...recentRequests, now])

    const messageId = await sendMail(sanitizedPayload)

    if (process.env.NODE_ENV === 'development') {
      console.log({ sanitizedPayload })
      console.log('Message sent:', messageId)
    }

    return successResponse()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err)

    throw createError({
      statusCode: 535,
      message: `There was an error sending the message! ${
        Array.isArray(err.details) ? err.details[0]?.message : ''
      }`,
      data: {
        statusCode: err?.response?.status,
        responseBody: err?.data,
      },
      cause: err,
    })
  }
})

function successResponse() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'Your message was sent. Thank you.',
    }),
  }
}
