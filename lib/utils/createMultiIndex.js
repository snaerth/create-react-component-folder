const path = require('path');
const chalk = require('chalk');
const logger = require('../logger');
const fs = require('./fileHelpers');
const { createIndexForFolders } = require('../data/componentData');
const formatPrettier = require('./format');
const removeNoneDir = require('./removeNoneDir');
const isLetter = require('./isLetter');

/**
 * Creates index.js for multiple components imports.
 * import example when index.js has been created in root of
 * /components folder
 * - import { Component1, Component2 } from './components'
 *
 * @param {String} folderPath  - Path to folder path
 */
function createMultiIndex(folderPath) {
  fs.readDirAsync(folderPath)
    .then((folders) => removeNoneDir(folderPath, folders)) // Filter out none folders
    .then((folders) => {
      // Filter out items with none alphabetical first character
      const filteredFolders = folders.filter((folder) => isLetter(folder.charAt(0)));
      // Create data for index file
      const data = createIndexForFolders(filteredFolders);
      const indexFilePath = path.join(folderPath, 'index.js');

      fs.writeFileAsync(indexFilePath, formatPrettier(data, null))
        .then(() => {
          logger.log();
          logger.animateStop();
          logger.log(`${chalk.cyan('Created index.js file at:')}`);
          logger.log(indexFilePath);
          logger.log();
          console.timeEnd('✨  Finished in'); /* eslint-disable-line no-console */
          logger.done('Success!');
        })
        .catch((e) => logger.error(e));
    })
    .catch((e) => {
      if (e.code === 'ENOENT') {
        logger.error(`No such file or directory ${e.path}`);
        return;
      }

      if (e instanceof TypeError) {
        logger.error('You must provide a components folder string');
        return;
      }

      logger.error(e);
    });
}

module.exports = createMultiIndex;
