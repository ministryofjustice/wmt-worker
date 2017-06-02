const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').development
const knex = require('knex')(knexConfig)
const config = require('../../../../config')
const insertWorkingHours = require('../../../../app/services/data/insert-working-hours')
const WorkingHours = require('wmt-probation-rules').WorkingHours

describe('app/services/data/insert-working-hours', function () {
  const tableName = `${config.DB_APP_SCHEMA}.working_hours`
  it('should insert a new working hours record', function () {
    insertWorkingHours(new WorkingHours()).then(function (workingHoursId) {
      return knex.table(tableName)
        .where({'id': workingHoursId})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['contracted_hours']).to.be.null // eslint-disable-line
          expect(result['reduction']).to.be.null // eslint-disable-line
          expect(result['notes']).to.be.null // eslint-disable-line
        })
    })
  })

  after(function () {
    return knex(tableName).del()
  })
})
