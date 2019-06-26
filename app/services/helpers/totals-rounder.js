module.exports = function (totals) {
  totals.totalContractedHours = parseFloat(totals.totalContractedHours.toFixed(1))
  totals.totalReduction = parseFloat(totals.totalReduction.toFixed(1))
  return totals
}
