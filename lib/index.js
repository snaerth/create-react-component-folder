#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const logger = require('./logger');
const fs = require('./utils/fileHelpers');
const createReactComponent = require('./data/createReactComponent');
const createSpecFile = require('./data/createSpecFile');
const createStories = require('./data/createStories');
const { getComponentName, getComponentParentFolder } = require('./utils/componentsHelpers.js');
const removeOptionsFromArgs = require('./utils/removeOptionsFromArgs');
const logComponentTree = require('./utils/logComponentTree');
const validateArguments = require('./utils/validateArguments');

// Root directory
const ROOT_DIR = process.cwd();

// Grab provided args
let [, , ...args] = process.argv;

// Remove Node process args options
args = removeOptionsFromArgs(args);

/**
 * Creates files for component
 *
 * @param {String} componentName - Component name
 * @param {String} componentPath - File system path to component
 */
function createFiles(componentName, componentPath) {
  return new Promise(resolve => {
    // Create component folder
    fs.createDirectorys(componentPath)
      .then(() => {
        Promise.all([
          // Create component
          fs.writeFileAsync(path.join(componentPath, `${componentName}.js`), createReactComponent(componentName)),
          // Add test
          fs.writeFileAsync(path.join(componentPath, `${componentName}.spec.js`), createSpecFile(componentName)),
          // Add Storie for storbook
          fs.writeFileAsync(path.join(componentPath, `${componentName}.stories.js`), createStories(componentName)),
        ]).then(() => resolve([`${componentName}.js`, `${componentName}.spec.js`, `${componentName}.stories.js`]));
      })
      .catch(e => {
        logger.error(e);
        process.exit();
      });
  });
}

/**
 * Initializes create react component
 */
function initialize() {
  // Start timer
  console.time('✨  Finished in');

  const isValidArgs = validateArguments(args);
  if (!isValidArgs) {
    return;
  }

  // Set component name, path and full path
  const componentPath = path.join(ROOT_DIR, args[0]);
  const folderPath = getComponentParentFolder(componentPath);

  fs.existsSyncAsync(componentPath)
    .then(() => {
      logger.animateStart('Creating components files...');
      const name = getComponentName(args[0]);
      return createFiles(name, folderPath + name);
    })
    .then(filesArrData => {
      logger.log(chalk.cyan('Created new React components at: '));
      // Logs component file tree
      logComponentTree(filesArrData, folderPath);
      logger.log();
      // Stop animating in console
      logger.animateStop();
      // Stop timer
      console.timeEnd('✨  Finished in');
      // Log output to console
      logger.done('Success!');
    })
    .catch(error => {
      if (error.message === 'false') {
        logger.error(`Folder already exists at ..${componentPath}`);
        return;
      }

      logger.error(error);
    });
}

// Start script
initialize();
