
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

async function doWork (iterator, funct) {
  const results = []
  for (const item of iterator) {
    const result = await funct(item[1])
    results.push(result)
  }
  return results
}

module.exports.parallelArrayToPromise = function (array, funct) {
  if (!array || !array.length) {
    return Promise.resolve([])
  }

  const iterator = array.entries()
  const workers = new Array(5).fill(iterator).map(function (iterator) {
    return doWork(iterator, funct)
  })
  return Promise.all(workers).then(function (results) {
    return results.flat()
  })
}
