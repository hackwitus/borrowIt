const { requestDB, getID, getDate } = require('./utility')

async function customerRoutes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/customers',
    handler: async (request, reply) => {
      const getCustomers = await requestDB({
        "operation": "search_by_value",
        "schema": "borrowit",
        "table": "customers",
        "hash_attribute": "phoneNumber",
        "search_attribute": "id",
        "search_value": "*",
        "get_attributes": ["*"]
      })

      return getCustomers
    }
  })

  fastify.route({
    method: 'GET',
    url: '/customers/:phoneNumber',
    handler: async (request, reply) => {
      const getCustomer = await requestDB({
        "operation": "search_by_hash",
        "schema": "borrowit",
        "table": "customers",
        "hash_attribute": "phoneNumber",
        "hash_values": [request.params.phoneNumber],
        "get_attributes": ["*"]
      })

      return getCustomer
    }
  })

  fastify.route({
    method: 'POST',
    url: '/customers/update',
    handler: async (request, reply) => {
      const updateCustomer = await requestDB({
        "operation": "update",
        "schema": "borrowit",
        "table": "customers",
        "records": [
          {
            "phoneNumber": request.body.phoneNumber,
            "name": request.body.name,
            "email": request.body.email,
          }
        ]
      })

      return updateCustomer
    }
  })


  fastify.route({
    method: 'POST',
    url: '/customers/delete',
    handler: async (request, reply) => {
      const deleteCustomer = await requestDB({
        "operation": "delete",
        "schema": "borrowit",
        "table": "customers",
        "hash_values": [request.body.phoneNumber]
      })

      return deleteCustomer
    }
  })
}

module.exports = customerRoutes