import validator from 'validator'
import { PayloadData } from '../server/api/send-mail.post'

export async function sanitizer(payload: PayloadData): Promise<void> {
  payload.name = validator.escape(payload.name).trim()
  payload.email = (validator.normalizeEmail(payload.email) || '').trim()
  payload.message = validator.escape(payload.message).trim()
}
