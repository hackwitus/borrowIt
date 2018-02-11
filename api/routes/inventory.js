const { requestDB, getID, getData } = require('./utility')

async function inventoryRoutes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/inventory',
    handler: async (request, reply) => {
      const getInventory = await requestDB({
        "operation": "search_by_value",
        "schema": "borrowit",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value":"*",
        "get_attributes": ["*"]
      })

      return getInventory
    }
  })

  fastify.route({
    method: 'GET',
    url: '/inventory/:id',
    handler: async (request, reply) => {
      const getInventory = await requestDB({
        "operation": "search_by_hash",
        "schema": "borrowit",
        "table": "inventory",
        "hash_attribute": "id",
        "hash_values": [request.params.id],
        "get_attributes": ["*"]
      })

      return getInventory
    }
  })

  fastify.route({
    method: 'POST',
    url: '/inventory/new',
    handler: async (request, reply) => {
      const newInventory = await requestDB({
        "operation": "insert",
        "schema": "borrowit",
        "table": "inventory",
        "records": [
          {
            "id": getID(),
            "name": request.body.name,
            "description": request.body.description || "Default description",
            "quantity": request.body.quantity || 0,
            "owner": request.body.owner || "Default owner"
          }
        ]
      })

      return newInventory
    }
  })

  fastify.route({
    method: 'POST',
    url: '/inventory/update',
    handler: async (request, reply) => {
      const currentRecord = await requestDB({
        "operation": "search_by_hash",
        "schema": "borrowit",
        "table": "inventory",
        "hash_attribute": "id",
        "hash_values": [request.body.id],
        "get_attributes": ["*"]
      })

      const updateInventory = await requestDB({
        "operation": "update",
        "schema": "borrowit",
        "table": "inventory",
        "records": [
          {
            "id": request.body.id,
            "name": request.body.name || currentRecord[0].name,
            "description": request.body.description || currentRecord[0].description,
            "quantity": request.body.quantity || currentRecord[0].quantity,
            "owner": request.body.owner || currentRecord[0].owner
          }
        ]
      })

      return updateInventory
    }
  })

  fastify.route({
    method: 'POST',
    url: '/inventory/delete',
    handler: async (request, reply) => {
      const deleteInventory = await requestDB({
        "operation": "delete",
        "schema": "borrowit",
        "table": "inventory",
        "hash_values": [ request.body.id ] 
      })

      return deleteInventory
    }
  })
}

module.exports = inventoryRoutes