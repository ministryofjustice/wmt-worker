const Tiers = require('../points/domain/tiers')
const TierCounts = require('../points/domain/tier-counts')
const zeroIfNull = require('./helpers/zero-if-null')

const CASE_TYPE_UNPAID = 'U'
const CASE_TYPE_OVERDUE_TERMINATION = 'O'
const CASE_TYPE_WARRANT = 'W'
const CASE_TYPE_SUSPENDED = 'S'
const CASE_TYPE_SUSPENDED_LIFERS = 'L'

module.exports = function (summary, details, t2a = false) {
  // WMT0229 Change needed here when extract column names are known
  const total = zeroIfNull(summary.untiered) +
    zeroIfNull(summary.d0) +
    zeroIfNull(summary.d1) +
    zeroIfNull(summary.d2) +
    zeroIfNull(summary.d3) +
    zeroIfNull(summary.c0) +
    zeroIfNull(summary.c1) +
    zeroIfNull(summary.c2) +
    zeroIfNull(summary.c3) +
    zeroIfNull(summary.b0) +
    zeroIfNull(summary.b1) +
    zeroIfNull(summary.b2) +
    zeroIfNull(summary.b3) +
    zeroIfNull(summary.a0) +
    zeroIfNull(summary.a1) +
    zeroIfNull(summary.a2) +
    zeroIfNull(summary.a3) +
    zeroIfNull(summary.d0s) +
    zeroIfNull(summary.d1s) +
    zeroIfNull(summary.d2s) +
    zeroIfNull(summary.d3s) +
    zeroIfNull(summary.c0s) +
    zeroIfNull(summary.c1s) +
    zeroIfNull(summary.c2s) +
    zeroIfNull(summary.c3s) +
    zeroIfNull(summary.b0s) +
    zeroIfNull(summary.b1s) +
    zeroIfNull(summary.b2s) +
    zeroIfNull(summary.b3s) +
    zeroIfNull(summary.a0s) +
    zeroIfNull(summary.a1s) +
    zeroIfNull(summary.a2s) +
    zeroIfNull(summary.a3s)

  if (t2a) {
    // For T2A cases they are identical to normal cases and there are no different
    // WMT0229 Change needed here when extract column names are known
    return new Tiers(
      summary.location,
      getTierCounts(zeroIfNull(summary.untiered), [], 0),
      getTierCounts(zeroIfNull(summary.a3), [], 1),
      getTierCounts(zeroIfNull(summary.a2), [], 2),
      getTierCounts(zeroIfNull(summary.a1), [], 3),
      getTierCounts(zeroIfNull(summary.a0), [], 4),
      getTierCounts(zeroIfNull(summary.b3), [], 5),
      getTierCounts(zeroIfNull(summary.b2), [], 6),
      getTierCounts(zeroIfNull(summary.b1), [], 7),
      getTierCounts(zeroIfNull(summary.b0), [], 8),
      getTierCounts(zeroIfNull(summary.c3), [], 9),
      getTierCounts(zeroIfNull(summary.c2), [], 10),
      getTierCounts(zeroIfNull(summary.c1), [], 11),
      getTierCounts(zeroIfNull(summary.c0), [], 12),
      getTierCounts(zeroIfNull(summary.d3), [], 13),
      getTierCounts(zeroIfNull(summary.d2), [], 14),
      getTierCounts(zeroIfNull(summary.d1), [], 15),
      getTierCounts(zeroIfNull(summary.d0), [], 16),
      getTierCounts(zeroIfNull(summary.a3s), [], 17),
      getTierCounts(zeroIfNull(summary.a2s), [], 18),
      getTierCounts(zeroIfNull(summary.a1s), [], 19),
      getTierCounts(zeroIfNull(summary.a0s), [], 20),
      getTierCounts(zeroIfNull(summary.b3s), [], 21),
      getTierCounts(zeroIfNull(summary.b2s), [], 22),
      getTierCounts(zeroIfNull(summary.b1s), [], 23),
      getTierCounts(zeroIfNull(summary.b0s), [], 24),
      getTierCounts(zeroIfNull(summary.c3s), [], 25),
      getTierCounts(zeroIfNull(summary.c2s), [], 26),
      getTierCounts(zeroIfNull(summary.c1s), [], 27),
      getTierCounts(zeroIfNull(summary.c0s), [], 28),
      getTierCounts(zeroIfNull(summary.d3s), [], 29),
      getTierCounts(zeroIfNull(summary.d2s), [], 30),
      getTierCounts(zeroIfNull(summary.d1s), [], 31),
      getTierCounts(zeroIfNull(summary.d0s), [], 32),
      total
    )
  } else {
    // TODO this is pretty inefficent, we should replace multiple filters with
    // one sort method which categorises each entry into an appropriate array
    // WMT0229 Change needed here when extract column names are known
    return new Tiers(
      summary.location,
      getTierCounts(zeroIfNull(summary.untiered), details.filter(tierCodeFilter('0')), 0),
      getTierCounts(zeroIfNull(summary.a3), details.filter(tierCodeFilter('1')), 1),
      getTierCounts(zeroIfNull(summary.a2), details.filter(tierCodeFilter('2')), 2),
      getTierCounts(zeroIfNull(summary.a1), details.filter(tierCodeFilter('3')), 3),
      getTierCounts(zeroIfNull(summary.a0), details.filter(tierCodeFilter('4')), 4),
      getTierCounts(zeroIfNull(summary.b3), details.filter(tierCodeFilter('5')), 5),
      getTierCounts(zeroIfNull(summary.b2), details.filter(tierCodeFilter('6')), 6),
      getTierCounts(zeroIfNull(summary.b1), details.filter(tierCodeFilter('7')), 7),
      getTierCounts(zeroIfNull(summary.b0), details.filter(tierCodeFilter('8')), 8),
      getTierCounts(zeroIfNull(summary.c3), details.filter(tierCodeFilter('9')), 9),
      getTierCounts(zeroIfNull(summary.c2), details.filter(tierCodeFilter('10')), 10),
      getTierCounts(zeroIfNull(summary.c1), details.filter(tierCodeFilter('11')), 11),
      getTierCounts(zeroIfNull(summary.c0), details.filter(tierCodeFilter('12')), 12),
      getTierCounts(zeroIfNull(summary.d3), details.filter(tierCodeFilter('13')), 13),
      getTierCounts(zeroIfNull(summary.d2), details.filter(tierCodeFilter('14')), 14),
      getTierCounts(zeroIfNull(summary.d1), details.filter(tierCodeFilter('15')), 15),
      getTierCounts(zeroIfNull(summary.d0), details.filter(tierCodeFilter('16')), 16),
      getTierCounts(zeroIfNull(summary.a3s), details.filter(tierCodeFilter('17')), 17),
      getTierCounts(zeroIfNull(summary.a2s), details.filter(tierCodeFilter('18')), 18),
      getTierCounts(zeroIfNull(summary.a1s), details.filter(tierCodeFilter('19')), 19),
      getTierCounts(zeroIfNull(summary.a0s), details.filter(tierCodeFilter('20')), 20),
      getTierCounts(zeroIfNull(summary.b3s), details.filter(tierCodeFilter('21')), 21),
      getTierCounts(zeroIfNull(summary.b2s), details.filter(tierCodeFilter('22')), 22),
      getTierCounts(zeroIfNull(summary.b1s), details.filter(tierCodeFilter('23')), 23),
      getTierCounts(zeroIfNull(summary.b0s), details.filter(tierCodeFilter('24')), 24),
      getTierCounts(zeroIfNull(summary.c3s), details.filter(tierCodeFilter('25')), 25),
      getTierCounts(zeroIfNull(summary.c2s), details.filter(tierCodeFilter('26')), 26),
      getTierCounts(zeroIfNull(summary.c1s), details.filter(tierCodeFilter('27')), 27),
      getTierCounts(zeroIfNull(summary.c0s), details.filter(tierCodeFilter('28')), 28),
      getTierCounts(zeroIfNull(summary.d3s), details.filter(tierCodeFilter('29')), 29),
      getTierCounts(zeroIfNull(summary.d2s), details.filter(tierCodeFilter('30')), 30),
      getTierCounts(zeroIfNull(summary.d1s), details.filter(tierCodeFilter('31')), 31),
      getTierCounts(zeroIfNull(summary.d0s), details.filter(tierCodeFilter('32')), 32),
      total
    )
  }
}

const getTierCounts = function (totalCases, tierDetails = [], tierCode) {
  const unpaidWorkCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_UNPAID)).length
  const warrantCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_WARRANT)).length
  const overDueTermination = tierDetails.filter(rowTypeFilter(CASE_TYPE_OVERDUE_TERMINATION)).length
  const suspendedCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_SUSPENDED)).length
  const suspendedLifersCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_SUSPENDED_LIFERS)).length
  try {
    return new TierCounts(totalCases, warrantCount, unpaidWorkCount, overDueTermination, suspendedCount, suspendedLifersCount, tierCode)
  } catch (error) {
    console.log(error)
  }
}

const tierCodeFilter = function (tierCode) {
  return function (element) {
    return element.tierCode.toString() === tierCode.toString()
  }
}

const rowTypeFilter = function (rowType) {
  return function (element) {
    return element.rowType === rowType
  }
}
