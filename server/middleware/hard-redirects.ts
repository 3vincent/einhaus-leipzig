import type { H3Event } from 'h3'

const RULES = [removeTrailingSlash, customRedirects]

const customRedirectList = [
  {
    source: '/wp-content/uploads/2018/11/LogoEinHausGenossenschaftRetina-1.png',
    dest: '/images/logo-einhaus-genossenschaft-leipzig.png',
  },
  {
    source: '/download/Satzung_EinHaus_Reichpietschstrasse_13_eG.pdf',
    dest: 'https://download.einhaus-leipzig.de/Satzung_EinHaus_Reichpietschstrasse_13_eG.pdf',
  },
]

export default defineEventHandler(event => {
  for (const rule of RULES) {
    const response = rule(event)

    if (response) return response
  }
})

function removeTrailingSlash(event: H3Event) {
  const { path } = event

  if (path === '/') return
  if (!path.endsWith('/')) return

  const newPath = path.slice(0, -1)

  if (path === newPath) return

  return sendRedirect(event, newPath, 301)
}

function customRedirects(event: H3Event) {
  const { path } = event

  if (!customRedirectList.map(redirect => redirect.source).includes(path))
    return

  const newPath = customRedirectList.find(
    redirect => redirect.source === path
  )?.dest

  if (!newPath) return
  if (newPath === path) return

  return sendRedirect(event, newPath, 301)
}
