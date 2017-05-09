module.exports = {
  LOGGING_PATH: process.env.LOGGING_PATH,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'DEBUG',

  // Worker
  ASYNC_WORKER_CRON: process.env.WMT_ASYNC_WORKER_CRON || '*/5 * * * * *', // default every 5 seconds
  ASYNC_WORKER_BATCH_SIZE: process.env.WMT_ASYNC_WORKER_BATCH_SIZE || '5',

  // DB
  DATABASE_SERVER: process.env.WMT_DB_SERVER || 'localhost',
  DATABASE: process.env.WMT_DB_NAME || 'wmt_db',
  DATABASE_USERNAME: process.env.WMT_DB_USERNAME || 'wmt',
  DATABASE_PASSWORD: process.env.WMT_DB_PASSWORD || 'wmt',

      // WMT Migration
      WMT_MIGRATION_DATABASE_USERNAME: process.env.WMT_MIGRATION_DATABASE_USERNAME || 'wmt_mig',
      WMT_MIGRATION_DATABASE_PASSWORD: process.env.WMT_MIGRATION_DATABASE_PASSWORD || 'wmt_mig',

      // WMT Worker
      WMT_WORKER_DATABASE_USERNAME: process.env.WMT_WORKER_DATABASE_USERNAME || 'wmt_worker',
      WMT_WORKER_DATABASE_PASSWORD: process.env.WMT_WORKER_DATABASE_PASSWORD || 'wmt_worker',

    // App
      // WMT Web
      WMT_WEB_APP_DATABASE_USERNAME: process.env.WMT_WEB_APP_DATABASE_USERNAME || 'wmt_web',
      WMT_WEB_APP_DATABASE_PASSWORD: process.env.WMT_WEB_APP_DATABASE_PASSWORD || 'wmt_web',

    // Staging
      // WMT ETL
      WMT_ETL_STAGING_DATABASE_USERNAME: process.env.WMT_ETL_STAGING_DATABASE_USERNAME || 'wmt_etl',
      WMT_ETL_STAGING_DATABASE_PASSWORD: process.env.WMT_ETL_STAGING_DATABASE_PASSWORD || 'wmt_etl'
}
