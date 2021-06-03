const expect = require('chai').expect
const getArchiveFileNames = require('../../../../app/wmt-etl/get-archive-filenames')

describe('wmt-etl/get-archive-filenames', function () {
  it('should remove the full file path from the extract files, leaving only the filename itself', function (done) {
    const extractFiles = [
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-1.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-2.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-3.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-4.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-5.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-6.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-7.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-8.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-9.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-10.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-11.xlsx',
      '/PATH/TO/THE/EXTRACT/FILE/extract_file-12.xlsx'
    ]

    const expectedArchiveFilenames = [
      'extract_file-1.xlsx',
      'extract_file-2.xlsx',
      'extract_file-3.xlsx',
      'extract_file-4.xlsx',
      'extract_file-5.xlsx',
      'extract_file-6.xlsx',
      'extract_file-7.xlsx',
      'extract_file-8.xlsx',
      'extract_file-9.xlsx',
      'extract_file-10.xlsx',
      'extract_file-11.xlsx',
      'extract_file-12.xlsx'
    ]

    const importFileDirectory = '/PATH/TO/THE/EXTRACT/FILE/'
    const archiveFilenames = getArchiveFileNames(extractFiles, importFileDirectory)

    expect(archiveFilenames).to.deep.equal(expectedArchiveFilenames)
    done()
  })
})
