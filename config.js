const production = process.env.NODE_ENV === 'production'

module.exports = {
  LOGGING_PATH: process.env.LOGGING_PATH,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'DEBUG',

  // Worker
  ASYNC_WORKER_CRON: process.env.WMT_ASYNC_WORKER_CRON || '0/10 * * * * *', //  every 10 seconds
  ASYNC_WORKER_BATCH_SIZE: process.env.WMT_ASYNC_WORKER_BATCH_SIZE || '25',
  EXTRACT_LISTENER_CRON: process.env.EXTRACT_LISTENER_CRON || '0/10 * * * * *', //  every 10 seconds

  // DB
  DATABASE_SERVER: process.env.WMT_DB_SERVER || 'localhost',
  DATABASE: process.env.WMT_DB_NAME || 'postgres',
  DATABASE_USERNAME: process.env.WMT_DB_USERNAME || 'root',
  DATABASE_PASSWORD: process.env.WMT_DB_PASSWORD || 'dev',
  DB_APP_SCHEMA: 'app',
  DB_STG_SCHEMA: 'staging',

  // WMT Worker
  IP_ADDRESSES: process.env.WMT_WORKER_APP_IP_ADDRESSES || 'http://localhost:3000',
  PORT: process.env.PORT || 3000,
  // Dashboard
  WMT_DASHBOARD_TEMPLATE_FILE_PATH: process.env.WMT_DASHBOARD_TEMPLATE_FILE_PATH || './app/templates/dashboard_template.xlsx',
  WMT_DASHBOARD_OUTPUT_FILE_PATH: process.env.WMT_DASHBOARD_OUTPUT_FILE_PATH || 'generated-dashboards/',
  WMT_DASHBOARD_PASSWORD: process.env.WMT_DASHBOARD_PASSWORD,

  // Expected values
  EXPECTED_DIVISIONS_COUNT: process.env.WMT_EXPECTED_DIVISIONS_COUNT || '32',

  DASHBOARD_BUCKET: process.env.WMT_DASHBOARD_BUCKET || 'wmt-worker-dashboard',
  DASHBOARD_REGION: process.env.S3_REGION || 'eu-west-2',
  S3_ENDPOINT: production ? null : 'http://localhost:4566',
  DASHBOARD_S3_ACCESS_KEY_ID: process.env.DASHBOARD_S3_ACCESS_KEY_ID || 'foobar',
  DASHBOARD_S3_SECRET_ACCESS_KEY: process.env.DASHBOARD_S3_SECRET_ACCESS_KEY || 'foobar'
}
