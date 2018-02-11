const { requestDB, getID, getData } = require('./utility')

async function adminRoutes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/create-schema',
    handler: async (request, reply) => {
      const createSchema = await requestDB({
        "operation": "create_schema",
        "schema": "borrowit"
      })
      return createSchema
    }
  })

  fastify.route({
    method: 'GET',
    url: '/create-tables',
    handler: async(request, reply) => {
      try {
        const createInventoryTable = await requestDB({
          "operation": "create_table",
          "schema": "borrowit",
          "table": "inventory",
          "hash_attribute": "id"
        })
        const createTransactionsTable = await requestDB({
          "operation": "create_table",
          "schema": "borrowit",
          "table": "transactions",
          "hash_attribute": "id"
        })
        const createCustomersTable = await requestDB({
          "operation": "create_table",
          "schema": "borrowit",
          "table": "customers",
          "hash_attribute": "phoneNumber"
        })
        return {"message":"All 3 tables created"}
      } catch (error) {
        return error
      }
    }
  })

  fastify.route({
    method: 'GET',
    url: '/create-role',
    handler: async (request, reply) => {
      const createCustomerRole = await requestDB({
        "operation": "add_role",
        "role": "customer",
        "permission": {
          "super_user": false,
          "borrowit": {
            "tables": {
              "inventory": {
                "read": true,
                "insert": false,
                "update": true,
                "delete": false,
              },
              "transactions": {
                "read": true,
                "insert": true,
                "update": true,
                "delete": false,
              },
              "customers": {
                "read": true,
                "insert": true,
                "update": true,
                "delete": false,
              }
            }
          }
        }
      })

      return createCustomerRole
    }
  })

  fastify.route({
    method: 'GET',
    url: '/create-user',
    handler: async (request, reply) => {
      try {
        const getRoles = await requestDB({
          "operation": "list_roles"
        })
        const roleID = getRoles.find(role => role.role === 'customer')
        const createCustomerUser = await requestDB({
          "operation": "add_user",
          "role": roleID.id,
          "username": process.env.HDB_CUSTOMER_USERNAME,
          "password": process.env.HDB_CUSTOMER_PASSWORD,
          "active": "true"
        })
        return createCustomerUser
      } catch (error) {
        return error
      }
    }
  })
}

module.exports = adminRoutes