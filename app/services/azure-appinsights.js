const { setup, defaultClient, DistributedTracingModes } = require('applicationinsights')
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
    console.log('Enabling azure application insights')

    setup().setDistributedTracingMode(DistributedTracingModes.AI_AND_W3C).start()
  }
}

function buildAppInsightsClient (name = defaultName()) {
  if (APPINSIGHTS_INSTRUMENTATIONKEY) {
    defaultClient.context.tags['ai.cloud.role'] = name
    defaultClient.context.tags['ai.application.ver'] = version()
    return defaultClient
  }
  return null
}

module.exports = {
  initialiseAppInsights,
  buildAppInsightsClient
}
