const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const insertStagingWorkload = require('../../../helpers/data/insert-staging-workload-helper')
const removeDependencies = require('../../../helpers/data/remove-workload-integration-test-dependencies')
const knex = require('../../../../knex').appSchema

var createWorkload
var createNewTasks

var task = {
  additionalData: {
    batchSize: 1,
  },
  workloadReportId: 5
}

describe('services/workers/create-workload', function () {
  beforeEach(function () {
    createNewTasks = sinon.stub()

    createWorkload = proxyquire('../../../../app/services/workers/create-workload', {
      '../data/create-tasks': createNewTasks
    })
    return insertStagingWorkload()
      .then(function (stagingId) {
        task.additionalData.startingId = stagingId
      })
  })

  it('should insert the correct tiers with the correct filtered totals per tier', function () {
    createNewTasks.resolves()
    return createWorkload.execute(task)
      .then(function () {
        return knex('workload').where('offender_manager.key', 'OMKEY01')
          .join('workload_owner', 'workload.workload_owner_id', 'workload_owner.id')
          .join('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
          .join('tiers', 'tiers.workload_id', 'workload.id')
          .columns(['tiers.location AS location', 'tiers.tier_number AS tier_number', 'tiers.total_filtered_cases AS total_filtered_cases', 'offender_manager.forename AS forename'])
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

            var custodyTiers = workload.filter(w => w.location === 'CUSTODY')
            var cusUntiered = custodyTiers.filter(t => t.tier_number === 0)
            var cusTierD2 = custodyTiers.filter(t => t.tier_number === 1)
            var cusTierD1 = custodyTiers.filter(t => t.tier_number === 2)
            var cusTierC2 = custodyTiers.filter(t => t.tier_number === 3)
            var cusTierC1 = custodyTiers.filter(t => t.tier_number === 4)
            var cusTierB2 = custodyTiers.filter(t => t.tier_number === 5)
            var cusTierB1 = custodyTiers.filter(t => t.tier_number === 6)
            var cusTierA = custodyTiers.filter(t => t.tier_number === 7)

            var licenseTiers = workload.filter(w => w.location === 'LICENSE')
            var licUntiered = licenseTiers.filter(t => t.tier_number === 0)
            var licTierD2 = licenseTiers.filter(t => t.tier_number === 1)
            var licTierD1 = licenseTiers.filter(t => t.tier_number === 2)
            var licTierC2 = licenseTiers.filter(t => t.tier_number === 3)
            var licTierC1 = licenseTiers.filter(t => t.tier_number === 4)
            var licTierB2 = licenseTiers.filter(t => t.tier_number === 5)
            var licTierB1 = licenseTiers.filter(t => t.tier_number === 6)
            var licTierA = licenseTiers.filter(t => t.tier_number === 7)

            expect(communityTiers[0].forename, 'Forename should equal Anonymised').to.equal('Anonymised')
            expect(commUntiered[0].total_filtered_cases, 'Comm Untiered Filtered Cases should equal 2').to.equal(2)
            expect(commTierD2[0].total_filtered_cases, 'Comm D2 Filtered Cases should equal 3').to.equal(3)
            expect(commTierD1[0].total_filtered_cases, 'Comm D1 Filtered Cases should equal 6').to.equal(6)
            expect(commTierC2[0].total_filtered_cases, 'Comm C2 Filtered Cases should equal 7').to.equal(7)
            expect(commTierC1[0].total_filtered_cases, 'Comm C1 Filtered Cases should equal 9').to.equal(9)
            expect(commTierB2[0].total_filtered_cases, 'Comm B2 Filtered Cases should equal 10').to.equal(10)
            expect(commTierB1[0].total_filtered_cases, 'Comm B1 Filtered Cases should equal 11').to.equal(11)
            expect(commTierA[0].total_filtered_cases, 'Comm A Filtered Cases should equal 12').to.equal(12)

            expect(cusUntiered[0].total_filtered_cases, 'Cus Untiered Filtered Cases should equal 21').to.equal(21)
            expect(cusTierD2[0].total_filtered_cases, 'Cus D2 Filtered Cases should equal 22').to.equal(22)
            expect(cusTierD1[0].total_filtered_cases, 'Cus D1 Filtered Cases should equal 23').to.equal(23)
            expect(cusTierC2[0].total_filtered_cases, 'Cus C2 Filtered Cases should equal 24').to.equal(24)
            expect(cusTierC1[0].total_filtered_cases, 'Cus C1 Filtered Cases should equal 25').to.equal(25)
            expect(cusTierB2[0].total_filtered_cases, 'Cus B2 Filtered Cases should equal 26').to.equal(26)
            expect(cusTierB1[0].total_filtered_cases, 'Cus B1 Filtered Cases should equal 27').to.equal(27)
            expect(cusTierA[0].total_filtered_cases, 'Cus A Filtered Cases should equal 28').to.equal(28)

            expect(licUntiered[0].total_filtered_cases, 'Lic Untiered Filtered Cases should equal 13').to.equal(13)
            expect(licTierD2[0].total_filtered_cases, 'Lic D2 Filtered Cases should equal 14').to.equal(14)
            expect(licTierD1[0].total_filtered_cases, 'Lic D1 Filtered Cases should equal 15').to.equal(15)
            expect(licTierC2[0].total_filtered_cases, 'Lic C2 Filtered Cases should equal 16').to.equal(16)
            expect(licTierC1[0].total_filtered_cases, 'Lic C1 Filtered Cases should equal 17').to.equal(17)
            expect(licTierB2[0].total_filtered_cases, 'Lic B2 Filtered Cases should equal 18').to.equal(18)
            expect(licTierB1[0].total_filtered_cases, 'Lic B1 Filtered Cases should equal 19').to.equal(19)
            expect(licTierA[0].total_filtered_cases, 'Lic A Filtered Cases should equal 20').to.equal(20)
          })
      })
  })

  after(function () {
    return removeDependencies()
  })
})
