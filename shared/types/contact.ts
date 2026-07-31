export interface ContactFormPayload {
  name: string
  email: string
  message: string
  gdpr: boolean
  companyWebsite: string
  formStartedAt: number
}

export interface ContactFormResponse {
  statusCode: number
  body: string
}

export type ContactFormField = 'name' | 'email' | 'message' | 'gdpr'
