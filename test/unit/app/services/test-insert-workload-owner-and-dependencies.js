const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const OffenderManager = require('../../../../app/services/probation-rules').OffenderManager
const Team = require('../../../../app/services/probation-rules').Team
const WorkloadOwner = require('../../../../app/services/probation-rules').WorkloadOwner
const Ldu = require('../../../../app/services/probation-rules').Ldu
const Region = require('../../../../app/services/probation-rules').Region
const filterOmGradeCode = require('../../../../app/services/probation-rules').filterOmGradeCode

let insertWoAndDependencies
let insertOffenderManagerTypeId
let insertOffenderManager
let insertWorkloadOwner
let insertTeam
let insertLdu
let insertRegion
let getDefaultContractedHours

const omTypeId = 1
const omId = 2
const woId = 3
const teamId = 4
const lduId = 5
const regionId = 6
const contractedHours = 37

const caseSummary = {
  omGradeCode: 'D',
  omKey: 'B',
  omForename: 'C',
  omSurname: 'A',
  regionCode: 'E',
  regionDesc: 'F',
  lduCode: 'G',
  lduDesc: 'H',
  teamCode: 'I',
  teamDesc: 'J'
}

const expectedGrade = filterOmGradeCode(caseSummary.omGradeCode)
const expectedOffenderManager = new OffenderManager(undefined, caseSummary.omKey, caseSummary.omForename, caseSummary.omSurname, omTypeId, expectedGrade)
const expectedRegion = new Region(undefined, caseSummary.regionCode, caseSummary.regionDesc)
const expectedLdu = new Ldu(undefined, regionId, caseSummary.lduCode, caseSummary.lduDesc)
const expectedTeam = new Team(undefined, lduId, caseSummary.teamCode, caseSummary.teamDesc)
const expectedWorkloadOwner = new WorkloadOwner(undefined, omId, undefined, teamId, contractedHours)

describe('services/insert-workload-owner-and-dependencies', function () {
  beforeEach(function () {
    insertOffenderManagerTypeId = sinon.stub().resolves(omTypeId)
    insertOffenderManager = sinon.stub().resolves(omId)
    insertWorkloadOwner = sinon.stub().resolves(woId)
    insertTeam = sinon.stub().resolves(teamId)
    insertLdu = sinon.stub().resolves(lduId)
    insertRegion = sinon.stub().resolves(regionId)
    getDefaultContractedHours = sinon.stub().resolves(contractedHours)

    insertWoAndDependencies = proxyquire('../../../../app/services/insert-workload-owner-and-dependencies', {
      './data/insert-offender-manager-type-id': insertOffenderManagerTypeId,
      './data/get-default-contracted-hours': getDefaultContractedHours,
      './data/insert-offender-manager': insertOffenderManager,
      './data/insert-workload-owner': insertWorkloadOwner,
      './data/insert-team': insertTeam,
      './data/insert-ldu': insertLdu,
      './data/insert-region': insertRegion
    })
  })

  it('should call on to data services', function () {
    return insertWoAndDependencies(caseSummary)
      .then(function (result) {
        expect(result).to.be.eql(woId)
        expect(insertOffenderManagerTypeId.calledWith(expectedGrade)).to.be.equal(true)
        expect(insertOffenderManager.calledWith(expectedOffenderManager)).to.be.equal(true)
        expect(insertRegion.calledWith(expectedRegion)).to.be.equal(true)
        expect(insertLdu.calledWith(expectedLdu)).to.be.equal(true)
        expect(insertTeam.calledWith(expectedTeam)).to.be.equal(true)
        expect(insertWorkloadOwner.calledWith(expectedWorkloadOwner)).to.be.equal(true)
      })
  })
})
