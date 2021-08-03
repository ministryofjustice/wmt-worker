const expect = require('chai').expect

const knex = require('../../../knex').stagingSchema
const config = require('../../../etl-config')
const getExtractFileData = require('../../helpers/etl/get-extract-file-data')
const pollSQS = require('../../../app/wmt-etl/poll-sqs')

let expectedInputData

const Promise = require('bluebird').Promise

describe('etl', function () {
  beforeEach(function (done) {
    expectedInputData = getExtractFileData()
    pollSQS().then(function () {
      done()
    })
  })

  it('should poll SQS and import the extract file(s) into the staging schema', function () {
    return Promise.each(config.VALID_SHEET_NAMES, function (sheetName) {
      return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
        .then(function (results) {
          expect(results.length, sheetName + ' table should contain ' + expectedInputData[sheetName].length + ' entries').to.equal(expectedInputData[sheetName].length)
          expect(results).to.deep.equal(expectedInputData[sheetName])
        })
    })
  })
})
