const knexAppSchema = require('knex')(require('./knexfile').app)
const knexStagingSchema = require('knex')(require('./knexfile').staging)
const indexing = require('knex')(require('./knexfile').indexing)

module.exports = {
  appSchema: knexAppSchema,
  stagingSchema: knexStagingSchema,
  indexing: indexing
}
