const expect = require('chai').expect

const helper = require('../../helpers/data/app-workload-helper')
const removeIntegrationTestData = require('../../helpers/data/remove-integration-test-data')
const parseAppWorkloads = require('../../../app/services/parse-app-workloads')

const Workload = require('../../../app/services/probation-rules').Workload

let inserts = []
let initialWorkloadStagingId

describe('services/parse-app-workloads', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        initialWorkloadStagingId = 1
      })
  })

  it('should retrieve all the workloads with staging ids within a given range', function () {
    const batchSize = 2
    const maxStagingId = initialWorkloadStagingId + batchSize - 1
    const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

    return parseAppWorkloads(initialWorkloadStagingId, maxStagingId, batchSize, workloadReportId)
      .then(function (queryResults) {
        expect(queryResults.length).to.equal(batchSize)

        const firstWorkload = queryResults[0].values
        expect(firstWorkload).to.be.an.instanceof(Workload)
        expect(firstWorkload.workloadOwnerId).to.equal(workloadOwnerId)
        expect(firstWorkload.totalCases).to.equal(20)
        expect(firstWorkload.totalT2aCases).to.equal(10)
        expect(firstWorkload.custodyTiers.total).to.equal(1)
        expect(firstWorkload.communityTiers.total).to.equal(2)
        expect(firstWorkload.licenseTiers.total).to.equal(3)
        expect(firstWorkload.t2aCustodyTiers.total).to.equal(2)
        expect(firstWorkload.t2aCommunityTiers.total).to.equal(3)
        expect(firstWorkload.t2aLicenseTiers.total).to.equal(4)
        expect(firstWorkload.monthlySdrs).to.equal(4)
        expect(firstWorkload.sdrsDueNext30Days).to.equal(5)
        expect(firstWorkload.sdrConversionsLast30Days).to.equal(6)
        expect(firstWorkload.paromsCompletedLast30Days).to.equal(7)
        expect(firstWorkload.paromsDueNext30Days).to.equal(8)
        expect(firstWorkload.licenseCasesLast16Weeks).to.equal(9)
        expect(firstWorkload.communityCasesLast16Weeks).to.equal(10)
        expect(firstWorkload.armsCommunityCases).to.equal(11)
        expect(firstWorkload.armsLicenseCases).to.equal(12)

        const secondWorkload = queryResults[1].values
        expect(secondWorkload.totalCases).to.equal(30)
      })
  })

  it('should retrieve a workload for a given staging id with a batchSize of 1', function () {
    const batchSize = 1
    const maxStagingId = initialWorkloadStagingId
    const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

    return parseAppWorkloads(initialWorkloadStagingId, maxStagingId, batchSize, workloadReportId)
      .then(function (queryResults) {
        expect(queryResults.length).to.equal(batchSize)

        const firstWorkload = queryResults[0].values
        expect(firstWorkload).to.be.an.instanceof(Workload)
        expect(firstWorkload.workloadOwnerId).to.equal(workloadOwnerId)
        expect(firstWorkload.totalCases).to.equal(20)
        expect(firstWorkload.totalT2aCases).to.equal(10)
        expect(firstWorkload.custodyTiers.total).to.equal(1)
        expect(firstWorkload.communityTiers.total).to.equal(2)
        expect(firstWorkload.licenseTiers.total).to.equal(3)
        expect(firstWorkload.filteredCustodyTiers.total).to.equal(0)
        expect(firstWorkload.filteredCommunityTiers.total).to.equal(1)
        expect(firstWorkload.filteredLicenseTiers.total).to.equal(2)
        expect(firstWorkload.t2aCustodyTiers.total).to.equal(2)
        expect(firstWorkload.t2aCommunityTiers.total).to.equal(3)
        expect(firstWorkload.t2aLicenseTiers.total).to.equal(4)
        expect(firstWorkload.monthlySdrs).to.equal(4)
        expect(firstWorkload.sdrsDueNext30Days).to.equal(5)
        expect(firstWorkload.sdrConversionsLast30Days).to.equal(6)
        expect(firstWorkload.paromsCompletedLast30Days).to.equal(7)
        expect(firstWorkload.paromsDueNext30Days).to.equal(8)
        expect(firstWorkload.licenseCasesLast16Weeks).to.equal(9)
        expect(firstWorkload.communityCasesLast16Weeks).to.equal(10)
        expect(firstWorkload.armsCommunityCases).to.equal(11)
        expect(firstWorkload.armsLicenseCases).to.equal(12)

        expect(firstWorkload.communityTiers.untiered.total, 'Untiered Community total should equal 0').to.equal(0)
        expect(firstWorkload.communityTiers.d0.total, 'D0 Community total should equal 16').to.be.equal(16)
        expect(firstWorkload.communityTiers.d1.total, 'D1 Community total should equal 15').to.be.equal(15)
        expect(firstWorkload.communityTiers.d2.total, 'D2 Community total should equal 14').to.be.equal(14)
        expect(firstWorkload.communityTiers.d3.total, 'D3 Community total should equal 13').to.be.equal(13)
        expect(firstWorkload.communityTiers.c0.total, 'C0 Community total should equal 12').to.be.equal(12)
        expect(firstWorkload.communityTiers.c1.total, 'C1 Community total should equal 11').to.be.equal(11)
        expect(firstWorkload.communityTiers.c2.total, 'C2 Community total should equal 10').to.be.equal(10)
        expect(firstWorkload.communityTiers.c3.total, 'C3 Community total should equal 9').to.be.equal(9)
        expect(firstWorkload.communityTiers.b0.total, 'B0 Community total should equal 8').to.be.equal(8)
        expect(firstWorkload.communityTiers.b1.total, 'B1 Community total should equal 7').to.be.equal(7)
        expect(firstWorkload.communityTiers.b2.total, 'B2 Community total should equal 6').to.be.equal(6)
        expect(firstWorkload.communityTiers.b3.total, 'B3 Community total should equal 5').to.be.equal(5)
        expect(firstWorkload.communityTiers.a0.total, 'A0 Community total should equal 4').to.be.equal(4)
        expect(firstWorkload.communityTiers.a1.total, 'A1 Community total should equal 3').to.be.equal(3)
        expect(firstWorkload.communityTiers.a2.total, 'A2 Community total should equal 2').to.be.equal(2)
        expect(firstWorkload.communityTiers.a3.total, 'A3 Community total should equal 1').to.be.equal(1)

        expect(firstWorkload.custodyTiers.untiered.total, 'Untiered Custody total should equal 1').to.equal(1)
        expect(firstWorkload.custodyTiers.d0.total, 'D0 Custody total should equal 17').to.be.equal(17)
        expect(firstWorkload.custodyTiers.d1.total, 'D1 Custody total should equal 16').to.be.equal(16)
        expect(firstWorkload.custodyTiers.d2.total, 'D2 Custody total should equal 15').to.be.equal(15)
        expect(firstWorkload.custodyTiers.d3.total, 'D3 Custody total should equal 14').to.be.equal(14)
        expect(firstWorkload.custodyTiers.c0.total, 'C0 Custody total should equal 13').to.be.equal(13)
        expect(firstWorkload.custodyTiers.c1.total, 'C1 Custody total should equal 12').to.be.equal(12)
        expect(firstWorkload.custodyTiers.c2.total, 'C2 Custody total should equal 11').to.be.equal(11)
        expect(firstWorkload.custodyTiers.c3.total, 'C3 Custody total should equal 10').to.be.equal(10)
        expect(firstWorkload.custodyTiers.b0.total, 'B0 Custody total should equal 9').to.be.equal(9)
        expect(firstWorkload.custodyTiers.b1.total, 'B1 Custody total should equal 8').to.be.equal(8)
        expect(firstWorkload.custodyTiers.b2.total, 'B2 Custody total should equal 7').to.be.equal(7)
        expect(firstWorkload.custodyTiers.b3.total, 'B3 Custody total should equal 6').to.be.equal(6)
        expect(firstWorkload.custodyTiers.a0.total, 'A0 Custody total should equal 5').to.be.equal(5)
        expect(firstWorkload.custodyTiers.a1.total, 'A1 Custody total should equal 4').to.be.equal(4)
        expect(firstWorkload.custodyTiers.a2.total, 'A2 Custody total should equal 3').to.be.equal(3)
        expect(firstWorkload.custodyTiers.a3.total, 'A3 Custody total should equal 2').to.be.equal(2)

        expect(firstWorkload.licenseTiers.untiered.total, 'Untiered Licence total should equal 2').to.equal(2)
        expect(firstWorkload.licenseTiers.d0.total, 'D0 Licence total should equal 18').to.be.equal(18)
        expect(firstWorkload.licenseTiers.d1.total, 'D1 Licence total should equal 17').to.be.equal(17)
        expect(firstWorkload.licenseTiers.d2.total, 'D2 Licence total should equal 16').to.be.equal(16)
        expect(firstWorkload.licenseTiers.d3.total, 'D3 Licence total should equal 15').to.be.equal(15)
        expect(firstWorkload.licenseTiers.c0.total, 'C0 Licence total should equal 14').to.be.equal(14)
        expect(firstWorkload.licenseTiers.c1.total, 'C1 Licence total should equal 13').to.be.equal(13)
        expect(firstWorkload.licenseTiers.c2.total, 'C2 Licence total should equal 12').to.be.equal(12)
        expect(firstWorkload.licenseTiers.c3.total, 'C3 Licence total should equal 11').to.be.equal(11)
        expect(firstWorkload.licenseTiers.b0.total, 'B0 Licence total should equal 10').to.be.equal(10)
        expect(firstWorkload.licenseTiers.b1.total, 'B1 Licence total should equal 8').to.be.equal(9)
        expect(firstWorkload.licenseTiers.b2.total, 'B2 Licence total should equal 8').to.be.equal(8)
        expect(firstWorkload.licenseTiers.b3.total, 'B3 Licence total should equal 7').to.be.equal(7)
        expect(firstWorkload.licenseTiers.a0.total, 'A0 Licence total should equal 6').to.be.equal(6)
        expect(firstWorkload.licenseTiers.a1.total, 'A1 Licence total should equal 5').to.be.equal(5)
        expect(firstWorkload.licenseTiers.a2.total, 'A2 Licence total should equal 4').to.be.equal(4)
        expect(firstWorkload.licenseTiers.a3.total, 'A3 Licence total should equal 3').to.be.equal(3)

        expect(firstWorkload.filteredCommunityTiers.untiered.total, 'Untiered Filtered Community total should equal 0').to.equal(0)
        expect(firstWorkload.filteredCommunityTiers.d0.total, 'D0 Filtered Community total should equal 15').to.be.equal(15)
        expect(firstWorkload.filteredCommunityTiers.d1.total, 'D1 Filtered Community total should equal 14').to.be.equal(14)
        expect(firstWorkload.filteredCommunityTiers.d2.total, 'D2 Filtered Community total should equal 13').to.be.equal(13)
        expect(firstWorkload.filteredCommunityTiers.d3.total, 'D3 Filtered Community total should equal 12').to.be.equal(12)
        expect(firstWorkload.filteredCommunityTiers.c0.total, 'C0 Filtered Community total should equal 11').to.be.equal(11)
        expect(firstWorkload.filteredCommunityTiers.c1.total, 'C1 Filtered Community total should equal 10').to.be.equal(10)
        expect(firstWorkload.filteredCommunityTiers.c2.total, 'C2 Filtered Community total should equal 9').to.be.equal(9)
        expect(firstWorkload.filteredCommunityTiers.c3.total, 'C3 Filtered Community total should equal 8').to.be.equal(8)
        expect(firstWorkload.filteredCommunityTiers.b0.total, 'B0 Filtered Community total should equal 7').to.be.equal(7)
        expect(firstWorkload.filteredCommunityTiers.b1.total, 'B1 Filtered Community total should equal 6').to.be.equal(6)
        expect(firstWorkload.filteredCommunityTiers.b2.total, 'B2 Filtered Community total should equal 5').to.be.equal(5)
        expect(firstWorkload.filteredCommunityTiers.b3.total, 'B3 Filtered Community total should equal 4').to.be.equal(4)
        expect(firstWorkload.filteredCommunityTiers.a0.total, 'A0 Filtered Community total should equal 3').to.be.equal(3)
        expect(firstWorkload.filteredCommunityTiers.a1.total, 'A1 Filtered Community total should equal 2').to.be.equal(2)
        expect(firstWorkload.filteredCommunityTiers.a2.total, 'A2 Filtered Community total should equal 1').to.be.equal(1)
        expect(firstWorkload.filteredCommunityTiers.a3.total, 'A3 Filtered Community total should equal 0').to.be.equal(0)

        expect(firstWorkload.filteredCustodyTiers.untiered.total, 'Untiered Filtered Custody total should equal 0').to.equal(0)
        expect(firstWorkload.filteredCustodyTiers.d0.total, 'D0 Filtered Custody total should equal 16').to.be.equal(16)
        expect(firstWorkload.filteredCustodyTiers.d1.total, 'D1 Filtered Custody total should equal 15').to.be.equal(15)
        expect(firstWorkload.filteredCustodyTiers.d2.total, 'D2 Filtered Custody total should equal 14').to.be.equal(14)
        expect(firstWorkload.filteredCustodyTiers.d3.total, 'D3 Filtered Custody total should equal 13').to.be.equal(13)
        expect(firstWorkload.filteredCustodyTiers.c0.total, 'C0 Filtered Custody total should equal 12').to.be.equal(12)
        expect(firstWorkload.filteredCustodyTiers.c1.total, 'C1 Filtered Custody total should equal 11').to.be.equal(11)
        expect(firstWorkload.filteredCustodyTiers.c2.total, 'C2 Filtered Custody total should equal 10').to.be.equal(10)
        expect(firstWorkload.filteredCustodyTiers.c3.total, 'C3 Filtered Custody total should equal 9').to.be.equal(9)
        expect(firstWorkload.filteredCustodyTiers.b0.total, 'B0 Filtered Custody total should equal 8').to.be.equal(8)
        expect(firstWorkload.filteredCustodyTiers.b1.total, 'B1 Filtered Custody total should equal 7').to.be.equal(7)
        expect(firstWorkload.filteredCustodyTiers.b2.total, 'B2 Filtered Custody total should equal 6').to.be.equal(6)
        expect(firstWorkload.filteredCustodyTiers.b3.total, 'B3 Filtered Custody total should equal 5').to.be.equal(5)
        expect(firstWorkload.filteredCustodyTiers.a0.total, 'A0 Filtered Custody total should equal 4').to.be.equal(4)
        expect(firstWorkload.filteredCustodyTiers.a1.total, 'A1 Filtered Custody total should equal 3').to.be.equal(3)
        expect(firstWorkload.filteredCustodyTiers.a2.total, 'A2 Filtered Custody total should equal 2').to.be.equal(2)
        expect(firstWorkload.filteredCustodyTiers.a3.total, 'A3 Filtered Custody total should equal 1').to.be.equal(1)

        expect(firstWorkload.filteredLicenseTiers.untiered.total, 'Untiered Filtered Licence total should equal 1').to.equal(1)
        expect(firstWorkload.filteredLicenseTiers.d0.total, 'D0 Filtered Licence total should equal 17').to.be.equal(17)
        expect(firstWorkload.filteredLicenseTiers.d1.total, 'D1 Filtered Licence total should equal 16').to.be.equal(16)
        expect(firstWorkload.filteredLicenseTiers.d2.total, 'D2 Filtered Licence total should equal 15').to.be.equal(15)
        expect(firstWorkload.filteredLicenseTiers.d3.total, 'D3 Filtered Licence total should equal 14').to.be.equal(14)
        expect(firstWorkload.filteredLicenseTiers.c0.total, 'C0 Filtered Licence total should equal 13').to.be.equal(13)
        expect(firstWorkload.filteredLicenseTiers.c1.total, 'C1 Filtered Licence total should equal 12').to.be.equal(12)
        expect(firstWorkload.filteredLicenseTiers.c2.total, 'C2 Filtered Licence total should equal 11').to.be.equal(11)
        expect(firstWorkload.filteredLicenseTiers.c3.total, 'C3 Filtered Licence total should equal 10').to.be.equal(10)
        expect(firstWorkload.filteredLicenseTiers.b0.total, 'B0 Filtered Licence total should equal 9').to.be.equal(9)
        expect(firstWorkload.filteredLicenseTiers.b1.total, 'B1 Filtered Licence total should equal 8').to.be.equal(8)
        expect(firstWorkload.filteredLicenseTiers.b2.total, 'B2 Filtered Licence total should equal 7').to.be.equal(7)
        expect(firstWorkload.filteredLicenseTiers.b3.total, 'B3 Filtered Licence total should equal 6').to.be.equal(6)
        expect(firstWorkload.filteredLicenseTiers.a0.total, 'A0 Filtered Licence total should equal 5').to.be.equal(5)
        expect(firstWorkload.filteredLicenseTiers.a1.total, 'A1 Filtered Licence total should equal 4').to.be.equal(4)
        expect(firstWorkload.filteredLicenseTiers.a2.total, 'A2 Filtered Licence total should equal 3').to.be.equal(3)
        expect(firstWorkload.filteredLicenseTiers.a3.total, 'A3 Filtered Licence total should equal 2').to.be.equal(2)
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
