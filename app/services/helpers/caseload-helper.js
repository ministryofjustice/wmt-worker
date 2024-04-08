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
        regionCode: caseloads[idx].regionCode,
        lduCode: caseloads[idx].lduCode,
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
  const totals = { a3: 0, a2: 0, a1: 0, a0: 0, b3: 0, b2: 0, b1: 0, b0: 0, c3: 0, c2: 0, c1: 0, c0: 0, d3: 0, d2: 0, d1: 0, d0: 0, a3s: 0, a2s: 0, a1s: 0, a0s: 0, b3s: 0, b2s: 0, b1s: 0, b0s: 0, c3s: 0, c2s: 0, c1s: 0, c0s: 0, d3s: 0, d2s: 0, d1s: 0, d0s: 0, untiered: 0, overall: 0 }
  caseloads.forEach(function (val, key) {
    totals.a3 += val.a3
    totals.a2 += val.a2
    totals.a1 += val.a1
    totals.a0 += val.a0
    totals.b3 += val.b3
    totals.b2 += val.b2
    totals.b1 += val.b1
    totals.b0 += val.b0
    totals.c3 += val.c3
    totals.c2 += val.c2
    totals.c1 += val.c1
    totals.c0 += val.c0
    totals.d3 += val.d3
    totals.d2 += val.d2
    totals.d1 += val.d1
    totals.d0 += val.d0
    totals.a3s += val.a3s
    totals.a2s += val.a2s
    totals.a1s += val.a1s
    totals.a0s += val.a0s
    totals.b3s += val.b3s
    totals.b2s += val.b2s
    totals.b1s += val.b1s
    totals.b0s += val.b0s
    totals.c3s += val.c3s
    totals.c2s += val.c2s
    totals.c1s += val.c1s
    totals.c0s += val.c0s
    totals.d3s += val.d3s
    totals.d2s += val.d2s
    totals.d1s += val.d1s
    totals.d0s += val.d0s
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
    let newTeamEntry = {
      linkId: caseloadTotalsByTeam[team].linkId,
      name: caseloadTotalsByTeam[team].name,
      regionName: caseloadTotalsByTeam[team].regionName,
      regionCode: caseloadTotalsByTeam[team].regionCode,
      lduCode: caseloadTotalsByTeam[team].lduCode
    }
    const teamGradeRecords = caseloadTotalsByGrade.filter((row) => row.linkId === caseloadTotalsByTeam[team].linkId)
    const gradeRecords = []
    for (const record in teamGradeRecords) {
      let newGradeRecord
      if (calculatePercentage) {
        newGradeRecord = {
          grade: teamGradeRecords[record].grade,
          a3: percentageCalculator.calculatePercentage(teamGradeRecords[record].a3, caseloadTotalsByTeam[team].a3),
          a2: percentageCalculator.calculatePercentage(teamGradeRecords[record].a2, caseloadTotalsByTeam[team].a2),
          a1: percentageCalculator.calculatePercentage(teamGradeRecords[record].a1, caseloadTotalsByTeam[team].a1),
          a0: percentageCalculator.calculatePercentage(teamGradeRecords[record].a0, caseloadTotalsByTeam[team].a0),
          b3: percentageCalculator.calculatePercentage(teamGradeRecords[record].b3, caseloadTotalsByTeam[team].b3),
          b2: percentageCalculator.calculatePercentage(teamGradeRecords[record].b2, caseloadTotalsByTeam[team].b2),
          b1: percentageCalculator.calculatePercentage(teamGradeRecords[record].b1, caseloadTotalsByTeam[team].b1),
          b0: percentageCalculator.calculatePercentage(teamGradeRecords[record].b0, caseloadTotalsByTeam[team].b0),
          c3: percentageCalculator.calculatePercentage(teamGradeRecords[record].c3, caseloadTotalsByTeam[team].c3),
          c2: percentageCalculator.calculatePercentage(teamGradeRecords[record].c2, caseloadTotalsByTeam[team].c2),
          c1: percentageCalculator.calculatePercentage(teamGradeRecords[record].c1, caseloadTotalsByTeam[team].c1),
          c0: percentageCalculator.calculatePercentage(teamGradeRecords[record].c0, caseloadTotalsByTeam[team].c0),
          d3: percentageCalculator.calculatePercentage(teamGradeRecords[record].d3, caseloadTotalsByTeam[team].d3),
          d2: percentageCalculator.calculatePercentage(teamGradeRecords[record].d2, caseloadTotalsByTeam[team].d2),
          d1: percentageCalculator.calculatePercentage(teamGradeRecords[record].d1, caseloadTotalsByTeam[team].d1),
          d0: percentageCalculator.calculatePercentage(teamGradeRecords[record].d0, caseloadTotalsByTeam[team].d0),
          a3s: percentageCalculator.calculatePercentage(teamGradeRecords[record].a3s, caseloadTotalsByTeam[team].a3s),
          a2s: percentageCalculator.calculatePercentage(teamGradeRecords[record].a2s, caseloadTotalsByTeam[team].a2s),
          a1s: percentageCalculator.calculatePercentage(teamGradeRecords[record].a1s, caseloadTotalsByTeam[team].a1s),
          a0s: percentageCalculator.calculatePercentage(teamGradeRecords[record].a0s, caseloadTotalsByTeam[team].a0s),
          b3s: percentageCalculator.calculatePercentage(teamGradeRecords[record].b3s, caseloadTotalsByTeam[team].b3s),
          b2s: percentageCalculator.calculatePercentage(teamGradeRecords[record].b2s, caseloadTotalsByTeam[team].b2s),
          b1s: percentageCalculator.calculatePercentage(teamGradeRecords[record].b1s, caseloadTotalsByTeam[team].b1s),
          b0s: percentageCalculator.calculatePercentage(teamGradeRecords[record].b0s, caseloadTotalsByTeam[team].b0s),
          c3s: percentageCalculator.calculatePercentage(teamGradeRecords[record].c3s, caseloadTotalsByTeam[team].c3s),
          c2s: percentageCalculator.calculatePercentage(teamGradeRecords[record].c2s, caseloadTotalsByTeam[team].c2s),
          c1s: percentageCalculator.calculatePercentage(teamGradeRecords[record].c1s, caseloadTotalsByTeam[team].c1s),
          c0s: percentageCalculator.calculatePercentage(teamGradeRecords[record].c0s, caseloadTotalsByTeam[team].c0s),
          d3s: percentageCalculator.calculatePercentage(teamGradeRecords[record].d3s, caseloadTotalsByTeam[team].d3s),
          d2s: percentageCalculator.calculatePercentage(teamGradeRecords[record].d2s, caseloadTotalsByTeam[team].d2s),
          d1s: percentageCalculator.calculatePercentage(teamGradeRecords[record].d1s, caseloadTotalsByTeam[team].d1s),
          d0s: percentageCalculator.calculatePercentage(teamGradeRecords[record].d0s, caseloadTotalsByTeam[team].d0s),
          untiered: percentageCalculator.calculatePercentage(teamGradeRecords[record].untiered, caseloadTotalsByTeam[team].untiered),
          totalCases: percentageCalculator.calculatePercentage(teamGradeRecords[record].totalCases, caseloadTotalsByTeam[team].totalCases)
        }
        if (!isCSV) {
          gradeTotals = addGradeTotals(gradeTotals, newGradeRecord)
        }
      } else {
        newGradeRecord = {
          grade: teamGradeRecords[record].grade,
          a3: teamGradeRecords[record].a3,
          a2: teamGradeRecords[record].a2,
          a1: teamGradeRecords[record].a1,
          a0: teamGradeRecords[record].a0,
          b3: teamGradeRecords[record].b3,
          b2: teamGradeRecords[record].b2,
          b1: teamGradeRecords[record].b1,
          b0: teamGradeRecords[record].b0,
          c3: teamGradeRecords[record].c3,
          c2: teamGradeRecords[record].c2,
          c1: teamGradeRecords[record].c1,
          c0: teamGradeRecords[record].c0,
          d3: teamGradeRecords[record].d3,
          d2: teamGradeRecords[record].d2,
          d1: teamGradeRecords[record].d1,
          d0: teamGradeRecords[record].d0,
          a3s: teamGradeRecords[record].a3s,
          a2s: teamGradeRecords[record].a2s,
          a1s: teamGradeRecords[record].a1s,
          a0s: teamGradeRecords[record].a0s,
          b3s: teamGradeRecords[record].b3s,
          b2s: teamGradeRecords[record].b2s,
          b1s: teamGradeRecords[record].b1s,
          b0s: teamGradeRecords[record].b0s,
          c3s: teamGradeRecords[record].c3s,
          c2s: teamGradeRecords[record].c2s,
          c1s: teamGradeRecords[record].c1s,
          c0s: teamGradeRecords[record].c0s,
          d3s: teamGradeRecords[record].d3s,
          d2s: teamGradeRecords[record].d2s,
          d1s: teamGradeRecords[record].d1s,
          d0s: teamGradeRecords[record].d0s,
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
      gradeTotals[key].a3 = gradeTotals[key].a3 / gradeTotals[key].numberOfType
      gradeTotals[key].a2 = gradeTotals[key].a2 / gradeTotals[key].numberOfType
      gradeTotals[key].a1 = gradeTotals[key].a1 / gradeTotals[key].numberOfType
      gradeTotals[key].a0 = gradeTotals[key].a0 / gradeTotals[key].numberOfType
      gradeTotals[key].b3 = gradeTotals[key].b3 / gradeTotals[key].numberOfType
      gradeTotals[key].b2 = gradeTotals[key].b2 / gradeTotals[key].numberOfType
      gradeTotals[key].b1 = gradeTotals[key].b1 / gradeTotals[key].numberOfType
      gradeTotals[key].b0 = gradeTotals[key].b0 / gradeTotals[key].numberOfType
      gradeTotals[key].c3 = gradeTotals[key].c3 / gradeTotals[key].numberOfType
      gradeTotals[key].c2 = gradeTotals[key].c2 / gradeTotals[key].numberOfType
      gradeTotals[key].c1 = gradeTotals[key].c1 / gradeTotals[key].numberOfType
      gradeTotals[key].c0 = gradeTotals[key].c0 / gradeTotals[key].numberOfType
      gradeTotals[key].d3 = gradeTotals[key].d3 / gradeTotals[key].numberOfType
      gradeTotals[key].d2 = gradeTotals[key].d2 / gradeTotals[key].numberOfType
      gradeTotals[key].d1 = gradeTotals[key].d1 / gradeTotals[key].numberOfType
      gradeTotals[key].d0 = gradeTotals[key].d0 / gradeTotals[key].numberOfType
      gradeTotals[key].a3s = gradeTotals[key].a3s / gradeTotals[key].numberOfType
      gradeTotals[key].a2s = gradeTotals[key].a2s / gradeTotals[key].numberOfType
      gradeTotals[key].a1s = gradeTotals[key].a1s / gradeTotals[key].numberOfType
      gradeTotals[key].a0s = gradeTotals[key].a0s / gradeTotals[key].numberOfType
      gradeTotals[key].b3s = gradeTotals[key].b3s / gradeTotals[key].numberOfType
      gradeTotals[key].b2s = gradeTotals[key].b2s / gradeTotals[key].numberOfType
      gradeTotals[key].b1s = gradeTotals[key].b1s / gradeTotals[key].numberOfType
      gradeTotals[key].b0s = gradeTotals[key].b0s / gradeTotals[key].numberOfType
      gradeTotals[key].c3s = gradeTotals[key].c3s / gradeTotals[key].numberOfType
      gradeTotals[key].c2s = gradeTotals[key].c2s / gradeTotals[key].numberOfType
      gradeTotals[key].c1s = gradeTotals[key].c1s / gradeTotals[key].numberOfType
      gradeTotals[key].c0s = gradeTotals[key].c0s / gradeTotals[key].numberOfType
      gradeTotals[key].d3s = gradeTotals[key].d3s / gradeTotals[key].numberOfType
      gradeTotals[key].d2s = gradeTotals[key].d2s / gradeTotals[key].numberOfType
      gradeTotals[key].d1s = gradeTotals[key].d1s / gradeTotals[key].numberOfType
      gradeTotals[key].d0s = gradeTotals[key].d0s / gradeTotals[key].numberOfType
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
    gradeTotals[newGradeRecord.grade].a3 += newGradeRecord.a3
    gradeTotals[newGradeRecord.grade].a2 += newGradeRecord.a2
    gradeTotals[newGradeRecord.grade].a1 += newGradeRecord.a1
    gradeTotals[newGradeRecord.grade].a0 += newGradeRecord.a0
    gradeTotals[newGradeRecord.grade].b3 += newGradeRecord.b3
    gradeTotals[newGradeRecord.grade].b2 += newGradeRecord.b2
    gradeTotals[newGradeRecord.grade].b1 += newGradeRecord.b1
    gradeTotals[newGradeRecord.grade].b0 += newGradeRecord.b0
    gradeTotals[newGradeRecord.grade].c3 += newGradeRecord.c3
    gradeTotals[newGradeRecord.grade].c2 += newGradeRecord.c2
    gradeTotals[newGradeRecord.grade].c1 += newGradeRecord.c1
    gradeTotals[newGradeRecord.grade].c0 += newGradeRecord.c0
    gradeTotals[newGradeRecord.grade].d3 += newGradeRecord.d3
    gradeTotals[newGradeRecord.grade].d2 += newGradeRecord.d2
    gradeTotals[newGradeRecord.grade].d1 += newGradeRecord.d1
    gradeTotals[newGradeRecord.grade].d0 += newGradeRecord.d0
    gradeTotals[newGradeRecord.grade].a3s += newGradeRecord.a3s
    gradeTotals[newGradeRecord.grade].a2s += newGradeRecord.a2s
    gradeTotals[newGradeRecord.grade].a1s += newGradeRecord.a1s
    gradeTotals[newGradeRecord.grade].a0s += newGradeRecord.a0s
    gradeTotals[newGradeRecord.grade].b3s += newGradeRecord.b3s
    gradeTotals[newGradeRecord.grade].b2s += newGradeRecord.b2s
    gradeTotals[newGradeRecord.grade].b1s += newGradeRecord.b1s
    gradeTotals[newGradeRecord.grade].b0s += newGradeRecord.b0s
    gradeTotals[newGradeRecord.grade].c3s += newGradeRecord.c3s
    gradeTotals[newGradeRecord.grade].c2s += newGradeRecord.c2s
    gradeTotals[newGradeRecord.grade].c1s += newGradeRecord.c1s
    gradeTotals[newGradeRecord.grade].c0s += newGradeRecord.c0s
    gradeTotals[newGradeRecord.grade].d3s += newGradeRecord.d3s
    gradeTotals[newGradeRecord.grade].d2s += newGradeRecord.d2s
    gradeTotals[newGradeRecord.grade].d1s += newGradeRecord.d1s
    gradeTotals[newGradeRecord.grade].d0s += newGradeRecord.d0s
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
      existingValue.d0 += caseloads[idx].d0
      existingValue.d1 += caseloads[idx].d1
      existingValue.d2 += caseloads[idx].d2
      existingValue.d3 += caseloads[idx].d3
      existingValue.c0 += caseloads[idx].c0
      existingValue.c1 += caseloads[idx].c1
      existingValue.c2 += caseloads[idx].c2
      existingValue.c3 += caseloads[idx].c3
      existingValue.b0 += caseloads[idx].b0
      existingValue.b1 += caseloads[idx].b1
      existingValue.b2 += caseloads[idx].b2
      existingValue.b3 += caseloads[idx].b3
      existingValue.a0 += caseloads[idx].a0
      existingValue.a1 += caseloads[idx].a1
      existingValue.a2 += caseloads[idx].a2
      existingValue.a3 += caseloads[idx].a3
      existingValue.d0s += caseloads[idx].d0s
      existingValue.d1s += caseloads[idx].d1s
      existingValue.d2s += caseloads[idx].d2s
      existingValue.d3s += caseloads[idx].d3s
      existingValue.c0s += caseloads[idx].c0s
      existingValue.c1s += caseloads[idx].c1s
      existingValue.c2s += caseloads[idx].c2s
      existingValue.c3s += caseloads[idx].c3s
      existingValue.b0s += caseloads[idx].b0s
      existingValue.b1s += caseloads[idx].b1s
      existingValue.b2s += caseloads[idx].b2s
      existingValue.b3s += caseloads[idx].b3s
      existingValue.a0s += caseloads[idx].a0s
      existingValue.a1s += caseloads[idx].a1s
      existingValue.a2s += caseloads[idx].a2s
      existingValue.a3s += caseloads[idx].a3s
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
      existingValue.d0 += caseloads[idx].d0
      existingValue.d1 += caseloads[idx].d1
      existingValue.d2 += caseloads[idx].d2
      existingValue.d3 += caseloads[idx].d3
      existingValue.c0 += caseloads[idx].c0
      existingValue.c1 += caseloads[idx].c1
      existingValue.c2 += caseloads[idx].c2
      existingValue.c3 += caseloads[idx].c3
      existingValue.b0 += caseloads[idx].b0
      existingValue.b1 += caseloads[idx].b1
      existingValue.b2 += caseloads[idx].b2
      existingValue.b3 += caseloads[idx].b3
      existingValue.a0 += caseloads[idx].a0
      existingValue.a1 += caseloads[idx].a1
      existingValue.a2 += caseloads[idx].a2
      existingValue.a3 += caseloads[idx].a3
      existingValue.d0s += caseloads[idx].d0s
      existingValue.d1s += caseloads[idx].d1s
      existingValue.d2s += caseloads[idx].d2s
      existingValue.d3s += caseloads[idx].d3s
      existingValue.c0s += caseloads[idx].c0s
      existingValue.c1s += caseloads[idx].c1s
      existingValue.c2s += caseloads[idx].c2s
      existingValue.c3s += caseloads[idx].c3s
      existingValue.b0s += caseloads[idx].b0s
      existingValue.b1s += caseloads[idx].b1s
      existingValue.b2s += caseloads[idx].b2s
      existingValue.b3s += caseloads[idx].b3s
      existingValue.a0s += caseloads[idx].a0s
      existingValue.a1s += caseloads[idx].a1s
      existingValue.a2s += caseloads[idx].a2s
      existingValue.a3s += caseloads[idx].a3s
      existingValue.totalCases += caseloads[idx].totalCases
    }
  }

  return convertMapToArray(linkIdToCaseloadMap)
}

const totalWholeCaseload = function (caseloads) {
  const tierTotals = { a3: 0, a2: 0, a1: 0, a0: 0, b3: 0, b2: 0, b1: 0, b0: 0, c3: 0, c2: 0, c1: 0, c0: 0, d3: 0, d2: 0, d1: 0, d0: 0, a3s: 0, a2s: 0, a1s: 0, a0s: 0, b3s: 0, b2s: 0, b1s: 0, b0s: 0, c3s: 0, c2s: 0, c1s: 0, c0s: 0, d3s: 0, d2s: 0, d1s: 0, d0s: 0, untiered: 0, totalCases: 0 }
  if (caseloads.length > 0) {
    caseloads.forEach(function (caseload) {
      tierTotals.a3 += caseload.a3
      tierTotals.a2 += caseload.a2
      tierTotals.a1 += caseload.a1
      tierTotals.a0 += caseload.a0
      tierTotals.b3 += caseload.b3
      tierTotals.b2 += caseload.b2
      tierTotals.b1 += caseload.b1
      tierTotals.b0 += caseload.b0
      tierTotals.c3 += caseload.c3
      tierTotals.c2 += caseload.c2
      tierTotals.c1 += caseload.c1
      tierTotals.c0 += caseload.c0
      tierTotals.d3 += caseload.d3
      tierTotals.d2 += caseload.d2
      tierTotals.d1 += caseload.d1
      tierTotals.d0 += caseload.d0
      tierTotals.a3s += caseload.a3s
      tierTotals.a2s += caseload.a2s
      tierTotals.a1s += caseload.a1s
      tierTotals.a0s += caseload.a0s
      tierTotals.b3s += caseload.b3s
      tierTotals.b2s += caseload.b2s
      tierTotals.b1s += caseload.b1s
      tierTotals.b0s += caseload.b0s
      tierTotals.c3s += caseload.c3s
      tierTotals.c2s += caseload.c2s
      tierTotals.c1s += caseload.c1s
      tierTotals.c0s += caseload.c0s
      tierTotals.d3s += caseload.d3s
      tierTotals.d2s += caseload.d2s
      tierTotals.d1s += caseload.d1s
      tierTotals.d0s += caseload.d0s
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
    existingValue.d3 = percentageCalculator.calculatePercentage(existingValue.d3, overallTotals.d3)
    existingValue.d2 = percentageCalculator.calculatePercentage(existingValue.d2, overallTotals.d2)
    existingValue.d1 = percentageCalculator.calculatePercentage(existingValue.d1, overallTotals.d1)
    existingValue.d0 = percentageCalculator.calculatePercentage(existingValue.d0, overallTotals.d0)
    existingValue.c3 = percentageCalculator.calculatePercentage(existingValue.c3, overallTotals.c3)
    existingValue.c2 = percentageCalculator.calculatePercentage(existingValue.c2, overallTotals.c2)
    existingValue.c1 = percentageCalculator.calculatePercentage(existingValue.c1, overallTotals.c1)
    existingValue.c0 = percentageCalculator.calculatePercentage(existingValue.c0, overallTotals.c0)
    existingValue.b3 = percentageCalculator.calculatePercentage(existingValue.b3, overallTotals.b3)
    existingValue.b2 = percentageCalculator.calculatePercentage(existingValue.b2, overallTotals.b2)
    existingValue.b1 = percentageCalculator.calculatePercentage(existingValue.b1, overallTotals.b1)
    existingValue.b0 = percentageCalculator.calculatePercentage(existingValue.b0, overallTotals.b0)
    existingValue.a3 = percentageCalculator.calculatePercentage(existingValue.a3, overallTotals.a3)
    existingValue.a2 = percentageCalculator.calculatePercentage(existingValue.a2, overallTotals.a2)
    existingValue.a1 = percentageCalculator.calculatePercentage(existingValue.a1, overallTotals.a1)
    existingValue.a0 = percentageCalculator.calculatePercentage(existingValue.a0, overallTotals.a0)
    existingValue.d3s = percentageCalculator.calculatePercentage(existingValue.d3s, overallTotals.d3s)
    existingValue.d2s = percentageCalculator.calculatePercentage(existingValue.d2s, overallTotals.d2s)
    existingValue.d1s = percentageCalculator.calculatePercentage(existingValue.d1s, overallTotals.d1s)
    existingValue.d0s = percentageCalculator.calculatePercentage(existingValue.d0s, overallTotals.d0s)
    existingValue.c3s = percentageCalculator.calculatePercentage(existingValue.c3s, overallTotals.c3s)
    existingValue.c2s = percentageCalculator.calculatePercentage(existingValue.c2s, overallTotals.c2s)
    existingValue.c1s = percentageCalculator.calculatePercentage(existingValue.c1s, overallTotals.c1s)
    existingValue.c0s = percentageCalculator.calculatePercentage(existingValue.c0s, overallTotals.c0s)
    existingValue.b3s = percentageCalculator.calculatePercentage(existingValue.b3s, overallTotals.b3s)
    existingValue.b2s = percentageCalculator.calculatePercentage(existingValue.b2s, overallTotals.b2s)
    existingValue.b1s = percentageCalculator.calculatePercentage(existingValue.b1s, overallTotals.b1s)
    existingValue.b0s = percentageCalculator.calculatePercentage(existingValue.b0s, overallTotals.b0s)
    existingValue.a3s = percentageCalculator.calculatePercentage(existingValue.a3s, overallTotals.a3s)
    existingValue.a2s = percentageCalculator.calculatePercentage(existingValue.a2s, overallTotals.a2s)
    existingValue.a1s = percentageCalculator.calculatePercentage(existingValue.a1s, overallTotals.a1s)
    existingValue.a0s = percentageCalculator.calculatePercentage(existingValue.a0s, overallTotals.a0s)
    existingValue.totalCases = percentageCalculator.calculatePercentage(existingValue.totalCases, overallTotals.totalCases)
  }
  const array = convertMapToArray(linkIdToCaseloadMap)
  const objects = {}
  array.forEach(function (obj) {
    objects[obj.grade] = obj
  })
  return objects
}
