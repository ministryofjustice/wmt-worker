
const proxyquire = require('proxyquire')
require('sinon-bluebird')

var calculateWorkloadPoints

describe('services/workers/calculate-workload-points', function () {
  beforeEach(function () {
    calculateWorkloadPoints = proxyquire('../../../../app/services/workers/calculate-workload-points', {
      '../log': { info: function (message) {}, error: function (message) {} }
    })
  })

  it('should call the calculate workload points worker', function () {
    calculateWorkloadPoints.execute({id: 1, type: 'task'}).then(function () {
      // TODO: add asserts
    })
  })
})
