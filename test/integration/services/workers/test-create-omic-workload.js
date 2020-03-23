const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const insertStagingOmicWorkload = require('../../../helpers/data/insert-staging-omic-workload-helper')
const removeDependencies = require('../../../helpers/data/remove-omic-workload-integration-test-dependencies')
const knex = require('../../../../knex').appSchema

var createWorkload
var createNewTasks

var task = {
  additionalData: {
    batchSize: 1
  },
  workloadReportId: 5
}

describe('services/workers/create-workload', function () {
  beforeEach(function () {
    createNewTasks = sinon.stub()

    createWorkload = proxyquire('../../../../app/services/workers/create-omic-workload', {
      '../data/create-tasks': createNewTasks
    })
    return insertStagingOmicWorkload()
      .then(function (stagingId) {
        task.additionalData.startingId = stagingId
      })
  })

  it('should insert the correct omic tiers with the correct totals per tier', function () {
    createNewTasks.resolves()
    return createWorkload.execute(task)
      .then(function () {
        return knex('omic_workload').where('offender_manager.key', 'OMKEY01')
          .join('workload_owner', 'omic_workload.workload_owner_id', 'workload_owner.id')
          .join('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
          .join('omic_tiers', 'omic_tiers.omic_workload_id', 'omic_workload.id')
          .columns(['omic_workload.id AS workload_id', 'omic_tiers.location AS location', 'omic_tiers.tier_number AS tier_number', 'omic_tiers.total_cases AS total_cases', 'offender_manager.forename AS forename'])
          .then(function (workload) {
            var communityTiers = workload.filter(w => w.location === 'COMMUNITY')
            var commUntiered = communityTiers.filter(t => t.tier_number === 0)
            var commTierD2 = communityTiers.filter(t => t.tier_number === 1)
            var commTierD1 = communityTiers.filter(t => t.tier_number === 2)
            var commTierC2 = communityTiers.filter(t => t.tier_number === 3)
            var commTierC1 = communityTiers.filter(t => t.tier_number === 4)
            var commTierB2 = communityTiers.filter(t => t.tier_number === 5)
            var commTierB1 = communityTiers.filter(t => t.tier_number === 6)
            var commTierA = communityTiers.filter(t => t.tier_number === 7)
            var commTierE = communityTiers.filter(t => t.tier_number === 8)
            var commTierF = communityTiers.filter(t => t.tier_number === 9)
            var commTierG = communityTiers.filter(t => t.tier_number === 10)

            var custodyTiers = workload.filter(w => w.location === 'CUSTODY')
            var cusUntiered = custodyTiers.filter(t => t.tier_number === 0)
            var cusTierD2 = custodyTiers.filter(t => t.tier_number === 1)
            var cusTierD1 = custodyTiers.filter(t => t.tier_number === 2)
            var cusTierC2 = custodyTiers.filter(t => t.tier_number === 3)
            var cusTierC1 = custodyTiers.filter(t => t.tier_number === 4)
            var cusTierB2 = custodyTiers.filter(t => t.tier_number === 5)
            var cusTierB1 = custodyTiers.filter(t => t.tier_number === 6)
            var cusTierA = custodyTiers.filter(t => t.tier_number === 7)
            var cusTierE = custodyTiers.filter(t => t.tier_number === 8)
            var cusTierF = custodyTiers.filter(t => t.tier_number === 9)
            var cusTierG = custodyTiers.filter(t => t.tier_number === 10)

            var licenseTiers = workload.filter(w => w.location === 'LICENSE')
            var licUntiered = licenseTiers.filter(t => t.tier_number === 0)
            var licTierD2 = licenseTiers.filter(t => t.tier_number === 1)
            var licTierD1 = licenseTiers.filter(t => t.tier_number === 2)
            var licTierC2 = licenseTiers.filter(t => t.tier_number === 3)
            var licTierC1 = licenseTiers.filter(t => t.tier_number === 4)
            var licTierB2 = licenseTiers.filter(t => t.tier_number === 5)
            var licTierB1 = licenseTiers.filter(t => t.tier_number === 6)
            var licTierA = licenseTiers.filter(t => t.tier_number === 7)
            var licTierE = licenseTiers.filter(t => t.tier_number === 8)
            var licTierF = licenseTiers.filter(t => t.tier_number === 9)
            var licTierG = licenseTiers.filter(t => t.tier_number === 10)

            expect(communityTiers[0].forename, 'Forename should equal Anonymised').to.equal('Anonymised')
            expect(commUntiered[0].total_cases, 'Comm Untiered Cases should equal 3').to.equal(3)
            expect(commTierD2[0].total_cases, 'Comm D2 Cases should equal 4').to.equal(4)
            expect(commTierD1[0].total_cases, 'Comm D1 Cases should equal 7').to.equal(7)
            expect(commTierC2[0].total_cases, 'Comm C2 Cases should equal 8').to.equal(8)
            expect(commTierC1[0].total_cases, 'Comm C1 Cases should equal 10').to.equal(10)
            expect(commTierB2[0].total_cases, 'Comm B2 Cases should equal 11').to.equal(11)
            expect(commTierB1[0].total_cases, 'Comm B1 Cases should equal 12').to.equal(12)
            expect(commTierA[0].total_cases, 'Comm A Cases should equal 13').to.equal(13)
            expect(commTierE[0].total_cases, 'Comm E Cases should equal 34').to.equal(34)
            expect(commTierF[0].total_cases, 'Comm F Cases should equal 35').to.equal(35)
            expect(commTierG[0].total_cases, 'Comm G Cases should equal 36').to.equal(36)

            expect(cusUntiered[0].total_cases, 'Cus Untiered Cases should equal 22').to.equal(22)
            expect(cusTierD2[0].total_cases, 'Cus D2 Cases should equal 23').to.equal(23)
            expect(cusTierD1[0].total_cases, 'Cus D1 Cases should equal 24').to.equal(24)
            expect(cusTierC2[0].total_cases, 'Cus C2 Cases should equal 25').to.equal(25)
            expect(cusTierC1[0].total_cases, 'Cus C1 Cases should equal 26').to.equal(26)
            expect(cusTierB2[0].total_cases, 'Cus B2 Cases should equal 27').to.equal(27)
            expect(cusTierB1[0].total_cases, 'Cus B1 Cases should equal 28').to.equal(28)
            expect(cusTierA[0].total_cases, 'Cus A Cases should equal 29').to.equal(29)
            expect(cusTierE[0].total_cases, 'Cus E Cases should equal 37').to.equal(37)
            expect(cusTierF[0].total_cases, 'Cus F Cases should equal 38').to.equal(38)
            expect(cusTierG[0].total_cases, 'Cus G Cases should equal 39').to.equal(39)

            expect(licUntiered[0].total_cases, 'Lic Untiered Cases should equal 14').to.equal(14)
            expect(licTierD2[0].total_cases, 'Lic D2 Cases should equal 15').to.equal(15)
            expect(licTierD1[0].total_cases, 'Lic D1 Cases should equal 16').to.equal(16)
            expect(licTierC2[0].total_cases, 'Lic C2 Cases should equal 17').to.equal(17)
            expect(licTierC1[0].total_cases, 'Lic C1 Cases should equal 18').to.equal(18)
            expect(licTierB2[0].total_cases, 'Lic B2 Cases should equal 19').to.equal(19)
            expect(licTierB1[0].total_cases, 'Lic B1 Cases should equal 20').to.equal(20)
            expect(licTierA[0].total_cases, 'Lic A Cases should equal 21').to.equal(21)
            expect(licTierE[0].total_cases, 'Lic E Cases should equal 40').to.equal(40)
            expect(licTierF[0].total_cases, 'Lic F Cases should equal 41').to.equal(41)
            expect(licTierG[0].total_cases, 'Lic G Cases should equal 42').to.equal(42)
          })
      })
  })

  after(function () {
    return removeDependencies()
  })
})
