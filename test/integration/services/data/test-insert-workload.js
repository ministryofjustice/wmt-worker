const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)
const insertAppWorkload = require('../../../../app/services/data/insert-app-workload')
const Workload = require('wmt-probation-rules').Workload
const Tiers = require('wmt-probation-rules').AppTiers
const TierCounts = require('wmt-probation-rules').TierCounts
const Locations = require('wmt-probation-rules').Locations
const moment = require('moment')

var inserts = []

describe('app/services/data/insert-app-workload', function () {
  var workloadId
  it('should insert a new workload record', function (done) {
    var workload = new Workload(
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        buildTier(Locations.COMMUNITY),
        buildTier(Locations.LICENSE),
        buildTier(Locations.CUSTODY)
    )
    insertAppWorkload(workload).then(function (id) {
      workloadId = id
      return knex.table('workload')
        .where({'id': workloadId})
        .first()
        .then(function (result) {
          console.log(result)
          done()
        })
    })
  })

  after(function () {
    return knex('workload').where('id', workloadId).del()
  })
})

function buildTier (location) {
    return new Tiers(location,
        buildTierCount(),buildTierCount(),buildTierCount(),
        buildTierCount(),buildTierCount(),buildTierCount(),
        buildTierCount(),buildTierCount(), 80)
}

function buildTierCount() {
    return new TierCounts(6, 1, 3, 2)
}
