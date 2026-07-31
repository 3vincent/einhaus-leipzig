import validator from 'validator'
import type { ContactFormPayload } from '../shared/types/contact'

export function sanitizer(payload: ContactFormPayload): ContactFormPayload {
  return {
    name: validator.escape(payload.name).trim(),
    email: (validator.normalizeEmail(payload.email) || '').trim(),
    message: validator.escape(payload.message).trim(),
    gdpr: payload.gdpr,
    companyWebsite: validator.escape(payload.companyWebsite).trim(),
    formStartedAt: payload.formStartedAt,
  }
}
