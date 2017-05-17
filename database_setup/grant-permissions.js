// Create app and staging schemas/users
// - ONLY NEEDS TO BE DONE ONCE PER DATABASE
const config = require('../config')
const knexConfig = require('../knexfile').development
const knex = require('knex')(knexConfig)

knex.schema
  // Set User Permissions:
    // app
    .raw('GRANT ALL ON SCHEMA app TO ??;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT INSERT, DELETE ON TABLE app.tasks TO ??', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA app TO ??', [config.ETL_STAGING_DATABASE_USERNAME])

    // staging
    .raw('ALTER USER ?? SET search_path TO staging;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT ALL ON SCHEMA staging TO ??;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT ALL PRIVILEGES ON SCHEMA staging TO ??;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA staging TO ??;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA staging TO ??', [config.ETL_STAGING_DATABASE_USERNAME])

  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
