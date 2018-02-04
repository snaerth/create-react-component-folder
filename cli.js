#!/usr/bin/env node
const path = require('path');
const logger = require('./lib/logger');
const program = require('commander');
const appRootDir = require('app-root-dir');
const fs = require('./lib/utils/fileHelpers');
const componentData = require('./lib/data/componentData');
const format = require('./lib/utils/format');

// Root directorys
const ROOT_DIR = appRootDir.get();
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
const COMPONENT_NAME = args[args.length - 1];
const componentName = getComponentName(COMPONENT_NAME);
const componentPath = path.join(ROOT_DIR, COMPONENT_NAME);
const componentFullPath = path.join(PROJECT_ROOT_DIR, componentPath);

// Set command line interface options for cli
program
  .version('0.1.0')
  .option('-l, --less', 'Adds .less file to component')
  .option('-s, --sass', 'Adds .sass file to component')
  .option('-n, --nocss', 'No css file')
  .option('-p, --proptypes', 'Adds prop-types to component')
  .parse(process.argv);

/**
 * Creates files for component
 *
 * @param {String|null} cssFileExt - css file extension (css, less, sass or null)
 */
async function createFiles(cssFileExt) {
  // file names to create
  const files = ['index.js', `${componentName}.js`, `${componentName}.test.js`];

  // Add css | less | sass file if desired
  if (cssFileExt) {
    files.push(`${componentName}.${cssFileExt}`);
  }

  try {
    // Create component folder
    await fs.createDirectorys(componentPath);

    // Create index.js
    const promises = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const filePath = path.join(componentPath, file);
      let data = '';

      if (i === 0) {
        data = componentData.createIndex(componentName);
      } else if (i === 1) {
        if (program.proptypes) {
          data = componentData.createReactComponentWithProps(componentName);
        } else {
          data = componentData.createReactComponent(componentName);
        }
      } else if (i === 2) {
        data = componentData.createTest(componentName);
      } else if (i === 3) {
        data = '';
      }

      promises.push(fs.writeFileAsync(filePath, format.formatPrettier(data)));
    }

    return await Promise.all(promises);
  } catch (error) {
    console.log(error);
    throw new Error('Error creating files');
  }
}

/**
 * Initializes create react component
 */
async function initialize() {
  if (args.length === 0) {
    logger.warn("You didn't supply component name as an argument.");
    logger.log('Please try "crc componentName" or "create-react-component componentName"');
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

  logger.start(`Creating component "${COMPONENT_NAME}"`);

  try {
    // Check if folder exists
    await fs.existsSyncAsync(componentPath);
  } catch (error) {
    logger.error(`Folder "${componentName}" already exists at ..${componentFullPath}`);
    return;
  }

  try {
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
    await createFiles(cssFileExt);

    // Log output to console
    logger.done(`Created component "${COMPONENT_NAME}" at ${componentFullPath}`);
  } catch (error) {
    logger.error(error);
  }
}

initialize();
