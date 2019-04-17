#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const logger = require('./logger');
const fs = require('./utils/fileHelpers');
const {
  createReactComponent,
  createReactFunctionalComponent,
  createReactNativeComponent,
  createTypeScriptReactComponent,
  createTypeScriptReactNativeComponent,
  createReactComponentWithProps,
  createReactFunctionalComponentWithProps,
  createReactNativeComponentWithProps,
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

// Root directory
const ROOT_DIR = process.cwd();

// Grab provided args
let [, , ...args] = process.argv;

// Get the default config
const defaultConfig = getDefaultConfig();
const config = defaultConfig && defaultConfig.config ? defaultConfig.config : null;

// Set command line interface options for cli
program
  .version('0.1.0')
  .option('--typescript', 'Creates Typescript component and files')
  .option('--nocss', 'No css file')
  .option('--notest', 'No test file')
  .option(
    '--cssmodules',
    'Creates css/less/scss file with .module extensions. Example component.module.css',
  )
  .option('--reactnative', 'Creates React Native components')
  .option('--createindex', 'Creates index.js file for multple component imports')
  .option('-f, --functional', 'Creates React stateless functional component')
  .option('-j, --jsx', 'Creates the component file with .jsx extension')
  .option('-l, --less', 'Adds .less file to component')
  .option('-s, --scss', 'Adds .scss file to component')
  .option('-p, --proptypes', 'Adds prop-types to component')
  .option('-u, --uppercase', 'Component files start on uppercase letter')
  .option('-d, --default', 'Uses a default configuration if available')
  .option('-sb, --stories', 'Add Story file to component')
  .option('-sb, --stories', 'Add Story file to component')
  .option('-ns, --nosemi', 'No semicolons')
  .parse(process.argv);

// Remove Node process args options
args = removeOptionsFromArgs(args);

/**
 * Creates files for component
 *
 * @param {String} componentName - Component name
 * @param {String} componentPath - File system path to component
 * @param {String|null} cssFileExt - css file extension (css, less, sass or null)
 */
function createFiles(componentName, componentPath, cssFileExt) {
  const {
    typescript,
    reactnative,
    jsx,
    notest,
    uppercase,
    functional,
    proptypes,
    stories,
    nosemi,
    cssmodules,
  } = program;

  return new Promise((resolve) => {
    const isTypeScript = typescript || (config && config.includes('typescript'));
    const isNative = reactnative || (config && config.includes('reactnative'));
    // File extension
    const ext = isTypeScript ? 'tsx' : 'js';
    const jsxExt = 'jsx';
    const indexFile = `index.${ext}`;
    let name = componentName;
    const isJsxFile = jsx || (config && config.includes('jsx')) || false;
    const componentFileName = `${name}.${isJsxFile ? jsxExt : ext}`;
    // file names to create
    const files = [indexFile, componentFileName];
    // Prettier options property
    const prettierParser = isTypeScript ? 'typescript' : 'babel';
    // Prettier parser options
    let prettierOptions = null;

    // Set no semicolon options
    if (nosemi || (config && config.includes('nosemi'))) {
      prettierOptions = { semi: false };
    }

    // Add test
    if (!notest && !(config && config.includes('notest'))) {
      if (config && config.includes('spec')) {
        files.push(`${name}.spec.${ext}`);
      } else {
        files.push(`${name}.test.${ext}`);
      }
    }

    // Add Storie for storbook
    if (stories || (config && config.includes('stories'))) {
      files.push(`${name}.stories.${ext}`);
    }

    // Add css | less | sass file if desired
    if (cssFileExt && !isNative) {
      const isCssModules = cssmodules || (config && config.includes('cssmodules'));
      files.push(`${name}.${isCssModules ? 'module.' : ''}${cssFileExt}`);
    }

    if (uppercase || (config && config.includes('uppercase'))) {
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
            data = createIndex(name, uppercase || (config && config.includes('uppercase')));
            promises.push(
              fs.writeFileAsync(
                filePath,
                isTypeScript ? data : formatPrettier(data, prettierParser, prettierOptions),
              ),
            );
          } else if (file === `${name}.${ext}` || file === `${name}.${jsxExt}`) {
            if (functional || (config && config.includes('functional'))) {
              data = proptypes || (config && config.includes('proptypes'))
                ? createReactFunctionalComponentWithProps(name)
                : createReactFunctionalComponent(name);
            } else if (isTypeScript) {
              data = isNative
                ? createTypeScriptReactNativeComponent(name)
                : createTypeScriptReactComponent(name);
            } else if (proptypes || (config && config.includes('proptypes'))) {
              data = isNative
                ? createReactNativeComponentWithProps(name)
                : createReactComponentWithProps(name);
            } else {
              data = isNative ? createReactNativeComponent(name) : createReactComponent(name);
            }

            promises.push(
              fs.writeFileAsync(
                filePath,
                isTypeScript ? data : formatPrettier(data, prettierParser, prettierOptions),
              ),
            );
          } else if (file.indexOf(`.spec.${ext}`) > -1 || file.indexOf(`.test.${ext}`) > -1) {
            data = createTest(
              name,
              uppercase || (config && config.includes('uppercase')),
              isTypeScript,
            );

            if (!notest && !(config && config.includes('notest'))) {
              promises.push(
                fs.writeFileAsync(
                  filePath,
                  isTypeScript ? data : formatPrettier(data, prettierParser, prettierOptions),
                ),
              );
            }
          }

          if ((file.indexOf(`.stories.${ext}`) || file.indexOf(`.stories.${ext}`)) > -1) {
            data = createReactComponentStories(
              name,
              uppercase || (config && config.includes('uppercase')),
              isTypeScript,
            );
            promises.push(
              fs.writeFileAsync(
                filePath,
                isTypeScript ? data : formatPrettier(data, prettierParser, prettierOptions),
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

      if (program.less || (config && config.includes('less'))) {
        cssFileExt = 'less';
      }

      if (program.scss || (config && config.includes('scss'))) {
        cssFileExt = 'scss';
      }

      if (program.nocss || (config && config.includes('nocss'))) {
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
