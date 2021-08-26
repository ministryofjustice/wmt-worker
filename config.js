module.exports = {
  LOGGING_PATH: process.env.LOGGING_PATH,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'DEBUG',

  // Worker
  ASYNC_WORKER_CRON: process.env.WMT_ASYNC_WORKER_CRON || '0 * * * * *', // default every minute
  ASYNC_WORKER_BATCH_SIZE: process.env.WMT_ASYNC_WORKER_BATCH_SIZE || '25',

  // DB
  DATABASE_SERVER: process.env.WMT_DB_SERVER || 'localhost',
  DATABASE: process.env.WMT_DB_NAME || 'wmt_db',
  DATABASE_USERNAME: process.env.WMT_DB_USERNAME || 'wmt',
  DATABASE_PASSWORD: process.env.WMT_DB_PASSWORD || 'wmt',
  DB_APP_SCHEMA: 'app',
  DB_STG_SCHEMA: 'staging',

  // Migration
  MIGRATION_APP_DATABASE_USERNAME: process.env.WMT_MIGRATION_APP_DATABASE_USERNAME || 'wmt_app',
  MIGRATION_APP_DATABASE_PASSWORD: process.env.WMT_MIGRATION_APP_DATABASE_PASSWORD || 'wmt_app',
  MIGRATION_STG_DATABASE_USERNAME: process.env.WMT_MIGRATION_STG_DATABASE_USERNAME || 'wmt_stg',
  MIGRATION_STG_DATABASE_PASSWORD: process.env.WMT_MIGRATION_STG_DATABASE_PASSWORD || 'wmt_stg',

  // WMT Worker
  WORKER_DATABASE_USERNAME: process.env.WMT_WORKER_DATABASE_USERNAME || 'wmt_wrk',
  WORKER_DATABASE_PASSWORD: process.env.WMT_WORKER_DATABASE_PASSWORD || 'wmt_wrk',

  // App
  // WMT Web
  WEB_APP_DATABASE_USERNAME: process.env.WMT_WEB_APP_DATABASE_USERNAME || 'wmt_web',
  WEB_APP_DATABASE_PASSWORD: process.env.WMT_WEB_APP_DATABASE_PASSWORD || 'wmt_web',

  // Staging
  // WMT ETL
  ETL_STAGING_DATABASE_USERNAME: process.env.WMT_ETL_STAGING_DATABASE_USERNAME || 'wmt_etl',
  ETL_STAGING_DATABASE_PASSWORD: process.env.WMT_ETL_STAGING_DATABASE_PASSWORD || 'wmt_etl',

  // WMT Worker
  IP_ADDRESSES: process.env.WMT_WORKER_APP_IP_ADDRESSES || 'http://localhost:3000',

  // Dashboard
  WMT_DASHBOARD_TEMPLATE_FILE_PATH: process.env.WMT_DASHBOARD_TEMPLATE_FILE_PATH || '/usr/src/app/wmt-worker/data/templates/dashboard_template.xlsx',
  WMT_DASHBOARD_OUTPUT_FILE_PATH: process.env.WMT_DASHBOARD_OUTPUT_FILE_PATH || '/usr/src/app/wmt-worker/data/dashboard/',
  WMT_WEB_DASHBOARD_OUTPUT_FILE_PATH: process.env.WMT_WEB_DASHBOARD_OUTPUT_FILE_PATH || '/data/dashboard/',
  WMT_DASHBOARD_PASSWORD: process.env.WMT_DASHBOARD_PASSWORD,

  // Reductions and Contracted Hours
  WMT_REDUCTIONS_AND_CONTRACTED_HOURS_PATH: process.env.WMT_REDUCTIONS_AND_CONTRACTED_HOURS_PATH || '/usr/src/app/wmt-worker/data/reductions_and_contracted_hours/',

  // Expected values
  EXPECTED_DIVISIONS_COUNT: process.env.WMT_EXPECTED_DIVISIONS_COUNT || '8',

  // Environment
  WMT_ENVIRONMENT: process.env.WMT_ENVIRONMENT
}
