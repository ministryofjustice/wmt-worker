const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)
const insertTeam = require('../../../../app/services/data/insert-team')
const Team = require('wmt-probation-rules').Team
const moment = require('moment')
const teamHelper = require('../../../helpers/data/app-team-helper')

var inserts = []

describe('app/services/data/insert-team', function () {
  before(function (done) {
    teamHelper.addDependenciesForTeam()
      .then(function (insertedFields) {
        inserts = insertedFields
        done()
      })
  })

  it('should insert a new team record', function (done) {
    var code = 'U'
    var lduId = inserts.filter((item) => item.table === 'ldu')[0].id
    var team = new Team(undefined, lduId, code)
    insertTeam(team).then(function (teamId) {
      return knex.table('team')
        .where({'id': teamId})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['ldu_id']).to.eq(lduId) // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.be.null // eslint-disable-line
          expect(moment().diff(result['effective_from'], 'seconds')).to.be.lt(10)
          expect(result['effective_to']).to.be.null // eslint-disable-line
          inserts.push({table: 'team', id: teamId})
          done()
        })
    })
  })

  after(function (done) {
    teamHelper.removeDependenciesForTeam(inserts)
    .then(() => done())
  })
})
