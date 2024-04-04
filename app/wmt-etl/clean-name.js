module.exports = function (name) {
  // Rules for transforming an extract worksheet or column name to staging table format'''
  const illegalChars = '-'
  const suspendedColumnEnds = ['a0s', 'a1s', 'a2s', 'a3s', 'b0s', 'b1s', 'b2s', 'b3s', 'c0s', 'c1s', 'c2s', 'c3s', 'd0s', 'd1s', 'd2s', '3ds']
  const newColumnEnds = ['a0_s', 'a1_s', 'a2_s', 'a3_s', 'b0_s', 'b1_s', 'b2_s', 'b3_s', 'c0_s', 'c1_s', 'c2_s', 'c3_s', 'd0_s', 'd1_s', 'd2_s', '3ds']

  for (let i = 0; i < 16; i++) {
    name = name.toLowerCase().replace(suspendedColumnEnds[i], newColumnEnds[i])
  }
  return name.replace(illegalChars, '').toLowerCase().trim()
}
