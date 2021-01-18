const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const insertStagingOmicWorkload = require('../../../helpers/data/insert-staging-omic-workload-helper')
const removeDependencies = require('../../../helpers/data/remove-omic-workload-integration-test-dependencies')
const knex = require('../../../../knex').appSchema

let createWorkload
let createNewTasks

const task = {
  additionalData: {
    batchSize: 1
  },
  workloadReportId: 5
}

describe('services/workers/create-omic-workload', function () {
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
            const communityTiers = workload.filter(w => w.location === 'COMMUNITY')
            const commUntiered = communityTiers.filter(t => t.tier_number === 0)
            const commTierD2 = communityTiers.filter(t => t.tier_number === 1)
            const commTierD1 = communityTiers.filter(t => t.tier_number === 2)
            const commTierC2 = communityTiers.filter(t => t.tier_number === 3)
            const commTierC1 = communityTiers.filter(t => t.tier_number === 4)
            const commTierB2 = communityTiers.filter(t => t.tier_number === 5)
            const commTierB1 = communityTiers.filter(t => t.tier_number === 6)
            const commTierA = communityTiers.filter(t => t.tier_number === 7)
            const commTierE = communityTiers.filter(t => t.tier_number === 8)
            const commTierF = communityTiers.filter(t => t.tier_number === 9)
            const commTierG = communityTiers.filter(t => t.tier_number === 10)

            const custodyTiers = workload.filter(w => w.location === 'CUSTODY')
            const cusUntiered = custodyTiers.filter(t => t.tier_number === 0)
            const cusTierD2 = custodyTiers.filter(t => t.tier_number === 1)
            const cusTierD1 = custodyTiers.filter(t => t.tier_number === 2)
            const cusTierC2 = custodyTiers.filter(t => t.tier_number === 3)
            const cusTierC1 = custodyTiers.filter(t => t.tier_number === 4)
            const cusTierB2 = custodyTiers.filter(t => t.tier_number === 5)
            const cusTierB1 = custodyTiers.filter(t => t.tier_number === 6)
            const cusTierA = custodyTiers.filter(t => t.tier_number === 7)
            const cusTierE = custodyTiers.filter(t => t.tier_number === 8)
            const cusTierF = custodyTiers.filter(t => t.tier_number === 9)
            const cusTierG = custodyTiers.filter(t => t.tier_number === 10)

            const licenseTiers = workload.filter(w => w.location === 'LICENSE')
            const licUntiered = licenseTiers.filter(t => t.tier_number === 0)
            const licTierD2 = licenseTiers.filter(t => t.tier_number === 1)
            const licTierD1 = licenseTiers.filter(t => t.tier_number === 2)
            const licTierC2 = licenseTiers.filter(t => t.tier_number === 3)
            const licTierC1 = licenseTiers.filter(t => t.tier_number === 4)
            const licTierB2 = licenseTiers.filter(t => t.tier_number === 5)
            const licTierB1 = licenseTiers.filter(t => t.tier_number === 6)
            const licTierA = licenseTiers.filter(t => t.tier_number === 7)
            const licTierE = licenseTiers.filter(t => t.tier_number === 8)
            const licTierF = licenseTiers.filter(t => t.tier_number === 9)
            const licTierG = licenseTiers.filter(t => t.tier_number === 10)

            expect(communityTiers[0].forename, 'Forename should equal Anonymised').to.equal('Anonymised')
            expect(commUntiered[0].total_cases, 'Comm Untiered Cases should equal 0').to.equal(0)
            expect(commTierD2[0].total_cases, 'Comm D2 Cases should equal 0').to.equal(0)
            expect(commTierD1[0].total_cases, 'Comm D1 Cases should equal 0').to.equal(0)
            expect(commTierC2[0].total_cases, 'Comm C2 Cases should equal 0').to.equal(0)
            expect(commTierC1[0].total_cases, 'Comm C1 Cases should equal 0').to.equal(0)
            expect(commTierB2[0].total_cases, 'Comm B2 Cases should equal 0').to.equal(0)
            expect(commTierB1[0].total_cases, 'Comm B1 Cases should equal 0').to.equal(0)
            expect(commTierA[0].total_cases, 'Comm A Cases should equal 0').to.equal(0)
            expect(commTierE[0].total_cases, 'Comm E Cases should equal 0').to.equal(0)
            expect(commTierF[0].total_cases, 'Comm F Cases should equal 0').to.equal(0)
            expect(commTierG[0].total_cases, 'Comm G Cases should equal 0').to.equal(0)

            expect(cusUntiered[0].total_cases, 'Cus Untiered Cases should equal 0').to.equal(0)
            expect(cusTierD2[0].total_cases, 'Cus D2 Cases should equal 1').to.equal(1)
            expect(cusTierD1[0].total_cases, 'Cus D1 Cases should equal 2').to.equal(2)
            expect(cusTierC2[0].total_cases, 'Cus C2 Cases should equal 3').to.equal(3)
            expect(cusTierC1[0].total_cases, 'Cus C1 Cases should equal 4').to.equal(4)
            expect(cusTierB2[0].total_cases, 'Cus B2 Cases should equal 5').to.equal(5)
            expect(cusTierB1[0].total_cases, 'Cus B1 Cases should equal 6').to.equal(6)
            expect(cusTierA[0].total_cases, 'Cus A Cases should equal 7').to.equal(7)
            expect(cusTierE[0].total_cases, 'Cus E Cases should equal 8').to.equal(8)
            expect(cusTierF[0].total_cases, 'Cus F Cases should equal 9').to.equal(9)
            expect(cusTierG[0].total_cases, 'Cus G Cases should equal 10').to.equal(10)

            expect(licUntiered[0].total_cases, 'Lic Untiered Cases should equal 0').to.equal(0)
            expect(licTierD2[0].total_cases, 'Lic D2 Cases should equal 0').to.equal(0)
            expect(licTierD1[0].total_cases, 'Lic D1 Cases should equal 0').to.equal(0)
            expect(licTierC2[0].total_cases, 'Lic C2 Cases should equal 0').to.equal(0)
            expect(licTierC1[0].total_cases, 'Lic C1 Cases should equal 0').to.equal(0)
            expect(licTierB2[0].total_cases, 'Lic B2 Cases should equal 0').to.equal(0)
            expect(licTierB1[0].total_cases, 'Lic B1 Cases should equal 0').to.equal(0)
            expect(licTierA[0].total_cases, 'Lic A Cases should equal 0').to.equal(0)
            expect(licTierE[0].total_cases, 'Lic E Cases should equal 0').to.equal(0)
            expect(licTierF[0].total_cases, 'Lic F Cases should equal 0').to.equal(0)
            expect(licTierG[0].total_cases, 'Lic G Cases should equal 0').to.equal(0)
          })
      })
  })

  after(function () {
    return removeDependencies()
  })
})
