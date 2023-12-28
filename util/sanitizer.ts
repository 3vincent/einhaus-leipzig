import validator from 'validator'
import type { PayloadData } from '../server/api/send-mail.post'

export async function sanitizer(payload: PayloadData): Promise<PayloadData> {
  return {
    name: validator.escape(payload.name).trim(),
    email: (validator.normalizeEmail(payload.email) || '').trim(),
    message: validator.escape(payload.message).trim(),
    gdpr: payload.gdpr,
    age: payload.age,
  }
}
