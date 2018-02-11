const { requestDB, getID, getDate } = require('./utility')

async function transactionRoutes(fastify, options) {

  fastify.route({
    method: 'GET',
    url: '/transactions',
    handler: async (request, reply) => {
      const getTransactions = await requestDB({
        "operation": "search_by_value",
        "schema": "borrowit",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value": "*",
        "get_attributes": ["*"]
      })

      return getTransactions
    }
  })

  fastify.route({
    method: 'GET',
    url: '/transactions/:id',
    handler: async (request, reply) => {
      const getTransaction = await requestDB({
        "operation": "search_by_hash",
        "schema": "borrowit",
        "table": "transactions",
        "hash_attribute": "id",
        "hash_values": [request.params.id],
        "get_attributes": ["*"]
      })

      return getTransaction
    }
  })

  fastify.route({
    method: 'POST',
    url: '/transactions/borrowed',
    handler: async (request, reply) => {

      const newTransactionId = getID()

      try {
        const lookUpCustomer = await requestDB({
          "operation": "search_by_hash",
          "schema": "borrowit",
          "table": "customers",
          "hash_attribute": "phoneNumber",
          "hash_values":[ request.body.customer.phoneNumber ],
          "get_attributes": ["*"]
        })

        let newCustomer, updateCustomer
  
        if ( lookUpCustomer.length === 0 ) {
          newCustomer = await requestDB({
            "operation": "insert",
            "schema": "borrowit",
            "table": "customers",
            "records": [
              {
                "name": request.body.customer.name,
                "email": request.body.customer.email,
                "phoneNumber": request.body.customer.phoneNumber,
                "transactionHistory": [newTransactionId]
              }
            ]
          })
        } else {
          updateCustomer = await requestDB({
            "operation": "update",
            "schema": "borrowit",
            "table": "customers",
            "records": [
              {
                "phoneNumber": request.body.customer.phoneNumber,
                "transactionHistory": [ ...lookUpCustomer[0].transactionHistory, newTransactionId ]
              }
            ]
          })
        }

        const updateInventory = await asyncForEach(request.body.items, async (item) => {
          try {
            const lookup = await requestDB({
              "operation": "search_by_hash",
              "schema": "borrowit",
              "table": "inventory",
              "hash_attribute": "id",
              "hash_values": [item],
              "get_attributes": ["*"]
            })
            const update = await requestDB({
              "operation": "update",
              "schema": "borrowit",
              "table": "inventory",
              "records": [
                {
                  "id": item,
                  "quantity": lookup[0].quantity - 1
                }
              ]
            })
            return update
          } catch (error) {
            return error
          }
        })
        
        const items = request.body.items.join(",")

        const createTransaction = await requestDB({
          "operation": "insert",
          "schema": "borrowit",
          "table": "transactions",
          "records": [
            {
              "id": newTransactionId,
              "items": items,
              "customer": request.body.customer.phoneNumber,
              "collateral": request.body.collateral,
              "timeBorrowed": getDate(),
              "timeReturned": null
            }
          ]
        })

        return createTransaction
      } catch (error) {
        return error
      }
    }
  })

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  fastify.route({
    method: "POST",
    url: "/transactions/returned",
    handler: async (request, reply) => {
      try {
        const lookUpTransaction = await requestDB({
          "operation": "search_by_hash",
          "schema": "borrowit",
          "table": "transactions",
          "hash_attribute": "id",
          "hash_values": [request.body.transaction],
          "get_attributes": ["*"]
        })

        const items = lookUpTransaction[0].items.split(",")
        const updateInventory = await asyncForEach(items, async (item) => {
          try {
            const lookup = await requestDB({
              "operation": "search_by_hash",
              "schema": "borrowit",
              "table": "inventory",
              "hash_attribute": "id",
              "hash_values": [item],
              "get_attributes": ["*"]
            })
            const update = await requestDB({
              "operation": "update",
              "schema": "borrowit",
              "table": "inventory",
              "records": [
                {
                  "id": item,
                  "quantity": lookup[0].quantity + 1
                }
              ]
            })
            return update
          } catch (error) {
            return error
          }
        })


        const updateTransaction = await requestDB({
          "operation": "update",
          "schema": "borrowit",
          "table": "transactions",
          "records": [
            {
              "id": request.body.transaction,
              "timeReturned": getDate()
            }
          ]
        })

        return updateTransaction
      } catch (error) {
        return error
      }
    }
  })

  fastify.route({
    method: 'POST',
    url: '/transactions/delete',
    handler: async (request, reply) => {

      const deleteTransaction = await requestDB({
        "operation": "delete",
        "schema": "borrowit",
        "table": "transactions",
        "hash_values": [request.body.transaction]
      })

      return deleteTransaction
    }
  })

  fastify.route({
    method: 'GET',
    url: '/transactions/item/:item',
    handler: async (request, reply) => {
      const findTransactions = await requestDB({
        "operation": "search_by_value",
        "schema": "borrowit",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "items",
        "search_value": `*${request.params.item}*`,
        "get_attributes": ["*"]
      })

      return findTransactions
    }
  })

  fastify.route({
    method: 'GET',
    url: '/transactions/customer/:customer',
    handler: async (request, reply) => {
      const findTransactions = await requestDB({
        "operation": "search_by_value",
        "schema": "borrowit",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "cusotmer",
        "search_value": request.params.customer,
        "get_attributes": ["*"]
      })

      return findTransactions
    }
  })
}

module.exports = transactionRoutes