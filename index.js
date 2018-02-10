#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const logger = require('./lib/logger');
const fs = require('./lib/utils/fileHelpers');
const componentData = require('./lib/data/componentData');
const format = require('./lib/utils/format');
const clearConsole = require('./lib/utils/clearConsole');
const stringHelper = require('./lib/utils/stringHelper');

// Root directorys
const ROOT_DIR = process.cwd();
const PROJECT_ROOT_DIR = ROOT_DIR.substring(ROOT_DIR.lastIndexOf('/'), ROOT_DIR.length);

// Grab provided args
const [, , ...args] = process.argv;

/**
 * Gets component name from string
 *
 * @param {String} name - Component name or path
 * @returns {String}
 */
function getComponentName(name) {
  const start = name.lastIndexOf('/');

  if (start !== -1) {
    return name.substring(start + 1, name.length);
  }

  return name;
}

// Set component name, path and full path
const COMPONENT_NAME = args[args.length - 1] || '';
const componentName = getComponentName(COMPONENT_NAME);
const componentPath = path.join(ROOT_DIR, COMPONENT_NAME);
const componentFullPath = path.join(PROJECT_ROOT_DIR, componentPath);

// Set command line interface options for cli
program
  .version('0.1.0')
  .option('-l, --less', 'Adds .less file to component')
  .option('-s, --sass', 'Adds .sass file to component')
  .option('-n, --nocss', 'No css file')
  .option('-t, --notest', 'No test file')
  .option('-p, --proptypes', 'Adds prop-types to component')
  .option('-u, --uppercase', 'Component files start on uppercase letter')
  .parse(process.argv);

/**
 * Creates files for component
 *
 * @param {String|null} cssFileExt - css file extension (css, less, sass or null)
 */
function createFiles(cssFileExt) {
  return new Promise((resolve) => {
    let name = componentName;
    // file names to create
    let files = ['index.js', `${name}.js`];

    if (!program.notest) {
      files.push(`${name}.test.js`);
    }

    // Add css | less | sass file if desired
    if (cssFileExt) {
      files.push(`${name}.${cssFileExt}`);
    }

    if (program.uppercase) {
      name = stringHelper.capitalizeFirstLetter(name);

      files = files.map((file, i) => {
        if (i !== 0) {
          return stringHelper.capitalizeFirstLetter(file);
        }

        return file;
      });
    }


    // Create component folder
    fs.createDirectorys(componentPath).then(() => {
      // Create index.js
      const promises = [];

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const filePath = path.join(componentPath, file);
        let data = '';

        if (file === 'index.js') {
          data = componentData.createIndex(name, program.uppercase);
          promises.push(fs.writeFileAsync(filePath, format.formatPrettier(data)));
        } else if (file === `${name}.js`) {
          if (program.proptypes) {
            data = componentData.createReactComponentWithProps(name);
          } else {
            data = componentData.createReactComponent(name);
          }

          promises.push(fs.writeFileAsync(filePath, format.formatPrettier(data)));
        } else if (file.indexOf('.test.js') > -1) {
          data = componentData.createTest(name, program.uppercase);

          if (!program.notest) {
            promises.push(fs.writeFileAsync(filePath, format.formatPrettier(data)));
          }
        } else if (
          file.indexOf('.css') > -1 ||
          file.indexOf('.less') > -1 ||
          file.indexOf('.scss') > -1
        ) {
          data = '';
          promises.push(fs.writeFileAsync(filePath, format.formatPrettier(data)));
        }
      }

      Promise.all(promises).then(() => resolve(files));
    }).catch(() => {
      throw new Error('Error creating files');
    });
  });
}

/**
 * Initializes create react component
 */
function initialize() {
  clearConsole();
  // Start timer
  /* eslint-disable no-console */
  console.time('✨  Finished in');

  if (args.length === 0) {
    logger.warn("You didn't supply component name as an argument.");
    logger.log('Please try "crc componentName" or "create-react-component-folder componentName"');
    return;
  }

  if (args[0] === 'index') {
    logger.log();
    logger.warn('You cannot name your component index');
    logger.log();
    logger.log('Please choose a more descriptive name');
    logger.log();
    return;
  }
  // Check if folder exists
  fs
    .existsSyncAsync(componentPath)
    .then(() => {
      logger.log();
      logger.animateStart('Creating components files...');

      let cssFileExt = 'css';

      if (program.less) {
        cssFileExt = 'less';
      }

      if (program.sass) {
        cssFileExt = 'sass';
      }

      if (program.nocss) {
        cssFileExt = null;
      }

      // Create files for component
      return createFiles(cssFileExt);
    })
    .then((filesArr) => {
      setTimeout(() => {
        logger.log();
        // Stop animating in console
        logger.animateStop();
        // Stop timer
        console.timeEnd('✨  Finished in');
        // Log output to console
        logger.done('Success!');
        const outputPath = `${ROOT_DIR}/${COMPONENT_NAME}`;
        logger.log(`Created a new React component at ${chalk.cyan(outputPath)}`);
        logger.log();
        // Log component
        logger.log(`${componentName}/`);

        // Log files
        for (let i = 0; i < filesArr.length; i += 1) {
          logger.log(`  └─ ${filesArr[i]}`);
        }
        logger.log();
        logger.log();
      }, 500);
    })
    .catch((error) => {
      if (error.message === 'false') {
        logger.error(`Folder "${componentName}" already exists at ..${componentFullPath}`);
        return;
      }

      logger.error(error);
    });
}

initialize();
