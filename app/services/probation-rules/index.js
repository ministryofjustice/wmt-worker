// Constants
const Locations = require('./app/staging/constants/locations')
const ExtractLocations = require('./app/staging/constants/extract-locations')

// Configurations
const PointsConfiguration = require('./app/points/domain/points-configuration')
const LocationPointsConfiguration = require('./app/points/domain/location-points-configuration')
const DefaultContractedHours = require('./app/points/domain/default-contracted-hours')
const DefaultNominalTargets = require('./app/points/domain/default-nominal-targets')
const CaseTypeWeightings = require('./app/points/domain/case-type-weightings')

// Areas
const Region = require('./app/points/domain/region')
const Ldu = require('./app/points/domain/ldu')
const Team = require('./app/points/domain/team')

// Workload object
const OmWorkload = require('./app/staging/domain/om-workload')
const Workload = require('./app/points/domain/workload')
const CasesSummary = require('./app/staging/domain/cases-summary')
const CourtReport = require('./app/staging/domain/court-report')
const InstitutionalReport = require('./app/staging/domain/institutional-report')
const CaseDetails = require('./app/staging/domain/case-details')

// Court Reports Object
const OmCourtReports = require('./app/staging/domain/om-court-reports')
const CourtReports = require('./app/points/domain/court-reports')

// Workload dependencies
const OffenderManager = require('./app/points/domain/offender-manager')
const WorkloadOwner = require('./app/points/domain/workload-owner')
const WorkingHours = require('./app/points/domain/working-hours')
const Tiers = require('./app/staging/domain/tiers')
const AppTiers = require('./app/points/domain/tiers')
const TierCounts = require('./app/points/domain/tier-counts')

// Calcuation Methods
const calculateAvailablePoints = require('./app/points/calculate-available-points')
const calculateContractedHours = require('./app/points/calculate-contracted-hours')
const calculateNominalTarget = require('./app/points/calculate-nominal-target')
const calculateWorkloadPoints = require('./app/points/calculate-points-for-workload')
const calculateOmicWorkloadPoints = require('./app/points/calculate-points-for-omic-workload')

// Context Map
const mapWorkload = require('./app/context-map/workload')
const filterOmGradeCode = require('./app/context-map/om-grade-code')
const mapCourtReports = require('./app/context-map/court-reports')

module.exports = {
  CasesSummary,
  CaseDetails,
  CourtReport,
  CaseTypeWeightings,
  DefaultContractedHours,
  DefaultNominalTargets,
  InstitutionalReport,
  Ldu,
  Locations,
  ExtractLocations,
  LocationPointsConfiguration,
  OffenderManager,
  OmWorkload,
  PointsConfiguration,
  Region,
  Team,
  TierCounts,
  Tiers,
  AppTiers,
  WorkloadOwner,
  WorkingHours,
  Workload,
  calculateAvailablePoints,
  calculateNominalTarget,
  calculateWorkloadPoints,
  calculateOmicWorkloadPoints,
  mapWorkload,
  filterOmGradeCode,
  calculateContractedHours,
  OmCourtReports,
  mapCourtReports,
  CourtReports
}
