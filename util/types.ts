import type { LANDING_PAGE_SLUGS } from './enums'

export type LandingPageContent = {
  slug: LANDING_PAGE_SLUGS
  lastContainer?: boolean
  firstContainer?: boolean
  visible?: boolean
  title: string
  htmlText: string
  backgroundImageUrl: string
}

export type InvestApplicationPayload = {
  salutation: '' | 'frau' | 'herr' | 'divers'
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate?: string
  taxId: string
  street: string
  postalCode: string
  city: string
  country: string
  shares: number
  confirmInfo: boolean
  dataConsent: boolean
  newsletter: boolean
  iban: string
  accountHolder: string
  bic?: string
}
