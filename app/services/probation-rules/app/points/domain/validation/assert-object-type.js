module.exports = function (object, type, objectName) {
  if (!(object instanceof type)) {
    throw new Error('Expected object type to be ' + objectName)
  }
}
