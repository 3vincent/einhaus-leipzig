import validator from 'validator'
import type { ContactFormField, ContactFormPayload } from '../types/contact'

export const CONTACT_MESSAGE_MAX_LENGTH = 4000

export function validateContactForm(payload: ContactFormPayload) {
  const fields: Record<ContactFormField, boolean> = {
    name: validator.isLength(payload.name.trim(), { min: 2, max: 120 }),
    email: validator.isEmail(payload.email.trim()),
    message: validator.isLength(payload.message.trim(), {
      min: 3,
      max: CONTACT_MESSAGE_MAX_LENGTH,
    }),
    gdpr: payload.gdpr,
  }

  const firstInvalidField = (
    Object.entries(fields) as [ContactFormField, boolean][]
  ).find(([, valid]) => !valid)?.[0]

  return {
    fields,
    valid: Object.values(fields).every(Boolean),
    firstInvalidField: firstInvalidField ?? null,
  }
}
