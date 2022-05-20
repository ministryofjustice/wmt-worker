const expect = require('chai').expect

const mergeDuplicateOffenderManagers = require('../../../../app/services/workers/restructure-offender-managers')
const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

let inserts = []
let oldTeamWorkloadOwnerId, newTeamWorkloadOwnerId
describe('services/workers/restructure-offender-managers', function () {
  before(function () {
    return appWorkloadOwnerHelper.insertDependencies([])
      .then(function (results) {
        inserts = inserts.concat(results)
        const lduId = results.filter((item) => item.table === 'ldu')[0].id
        const offenderManagerId = results.filter((item) => item.table === 'offender_manager')[0].id
        oldTeamWorkloadOwnerId = results.filter((item) => item.table === 'workload_owner')[0].id
        const offenderManagerCode = results.filter((item) => item.table === 'offender_manager')[0].offender_manager_code
        const oldTeamCode = results.filter((item) => item.table === 'team')[0].teamCode
        return appWorkloadOwnerHelper.addNewTeamWorkloadOwnerForExistingOffenderManager(lduId, offenderManagerId)
          .then(function (newTeamInserts) {
            inserts = inserts.concat(newTeamInserts)
            const newTeamCode = newTeamInserts.filter((item) => item.table === 'team')[0].teamCode
            newTeamWorkloadOwnerId = newTeamInserts.filter((item) => item.table === 'workload_owner')[0].id
            return appReductionsHelper.addReductionForWorkloadOwner(oldTeamWorkloadOwnerId)
              .then(function (reductionInserts) {
                inserts = inserts.concat(reductionInserts)
                return mergeDuplicateOffenderManagers.execute({
                  additionalData: {
                    restructureOffenderManagers: [{
                      offenderManagerKey: offenderManagerCode,
                      previousTeamCode: oldTeamCode,
                      newTeamCode
                    }]
                  }
                })
              })
          })
      })
  })

  it('must copy all reductions of old team workload owner id to new team workload owner id', function () {
    return appReductionsHelper.getReductionsForWorkloadOwnerId(oldTeamWorkloadOwnerId)
      .then(function (oldTeamReductions) {
        expect(oldTeamReductions.length).to.equal(1)
        return appReductionsHelper.getReductionsForWorkloadOwnerId(newTeamWorkloadOwnerId)
          .then(function (newTeamReductions) {
            expect(newTeamReductions.length).to.equal(1)
            expect(oldTeamReductions[0].effective_from.toISOString()).to.equal(newTeamReductions[0].effective_from.toISOString())
            expect(oldTeamReductions[0].effective_to.toISOString()).to.equal(newTeamReductions[0].effective_to.toISOString())
            expect(oldTeamReductions[0].hours).to.equal(newTeamReductions[0].hours)
            expect(oldTeamReductions[0].notes).to.equal(newTeamReductions[0].notes)
            expect(oldTeamReductions[0].reduction_reason_id).to.equal(newTeamReductions[0].reduction_reason_id)
            expect(oldTeamReductions[0].status).to.equal(newTeamReductions[0].status)
            inserts.push({ table: 'reductions', id: newTeamReductions[0].id })
            return inserts
          })
      })
  })

  it('must copy contracted hours of old team workload owner id to new team workload owner id', function () {
    return appWorkloadOwnerHelper.getWorkloadOwnerById(oldTeamWorkloadOwnerId)
      .then(function ([oldTeamWorkload]) {
        return appWorkloadOwnerHelper.getWorkloadOwnerById(newTeamWorkloadOwnerId)
          .then(function ([newTeamWorkload]) {
            expect(oldTeamWorkload.contracted_hours).to.equal(newTeamWorkload.contracted_hours)
          })
      })
  })

  after(function () {
    return appWorkloadOwnerHelper.removeDependencies(inserts)
  })
})
