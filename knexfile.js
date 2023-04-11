const config = require('./config')
const defaultConnection = {
  host: config.DATABASE_SERVER,
  user: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE
}

module.exports = {
  staging: {
    client: 'pg',
    connection: defaultConnection,
    debug: false,
    pool: {
      min: 0,
      max: 25,
      idleTimeoutMillis: 5000,
      propagateCreateError: false
    },
    acquireConnectionTimeout: 1200000
  },
  app: {
    client: 'pg',
    connection: defaultConnection,
    debug: false,
    pool: {
      min: 0,
      max: 25,
      idleTimeoutMillis: 5000,
      propagateCreateError: false
    },
    acquireConnectionTimeout: 150000
  }
}
