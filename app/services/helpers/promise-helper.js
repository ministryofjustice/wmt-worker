
module.exports.arrayToPromise = function (array, funct) {
  if (!array || !array.length) {
    return Promise.resolve([])
  }
  return array.reduce(function (prev, current) {
    return prev.then((resultArray) => funct(current)
      .then(result => [...resultArray, result])
    )
  }, Promise.resolve([]))
}

module.exports.parallelArrayToPromise = function (array, funct) {
  if (!array || !array.length) {
    return Promise.resolve([])
  }

  const promises = []

  for (let i = 0; i < array.length; i = i + 10) {
    let end = i + 10
    if (end > array.length) {
      end = array.length
    }
    promises.push(module.exports.arrayToPromise(array.slice(i, end), funct))
  }

  return Promise.all(promises).then(function (values) {
    return values.flat()
  })
}
