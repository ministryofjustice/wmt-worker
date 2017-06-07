const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').development
const knex = require('knex')(knexConfig)
const config = require('../../../../config')
const insertWorkingHours = require('../../../../app/services/data/insert-working-hours')
const WorkingHours = require('wmt-probation-rules').WorkingHours
const tableName = `${config.DB_APP_SCHEMA}.working_hours`

describe('app/services/data/insert-working-hours', function () {
  var workingHoursId

  it('should insert a new working hours record', function (done) {
    var contractedHours = 7
    var reduction = 2
    var workingHours = new WorkingHours(undefined, contractedHours, reduction)
    insertWorkingHours(workingHours).then(function (id) {
      workingHoursId = id
      return knex.table(tableName)
        .where({'id': id})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['contracted_hours']).to.eq(7)// eslint-disable-line
          expect(result['reduction']).to.eq(2) // eslint-disable-line
          expect(result['notes']).to.be.null // eslint-disable-line
          done()
        })
    })
  })

  after(function () {
    return knex(tableName).where('id', workingHoursId).del()
  })
})
