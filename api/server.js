const fastify = require('fastify')({ logger: { prettyPrint: true } })
const PORT = process.env.PORT || 5000

fastify.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  console.log(`server listening on ${fastify.server.address().port}`)
  console.log(fastify.printRoutes())
})