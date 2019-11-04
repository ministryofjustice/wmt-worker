// const expect = require('chai').expect

// const helper = require('../../../helpers/data/app-workload-helper')
// const getAppWorkloads = require('../../../../app/services/data/get-app-workloads')

// const Workload = require('wmt-probation-rules').Workload

// var inserts = []
// var initialWorkloadStagingId

// describe('services/data/get-app-workloads', function () {
//   before(function (done) {
//     helper.insertDependencies(inserts)
//       .then(function (builtInserts) {
//         inserts = builtInserts
//         initialWorkloadStagingId = 1
//         done()
//       })
//   })

//   it('should retrieve all the workloads with staging ids within a given range', function (done) {
//     var batchSize = 2
//     var maxStagingId = initialWorkloadStagingId + batchSize - 1
//     var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
//     var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

//     getAppWorkloads(initialWorkloadStagingId, maxStagingId, batchSize, workloadReportId)
//       .then(function (queryResults) {
//         expect(queryResults.length).to.equal(batchSize)

//         var firstWorkload = queryResults[0].values
//         expect(firstWorkload).to.be.an.instanceof(Workload)
//         expect(firstWorkload.workloadOwnerId).to.equal(workloadOwnerId)
//         expect(firstWorkload.totalCases).to.equal(20)
//         expect(firstWorkload.totalT2aCases).to.equal(10)
//         expect(firstWorkload.custodyTiers.total).to.equal(1)
//         expect(firstWorkload.communityTiers.total).to.equal(2)
//         expect(firstWorkload.licenseTiers.total).to.equal(3)
//         expect(firstWorkload.t2aCustodyTiers.total).to.equal(2)
//         expect(firstWorkload.t2aCommunityTiers.total).to.equal(3)
//         expect(firstWorkload.t2aLicenseTiers.total).to.equal(4)
//         expect(firstWorkload.monthlySdrs).to.equal(4)
//         expect(firstWorkload.sdrsDueNext30Days).to.equal(5)
//         expect(firstWorkload.sdrConversionsLast30Days).to.equal(6)
//         expect(firstWorkload.paromsCompletedLast30Days).to.equal(7)
//         expect(firstWorkload.paromsDueNext30Days).to.equal(8)
//         expect(firstWorkload.licenseCasesLast16Weeks).to.equal(9)
//         expect(firstWorkload.communityCasesLast16Weeks).to.equal(10)
//         expect(firstWorkload.armsCommunityCases).to.equal(11)
//         expect(firstWorkload.armsLicenseCases).to.equal(12)

//         var secondWorkload = queryResults[1].values
//         expect(secondWorkload.totalCases).to.equal(30)
//         done()
//       })
//   })

//   it('should retrieve a workload for a given staging id with a batchSize of 1', function (done) {
//     var batchSize = 1
//     var maxStagingId = initialWorkloadStagingId
//     var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
//     var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

//     getAppWorkloads(initialWorkloadStagingId, maxStagingId, batchSize, workloadReportId)
//       .then(function (queryResults) {
//         expect(queryResults.length).to.equal(batchSize)

//         var firstWorkload = queryResults[0].values
//         expect(firstWorkload).to.be.an.instanceof(Workload)
//         expect(firstWorkload.workloadOwnerId).to.equal(workloadOwnerId)
//         expect(firstWorkload.totalCases).to.equal(20)
//         expect(firstWorkload.totalT2aCases).to.equal(10)
//         expect(firstWorkload.custodyTiers.total).to.equal(1)
//         expect(firstWorkload.communityTiers.total).to.equal(2)
//         expect(firstWorkload.licenseTiers.total).to.equal(3)
//         expect(firstWorkload.filteredCustodyTiers.total).to.equal(0)
//         expect(firstWorkload.filteredCommunityTiers.total).to.equal(1)
//         expect(firstWorkload.filteredLicenseTiers.total).to.equal(2)
//         expect(firstWorkload.t2aCustodyTiers.total).to.equal(2)
//         expect(firstWorkload.t2aCommunityTiers.total).to.equal(3)
//         expect(firstWorkload.t2aLicenseTiers.total).to.equal(4)
//         expect(firstWorkload.monthlySdrs).to.equal(4)
//         expect(firstWorkload.sdrsDueNext30Days).to.equal(5)
//         expect(firstWorkload.sdrConversionsLast30Days).to.equal(6)
//         expect(firstWorkload.paromsCompletedLast30Days).to.equal(7)
//         expect(firstWorkload.paromsDueNext30Days).to.equal(8)
//         expect(firstWorkload.licenseCasesLast16Weeks).to.equal(9)
//         expect(firstWorkload.communityCasesLast16Weeks).to.equal(10)
//         expect(firstWorkload.armsCommunityCases).to.equal(11)
//         expect(firstWorkload.armsLicenseCases).to.equal(12)

//         expect(firstWorkload.communityTiers.untiered.total, 'Untiered Community total should equal 0').to.equal(0)
//         expect(firstWorkload.communityTiers.d2.total, 'D2 Community total should equal 1').to.equal(1)
//         expect(firstWorkload.communityTiers.d1.total, 'D1 Community total should equal 2').to.equal(2)
//         expect(firstWorkload.communityTiers.c2.total, 'C2 Community total should equal 3').to.equal(3)
//         expect(firstWorkload.communityTiers.c1.total, 'C1 Community total should equal 4').to.equal(4)
//         expect(firstWorkload.communityTiers.b2.total, 'B2 Community total should equal 5').to.equal(5)
//         expect(firstWorkload.communityTiers.b1.total, 'B1 Community total should equal 6').to.equal(6)
//         expect(firstWorkload.communityTiers.a.total, 'A Community total should equal 7').to.equal(7)

//         expect(firstWorkload.custodyTiers.untiered.total, 'Untiered Custody total should equal 1').to.equal(1)
//         expect(firstWorkload.custodyTiers.d2.total, 'D2 Custody total should equal 2').to.equal(2)
//         expect(firstWorkload.custodyTiers.d1.total, 'D1 Custody total should equal 3').to.equal(3)
//         expect(firstWorkload.custodyTiers.c2.total, 'C2 Custody total should equal 4').to.equal(4)
//         expect(firstWorkload.custodyTiers.c1.total, 'C1 Custody total should equal 5').to.equal(5)
//         expect(firstWorkload.custodyTiers.b2.total, 'B2 Custody total should equal 6').to.equal(6)
//         expect(firstWorkload.custodyTiers.b1.total, 'B1 Custody total should equal 7').to.equal(7)
//         expect(firstWorkload.custodyTiers.a.total, 'A Custody total should equal 8').to.equal(8)

//         expect(firstWorkload.licenseTiers.untiered.total, 'Untiered Licence total should equal 2').to.equal(2)
//         expect(firstWorkload.licenseTiers.d2.total, 'D2 Licence total should equal 3').to.equal(3)
//         expect(firstWorkload.licenseTiers.d1.total, 'D1 Licence total should equal 4').to.equal(4)
//         expect(firstWorkload.licenseTiers.c2.total, 'C2 Licence total should equal 5').to.equal(5)
//         expect(firstWorkload.licenseTiers.c1.total, 'C1 Licence total should equal 6').to.equal(6)
//         expect(firstWorkload.licenseTiers.b2.total, 'B2 Licence total should equal 7').to.equal(7)
//         expect(firstWorkload.licenseTiers.b1.total, 'B1 Licence total should equal 8').to.equal(8)
//         expect(firstWorkload.licenseTiers.a.total, 'A Licence total should equal 9').to.equal(9)

//         expect(firstWorkload.filteredCommunityTiers.untiered.total, 'Untiered Filtered Community total should equal 0').to.equal(0)
//         expect(firstWorkload.filteredCommunityTiers.d2.total, 'D2 Filtered Community total should equal 0').to.equal(0)
//         expect(firstWorkload.filteredCommunityTiers.d1.total, 'D1 Filtered Community total should equal 1').to.equal(1)
//         expect(firstWorkload.filteredCommunityTiers.c2.total, 'C2 Filtered Community total should equal 2').to.equal(2)
//         expect(firstWorkload.filteredCommunityTiers.c1.total, 'C1 Filtered Community total should equal 3').to.equal(3)
//         expect(firstWorkload.filteredCommunityTiers.b2.total, 'B2 Filtered Community total should equal 4').to.equal(4)
//         expect(firstWorkload.filteredCommunityTiers.b1.total, 'B1 Filtered Community total should equal 5').to.equal(5)
//         expect(firstWorkload.filteredCommunityTiers.a.total, 'A Filtered Community total should equal 6').to.equal(6)

//         expect(firstWorkload.filteredCustodyTiers.untiered.total, 'Untiered Filtered Custody total should equal 0').to.equal(0)
//         expect(firstWorkload.filteredCustodyTiers.d2.total, 'D2 Filtered Custody total should equal 1').to.equal(1)
//         expect(firstWorkload.filteredCustodyTiers.d1.total, 'D1 Filtered Custody total should equal 2').to.equal(2)
//         expect(firstWorkload.filteredCustodyTiers.c2.total, 'C2 Filtered Custody total should equal 3').to.equal(3)
//         expect(firstWorkload.filteredCustodyTiers.c1.total, 'C1 Filtered Custody total should equal 4').to.equal(4)
//         expect(firstWorkload.filteredCustodyTiers.b2.total, 'B2 Filtered Custody total should equal 5').to.equal(5)
//         expect(firstWorkload.filteredCustodyTiers.b1.total, 'B1 Filtered Custody total should equal 6').to.equal(6)
//         expect(firstWorkload.filteredCustodyTiers.a.total, 'A Filtered Custody total should equal 7').to.equal(7)

//         expect(firstWorkload.filteredLicenseTiers.untiered.total, 'Untiered Filtered Licence total should equal 1').to.equal(1)
//         expect(firstWorkload.filteredLicenseTiers.d2.total, 'D2 Filtered Licence total should equal 2').to.equal(2)
//         expect(firstWorkload.filteredLicenseTiers.d1.total, 'D1 Filtered Licence total should equal 3').to.equal(3)
//         expect(firstWorkload.filteredLicenseTiers.c2.total, 'C2 Filtered Licence total should equal 4').to.equal(4)
//         expect(firstWorkload.filteredLicenseTiers.c1.total, 'C1 Filtered Licence total should equal 5').to.equal(5)
//         expect(firstWorkload.filteredLicenseTiers.b2.total, 'B2 Filtered Licence total should equal 6').to.equal(6)
//         expect(firstWorkload.filteredLicenseTiers.b1.total, 'B1 Filtered Licence total should equal 7').to.equal(7)
//         expect(firstWorkload.filteredLicenseTiers.a.total, 'A Filtered Licence total should equal 8').to.equal(8)

//         done()
//       })
//   })

//   after(function (done) {
//     helper.removeDependencies(inserts)
//       .then(() => done())
//   })
// })
