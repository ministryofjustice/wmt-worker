const expect = require('chai').expect
const fs = require('fs')
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const cleanTables = require('../../../app/wmt-etl/clean-tables')

const knex = require('../../../knex').stagingSchema
const config = require('../../../etl-config')
const getExtractFileData = require('../../helpers/etl/get-extract-file-data')
const pollSQS = require('../../../app/wmt-etl/poll-sqs')

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
  // waiting for message to apear on queue after startup

  return pollSQS().then(function (result) {
    if (result === 'No messages to process') {
      return pollAndCheck(result)
    }
    return 'OK'
  })
}

describe('etl does not run when only one file has been updated', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData()
    // put a file
    // check db
    // delete a file
    // make time difference configurable for testing
    return cleanTables().then(function () {
      return s3Client.send(new PutObjectCommand({
        Bucket: config.S3.BUCKET_NAME,
        Key: 'extract/WMP_PS.xlsx',
        Body: fs.readFileSync('test/integration/resources/WMP_PS.xlsx')
      })).then(function () {
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
    return s3Client.send(new DeleteObjectCommand({
      Bucket: config.S3.BUCKET_NAME,
      Key: 'extract/WMP_PS.xlsx'
    }))
  })
})

describe('etl runs when both files have been updated', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData()
    // put both files
    // check db
    // delete both files
    // make time difference configurable for testing
    return cleanTables().then(function () {
      return s3Client.send(new PutObjectCommand({
        Bucket: config.S3.BUCKET_NAME,
        Key: 'extract/WMP_PS.xlsx',
        Body: fs.readFileSync('test/integration/resources/WMP_PS.xlsx')
      })).then(function () {
        return s3Client.send(new PutObjectCommand({
          Bucket: config.S3.BUCKET_NAME,
          Key: 'extract/WMP_CRC.xlsx',
          Body: fs.readFileSync('test/integration/resources/WMP_CRC.xlsx')
        })).then(function () {
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
    return s3Client.send(new DeleteObjectCommand({
      Bucket: config.S3.BUCKET_NAME,
      Key: 'extract/WMP_CRC.xlsx'
    })).then(function () {
      return s3Client.send(new DeleteObjectCommand({
        Bucket: config.S3.BUCKET_NAME,
        Key: 'extract/WMP_PS.xlsx'
      }))
    })
  })
})

describe('etl does not run when time between file updates is too great', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData()
    // put both files 5 seconds apart
    // check db
    // delete both files

    return cleanTables().then(function () {
      return s3Client.send(new PutObjectCommand({
        Bucket: config.S3.BUCKET_NAME,
        Key: 'extract/WMP_PS.xlsx',
        Body: fs.readFileSync('test/integration/resources/WMP_PS.xlsx')
      })).then(function () {
        return new Promise(resolve => setTimeout(resolve, 5000)).then(function () {
          return s3Client.send(new PutObjectCommand({
            Bucket: config.S3.BUCKET_NAME,
            Key: 'extract/WMP_CRC.xlsx',
            Body: fs.readFileSync('test/integration/resources/WMP_CRC.xlsx')
          })).then(function () {
            return pollAndCheck()
          })
        }, 5000).then(function () {
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
    return s3Client.send(new DeleteObjectCommand({
      Bucket: config.S3.BUCKET_NAME,
      Key: 'extract/WMP_CRC.xlsx'
    })).then(function () {
      return s3Client.send(new DeleteObjectCommand({
        Bucket: config.S3.BUCKET_NAME,
        Key: 'extract/WMP_PS.xlsx'
      }))
    })
  })
})
