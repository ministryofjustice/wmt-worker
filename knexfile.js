const config = require('./config')

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: config.DATABASE_SERVER,
      user: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE
    },
    debug: true
  },
  staging: {
    client: 'pg',
    connection: {
      host: config.DATABASE_SERVER,
      user: config.MIGRATION_STG_DATABASE_USERNAME,
      password: config.MIGRATION_STG_DATABASE_PASSWORD,
      database: config.DATABASE
    },
    migrations: {
      directory: 'migrations/staging'
    },
    debug: true
  },
  app: {
    client: 'pg',
    connection: {
      host: config.DATABASE_SERVER,
      user: config.MIGRATION_APP_DATABASE_USERNAME,
      password: config.MIGRATION_APP_DATABASE_PASSWORD,
      database: config.DATABASE
    },
    migrations: {
      directory: 'migrations/app'
    },
    debug: true
  }
}
