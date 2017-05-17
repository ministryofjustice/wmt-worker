const config = require('./config')

module.exports = {
  development: {
    client: 'mssql',
    connection: {
      host: config.DATABASE_SERVER,
      user: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE,
      options: {
        encrypt: true
      }
    },
    debug: true
  },
  staging: {
    client: 'mssql',
    connection: {
      host: config.DATABASE_SERVER,
      user: config.MIGRATION_STG_DATABASE_USERNAME,
      password: config.MIGRATION_STG_DATABASE_PASSWORD,
      database: config.DATABASE,
      options: {
        encrypt: true
      }
    },
    migrations: {
      directory: 'migrations/staging'
    },
    debug: true
  },
  app: {
    client: 'mssql',
    connection: {
      host: config.DATABASE_SERVER,
      user: config.MIGRATION_APP_DATABASE_USERNAME,
      password: config.MIGRATION_APP_DATABASE_PASSWORD,
      database: config.DATABASE,
      options: {
        encrypt: true
      }
    },
    migrations: {
      directory: 'migrations/app'
    },
    debug: true
  }
}
