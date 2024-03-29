const expect = require('chai').expect

const knex = require('../../../knex').stagingSchema
const cleanTables = require('../../../app/wmt-etl/clean-tables')
const config = require('../../../etl-config')

describe('wmt-etl/test-clean-tables', function () {
  it('should delete all data from all staging schema tables extract file(s) into the staging schema', function () {
    return cleanTables()
      .then(function () {
        return Promise.all(config.VALID_SHEET_NAMES.map(function (sheetName) {
          return knex(sheetName).withSchema('staging').columns(config.VALID_COLUMNS[sheetName])
            .then(function (results) {
              expect(results.length, sheetName + ' table should contain 0 entries').to.equal(0)
              expect(results, sheetName + ' table results should be equal []').to.deep.equal([])
            })
        }))
      })
  })
})
