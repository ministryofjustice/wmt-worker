const config = require('./config')
const defaultConnection = {
  host: config.DATABASE_SERVER,
  user: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE
  // options: {

  // }
}

module.exports = {
  staging: {
    client: 'pg',
    connection: defaultConnection,
    migrations: {
      directory: 'migrations/staging'
    },
    debug: false,
    pool: {
      min: 0,
      max: 50,
      idleTimeoutMillis: 5000
    },
    acquireConnectionTimeout: 1200000
  },
  app: {
    client: 'pg',
    connection: defaultConnection,
    migrations: {
      directory: 'migrations/app'
    },
    seeds: {
      directory: 'seed/data/ref'
    },
    debug: false,
    pool: {
      min: 0,
      max: 50,
      idleTimeoutMillis: 5000
    },
    acquireConnectionTimeout: 150000
  },
  dev: {
    client: 'pg',
    connection: defaultConnection,
    seeds: {
      directory: 'seed/data/dev'
    },
    debug: false
  },
  views: {
    client: 'pg',
    connection: defaultConnection,
    seeds: {
      directory: 'seed/views'
    },
    debug: false
  }
}
