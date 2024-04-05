const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const insertAppWorkload = require('../../../../app/services/data/insert-app-workload')
const Workload = require('../../../../app/services/probation-rules').Workload
const Tiers = require('../../../../app/services/probation-rules').AppTiers
const TierCounts = require('../../../../app/services/probation-rules').TierCounts
const Locations = require('../../../../app/services/probation-rules').Locations
const CaseDetails = require('../../../../app/services/probation-rules').CaseDetails
const workloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

const inserts = []

describe('app/services/data/insert-app-workload', function () {
  let workloadId
  let workload
  const caseDetails = []
  before(function () {
    return workloadOwnerHelper.insertDependencies(inserts)
      .then(function () {
        workload = new Workload(
          inserts.filter((item) => item.table === 'workload_owner')[0].id, // workload owner ID
          2, // total cases
          1, // total t2a cases
          3, // monthly SDRs
          4, // SDRs Due Next 30 Days
          5, // SDR Conversions Last 30 Days
          6, // PAROMS Completed Last 30 Days
          7, // PAROMS Due Next 30 Days
          buildTier(Locations.CUSTODY), // Custody Tiers
          buildTier(Locations.COMMUNITY), // Community Tiers
          buildTier(Locations.LICENSE), // License Tiers
          buildTier(Locations.CUSTODY), // T2A Custody Tiers
          buildTier(Locations.COMMUNITY), // T2A Community Tiers
          buildTier(Locations.LICENSE), // T2A License Tiers
          9, // License Cases Last 16 Weeks
          10, // Community Cases Last 16 Weeks
          11, // ARMS Community Cases
          12, // ARMS License Cases
          13, // Staging ID
          14, // Workload Report ID
          buildFilteredTier(Locations.COMMUNITY, 0), // Filtered Community Tiers
          buildFilteredTier(Locations.CUSTODY, 10), // Filtered Custody Tiers
          buildFilteredTier(Locations.LICENSE, 20), // Filtered License Tiers
          18 // total filtered cases
        )
        caseDetails.push(buildCaseDetails(Locations.COMMUNITY))
        caseDetails.push(buildCaseDetails(Locations.CUSTODY))
        caseDetails.push(buildCaseDetails(Locations.LICENSE))
        caseDetails.push(buildCaseDetails(Locations.COMMUNITY, true))
        caseDetails.push(buildCaseDetails(Locations.CUSTODY, true))
        caseDetails.push(buildCaseDetails(Locations.LICENSE, true))
        return insertAppWorkload(workload, caseDetails).then(function (id) {
          workloadId = id
          inserts.push({ table: 'workload', id })
        })
      })
  })

  it('should insert a new workload record', function () {
    return knex('workload').withSchema('app')
      .join('tiers', 'workload.id', 'tiers.workload_id')
      .join('case_details', 'workload.id', 'case_details.workload_id')
      .where({ 'workload.id': workloadId })
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
        return knex('tiers').withSchema('app')
          .where('workload_id', workloadId)
          .select()
          .then(function (tiers) {
            const licenceTier6 = tiers.filter(t => t.location === Locations.LICENSE && t.tier_number === 6)
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
          })
      })
  })

  it('should insert the correct community tiers', function () {
    return knex('tiers').withSchema('app')
      .where({ workload_id: workloadId, location: Locations.COMMUNITY })
      .select()
      .then(function (tiers) {
        const communityUntiered = tiers.filter(t => t.tier_number === 0)
        const communityTierD2 = tiers.filter(t => t.tier_number === 1)
        const communityTierD1 = tiers.filter(t => t.tier_number === 2)
        const communityTierC2 = tiers.filter(t => t.tier_number === 3)
        const communityTierC1 = tiers.filter(t => t.tier_number === 4)
        const communityTierB2 = tiers.filter(t => t.tier_number === 5)
        const communityTierB1 = tiers.filter(t => t.tier_number === 6)
        const communityTierA = tiers.filter(t => t.tier_number === 7)
        expect(communityUntiered[0].total_filtered_cases, 'Untiered Community total should equal 0').to.equal(0)
        expect(communityTierD2[0].total_filtered_cases, 'D2 Community total should equal 1').to.equal(1)
        expect(communityTierD1[0].total_filtered_cases, 'D1 Community total should equal 2').to.equal(2)
        expect(communityTierC2[0].total_filtered_cases, 'C2 Community total should equal 3').to.equal(3)
        expect(communityTierC1[0].total_filtered_cases, 'C1 Community total should equal 4').to.equal(4)
        expect(communityTierB2[0].total_filtered_cases, 'B2 Community total should equal 5').to.equal(5)
        expect(communityTierB1[0].total_filtered_cases, 'B1 Community total should equal 6').to.equal(6)
        expect(communityTierA[0].total_filtered_cases, 'A Community total should equal 7').to.equal(7)
      })
  })

  it('should insert the correct licence tiers', function () {
    return knex('tiers').withSchema('app')
      .where({ workload_id: workloadId, location: Locations.LICENSE })
      .select()
      .then(function (tiers) {
        const licenceUntiered = tiers.filter(t => t.tier_number === 0)
        const licenceTierD2 = tiers.filter(t => t.tier_number === 1)
        const licenceTierD1 = tiers.filter(t => t.tier_number === 2)
        const licenceTierC2 = tiers.filter(t => t.tier_number === 3)
        const licenceTierC1 = tiers.filter(t => t.tier_number === 4)
        const licenceTierB2 = tiers.filter(t => t.tier_number === 5)
        const licenceTierB1 = tiers.filter(t => t.tier_number === 6)
        const licenceTierA = tiers.filter(t => t.tier_number === 7)
        expect(licenceUntiered[0].total_filtered_cases, 'Untiered Licence total should equal 20').to.equal(20)
        expect(licenceTierD2[0].total_filtered_cases, 'D2 Licence total should equal 21').to.equal(21)
        expect(licenceTierD1[0].total_filtered_cases, 'D1 Licence total should equal 22').to.equal(22)
        expect(licenceTierC2[0].total_filtered_cases, 'C2 Licence total should equal 23').to.equal(23)
        expect(licenceTierC1[0].total_filtered_cases, 'C1 Licence total should equal 24').to.equal(24)
        expect(licenceTierB2[0].total_filtered_cases, 'B2 Licence total should equal 25').to.equal(25)
        expect(licenceTierB1[0].total_filtered_cases, 'B1 Licence total should equal 26').to.equal(26)
        expect(licenceTierA[0].total_filtered_cases, 'A Licence total should equal 27').to.equal(27)
      })
  })

  it('should insert the correct custody tiers', function () {
    return knex('tiers').withSchema('app')
      .where({ workload_id: workloadId, location: Locations.CUSTODY })
      .select()
      .then(function (tiers) {
        const custodyUntiered = tiers.filter(t => t.tier_number === 0)
        const custodyTierD2 = tiers.filter(t => t.tier_number === 1)
        const custodyTierD1 = tiers.filter(t => t.tier_number === 2)
        const custodyTierC2 = tiers.filter(t => t.tier_number === 3)
        const custodyTierC1 = tiers.filter(t => t.tier_number === 4)
        const custodyTierB2 = tiers.filter(t => t.tier_number === 5)
        const custodyTierB1 = tiers.filter(t => t.tier_number === 6)
        const custodyTierA = tiers.filter(t => t.tier_number === 7)
        expect(custodyUntiered[0].total_filtered_cases, 'Untiered Licence total should equal 10').to.equal(10)
        expect(custodyTierD2[0].total_filtered_cases, 'D2 Licence total should equal 11').to.equal(11)
        expect(custodyTierD1[0].total_filtered_cases, 'D1 Licence total should equal 12').to.equal(12)
        expect(custodyTierC2[0].total_filtered_cases, 'C2 Licence total should equal 13').to.equal(13)
        expect(custodyTierC1[0].total_filtered_cases, 'C1 Licence total should equal 14').to.equal(14)
        expect(custodyTierB2[0].total_filtered_cases, 'B2 Licence total should equal 15').to.equal(15)
        expect(custodyTierB1[0].total_filtered_cases, 'B1 Licence total should equal 16').to.equal(16)
        expect(custodyTierA[0].total_filtered_cases, 'A Licence total should equal 17').to.equal(17)
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

function buildTier (location) {
  return new Tiers(location,
    buildTierCount(0), buildTierCount(1), buildTierCount(2),
    buildTierCount(3), buildTierCount(4), buildTierCount(5),
    buildTierCount(6), buildTierCount(7), buildTierCount(8),
    buildTierCount(9), buildTierCount(10), buildTierCount(11),
    buildTierCount(12), buildTierCount(13), buildTierCount(14),
    buildTierCount(15), buildTierCount(16), buildTierCount(17),
    buildTierCount(18), buildTierCount(19), buildTierCount(20),
    buildTierCount(21), buildTierCount(22), buildTierCount(23),
    buildTierCount(24), buildTierCount(25), buildTierCount(26),
    buildTierCount(27), buildTierCount(28), buildTierCount(29),
    buildTierCount(30), buildTierCount(31), buildTierCount(32)
  )
}

function buildFilteredTier (location, extra = 0) {
  return new Tiers(location,
    new TierCounts(0 + extra, 1, 3, 2, 1, 99, 0), new TierCounts(1 + extra, 1, 3, 2, 1, 99, 1), new TierCounts(2 + extra, 1, 3, 2, 1, 99, 2),
    new TierCounts(3 + extra, 1, 3, 2, 1, 99, 3), new TierCounts(4 + extra, 1, 3, 2, 1, 99, 4), new TierCounts(5 + extra, 1, 3, 2, 1, 99, 5),
    new TierCounts(6 + extra, 1, 3, 2, 1, 99, 6), new TierCounts(7 + extra, 1, 3, 2, 1, 99, 7), new TierCounts(8 + extra, 1, 3, 2, 1, 99, 8),
    new TierCounts(9 + extra, 1, 3, 2, 1, 99, 9), new TierCounts(10 + extra, 1, 3, 2, 1, 99, 10), new TierCounts(11 + extra, 1, 3, 2, 1, 99, 11),
    new TierCounts(12 + extra, 1, 3, 2, 1, 99, 12), new TierCounts(13 + extra, 1, 3, 2, 1, 99, 13), new TierCounts(14 + extra, 1, 3, 2, 1, 99, 14),
    new TierCounts(15 + extra, 1, 3, 2, 1, 99, 15), new TierCounts(16 + extra, 1, 3, 2, 1, 99, 16), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 17),
    new TierCounts(0 + extra, 0, 0, 0, 0, 0, 18), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 19), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 20),
    new TierCounts(0 + extra, 0, 0, 0, 0, 0, 21), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 22), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 23),
    new TierCounts(0 + extra, 0, 0, 0, 0, 0, 24), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 25), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 26),
    new TierCounts(0 + extra, 0, 0, 0, 0, 0, 27), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 28), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 29),
    new TierCounts(0 + extra, 0, 0, 0, 0, 0, 30), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 31), new TierCounts(0 + extra, 0, 0, 0, 0, 0, 32))
}

function buildTierCount (tierCode) {
  return new TierCounts(7, 1, 3, 2, 1, 99, tierCode)
}

function buildCaseDetails (location, suspendedLifer = false) {
  // row_type, case_ref_no, tier_code, team_code, om_grade_code, om_key, location
  let caseDetails = []
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
