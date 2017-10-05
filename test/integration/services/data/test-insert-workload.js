const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)
const insertAppWorkload = require('../../../../app/services/data/insert-app-workload')
const Workload = require('wmt-probation-rules').Workload
const Tiers = require('wmt-probation-rules').AppTiers
const TierCounts = require('wmt-probation-rules').TierCounts
const Locations = require('wmt-probation-rules').Locations
const workloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')

var inserts = []

describe('app/services/data/insert-app-workload', function () {
  var workloadId
  before(function () {
    return workloadOwnerHelper.insertDependencies(inserts)
  })

  it('should insert a new workload record', function (done) {
    var workload = new Workload(
        inserts.filter((item) => item.table === 'workload_owner')[0].id,
        2,
        3,
        4,
        5,
        6,
        7,
        buildTier(Locations.COMMUNITY),
        buildTier(Locations.LICENSE),
        buildTier(Locations.CUSTODY),
        9,
        10,
        11,
        12
    )
    insertAppWorkload(workload).then(function (id) {
      workloadId = id
      inserts.push({table: 'workload', id: id})
      return knex('workload')
        .where({'id': id})
        .first()
        .then(function (result) {
          expect(result).not.to.be.undefined // eslint-disable-line
          expect(result.total_cases).to.equal(2)
          expect(result.monthly_sdrs).to.equal(3)
          expect(result.sdr_due_next_30_days).to.equal(4)
          expect(result.sdr_conversions_last_30_days).to.equal(5)
          expect(result.paroms_completed_last_30_days).to.equal(6)
          expect(result.paroms_due_next_30_days).to.equal(7)
          expect(result.license_last_16_weeks).to.equal(9)
          expect(result.community_last_16_weeks).to.equal(10)
          expect(result.arms_community_cases).to.equal(11)
          expect(result.arms_license_cases).to.equal(12)
          done()
        })
    })
  })

  after(function () {
    return knex('tiers').where('workload_id', workloadId).del().then(function () {
      return workloadOwnerHelper.removeDependencies(inserts)
    })
  })
})

function buildTier (location) {
  return new Tiers(location,
        buildTierCount(), buildTierCount(), buildTierCount(),
        buildTierCount(), buildTierCount(), buildTierCount(),
        buildTierCount(), buildTierCount(), 80)
}

function buildTierCount () {
  return new TierCounts(6, 1, 3, 2)
}
