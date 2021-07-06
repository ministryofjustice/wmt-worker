const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const knex = require('../../../knex').stagingSchema
const config = require('../../../etl-config')
const getExtractFileData = require('../../helpers/etl/get-extract-file-data')
let runEtl
let archiveExtractFiles
let deleteExtractFiles
let createTasks

let expectedInputData

const Promise = require('bluebird').Promise

describe('wmt-etl/run-etl', function () {
  beforeEach(function () {
    archiveExtractFiles = sinon.stub()
    deleteExtractFiles = sinon.stub()
    createTasks = sinon.stub()
    runEtl = proxyquire('../../../app/wmt-etl/run-etl', {
      './archive-extract-files': archiveExtractFiles,
      './delete-extract-files': deleteExtractFiles,
      '../services/data/create-tasks': createTasks
    })
    expectedInputData = getExtractFileData()
  })

  it('should import the extract file(s) into the staging schema', function () {
    archiveExtractFiles.resolves()
    deleteExtractFiles.resolves()
    createTasks.resolves()
    process.env.AWS_ACCESS_KEY_ID='foobar'
    process.env.AWS_SECRET_ACCESS_KEY='foobar'
    
    return runEtl()
      .then(function () {
        return Promise.each(config.VALID_SHEET_NAMES, function (sheetName) {
          return knex(sheetName).withSchema('staging').columns(config.VALID_COLUMNS[sheetName])
            .then(function (results) {
              expect(results.length, sheetName + ' table should contain ' + expectedInputData[sheetName].length + ' entries').to.equal(expectedInputData[sheetName].length)
              expect(results).to.deep.equal(expectedInputData[sheetName])
            })
        })
      })
  })
})
