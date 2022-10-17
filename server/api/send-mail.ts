import nodemailer from 'nodemailer'

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
      html: `<b>Name:</b><br />${payload.name}<br /><br /><b>Email Adresse:</b><br />${payload.email}<br /><br /><b>Datenschutzerklaerung bestaetigt:</b><br />${payload.gdpr}<br /><br /><b>Nachricht:</b><br />${payload.message}<br />`,
    })

    console.log('payload: ', payload)

    console.log('info: ', info)

    console.log('Message sent: %s', info.messageId)

    if (info.messageId) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          msg: 'Your message was sent. Thank you.',
        }),
      }
    }
  } catch (err) {
    console.log(err)

    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: `Could not send your message. Please try again. ${err}`,
      }),
    }
  }
}

export default defineEventHandler(async ({ req }) => {
  if (req.method !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: 'Method not allowed',
    }
  }

  const { ...requestBody } = await useBody(req)

  const payload: PayloadData = {
    name: requestBody?.name,
    email: requestBody?.email,
    message: requestBody?.message,
    gdpr: requestBody?.gdpr,
    age: requestBody?.age,
  }

  if (
    !payload.name ||
    !payload.email ||
    !payload.message ||
    !payload.gdpr ||
    payload.age != 0
  ) {
    return {
      statusCode: 422,
      headers: { data: 'Unprocessable Entity' },
      body: 'Invalid data',
    }
  }

  console.log(payload)

  return sendMail(payload).catch(console.error)
})
