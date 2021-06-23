module.exports = {
  LOGGING_PATH: process.env.LOGGING_PATH,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'DEBUG',

  // Worker
  ASYNC_WORKER_CRON: process.env.WMT_ASYNC_WORKER_CRON || '0 * * * * *', // default every minute
  ASYNC_WORKER_BATCH_SIZE: process.env.WMT_ASYNC_WORKER_BATCH_SIZE || '25',

  // DB
  DATABASE_SERVER: process.env.WMT_DB_SERVER || 'localhost',
  DATABASE: process.env.WMT_DB_NAME || 'master',
  DATABASE_USERNAME: process.env.WMT_DB_USERNAME || 'sa',
  DATABASE_PASSWORD: process.env.WMT_DB_PASSWORD || 'yourStrong(!)Password',
  DB_APP_SCHEMA: 'app',
  DB_STG_SCHEMA: 'staging',

  // Migration
  MIGRATION_APP_DATABASE_USERNAME: process.env.WMT_MIGRATION_APP_DATABASE_USERNAME || 'sa',
  MIGRATION_APP_DATABASE_PASSWORD: process.env.WMT_MIGRATION_APP_DATABASE_PASSWORD || 'yourStrong(!)Password',
  MIGRATION_STG_DATABASE_USERNAME: process.env.WMT_MIGRATION_STG_DATABASE_USERNAME || 'sa',
  MIGRATION_STG_DATABASE_PASSWORD: process.env.WMT_MIGRATION_STG_DATABASE_PASSWORD || 'yourStrong(!)Password',

  // WMT Worker
  WORKER_DATABASE_USERNAME: process.env.WMT_WORKER_DATABASE_USERNAME || 'sa',
  WORKER_DATABASE_PASSWORD: process.env.WMT_WORKER_DATABASE_PASSWORD || 'yourStrong(!)Password',

  // App
  // WMT Web
  WEB_APP_DATABASE_USERNAME: process.env.WMT_WEB_APP_DATABASE_USERNAME || 'sa',
  WEB_APP_DATABASE_PASSWORD: process.env.WMT_WEB_APP_DATABASE_PASSWORD || 'yourStrong(!)Password',

  // Staging
  // WMT ETL
  ETL_STAGING_DATABASE_USERNAME: process.env.WMT_ETL_STAGING_DATABASE_USERNAME || 'sa',
  ETL_STAGING_DATABASE_PASSWORD: process.env.WMT_ETL_STAGING_DATABASE_PASSWORD || 'yourStrong(!)Password',

  // ARCHIVE DB
  LEGACY_DATABASE_USERNAME: process.env.WMT_LEGACY_DATABASE_USERNAME || 'sa',
  LEGACY_DATABASE_PASSWORD: process.env.WMT_LEGACY_DATABASE_PASSWORD || 'yourStrong(!)Password',

  // WMT Worker
  IP_ADDRESSES: process.env.WMT_WORKER_APP_IP_ADDRESSES || 'http://localhost:3000',

  // Dashboard
  WMT_DASHBOARD_TEMPLATE_FILE_PATH: process.env.WMT_DASHBOARD_TEMPLATE_FILE_PATH || '/usr/src/app/wmt-etl/data/templates/dashboard_template.xlsx',
  WMT_DASHBOARD_OUTPUT_FILE_PATH: process.env.WMT_DASHBOARD_OUTPUT_FILE_PATH || '/usr/src/app/wmt-etl/data/dashboard/',
  WMT_WEB_DASHBOARD_OUTPUT_FILE_PATH: process.env.WMT_WEB_DASHBOARD_OUTPUT_FILE_PATH || '/data/dashboard/',
  WMT_DASHBOARD_PASSWORD: process.env.WMT_DASHBOARD_PASSWORD,

  // Expected values
  EXPECTED_DIVISIONS_COUNT: process.env.WMT_EXPECTED_DIVISIONS_COUNT || '8'
}
