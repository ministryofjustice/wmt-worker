const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
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
        inserts.filter((item) => item.table === 'workload_owner')[0].id, // workload owner ID
        2,  // total cases
        1,  // total t2a cases
        3,  // monthly SDRs
        4,  // SDRs Due Next 30 Days
        5,  // SDR Conversions Last 30 Days
        6,  // PAROMS Completed Last 30 Days
        7,  // PAROMS Due Next 30 Days
        buildTier(Locations.CUSTODY), // Custody Tiers
        buildTier(Locations.COMMUNITY), // Community Tiers
        buildTier(Locations.LICENSE), // License Tiers
        buildTier(Locations.CUSTODY), // T2A Custody Tiers
        buildTier(Locations.COMMUNITY), // T2A Community Tiers
        buildTier(Locations.LICENSE), // T2A License Tiers
        9,  // License Cases Last 16 Weeks
        10, // Community Cases Last 16 Weeks
        11, // ARMS Community Cases
        12, // ARMS License Cases
        13, // Staging ID
        14  // Workload Report ID
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
          expect(result.total_t2a_cases).to.equal(1)
          expect(result.monthly_sdrs).to.equal(3)
          expect(result.sdr_due_next_30_days).to.equal(4)
          expect(result.sdr_conversions_last_30_days).to.equal(5)
          expect(result.paroms_completed_last_30_days).to.equal(6)
          expect(result.paroms_due_next_30_days).to.equal(7)
          expect(result.license_last_16_weeks).to.equal(9)
          expect(result.community_last_16_weeks).to.equal(10)
          expect(result.arms_community_cases).to.equal(11)
          expect(result.arms_license_cases).to.equal(12)
          expect(result.staging_id).to.equal(13)
          expect(result.workload_report_id).to.equal(14)
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
  return new TierCounts(7, 1, 3, 2, 1)
}
