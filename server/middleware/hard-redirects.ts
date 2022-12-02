export default defineEventHandler(async event => {
  // console.log('req url: ' + req.url)

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
    event.node.res.end('done')
  }
})
