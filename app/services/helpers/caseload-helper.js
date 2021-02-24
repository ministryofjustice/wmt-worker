const percentageCalculator = require('./percentage-calculator')
const caseTypes = require('../../constants/case-type')

module.exports.getCaseloadTierTotalsByTeamByGrade = function (caseloads) {
  return groupCaseload(caseloads, true)
}

module.exports.totalAllCases = function (caseloads) {
  return totalWholeCaseload(caseloads)
}

module.exports.groupCaseloadByGrade = function (caseloads) {
  return groupOverallCaseloadByGrade(caseloads)
}
module.exports.calculateOverallPercentages = function (overallTotals, overallGradeTotals) {
  return calculateOverallPercentages(overallTotals, overallGradeTotals)
}

module.exports.getCaseloadSummaryTotalsByTeam = function (caseloads) {
  // Create a mapping for the linkId to do the aggregation
  const linkIdToCaseloadMap = new Map()
  for (let idx = 0; idx < caseloads.length; idx++) {
    const key = caseloads[idx].linkId
    if (!linkIdToCaseloadMap.has(key)) {
      // Make a copy of the object to ensure the original value isn't affected
      let newValue = {
        name: caseloads[idx].name,
        regionName: caseloads[idx].regionName,
        linkId: caseloads[idx].linkId,
        totalCases: 0,
        custodyTotalCases: 0,
        communityTotalCases: 0,
        licenseTotalCases: 0
      }

      newValue = updateTotals(newValue, caseloads[idx])
      linkIdToCaseloadMap.set(key, newValue)
    } else {
      let existingValue = linkIdToCaseloadMap.get(key)
      existingValue = updateTotals(existingValue, caseloads[idx])
    }
  }

  return convertMapToArray(linkIdToCaseloadMap)
}

/*
  Transform array of caseloads (one per team per grade) into an
  array of team results (one per team). Each team result contains
  tiered data for each grade in the team. Tiered data is in form of
  total cases
*/
module.exports.aggregateTeamTierTotals = function (caseloadTotalsByTeamByGrade) {
  return collectTransformedData(caseloadTotalsByTeamByGrade, false)
}

/*
  Transform array of caseloads (one per team per grade) into an
  array of team results (one per team). Each team result contains
  tiered data for each grade in the team. Tiered data is in form of
  percentages of team cases
*/
module.exports.calculateTeamTierPercentages = function (caseloadTotalsByTeamByGrade) {
  return collectTransformedData(caseloadTotalsByTeamByGrade, true)
}

/*
  Filter the caseloads by the given type parameter.
*/
module.exports.getCaseloadByType = function (caseloads, type) {
  if (Array.isArray(caseloads)) {
    return caseloads.filter(caseload => caseload.caseType === type)
  }
}

/*
  Adds the total cases to create a summary for the list of casesloads.
*/
module.exports.getCaseloadTotalSummary = function (caseloads) {
  if (Array.isArray(caseloads)) {
    return caseloads.reduce((prev, curr) => prev + curr.totalCases, 0)
  }
}

/*
  Used to create the bottom most row in the table
*/
module.exports.calculateTotalsRow = function (caseloads) {
  const totals = { a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, untiered: 0, overall: 0 }
  caseloads.forEach(function (val, key) {
    totals.a += val.a
    totals.b1 += val.b1
    totals.b2 += val.b2
    totals.c1 += val.c1
    totals.c2 += val.c2
    totals.d1 += val.d1
    totals.d2 += val.d2
    totals.untiered += val.untiered
    totals.overall += val.totalCases
  })
  return totals
}

module.exports.calculateTotalTiersRow = function (summary) {
  const totals = { totalCommunity: 0, totalLicense: 0, totalCustody: 0, totalTotalCases: 0 }
  summary.forEach(function (val, key) {
    totals.totalCommunity += val.communityTotalCases
    totals.totalLicense += val.licenseTotalCases
    totals.totalCustody += val.custodyTotalCases
    totals.totalTotalCases += val.totalCases
  })
  return totals
}

const updateTotals = function (entryToUpdate, caseload) {
  entryToUpdate.totalCases += caseload.totalCases

  if (caseload.caseType === caseTypes.LICENSE) {
    entryToUpdate.licenseTotalCases += caseload.totalCases
  } else if (caseload.caseType === caseTypes.COMMUNITY) {
    entryToUpdate.communityTotalCases += caseload.totalCases
  } else if (caseload.caseType === caseTypes.CUSTODY) {
    entryToUpdate.custodyTotalCases += caseload.totalCases
  }

  return entryToUpdate
}

const convertMapToArray = function (map) {
  const arrayResult = []
  map.forEach(function (val, key) {
    arrayResult.push(val)
  })

  return arrayResult
}

const transform = function (caseloadTotalsByGrade, calculatePercentage = false, isCSV = false) {
  const transformedData = []
  const caseloadTotalsByTeam = groupCaseload(caseloadTotalsByGrade, false)
  let gradeTotals = {}

  // For each team, create one entry in the new results set with one 'grade' sub-object per grade
  for (const team in caseloadTotalsByTeam) {
    let newTeamEntry = { linkId: caseloadTotalsByTeam[team].linkId, name: caseloadTotalsByTeam[team].name, regionName: caseloadTotalsByTeam[team].regionName }
    const teamGradeRecords = caseloadTotalsByGrade.filter((row) => row.linkId === caseloadTotalsByTeam[team].linkId)
    const gradeRecords = []
    for (const record in teamGradeRecords) {
      let newGradeRecord
      if (calculatePercentage) {
        newGradeRecord = {
          grade: teamGradeRecords[record].grade,
          a: percentageCalculator.calculatePercentage(teamGradeRecords[record].a, caseloadTotalsByTeam[team].a),
          b1: percentageCalculator.calculatePercentage(teamGradeRecords[record].b1, caseloadTotalsByTeam[team].b1),
          b2: percentageCalculator.calculatePercentage(teamGradeRecords[record].b2, caseloadTotalsByTeam[team].b2),
          c1: percentageCalculator.calculatePercentage(teamGradeRecords[record].c1, caseloadTotalsByTeam[team].c1),
          c2: percentageCalculator.calculatePercentage(teamGradeRecords[record].c2, caseloadTotalsByTeam[team].c2),
          d1: percentageCalculator.calculatePercentage(teamGradeRecords[record].d1, caseloadTotalsByTeam[team].d1),
          d2: percentageCalculator.calculatePercentage(teamGradeRecords[record].d2, caseloadTotalsByTeam[team].d2),
          untiered: percentageCalculator.calculatePercentage(teamGradeRecords[record].untiered, caseloadTotalsByTeam[team].untiered),
          totalCases: percentageCalculator.calculatePercentage(teamGradeRecords[record].totalCases, caseloadTotalsByTeam[team].totalCases)
        }
        if (!isCSV) {
          gradeTotals = addGradeTotals(gradeTotals, newGradeRecord)
        }
      } else {
        newGradeRecord = {
          grade: teamGradeRecords[record].grade,
          a: teamGradeRecords[record].a,
          b1: teamGradeRecords[record].b1,
          b2: teamGradeRecords[record].b2,
          c1: teamGradeRecords[record].c1,
          c2: teamGradeRecords[record].c2,
          d1: teamGradeRecords[record].d1,
          d2: teamGradeRecords[record].d2,
          untiered: teamGradeRecords[record].untiered,
          totalCases: teamGradeRecords[record].totalCases
        }
        if (!isCSV) {
          gradeTotals = addGradeTotals(gradeTotals, newGradeRecord)
        }
      }
      gradeRecords.push(newGradeRecord)
    }
    newTeamEntry = Object.assign({}, newTeamEntry, { grades: gradeRecords })
    transformedData.push(newTeamEntry)
  }
  if (calculatePercentage) {
    for (const key in gradeTotals) {
      gradeTotals[key].a = gradeTotals[key].a / gradeTotals[key].numberOfType
      gradeTotals[key].b1 = gradeTotals[key].b1 / gradeTotals[key].numberOfType
      gradeTotals[key].b2 = gradeTotals[key].b2 / gradeTotals[key].numberOfType
      gradeTotals[key].c1 = gradeTotals[key].c1 / gradeTotals[key].numberOfType
      gradeTotals[key].c2 = gradeTotals[key].c2 / gradeTotals[key].numberOfType
      gradeTotals[key].d1 = gradeTotals[key].d1 / gradeTotals[key].numberOfType
      gradeTotals[key].d2 = gradeTotals[key].d2 / gradeTotals[key].numberOfType
      gradeTotals[key].untiered = gradeTotals[key].untiered / gradeTotals[key].numberOfType
      gradeTotals[key].totalCases = gradeTotals[key].totalCases / gradeTotals[key].numberOfType
    }
  }
  return { details: transformedData, totals: gradeTotals }
}

const collectTransformedData = function (caseloadTotalsByGrade, isCsv = false) {
  const data = {}
  data.details = transform(caseloadTotalsByGrade, false, false).details
  data.totals = transform(caseloadTotalsByGrade, false, false).totals
  data.detailsPercentages = transform(caseloadTotalsByGrade, true, false).details
  data.percentageTotals = transform(caseloadTotalsByGrade, true, false).totals
  return data
}

const addGradeTotals = function (gradeTotals, newGradeRecord) {
  if (gradeTotals[newGradeRecord.grade] !== undefined) {
    gradeTotals[newGradeRecord.grade].a += newGradeRecord.a
    gradeTotals[newGradeRecord.grade].b1 += newGradeRecord.b1
    gradeTotals[newGradeRecord.grade].b2 += newGradeRecord.b2
    gradeTotals[newGradeRecord.grade].c1 += newGradeRecord.c1
    gradeTotals[newGradeRecord.grade].c2 += newGradeRecord.c2
    gradeTotals[newGradeRecord.grade].d1 += newGradeRecord.d1
    gradeTotals[newGradeRecord.grade].d2 += newGradeRecord.d2
    gradeTotals[newGradeRecord.grade].untiered += newGradeRecord.untiered
    gradeTotals[newGradeRecord.grade].totalCases += newGradeRecord.totalCases
    gradeTotals[newGradeRecord.grade].numberOfType++
  } else {
    gradeTotals[newGradeRecord.grade] = Object.assign({}, newGradeRecord)
    gradeTotals[newGradeRecord.grade].numberOfType = 1
  }
  return gradeTotals
}

const groupCaseload = function (caseloads, splitByGrade = false) {
  // Create a mapping for the linkId to do the aggregation
  const linkIdToCaseloadMap = new Map()
  for (let idx = 0; idx < caseloads.length; idx++) {
    let key = caseloads[idx].linkId
    if (splitByGrade) {
      key += caseloads[idx].grade
    }
    if (!linkIdToCaseloadMap.has(key)) {
      // Make a copy of the object to ensure the original value isn't affected
      const newValue = Object.assign({}, caseloads[idx])
      linkIdToCaseloadMap.set(key, newValue)
    } else {
      const existingValue = linkIdToCaseloadMap.get(key)
      existingValue.untiered += caseloads[idx].untiered
      existingValue.d2 += caseloads[idx].d2
      existingValue.d1 += caseloads[idx].d1
      existingValue.c2 += caseloads[idx].c2
      existingValue.c1 += caseloads[idx].c1
      existingValue.b2 += caseloads[idx].b2
      existingValue.b1 += caseloads[idx].b1
      existingValue.a += caseloads[idx].a
      existingValue.totalCases += caseloads[idx].totalCases
    }
  }

  return convertMapToArray(linkIdToCaseloadMap)
}

const groupOverallCaseloadByGrade = function (caseloads) {
  // Create a mapping for the linkId to do the aggregation
  const linkIdToCaseloadMap = new Map()
  for (let idx = 0; idx < caseloads.length; idx++) {
    const key = caseloads[idx].grade
    if (!linkIdToCaseloadMap.has(key)) {
      // Make a copy of the object to ensure the original value isn't affected
      const newValue = Object.assign({}, caseloads[idx])
      linkIdToCaseloadMap.set(key, newValue)
    } else {
      const existingValue = linkIdToCaseloadMap.get(key)
      existingValue.untiered += caseloads[idx].untiered
      existingValue.d2 += caseloads[idx].d2
      existingValue.d1 += caseloads[idx].d1
      existingValue.c2 += caseloads[idx].c2
      existingValue.c1 += caseloads[idx].c1
      existingValue.b2 += caseloads[idx].b2
      existingValue.b1 += caseloads[idx].b1
      existingValue.a += caseloads[idx].a
      existingValue.totalCases += caseloads[idx].totalCases
    }
  }

  return convertMapToArray(linkIdToCaseloadMap)
}

const totalWholeCaseload = function (caseloads) {
  const tierTotals = { a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, untiered: 0, totalCases: 0 }
  if (caseloads.length > 0) {
    caseloads.forEach(function (caseload) {
      tierTotals.a += caseload.a
      tierTotals.b1 += caseload.b1
      tierTotals.b2 += caseload.b2
      tierTotals.c1 += caseload.c1
      tierTotals.c2 += caseload.c2
      tierTotals.d1 += caseload.d1
      tierTotals.d2 += caseload.d2
      tierTotals.untiered += caseload.untiered
      tierTotals.totalCases += caseload.totalCases
    })
  }
  return tierTotals
}

const calculateOverallPercentages = function (overallTotals, overallGradeTotals) {
  // Create a mapping for the linkId to do the aggregation
  const linkIdToCaseloadMap = new Map()
  for (let idx = 0; idx < overallGradeTotals.length; idx++) {
    const key = overallGradeTotals[idx].grade
    const newValue = Object.assign({}, overallGradeTotals[idx])
    linkIdToCaseloadMap.set(key, newValue)
    const existingValue = linkIdToCaseloadMap.get(key)
    existingValue.untiered = percentageCalculator.calculatePercentage(existingValue.untiered, overallTotals.untiered)
    existingValue.d2 = percentageCalculator.calculatePercentage(existingValue.d2, overallTotals.d2)
    existingValue.d1 = percentageCalculator.calculatePercentage(existingValue.d1, overallTotals.d1)
    existingValue.c2 = percentageCalculator.calculatePercentage(existingValue.c2, overallTotals.c2)
    existingValue.c1 = percentageCalculator.calculatePercentage(existingValue.c1, overallTotals.c1)
    existingValue.b2 = percentageCalculator.calculatePercentage(existingValue.b2, overallTotals.b2)
    existingValue.b1 = percentageCalculator.calculatePercentage(existingValue.b1, overallTotals.b1)
    existingValue.a = percentageCalculator.calculatePercentage(existingValue.a, overallTotals.a)
    existingValue.totalCases = percentageCalculator.calculatePercentage(existingValue.totalCases, overallTotals.totalCases)
  }
  const array = convertMapToArray(linkIdToCaseloadMap)
  const objects = {}
  array.forEach(function (obj) {
    objects[obj.grade] = obj
  })
  return objects
}
