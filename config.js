const production = process.env.NODE_ENV === 'production'

module.exports = {
  LOGGING_PATH: process.env.LOGGING_PATH,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'DEBUG',

  // Worker
  ASYNC_WORKER_CRON: process.env.WMT_ASYNC_WORKER_CRON || '0/10 * * * * *', //  every 10 seconds
  ASYNC_WORKER_BATCH_SIZE: process.env.WMT_ASYNC_WORKER_BATCH_SIZE || '25',

  // DB
  DATABASE_SERVER: process.env.WMT_DB_SERVER || 'localhost',
  DATABASE: process.env.WMT_DB_NAME || 'postgres',
  DATABASE_USERNAME: process.env.WMT_DB_USERNAME || 'root',
  DATABASE_PASSWORD: process.env.WMT_DB_PASSWORD || 'dev',
  DB_APP_SCHEMA: 'app',
  DB_STG_SCHEMA: 'staging',

  PORT: process.env.PORT || 3000,

  // Dashboard
  WMT_DASHBOARD_TEMPLATE_FILE_PATH: process.env.WMT_DASHBOARD_TEMPLATE_FILE_PATH || './app/templates/dashboard_template.xlsx',
  WMT_DASHBOARD_OUTPUT_FILE_PATH: process.env.WMT_DASHBOARD_OUTPUT_FILE_PATH || 'generated-dashboards/',
  WMT_DASHBOARD_PASSWORD: process.env.WMT_DASHBOARD_PASSWORD,

  // Reductions and Contracted Hours
  WMT_REDUCTIONS_AND_CONTRACTED_HOURS_PATH: process.env.WMT_REDUCTIONS_AND_CONTRACTED_HOURS_PATH || '/usr/src/app/wmt-worker/data/reductions_and_contracted_hours/',

  // Expected values
  EXPECTED_DIVISIONS_COUNT: process.env.WMT_EXPECTED_DIVISIONS_COUNT || '12',

  DASHBOARD_BUCKET: process.env.WMT_DASHBOARD_BUCKET || 'wmt-worker-dashboard',
  DASHBOARD_REGION: process.env.S3_REGION || 'eu-west-2',
  S3_ENDPOINT: production ? null : 'http://localhost:4566',
  DASHBOARD_S3_ACCESS_KEY_ID: process.env.DASHBOARD_S3_ACCESS_KEY_ID || 'foobar',
  DASHBOARD_S3_SECRET_ACCESS_KEY: process.env.DASHBOARD_S3_SECRET_ACCESS_KEY || 'foobar',

  APPINSIGHTS_INSTRUMENTATIONKEY: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,

  // Environment
  WMT_ENVIRONMENT: process.env.NODE_ENV
}
