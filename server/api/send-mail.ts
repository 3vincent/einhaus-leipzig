import nodemailer from 'nodemailer'
import Joi from 'joi'

const smtpHost: string = process.env.SMTP_HOST!
const smtpPortTLS: number = Number(process.env.SMTP_PORT_TLS)
const smptUserName: string = process.env.SMTP_USER_NAME!
const smtpUserPassword: string = process.env.SMTP_USER_PASSWORD!
const contactFormSenderName: string = process.env.CONTACT_FORM_SENDER_NAME!
const contactFormSenderAddress: string =
  process.env.CONTACT_FORM_SENDER_ADDRESS!
let mailReceiver: string

type PayloadData = {
  name: string
  email: string
  message: string
  gdpr: boolean
  age: number
}

if (process.env.NODE_ENV === 'production') {
  mailReceiver = process.env.MAIL_RECEIVER_CONTACT_FORM!
} else {
  mailReceiver = process.env.MAIL_RECEIVER_FALLBACK!
}

let transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPortTLS,
  secure: true,
  auth: {
    user: smptUserName,
    pass: smtpUserPassword,
  },
})

async function sendMail(payload: PayloadData) {
  try {
    let info = await transporter.sendMail({
      from: `"${contactFormSenderName}" <${contactFormSenderAddress}>`, // sender address
      to: mailReceiver, // list of receivers
      replyTo: `"${payload.name}" <${payload.email}>`,
      subject: 'Kontaktformular', // Subject line
      text: JSON.stringify(payload),
      html: `<b>Name:</b><br />${payload.name}<br /><br />
             <b>Email Adresse:</b><br />${payload.email}<br /><br />
             <b>Datenschutzerklärung bestätigt:</b><br />${payload.gdpr}<br /><br />
             <b>Nachricht:</b><br />${payload.message}<br />`,
    })

    console.log('payload: ', payload)

    console.log('info: ', info)

    console.log('Message sent: %s', info.messageId)
  } catch (err) {
    console.log(err)

    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: `Could not send your message. Please try again. ${err}`,
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'Your message was sent. Thank you.',
    }),
  }
}

export default defineEventHandler(async event => {
  if (event.req.method !== 'POST') {
    return {
      statusCode: 400,
      body: 'Bad Input',
    }
  }

  const sanitizeHTML = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  const { ...requestBody } = await readBody(event)

  const payload: PayloadData = {
    name: requestBody?.name.trim(),
    email: requestBody?.email.trim(),
    message: requestBody?.message.trim(),
    gdpr: requestBody?.gdpr,
    age: requestBody?.age,
  }

  payload.name = sanitizeHTML(payload.name)
  payload.email = sanitizeHTML(payload.email)
  payload.message = sanitizeHTML(payload.message)

  const schema = Joi.object({
    name: Joi.string().min(1).max(40).required().trim(),
    email: Joi.string().email().required().trim(),
    message: Joi.string().min(1).max(4000).required().trim(),
    gdpr: Joi.boolean().valid(true).required(),
    age: Joi.number().valid(0).required(),
  })

  try {
    const value = await schema.validateAsync(payload)

    console.log('validation output: ', value)
  } catch (err) {
    console.log(err)

    return {
      statusCode: 400,
      body: 'Bad Input',
    }
  }

  console.log(payload)

  return sendMail(payload).catch(console.error)
})
