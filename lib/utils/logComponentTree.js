const logger = require('../logger');

/**
 * Creates and logs component file tree
 *
 * @param {Array} filesArrData - Array of file names
 * @param {String} folderPath - Folder path of files
 */
function logComponentTree(filesArrData, folderPath) {
  logger.log(folderPath);
  filesArrData.forEach(file => {
    // Log file
    logger.log(`  └─ ${file}`);
  });
}

module.exports = logComponentTree;
