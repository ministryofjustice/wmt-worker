const OM_TYPE_IDS = require('./constants/offender-manager-type-ids')
const DefaultNominalTargets = require('./domain/default-nominal-targets')

module.exports = function (offenderManagerTypeId, defaultNominalTargets) {
  if (!(defaultNominalTargets instanceof DefaultNominalTargets)) {
    throw new Error('defaultNominalTargets should be an instance of DefaultNominalTargets')
  }

  let target = defaultNominalTargets.po

  if (offenderManagerTypeId === OM_TYPE_IDS.PSO) {
    target = defaultNominalTargets.pso
  }

  return target
}
