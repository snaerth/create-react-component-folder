const path = require('path');
const fs = require('./fileHelpers');

/**
 * Removes none directorys from array
 *
 * @param {String} folderPath - Folder path string
 * @param {Array} folders - Array of folder names
 * @returns {Promise<Array>} folders -  Directory only filtered array
 */
function removeNoneDir(folderPath, folders) {
  return new Promise((resolve, reject) => {
    const promises = [];

    for (let i = 0; i < folders.length; i += 1) {
      const folder = folders[i];
      const tempPath = path.join(folderPath, folder);
      promises.push(fs.isDirectory(tempPath));
    }

    Promise.all(promises)
      .then((values) => resolve(folders.filter((folder, i) => values[i])))
      .catch((err) => reject(err));
  });
}

module.exports = removeNoneDir;
