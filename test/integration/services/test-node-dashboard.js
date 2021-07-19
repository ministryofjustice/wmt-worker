const nodeDashboard = require('../../../app/services/node-dashboard')
const { listObjects } = require('../../../app/services/list-s3-objects')
const config = require('../../../config')

const expect = require('chai').expect

describe('node dashboard', function () {
  it('should insert file into S3', function () {
    process.env.AWS_ACCESS_KEY_ID = 'foobar'
    process.env.AWS_SECRET_ACCESS_KEY = 'foobar'

    return nodeDashboard([{}], [{}], [{}])
      .then(function (filePath) {
        return listObjects(config.DASHBOARD_BUCKET).then(function (s3Objects) {
          return expect(s3Objects.map(e => (e.Key))).to.include(filePath)
        })
      })
  })
})
