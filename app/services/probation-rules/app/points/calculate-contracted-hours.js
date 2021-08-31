const DefaultContractedHours = require('./domain/default-contracted-hours')
const OM_TYPE_IDS = require('./constants/offender-manager-type-ids')
const ResultHours = require('./domain/result-hours')

module.exports = function (contractedHoursPerWeek, defaultContractedHours, offenderManagerTypeId) {
  let baseHours = 0
  if (!(defaultContractedHours instanceof DefaultContractedHours)) {
    throw new Error('defaultContractedHours should be an instance of DefaultContractedHours')
  }

  const PSO_BANDS = [OM_TYPE_IDS.PSO, OM_TYPE_IDS.PSO_B]

  if (offenderManagerTypeId !== OM_TYPE_IDS.UNSUPPORTED) {
    let defaultContractedHoursForBand = 0

    if (PSO_BANDS.indexOf(offenderManagerTypeId) >= 0) {
      defaultContractedHoursForBand = defaultContractedHours.pso
    } else if (offenderManagerTypeId === OM_TYPE_IDS.SPO) {
      defaultContractedHoursForBand = defaultContractedHours.spo
    } else {
      defaultContractedHoursForBand = defaultContractedHours.po
    }

    baseHours = typeof contractedHoursPerWeek !== 'number' ? defaultContractedHoursForBand : contractedHoursPerWeek

    return new ResultHours(baseHours, defaultContractedHoursForBand)
  }
  return null
}
