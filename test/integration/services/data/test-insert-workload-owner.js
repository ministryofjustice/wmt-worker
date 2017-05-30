const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').development
const knex = require('knex')(knexConfig)
const config = require('../../../../config')
const insertWorkloadOwner = require('../../../../app/services/data/insert-workload-owner')

describe('app/services/data/insert-workload-owner', function () {
  const tableName = `${config.DB_APP_SCHEMA}.workload_owner`
  it('should insert a new workload owner record', function () {
    insertWorkloadOwner().then(function (workloadOwnerId) {
      return knex.table(tableName)
        .where({'id': workloadOwnerId})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['offender_manager_id']).to.be.null // eslint-disable-line
          expect(result['working_hours_id']).to.be.null // eslint-disable-line
          expect(result['team_id']).to.be.null // eslint-disable-line
        })
    })
  })

  after(function () {
    return knex(tableName).del()
  })
})
