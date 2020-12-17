#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const logger = require('./logger');
const fs = require('./utils/fileHelpers');
const {
  createReactComponent,
  createIndex,
  createReactComponentTest,
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
const getOptions = require('./options');
const config = require('./config');
const packageJson = require('../package.json');
// Root directory
const ROOT_DIR = process.cwd();

// Grab provided args
let [, , ...args] = process.argv;

// Set the default config
config.mergeAll(getDefaultConfig());

const options = getOptions();

// Set command line interface options for cli
const cli = program.version(packageJson.version);
options.forEach((opt) => cli.option(opt.flags, opt.description, opt.defaultValue));
cli.parse(process.argv);

// Remove Node process args options
args = removeOptionsFromArgs(args, ['-o', '--output']);

// Create the run-time configuration from options passed in and default options
config.mergeAll({
  flags: options
    .map((value) => (cli[value.name] ? value.name : undefined))
    .filter((value) => value),
  root: ROOT_DIR,
  templates: `${ROOT_DIR}/.crcf/templates`,
  crcf: `${__dirname}/..`,
});

// Override the default config with CLI option if it is passed
if (cli.output) {
  config.setValue('output', cli.output);
}

/**
 * Creates files for component
 *
 * @param {String} componentName - Component name
 * @param {String} componentPath - File system path to component
 * @param {String|null} cssFileExt - css file extension (css, less, sass or null)
 */
function createFiles(componentName, componentPath, cssFileExt) {
  return new Promise((resolve) => {
    // File extension
    const ext = config.hasFlag('typescript') ? 'tsx' : 'js';
    const jsxExt = 'jsx';
    const indexFile = `index.${config.hasFlag('typescript') ? 'ts' : 'js'}`;
    let name = componentName;
    const isJsxFile = config.hasFlag('jsx');
    const componentFileName = `${name}.${isJsxFile ? jsxExt : ext}`;
    // file names to create
    const files = [indexFile, componentFileName];
    // Prettier options property
    const prettierParser = config.hasFlag('typescript') ? 'typescript' : 'babel';
    // Prettier parser options
    let prettierOptions = null;

    // Set no semicolon options
    if (config.hasFlag('nosemi')) {
      prettierOptions = { semi: false };
    }

    // Set single quote option
    if (config.hasFlag('singlequote')) {
      prettierOptions = { singleQuote: true };
    }

    // Add test
    if (!config.hasFlag('notest')) {
      if (config.hasFlag('spec')) {
        files.push(`${name}.spec.${ext}`);
      } else {
        files.push(`${name}.test.${ext}`);
      }
    }

    // Add Stories for storybook
    if (config.hasFlag('stories')) {
      files.push(`${name}.stories.${ext}`);
    }

    // Add css | less | sass file if desired
    if (cssFileExt && !config.hasFlag('reactnative')) {
      files.push(`${name}.${config.hasFlag('cssmodules') ? 'module.' : ''}${cssFileExt}`);
    }

    if (config.hasFlag('uppercase')) {
      name = stringHelper.capitalizeFirstLetter(name);

      for (let i = 0; i < files.length; i += 1) {
        if (i !== 0) {
          files.splice(i, 1, stringHelper.capitalizeFirstLetter(files[i]));
        }
      }
    }

    if (config.hasFlag('graphql')) {
      files.push(`${componentName}.graphql`);
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
            data = createIndex(name);
            promises.push(
              fs.writeFileAsync(filePath, formatPrettier(data, prettierParser, prettierOptions)),
            );
          } else if (file === `${componentName}.graphql`) {
            promises.push(fs.writeFileAsync(filePath, ''));
          } else if (file === `${name}.${ext}` || file === `${name}.${jsxExt}`) {
            promises.push(
              createReactComponent(componentName).then((template) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                fs.writeFileAsync(
                  filePath,
                  formatPrettier(template, prettierParser, prettierOptions),
                )),
            );
          } else if (
            !config.hasFlag('notest')
            && (file.indexOf(`.spec.${ext}`) > -1 || file.indexOf(`.test.${ext}`) > -1)
          ) {
            promises.push(
              createReactComponentTest(name).then((template) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                fs.writeFileAsync(
                  filePath,
                  formatPrettier(template, prettierParser, prettierOptions),
                )),
            );
          }

          if ((file.indexOf(`.stories.${ext}`) || file.indexOf(`.stories.${ext}`)) > -1) {
            promises.push(
              createReactComponentStories(name).then((template) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                fs.writeFileAsync(
                  filePath,
                  formatPrettier(template, prettierParser, prettierOptions),
                )),
            );
          } else if (
            file.indexOf('.css') > -1
            || file.indexOf('.less') > -1
            || file.indexOf('.scss') > -1
            || file.indexOf(`.styles.${config.hasFlag('typescript') ? 'ts' : 'js'}`) > -1
          ) {
            promises.push(fs.writeFileAsync(filePath, ''));
          }
        }
        Promise.all(promises).then(() => resolve(files));
      })
      .catch((e) => {
        logger.error(e.message, e);
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
  const componentPath = path.join(ROOT_DIR, config.getValue('output', ''), args[0]);
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

      if (config.hasFlag('nocss')) {
        cssFileExt = null;
      }

      if (config.hasFlag('less')) {
        cssFileExt = 'less';
      }

      if (config.hasFlag('scss')) {
        cssFileExt = 'scss';
      }

      if (config.hasFlag('stylesext')) {
        cssFileExt = `styles.${config.hasFlag('typescript') ? 'ts' : 'js'}`;
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
        logger.error(`Folder already exists at ..${componentPath}`, error);
        return;
      }

      logger.error(error.message, error);
    });
}

// Start script
initialize();
