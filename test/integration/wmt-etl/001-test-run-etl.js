const expect = require('chai').expect
const fs = require('fs')
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const proxyquire = require('proxyquire')
const cleanTables = require('../../../app/wmt-etl/clean-tables')

const knex = require('../../../knex').stagingSchema
const config = require('../../../etl-config')

const FILES_CHANGED_TIME_WINDOW = 1000
const getExtractFileData = require('../../helpers/etl/get-extract-file-data')
const pollSQS = proxyquire('../../../app/wmt-etl/poll-sqs', { '../../etl-config': { FILES_CHANGED_TIME_WINDOW } })

const getS3Client = require('../../../app/services/aws/s3/get-s3-client')
const s3Client = getS3Client({
  region: config.S3.REGION,
  accessKeyId: config.S3.ACCESS_KEY_ID,
  secretAccessKey: config.S3.SECRET_ACCESS_KEY,
  endpoint: config.S3.ENDPOINT
})
let expectedInputData

const Promise = require('bluebird').Promise

function pollAndCheck (result) {
  // waiting for message to apear on queue

  return pollSQS().then(function (result) {
    if (result === 'No messages to process') {
      return pollAndCheck(result)
    }
    return 'OK'
  })
}

function deleteFromS3 (file) {
  return s3Client.send(new DeleteObjectCommand({
    Bucket: config.S3.BUCKET_NAME,
    Key: file
  }))
}

function putToS3 (file) {
  return s3Client.send(new PutObjectCommand({
    Bucket: config.S3.BUCKET_NAME,
    Key: `extract/${file}`,
    Body: fs.readFileSync(`test/integration/resources/${file}`)
  }))
}

describe('etl does not run when only one file has been updated', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData()
    return cleanTables().then(function () {
      return putToS3('WMP_PS.xlsx').then(function () {
        return pollAndCheck()
      })
    })
  })

  it('should not run ETL', function () {
    return Promise.each(config.VALID_SHEET_NAMES, function (sheetName) {
      return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
        .then(function (results) {
          expect(results.length).to.equal(0)
        })
    })
  })

  this.afterEach(function () {
    return deleteFromS3('extract/WMP_PS.xlsx')
  })
})

describe('etl runs when both files have been updated', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData()
    return cleanTables().then(function () {
      return putToS3('WMP_PS.xlsx').then(function () {
        return putToS3('WMP_CRC.xlsx').then(function () {
          return pollAndCheck()
        })
      })
    })
  })

  it('should import the extract files into the staging schema', function () {
    return Promise.each(config.VALID_SHEET_NAMES, function (sheetName) {
      return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
        .then(function (results) {
          expect(results.length, sheetName + ' table should contain ' + expectedInputData[sheetName].length + ' entries').to.equal(expectedInputData[sheetName].length)
          expect(results).to.deep.equal(expectedInputData[sheetName])
        })
    })
  })

  afterEach(function () {
    return deleteFromS3('extract/WMP_CRC.xlsx').then(function () {
      return deleteFromS3('extract/WMP_PS.xlsx')
    })
  })
})

describe('etl does not run when time between file updates is too great', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData()

    return cleanTables().then(function () {
      return putToS3('WMP_PS.xlsx').then(function () {
        return new Promise(resolve => setTimeout(resolve, FILES_CHANGED_TIME_WINDOW + 1)).then(function () {
          return putToS3('WMP_CRC.xlsx').then(function () {
            return pollAndCheck()
          })
        }).then(function () {
          return 'Timeout complete'
        })
      })
    })
  })

  it('should not run ETL', function () {
    return Promise.each(config.VALID_SHEET_NAMES, function (sheetName) {
      return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
        .then(function (results) {
          expect(results.length).to.equal(0)
        })
    })
  })

  afterEach(function () {
    return deleteFromS3('extract/WMP_CRC.xlsx').then(function () {
      return deleteFromS3('extract/WMP_PS.xlsx')
    })
  })
})
