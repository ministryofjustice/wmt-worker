process.env.S3_BUCKET_NAME = 'wmt-worker-dashboard'
const nodeDashboard = require('../../../app/services/node-dashboard')
const { listObjects } = require('../../../app/wmt-etl/list-s3-objects')

const expect = require('chai').expect

describe('node dashboard', function () {
  it.only('should insert file into S3', function () {
    process.env.AWS_ACCESS_KEY_ID = 'foobar'
    process.env.AWS_SECRET_ACCESS_KEY = 'foobar'
    
    return nodeDashboard([{}], [{}], [{}])
      .then(function (filePath) {
        return listObjects().then(function (s3Objects) {
            return expect(s3Objects.map(e=>(e.Key))).to.include(filePath);
        })
      })
  })
})
