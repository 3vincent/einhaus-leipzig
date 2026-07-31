import { describe, expect, it } from 'vitest'
import type { ContactFormPayload } from '../shared/types/contact'
import { validateContactForm } from '../shared/validation/contact'

function validPayload(
  overrides: Partial<ContactFormPayload> = {}
): ContactFormPayload {
  return {
    name: 'Ada Lovelace',
    email: 'ada@example.org',
    message: 'Ich interessiere mich für euer Projekt.',
    gdpr: true,
    companyWebsite: '',
    formStartedAt: Date.now() - 5000,
    ...overrides,
  }
}

describe('validateContactForm', () => {
  it('accepts a complete form including international email addresses', () => {
    const result = validateContactForm(
      validPayload({ email: 'benutzer+haus@例子.广告' })
    )

    expect(result.valid).toBe(true)
    expect(result.firstInvalidField).toBeNull()
  })

  it.each([
    ['name', { name: 'A' }],
    ['email', { email: 'keine-adresse' }],
    ['message', { message: 'Hi' }],
    ['gdpr', { gdpr: false }],
  ] as const)('reports %s as the first invalid field', (field, overrides) => {
    const result = validateContactForm(validPayload(overrides))

    expect(result.valid).toBe(false)
    expect(result.firstInvalidField).toBe(field)
  })

  it('rejects messages longer than 4000 characters', () => {
    expect(
      validateContactForm(validPayload({ message: 'a'.repeat(4001) })).fields
        .message
    ).toBe(false)
  })
})
