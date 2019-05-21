#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const logger = require('./logger');
const fs = require('./utils/fileHelpers');
const {
  createReactComponent,
  createIndex,
  createTest,
  createReactComponentStories,
} = require('./data/componentData');
const formatPrettier = require('./utils/format');
const stringHelper = require('./utils/stringHelper');
const { getComponentName, getComponentParentFolder } = require('./utils/componentsHelpers.js');
const removeOptionsFromArgs = require('./utils/removeOptionsFromArgs');
const createMultiIndex = require('./utils/createMultiIndex');
const logComponentTree = require('./utils/logComponentTree');
const validateArguments = require('./utils/validateArguments');
const getDefaultConfig = require('./utils/getDefaultConfig');
const configFromStore = require('./utils/configFromStore');
const getOptions = require('./options');

// Root directory
const ROOT_DIR = process.cwd();

// Grab provided args
let [, , ...args] = process.argv;

// Get the default config
const staticConfig = getDefaultConfig();
const defaultConfig = staticConfig && staticConfig.config ? staticConfig.config : [];
const getDefConfig = configFromStore(defaultConfig);
const options = getOptions(getDefConfig);

// Set command line interface options for cli
const cli = program.version('0.1.0');
options.forEach(opt => cli.option(opt.flags, opt.description, opt.defaultValue));
cli.parse(process.argv);

// Remove Node process args options
args = removeOptionsFromArgs(args);

const runtimeConfig = [
  ...defaultConfig,
  ...options.map(value => (cli[value.name] ? value.name : undefined)),
].filter(value => value);

const getConfig = configFromStore(runtimeConfig);

/**
 * Creates files for component
 *
 * @param {String} componentName - Component name
 * @param {String} componentPath - File system path to component
 * @param {String|null} cssFileExt - css file extension (css, less, sass or null)
 */
function createFiles(componentName, componentPath, cssFileExt) {
  return new Promise((resolve) => {
    const isNative = getConfig('reactnative');
    // File extension
    const ext = getConfig('typescript') ? 'tsx' : 'js';
    const jsxExt = 'jsx';
    const indexFile = `index.${ext}`;
    let name = componentName;
    const isJsxFile = getConfig('jsx') || false;
    const componentFileName = `${name}.${isJsxFile ? jsxExt : ext}`;
    // file names to create
    const files = [indexFile, componentFileName];
    // Prettier options property
    const prettierParser = getConfig('typescript') ? 'typescript' : 'babel';
    // Prettier parser options
    let prettierOptions = null;

    // Set no semicolon options
    if (getConfig('nosemi')) {
      prettierOptions = { semi: false };
    }

    // Add test
    if (!getConfig('notest')) {
      if (getConfig('spec')) {
        files.push(`${name}.spec.${ext}`);
      } else {
        files.push(`${name}.test.${ext}`);
      }
    }

    // Add Stories for storybook
    if (getConfig('stories')) {
      files.push(`${name}.stories.${ext}`);
    }

    // Add css | less | sass file if desired
    if (cssFileExt && !isNative) {
      files.push(`${name}.${getConfig('cssmodules') ? 'module.' : ''}${cssFileExt}`);
    }

    if (getConfig('uppercase')) {
      name = stringHelper.capitalizeFirstLetter(name);

      for (let i = 0; i < files.length; i += 1) {
        if (i !== 0) {
          files.splice(i, 1, stringHelper.capitalizeFirstLetter(files[i]));
        }
      }
    }

    // Create component folder
    fs.createDirectorys(componentPath)
      .then(() => {
        // Create index.js
        const promises = [];

        for (let i = 0; i < files.length; i += 1) {
          const file = files[i];
          const filePath = path.join(componentPath, file);
          let data = '';

          if (file === indexFile) {
            data = createIndex(name, getConfig('uppercase'));
            promises.push(
              fs.writeFileAsync(
                filePath,
                getConfig('typescript') ? data : formatPrettier(data, prettierParser, prettierOptions),
              ),
            );
          } else if (file === `${name}.${ext}` || file === `${name}.${jsxExt}`) {
            data = createReactComponent(componentName, runtimeConfig);

            promises.push(
              fs.writeFileAsync(
                filePath,
                getConfig('typescript') ? data : formatPrettier(data, prettierParser, prettierOptions),
              ),
            );
          } else if (file.indexOf(`.spec.${ext}`) > -1 || file.indexOf(`.test.${ext}`) > -1) {
            data = createTest(
              name,
              getConfig('uppercase'),
              getConfig('typescript'),
            );

            if (!getConfig('notest')) {
              promises.push(
                fs.writeFileAsync(
                  filePath,
                  getConfig('typescript') ? data : formatPrettier(data, prettierParser, prettierOptions),
                ),
              );
            }
          }

          if ((file.indexOf(`.stories.${ext}`) || file.indexOf(`.stories.${ext}`)) > -1) {
            data = createReactComponentStories(
              name,
              getConfig('uppercase'),
              getConfig('typescript'),
            );
            promises.push(
              fs.writeFileAsync(
                filePath,
                getConfig('typescript') ? data : formatPrettier(data, prettierParser, prettierOptions),
              ),
            );
          } else if (
            file.indexOf('.css') > -1
            || file.indexOf('.less') > -1
            || file.indexOf('.scss') > -1
          ) {
            promises.push(fs.writeFileAsync(filePath, ''));
          }
        }
        Promise.all(promises).then(() => resolve(files));
      })
      .catch((e) => {
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
  /* eslint-disable no-console */
  console.time('✨  Finished in');
  const promises = [];
  // Set component name, path and full path
  const componentPath = path.join(ROOT_DIR, args[0]);
  const folderPath = getComponentParentFolder(componentPath);

  if (program.createindex === true) {
    createMultiIndex(componentPath);
    return;
  }

  const isValidArgs = validateArguments(args, program);

  if (!isValidArgs) {
    return;
  }

  fs.existsSyncAsync(componentPath)
    .then(() => {
      logger.animateStart('Creating components files...');

      let cssFileExt = 'css';

      if (getConfig('less')) {
        cssFileExt = 'less';
      }

      if (getConfig('scss')) {
        cssFileExt = 'scss';
      }

      if (getConfig('nocss')) {
        cssFileExt = null;
      }

      for (let i = 0; i < args.length; i += 1) {
        const name = getComponentName(args[i]);
        promises.push(createFiles(name, folderPath + name, cssFileExt));
      }

      return Promise.all(promises);
    })
    .then((filesArrData) => {
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
    .catch((error) => {
      if (error.message === 'false') {
        logger.error(`Folder already exists at ..${componentPath}`);
        return;
      }

      logger.error(error);
    });
}

// Start script
initialize();
