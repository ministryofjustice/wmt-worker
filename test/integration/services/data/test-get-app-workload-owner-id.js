const expect = require('chai').expect
const knex = require('../../../../knex').appSchema

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const getWorkloadOwnerId = require('../../../../app/services/data/get-app-workload-owner-id')

let inserts = []

describe('services/data/get-workload-owner-id', function () {
  before(function () {
    return appWorkloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve the workload owners id given their om key and team code', function () {
    const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    const omId = inserts.filter((item) => item.table === 'offender_manager')[0].id

    return knex('offender_manager').withSchema('app').where('id', omId).first('key')
      .then(function (offenderManagerKey) {
        const teamId = inserts.filter((item) => item.table === 'team')[0].id
        return knex('team').withSchema('app').where('id', teamId).first('code')
          .then(function (teamCode) {
            return getWorkloadOwnerId(offenderManagerKey.key, teamCode.code)
              .then(function (result) {
                expect(result).to.be.equal(workloadOwnerId)
              })
          })
      })
  })

  after(function () {
    return appReductionsHelper.removeDependencies(inserts)
  })
})
