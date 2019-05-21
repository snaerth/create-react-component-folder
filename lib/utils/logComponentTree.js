const logger = require('../logger');

/**
 * Creates and logs component file tree
 *
 * @param {Array} filesArrData - Array of file names
 * @param {String} folderPath - Folder path of files
 * @param {Boolean} appendName - Append component name to folderPath
 */
function logComponentTree(filesArrData, folderPath, appendName = true) {
  for (let i = 0; i < filesArrData.length; i += 1) {
    const name = filesArrData[i][1];
    const filesArr = filesArrData[i];

    logger.log(folderPath + (appendName ? name.substring(0, name.lastIndexOf('.')) : ''));

    // Log files
    for (let j = 0; j < filesArr.length; j += 1) {
      logger.log(`  └─ ${filesArr[j]}`);
    }
  }
}

module.exports = logComponentTree;
