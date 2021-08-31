const assertExists = require('./validation/assert-exists')

class Region {
  constructor (id, code, description) {
    this.id = id
    this.code = code
    this.description = description
    this.isValid()
  }

  isValid () {
    assertExists(this.code, 'code')
  }
}

module.exports = Region
