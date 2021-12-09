const appinsights = require('applicationinsights')
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

    appinsights.setup().setDistributedTracingMode(appinsights.DistributedTracingModes.AI_AND_W3C).start()
    appinsights.defaultClient.context.tags['ai.cloud.role'] = defaultName()
    appinsights.defaultClient.context.tags['ai.application.ver'] = version()
  }
}

module.exports = {
  initialiseAppInsights
}
