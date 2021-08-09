const appInsights = require('applicationinsights')

const { APPINSIGHTS_INSTRUMENTATIONKEY } = require('../../config')
const applicationVersion = require('./application-version')

function defaultName () {
  const {
    packageData: { name }
  } = applicationVersion
  return name
}

function version () {
  const { buildNumber } = applicationVersion
  return buildNumber
}

function initialiseAppInsights () {
  if (APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.setup(APPINSIGHTS_INSTRUMENTATIONKEY).setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C).start()
    console.log('azure application insights has been enabled')
  }
}

function buildAppInsightsClient (name = defaultName()) {
  if (APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.defaultClient.context.tags['ai.cloud.role'] = name
    appInsights.defaultClient.context.tags['ai.application.ver'] = version()
    return appInsights.defaultClient
  }
  return null
}

module.exports = {
  buildAppInsightsClient,
  initialiseAppInsights
}
