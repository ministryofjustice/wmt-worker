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

  // WMT Worker
  IP_ADDRESSES: process.env.WMT_WORKER_APP_IP_ADDRESSES || 'http://localhost:3000',

  // Dashboard
  WMT_DASHBOARD_TEMPLATE_FILE_PATH: process.env.WMT_DASHBOARD_TEMPLATE_FILE_PATH || './app/templates/dashboard_template.xlsx',
  WMT_DASHBOARD_OUTPUT_FILE_PATH: process.env.WMT_DASHBOARD_OUTPUT_FILE_PATH || '/templates',
  WMT_WEB_DASHBOARD_OUTPUT_FILE_PATH: process.env.WMT_WEB_DASHBOARD_OUTPUT_FILE_PATH || '/data/dashboard/',
  WMT_DASHBOARD_PASSWORD: process.env.WMT_DASHBOARD_PASSWORD,

  // Expected values
  EXPECTED_DIVISIONS_COUNT: process.env.WMT_EXPECTED_DIVISIONS_COUNT || '32'
}
