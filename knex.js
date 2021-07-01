const knexAppSchema = require('knex')(require('./knexfile').app)
const knexStagingSchema = require('knex')(require('./knexfile').staging)

const pg = require('pg')

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
  return parseInt(value)
})

pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value) => {
  return parseFloat(value)
})

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
  return parseFloat(value)
})

module.exports = {
  appSchema: knexAppSchema,
  stagingSchema: knexStagingSchema
}
