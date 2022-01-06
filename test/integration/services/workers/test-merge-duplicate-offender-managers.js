const expect = require('chai').expect

const mergeDuplicateOffenderManagers = require('../../../../app/services/workers/merge-duplicate-offender-managers')
const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appWorkloadHelper = require('../../../helpers/data/app-workload-helper')
const appOmicWorkloadHelper = require('../../../helpers/data/app-omic-workload-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const appCourtReportsHelper = require('../../../helpers/data/app-court-reports-helper')
const appAdjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')

let inserts = []
let lowestDuplicateWorkloadOwnerId, highestDuplicateWorkloadOwnerId
describe('services/workers/merge-duplicate-offender-managers', function () {
  before(function () {
    return appWorkloadOwnerHelper.insertDependencies([])
      .then(function (results) {
        inserts = inserts.concat(results)
        return appWorkloadOwnerHelper.addDuplicateWorkloadOwner(inserts)
      })
      .then(function (results) {
        inserts = inserts.concat(results)
        lowestDuplicateWorkloadOwnerId = inserts.filter((item) => item.table === 'workload_owner').map((item) => item.id).reduce((acc, val) => acc < val ? acc : val)
        highestDuplicateWorkloadOwnerId = inserts.filter((item) => item.table === 'workload_owner').map((item) => item.id).reduce((acc, val) => acc > val ? acc : val)
        return appWorkloadHelper.addWorkloadForWorkloadOwner(lowestDuplicateWorkloadOwnerId)
          .then(function (workloadInserts) {
            inserts = inserts.concat(workloadInserts)
            return appOmicWorkloadHelper.addOmicWorkloadForWorkloadOwner(lowestDuplicateWorkloadOwnerId)
          }).then(function (omicWorkloadInserts) {
            inserts = inserts.concat(omicWorkloadInserts)
            return appReductionsHelper.addReductionForWorkloadOwner(lowestDuplicateWorkloadOwnerId)
          }).then(function (reductionInserts) {
            inserts = inserts.concat(reductionInserts)
            return appCourtReportsHelper.addCountReportForWorkloadOwner(lowestDuplicateWorkloadOwnerId)
          }).then(function (courtReportInserts) {
            inserts = inserts.concat(courtReportInserts)
            return appAdjustmentsHelper.addAdjustmentsForWorkloadOwner(lowestDuplicateWorkloadOwnerId)
          }).then(function (adjustmentInserts) {
            inserts = inserts.concat(adjustmentInserts)
          })
      }).then(function () {
        return mergeDuplicateOffenderManagers.execute()
      })
  })

  it('must move all workloads of lowest workload owner id to highest workload owner id', function () {
    return appWorkloadHelper.getCountOfWorkloadsForWorkloadOwnerId(lowestDuplicateWorkloadOwnerId)
      .then(function (amountOfWorkloads) {
        expect(amountOfWorkloads).to.equal(0)
        return appWorkloadHelper.getCountOfWorkloadsForWorkloadOwnerId(highestDuplicateWorkloadOwnerId)
      }).then(function (amountOfWorkloads) {
        expect(amountOfWorkloads).to.equal(1)
      })
  })

  it('must move all omic workloads of lowest workload owner id to highest workload owner id', function () {
    return appOmicWorkloadHelper.getCountOfOmicWorkloadsForWorkloadOwnerId(lowestDuplicateWorkloadOwnerId)
      .then(function (amountOfOmicWorkloads) {
        expect(amountOfOmicWorkloads).to.equal(0)
        return appOmicWorkloadHelper.getCountOfOmicWorkloadsForWorkloadOwnerId(highestDuplicateWorkloadOwnerId)
      }).then(function (amountOfOmicWorkloads) {
        expect(amountOfOmicWorkloads).to.equal(1)
      })
  })

  it('must move all reductions of lowest workload owner id to highest workload owner id', function () {
    return appReductionsHelper.getCountOfReductionsForWorkloadOwnerId(lowestDuplicateWorkloadOwnerId)
      .then(function (amountOfReductions) {
        expect(amountOfReductions).to.equal(0)
        return appReductionsHelper.getCountOfReductionsForWorkloadOwnerId(highestDuplicateWorkloadOwnerId)
      }).then(function (amountOfReductions) {
        expect(amountOfReductions).to.equal(1)
      })
  })

  it('must move all court reports of lowest workload owner id to highest workload owner id', function () {
    return appCourtReportsHelper.getCountOfCourtReportsForWorkloadOwnerId(lowestDuplicateWorkloadOwnerId)
      .then(function (amountOfCourtReports) {
        expect(amountOfCourtReports).to.equal(0)
        return appCourtReportsHelper.getCountOfCourtReportsForWorkloadOwnerId(highestDuplicateWorkloadOwnerId)
      }).then(function (amountOfCourtReports) {
        expect(amountOfCourtReports).to.equal(1)
      })
  })

  it('must move all adjustments of lowest workload owner id to highest workload owner id', function () {
    return appAdjustmentsHelper.getCountOfAdjustmentsForWorkloadOwnerId(lowestDuplicateWorkloadOwnerId)
      .then(function (amountOfAdjustments) {
        expect(amountOfAdjustments).to.equal(0)
        return appAdjustmentsHelper.getCountOfAdjustmentsForWorkloadOwnerId(highestDuplicateWorkloadOwnerId)
      }).then(function (amountOfAdjustments) {
        expect(amountOfAdjustments).to.equal(1)
      })
  })

  after(function () {
    return appWorkloadOwnerHelper.removeDependencies(inserts)
  })
})
