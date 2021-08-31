const dashboard = require('../../../app/services/dashboard')
const getDashboardClient = require('../../../app/services/dashboard/get-dashboard-s3-client')
const listS3Objects = require('../../../app/services/aws/s3/list-s3-objects')

const config = require('../../../config')
const expect = require('chai').expect

describe('dashboard', function () {
  it('should generate a dashboard', function () {
    return dashboard().then(function ({ filepath }) {
      return listS3Objects(getDashboardClient, config.DASHBOARD_BUCKET).then(function (s3Objects) {
        return expect(s3Objects.map(e => (e.Key))).to.include(filepath)
      })
    })
  })
})
