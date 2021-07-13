const expect = require('chai').expect

const knex = require('../../../knex').stagingSchema
const config = require('../../../etl-config')
const getExtractFileData = require('../../helpers/etl/get-extract-file-data')
const runEtl = require('../../../app/wmt-etl/run-etl')

let expectedInputData

const Promise = require('bluebird').Promise

describe('wmt-etl/run-etl', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData()
  })

  it('should import the extract file(s) into the staging schema', function () {
    process.env.AWS_ACCESS_KEY_ID = 'foobar'
    process.env.AWS_SECRET_ACCESS_KEY = 'foobar'

    return runEtl()
      .then(function (result) {
        return Promise.each(config.VALID_SHEET_NAMES, function (sheetName) {
          return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
            .then(function (results) {
              expect(results.length, sheetName + ' table should contain ' + expectedInputData[sheetName].length + ' entries').to.equal(expectedInputData[sheetName].length)
              expect(results).to.deep.equal(expectedInputData[sheetName])
            })
        })
      })
  })
})
