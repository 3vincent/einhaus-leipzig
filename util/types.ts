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
