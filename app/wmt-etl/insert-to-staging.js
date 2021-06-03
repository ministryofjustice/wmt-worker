const knex = require('../../knex').stagingSchema
const log = require('../services/log')

module.exports = function (table, worksheetDataAsJSON, extractFile) {
  let noOfColumns
  if (worksheetDataAsJSON[0]) {
    noOfColumns = Object.keys(worksheetDataAsJSON[0]).length
  } else {
    noOfColumns = 1
  }
  const batchSize = Math.max(1, ((Math.floor(2100 / noOfColumns) - 1) / 2))
  return knex.batchInsert(table, worksheetDataAsJSON, batchSize)
    .catch((error) => {
      log.error(noOfColumns, table, extractFile, batchSize)
      throw error
    })
}
