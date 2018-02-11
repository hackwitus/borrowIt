const { requestDB, getID, getData } = require('./utility')

async function adminRoutes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/set-up',
    handler: async (request, reply) => {
      const createSchema = await requestDB({
        "operation": "create_schema",
        "schema": "borrowit"
      })
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
      const createCustomerRole = await requestDB({
        "operation": "add_role",
        "role": "customer",
        "permission": {
          "super_user": false,
          "borrowit": {
            "tables": {
              "inventory": {
                "read": false,
                "insert": false,
                "update": false,
                "delete": false,
              },
              "transactions": {
                "read": false,
                "insert": false,
                "update": false,
                "delete": false,
              },
              "customers": {
                "read": false,
                "insert": false,
                "update": false,
                "delete": false,
              }
            }
          }
        }
      })
      const getRoles = await requestDB({
        "operation": "list_roles"
      })
      const roleID = getRoles.find(role => role.role === 'customer')
      const createCustomerUser = await requestDB({
        "operation": "add_user",
        "role": roleID.id,
        "username": "customer",
        "password": process.env.HDB_CUSTOMER_PASSWORD,
        "active": "true"
      })
    }
  })
}

module.exports = adminRoutes