const knexAppSchema = require('knex')(require('./knexfile').app)
const knexStagingSchema = require('knex')(require('./knexfile').staging)

module.exports = {
  appSchema: knexAppSchema,
  stagingSchema: knexStagingSchema
}
