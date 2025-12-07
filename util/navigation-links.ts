export type NavigationLink = {
  to: string
  label: string
}

export const PRIMARY_NAVIGATION_LINKS: NavigationLink[] = [
  { to: '/', label: 'Startseite' },
  { to: '/mitglied-werden', label: 'Mitglied werden' },
  { to: '/kontakt', label: 'Kontakt' },
  { to: '/impressum', label: 'Impressum' },
  { to: '/datenschutz', label: 'Datenschutzerklärung' },
]
