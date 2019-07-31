const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const insertAppWorkload = require('../../../../app/services/data/insert-app-workload')
const Workload = require('wmt-probation-rules').Workload
const Tiers = require('wmt-probation-rules').AppTiers
const TierCounts = require('wmt-probation-rules').TierCounts
const Locations = require('wmt-probation-rules').Locations
const CaseDetails = require('wmt-probation-rules').CaseDetails
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
        14,  // Workload Report ID
        buildTier(Locations.CUSTODY), // Custody Tiers
        buildTier(Locations.COMMUNITY), // Community Tiers
        buildTier(Locations.LICENSE), // License Tiers
        18 // total filtered cases
    )

    var caseDetails = []
    caseDetails.push(buildCaseDetails(Locations.COMMUNITY))
    caseDetails.push(buildCaseDetails(Locations.CUSTODY))
    caseDetails.push(buildCaseDetails(Locations.LICENSE))
    caseDetails.push(buildCaseDetails(Locations.COMMUNITY, true))
    caseDetails.push(buildCaseDetails(Locations.CUSTODY, true))
    caseDetails.push(buildCaseDetails(Locations.LICENSE, true))

    insertAppWorkload(workload, caseDetails).then(function (id) {
      workloadId = id
      inserts.push({table: 'workload', id: id})
      return knex('workload')
        .join('tiers', 'workload.id', 'tiers.workload_id')
        .join('case_details', 'workload.id', 'case_details.workload_id')
        .where({'workload.id': id})
        .select('workload.total_cases AS total_cases', 'workload.total_filtered_cases AS total_filtered_cases',
        'workload.total_t2a_cases AS total_t2a_cases',
        'workload.monthly_sdrs AS monthly_sdrs', 'workload.sdr_due_next_30_days AS sdr_due_next_30_days',
        'workload.sdr_conversions_last_30_days AS sdr_conversions_last_30_days',
        'workload.paroms_completed_last_30_days AS paroms_completed_last_30_days',
        'workload.paroms_due_next_30_days AS paroms_due_next_30_days',
        'workload.license_last_16_weeks AS license_last_16_weeks',
        'workload.community_last_16_weeks AS community_last_16_weeks',
        'workload.arms_community_cases AS arms_community_cases',
        'workload.arms_license_cases AS arms_license_cases', 'workload.staging_id AS staging_id',
        'workload.workload_report_id AS workload_report_id', 'case_details.case_ref_no AS case_ref_no')
        .then(function (result) {
          return knex('tiers')
            .where('workload_id', id)
            .select()
            .then(function (tiers) {
              var licenceTier6 = tiers.filter(t => t.location === Locations.LICENSE && t.tier_number === 6)
              expect(licenceTier6[0].suspended_lifer_total).to.equal(99)
              expect(result[0]).not.to.be.undefined // eslint-disable-line
              expect(result[0].total_cases).to.equal(2)
              expect(result[0].total_filtered_cases).to.equal(18)
              expect(result[0].total_t2a_cases).to.equal(1)
              expect(result[0].monthly_sdrs).to.equal(3)
              expect(result[0].sdr_due_next_30_days).to.equal(4)
              expect(result[0].sdr_conversions_last_30_days).to.equal(5)
              expect(result[0].paroms_completed_last_30_days).to.equal(6)
              expect(result[0].paroms_due_next_30_days).to.equal(7)
              expect(result[0].license_last_16_weeks).to.equal(9)
              expect(result[0].community_last_16_weeks).to.equal(10)
              expect(result[0].arms_community_cases).to.equal(11)
              expect(result[0].arms_license_cases).to.equal(12)
              expect(result[0].staging_id).to.equal(13)
              expect(result[0].workload_report_id).to.equal(14)
              expect(result[0].case_ref_no).to.equal('DTL123')
              done()
            })
        })
    })
  })

  after(function () {
    return knex('tiers').where('workload_id', workloadId).del().then(function () {
      return knex('case_details').where('workload_id', workloadId).del().then(function () {
        return workloadOwnerHelper.removeDependencies(inserts)
      })
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
  return new TierCounts(7, 1, 3, 2, 1, 99)
}

function buildCaseDetails (location, suspendedLifer = false) {
  // row_type, case_ref_no, tier_code, team_code, om_grade_code, om_key, location
  var caseDetails = []
  if (suspendedLifer) {
    switch (location) {
      case Locations.COMMUNITY:
        caseDetails = new CaseDetails('U', 'CN1234', 1, 'Team 1', 'C', '1001', location)
        break
      case Locations.CUSTODY:
        caseDetails = new CaseDetails('U', 'CN1234', '1', 'Team 1', 'C', '1001', location)
        break
      case Locations.LICENSE:
        caseDetails = new CaseDetails('U', 'CN1234', '6', 'Team 1', 'C', '1001', location)
        break
    }
  } else {
    switch (location) {
      case Locations.COMMUNITY:
        caseDetails = new CaseDetails('L', 'DTL123', 1, 'Team 1', 'D', '2001', location)
        break
      case Locations.CUSTODY:
        caseDetails = new CaseDetails('L', 'DTL124', '1', 'Team 1', 'D', '2001', location)
        break
      case Locations.LICENSE:
        caseDetails = new CaseDetails('L', 'DTL125', '6', 'Team 1', 'D', '2001', location)
        break
    }
  }
  return caseDetails
}
