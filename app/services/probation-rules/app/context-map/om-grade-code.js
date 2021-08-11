module.exports = function (omGradeCode) {
  let newGradeCode = 'DMY'
  const poList = [
    'M', 'E', 'D', 'O', 'J', 'H', 'N', 'G', 'F', 'CRCM',
    'CRCO', 'CRCN', 'NPSM', 'NPSO', 'NPSN', 'PSM', 'PSO',
    'PSN'
  ]
  const spoList = [
    'C', 'NPSC', 'PSC', 'CRCB', 'CRCA', 'NPSB',
    'PSB', 'PSA', 'B', 'A'
  ]
  const tpoList = [
    'P', 'L', 'K', 'CRCP', 'NPSP', 'PSP', 'CPQF',
    'CRC - PQF', 'NPS - PQF', 'CRC-PQF', 'NPS-PQF',
    'CRC — PQF', 'NPS — PQF', 'CRC—PQF', 'NPS—PQF',
    'CRC – PQF', 'NPS – PQF', 'CRC–PQF', 'NPS–PQF'
  ]
  const psoList = ['Q', 'Z', 'Y', 'CRCQ', 'NPSQ', 'PSQ', 'CRC1', 'CRC2', 'CRCC', 'PS4']

  const dmyList = [
    'OG06', 'R', 'OG08', 'OG07', 'OG02',
    'OG05', 'NPQF', 'OG01', 'S', 'T', 'OG04', 'OG03',
    'CRC6', 'CRCR', 'CRC01', 'CRCS',
    'CRCT', 'CRC4', 'CRC3', 'NPS6', 'NPSR', 'NPSA',
    'NPS2', 'NPS1', 'NPS01', 'NPSS', 'NPST', 'NPS4', 'NPS3',
    'PS6', 'PSR', 'PS2', 'PS1', 'PS01', 'PS3',
    'OGO1', 'OGO2', 'OGO3', 'OGO4', 'OGO5', 'OGO6', 'OGO7', 'OGO8',
    'R', 'S', 'T', 'CRCT', 'CRC4', 'CRC3', 'NPS6', 'NPSR',
    '', null, undefined, ' '
  ]

  if (poList.includes(omGradeCode)) {
    newGradeCode = 'PO'
  } else if (spoList.includes(omGradeCode)) {
    newGradeCode = 'SPO'
  } else if (tpoList.includes(omGradeCode)) {
    newGradeCode = 'TPO'
  } else if (psoList.includes(omGradeCode)) {
    newGradeCode = 'PSO'
  } else if (dmyList.includes(omGradeCode)) {
    newGradeCode = 'DMY'
  }
  return newGradeCode
}
