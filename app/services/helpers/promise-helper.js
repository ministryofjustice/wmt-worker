
module.exports.arrayToPromise = function (array, funct) {
  if (!array.length) {
    return Promise.resolve([])
  }
  return array.reduce(function (prev, current) {
    return prev.then((resultArray) => funct(current)
      .then(result => [...resultArray, result])
    )
  }, Promise.resolve([])).then(function (result) {
    console.log(result)
  })
}
