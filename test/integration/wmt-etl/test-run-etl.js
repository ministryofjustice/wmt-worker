const expect = require('chai').expect

const knex = require('../../../knex').stagingSchema
const runEtl = require('../../../app/wmt-etl/run-etl')
const config = require('../../../etl-config')
const getExtractFileData = require('../../helpers/etl/get-extract-file-data')

let expectedInputData

const Promise = require('bluebird').Promise

describe.only('wmt-etl/run-etl', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData
  })

  it('should import the extract file(s) into the staging schema', function () {
    return runEtl()
      .then(function () {
        return Promise.each(config.VALID_SHEET_NAMES, function (sheetName){
          return knex(sheetName).columns(config.VALID_COLUMNS[sheetName])
            .then(function (results) {
              expect(results).to.deep.equal(expectedInputData[sheetName])
            })
        })
      })
  })  
})
