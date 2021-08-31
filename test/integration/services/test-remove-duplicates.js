const removeDuplicates = require('../../../app/services/workers/remove-duplicates')
const appWorkloadPointsCalculationHelper = require('../../helpers/data/app-workload-points-calculation-helper')
const checkForDuplicateWorkloads = require('../../../app/services/data/check-for-duplicate-workloads')
const expect = require('chai').expect

let inserts = []
describe('remove duplicates', function () {
  before(function () {
    return appWorkloadPointsCalculationHelper.insertDependencies([]).then(function (result) {
      return appWorkloadPointsCalculationHelper.addWorkloadPointsCalculation(result)
        .then(function (result) {
          return appWorkloadPointsCalculationHelper.addWorkloadPointsCalculation(result).then(function (result) {
            inserts = result
          })
        })
    })
  })
  it('should process correctly', function () {
    return removeDuplicates.execute({}).then(function (result) {
      expect(result[0]).to.be.a('number')
      return checkForDuplicateWorkloads().then(function (duplicates) {
        return expect(duplicates).to.be.empty
      })
    })
  })
  after(function () {
    return appWorkloadPointsCalculationHelper.removeDependencies(inserts)
  })
})
