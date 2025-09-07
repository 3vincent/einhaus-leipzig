import Joi from 'joi'
import nodemailer from 'nodemailer'
import { sanitizer } from '~/util/sanitizer'

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

export interface PayloadData {
  name: string
  email: string
  message: string
  gdpr: boolean
  age: number
}

async function validatePayload(payload: PayloadData): Promise<PayloadData> {
  const schema = Joi.object({
    name: Joi.string().min(1).max(120).required().trim(),
    email: Joi.string().email().required().trim(),
    message: Joi.string().min(1).max(4000).required().trim(),
    gdpr: Joi.boolean().valid(true).required(),
    age: Joi.number().valid(0).required(),
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

    throw new Error('Error sending message')
  }
}

export default defineEventHandler(async event => {
  // TODO: Add a rate limiter for requests or basic authentication

  const { ...requestBody } = await readBody(event)

  const payload: PayloadData = {
    name: requestBody?.name || '',
    email: requestBody?.email || '',
    message: requestBody?.message || '',
    gdpr: requestBody?.gdpr || false,
    age: requestBody?.age || 0,
  }

  // Honeypot to detect scripted abuse
  if (payload.age != 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'Your message was sent. Thank you.',
      }),
    }
  }

  try {
    const sanitizedPayload = await sanitizer(payload)

    await validatePayload(sanitizedPayload)

    const messageId = await sendMail(sanitizedPayload)

    if (process.env.NODE_ENV === 'development') {
      console.log({ sanitizedPayload })
      console.log('Message sent:', messageId)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'Your message was sent. Thank you.',
      }),
    }
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
    })
  }
})
