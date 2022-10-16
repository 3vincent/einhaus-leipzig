export default defineEventHandler(async ({ req, res }) => {
  // console.log('req url: ' + req.url)

  if (
    req.url &&
    req.url.includes(
      'wp-content/uploads/2018/11/LogoEinHausGenossenschaftRetina-1.png'
    )
  ) {
    // console.log('Redirecting...')
    res.writeHead(301, {
      Location: '/images/logo-einhaus-genossenschaft-leipzig.png',
    })
    res.end('done')
  }
})
