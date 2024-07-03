import { LANDING_PAGE_SLUGS } from './enums'

type LandingPageSlugs = LANDING_PAGE_SLUGS

export type LandingPageContent = {
  slug: LandingPageSlugs
  lastContainer?: boolean
  firstContainer?: boolean
  visible?: boolean
  title: string
  htmlText: string
  backgroundImageUrl: string
}
