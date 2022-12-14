const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const config = require('../../../../config')
const workloadOwnerHelper = require('../../../helpers/data/workload-owner-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const insertWorkloadOwner = require('../../../../app/services/data/insert-workload-owner')
const WorkloadOwner = require('../../../../app/services/probation-rules').WorkloadOwner
const tableName = `${config.DB_APP_SCHEMA}.workload_owner`

let inserts = []

describe('app/services/data/insert-workload-owner', function () {
  before(function () {
    return workloadOwnerHelper.addDepenedenciesForWorkloadOwner()
      .then(function (insertedFields) {
        inserts = insertedFields
      })
  })

  it('should insert a new workload owner record', function () {
    const offenderManagerId = inserts.filter((item) => item.table === 'offender_manager')[0].id
    const contractedHours = 37
    const teamId = inserts.filter((item) => item.table === 'team')[0].id
    const workloadOwner = new WorkloadOwner(undefined, offenderManagerId, undefined, teamId, contractedHours)

    return insertWorkloadOwner(workloadOwner).then(function (workloadOwnerInsert) {
      expect(workloadOwnerInsert.type).to.be.equal('CREATE')
      return knex.table(tableName)
        .where({ id: workloadOwnerInsert.id })
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['offender_manager_id']).to.eq(offenderManagerId) // eslint-disable-line
          expect(result['contracted_hours']).to.eq(contractedHours) // eslint-disable-line
          expect(result['team_id']).to.eq(teamId) // eslint-disable-line
          inserts.push({ table: 'workload_owner', id: workloadOwnerInsert.id })
        })
    })
  })

  it('should retrieve existing workload owner record', function () {
    return workloadOwnerHelper.addWorkloadOwnerToExistingLdu(inserts).then(function () {
      const offenderManagerId = inserts.filter((item) => item.table === 'offender_manager')[0].id
      const contractedHours = 37
      const teamId = inserts.filter((item) => item.table === 'team')[0].id
      const workloadOwner = new WorkloadOwner(undefined, offenderManagerId, undefined, teamId, contractedHours)
      return insertWorkloadOwner(workloadOwner).then(function (workloadOwnerInsert) {
        expect(workloadOwnerInsert.type).to.be.equal('RETRIEVE')
      })
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
