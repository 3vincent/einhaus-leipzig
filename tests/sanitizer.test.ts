import { describe, expect, it } from 'vitest'
import { sanitizer } from '../util/sanitizer'

describe('sanitizer', () => {
  it('escapes user-controlled HTML and normalizes the email address', () => {
    const result = sanitizer({
      name: ' <b>Ada</b> ',
      email: 'ADA@EXAMPLE.ORG',
      message: '<script>alert(1)</script>',
      gdpr: true,
      companyWebsite: '',
      formStartedAt: 123,
    })

    expect(result.name).toBe('&lt;b&gt;Ada&lt;&#x2F;b&gt;')
    expect(result.email).toBe('ada@example.org')
    expect(result.message).not.toContain('<script>')
    expect(result.formStartedAt).toBe(123)
  })
})
