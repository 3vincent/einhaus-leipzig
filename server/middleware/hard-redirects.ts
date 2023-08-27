export default defineEventHandler(async event => {
  // console.log('req url: ' + event.node.req.url)

  if (
    event.node.req.url &&
    event.node.req.url.includes(
      'wp-content/uploads/2018/11/LogoEinHausGenossenschaftRetina-1.png'
    )
  ) {
    // console.log('Redirecting...')
    event.node.res.writeHead(301, {
      Location: '/images/logo-einhaus-genossenschaft-leipzig.png',
    })
    event.node.res.end()
  }

  if (event.node.req.url == '/impressum/') {
    event.node.res.writeHead(301, {
      Location: '/impressum',
    })
    event.node.res.end()
  }

  if (event.node.req.url == '/kontakt/') {
    event.node.res.writeHead(301, {
      Location: '/kontakt',
    })
    event.node.res.end()
  }

  if (
    event.node.req.url ==
    '/download/Satzung_EinHaus_Reichpietschstrasse_13_eG.pdf'
  ) {
    event.node.res.writeHead(301, {
      Location:
        'https://download.einhaus-leipzig.de/Satzung_EinHaus_Reichpietschstrasse_13_eG.pdf.',
    })
    event.node.res.end()
  }
})
