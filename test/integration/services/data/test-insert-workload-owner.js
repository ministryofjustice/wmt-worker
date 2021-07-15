const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const config = require('../../../../config')
const workloadOwnerHelper = require('../../../helpers/data/workload-owner-helper')
const insertWorkloadOwner = require('../../../../app/services/data/insert-workload-owner')
const WorkloadOwner = require('wmt-probation-rules').WorkloadOwner
const tableName = `${config.DB_APP_SCHEMA}.workload_owner`

let inserts = []

describe('app/services/data/insert-workload-owner', function () {
  before(function (done) {
    workloadOwnerHelper.addDepenedenciesForWorkloadOwner()
      .then(function (insertedFields) {
        inserts = insertedFields
        done()
      })
  })

  it('should insert a new workload owner record', function (done) {
    const offenderManagerId = inserts.filter((item) => item.table === 'offender_manager')[0].id
    const contractedHours = 37
    const teamId = inserts.filter((item) => item.table === 'team')[0].id
    const workloadOwner = new WorkloadOwner(undefined, offenderManagerId, undefined, teamId, contractedHours)

    insertWorkloadOwner(workloadOwner).then(function (workloadOwnerId) {
      return knex.table(tableName)
        .where({ id: workloadOwnerId[0] })
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['offender_manager_id']).to.eq(offenderManagerId) // eslint-disable-line
          expect(result['contracted_hours']).to.eq(contractedHours) // eslint-disable-line
          expect(result['team_id']).to.eq(teamId) // eslint-disable-line
          inserts.push({ table: 'workload_owner', id: workloadOwnerId[0] })
          done()
        })
    })
  })

  after(function (done) {
    workloadOwnerHelper.removeDependenciesForWorkloadOwner(inserts)
      .then(() => done())
  })
})
