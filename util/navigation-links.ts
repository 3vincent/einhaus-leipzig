export type NavigationLink = {
  to: string
  label: string
}

export const PRIMARY_NAVIGATION_LINKS: NavigationLink[] = [
  { to: '/', label: 'Startseite' },
  { to: '/kontakt', label: 'Kontakt' },
  { to: '/impressum', label: 'Impressum' },
  { to: '/datenschutz', label: 'Datenschutzerklärung' },
]
