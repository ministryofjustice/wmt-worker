const expect = require('chai').expect
const fs = require('fs')
const { PutObjectCommand, DeleteObjectCommand, PutObjectTaggingCommand } = require('@aws-sdk/client-s3')
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

function tagFileRead (file) {
  return s3Client.send(new PutObjectTaggingCommand({
    Bucket: config.S3.BUCKET_NAME,
    Key: `extract/${file}`,
    Tagging: {
      TagSet: [
        {
          Key: config.READ_TAG_KEY,
          Value: 'true'
        }
      ]
    }
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
    return Promise.all(config.VALID_SHEET_NAMES.map(function (sheetName) {
      return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
        .then(function (results) {
          expect(results.length).to.equal(0)
        })
    }))
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
    return Promise.all(config.VALID_SHEET_NAMES.map(function (sheetName) {
      return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
        .then(function (results) {
          expect(results.length, sheetName + ' table should contain ' + expectedInputData[sheetName].length + ' entries').to.equal(expectedInputData[sheetName].length)
          expect(results).to.have.deep.members(expectedInputData[sheetName])
        })
    }))
  })

  afterEach(function () {
    return deleteFromS3('extract/WMP_CRC.xlsx').then(function () {
      return deleteFromS3('extract/WMP_PS.xlsx')
    })
  })
})

describe('etl does not run when One file has already been read', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData()

    return cleanTables().then(function () {
      return putToS3('WMP_PS.xlsx').then(function () {
        return tagFileRead('WMP_PS.xlsx').then(function () {
          return putToS3('WMP_CRC.xlsx').then(function () {
            return pollAndCheck()
          })
        })
      })
    })
  })

  it('should not run ETL', function () {
    return Promise.all(config.VALID_SHEET_NAMES.map(function (sheetName) {
      return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
        .then(function (results) {
          expect(results.length).to.equal(0)
        })
    }))
  })

  afterEach(function () {
    return deleteFromS3('extract/WMP_CRC.xlsx').then(function () {
      return deleteFromS3('extract/WMP_PS.xlsx')
    })
  })
})
