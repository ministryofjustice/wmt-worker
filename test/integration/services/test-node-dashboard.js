const nodeDashboard = require('../../../app/services/node-dashboard')
const getDashboardClient = require('../../../app/services/dashboard/get-dashboard-s3-client')
const listS3Objects = require('../../../app/services/aws/s3/list-s3-objects')

const config = require('../../../config')

const expect = require('chai').expect

describe('node dashboard', function () {
  it('should insert file into S3', function () {
    return nodeDashboard([{}], [{}], [{}])
      .then(function (filePath) {
        return listS3Objects(getDashboardClient, config.DASHBOARD_BUCKET).then(function (s3Objects) {
          return expect(s3Objects.map(e => (e.Key))).to.include(filePath)
        })
      })
  })
})
