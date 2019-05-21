const Handlebars = require('handlebars');
const stringHelper = require('../utils/stringHelper');
const { readFileAsync } = require('../utils/fileHelpers');

/**
 * Get either a functional or class component template
 *
 * @param {Object} config
 * @returns {Promise|Promise<string | boolean>}
 */
async function getComponentTemplate(config) {
  const templateName = config.flags.includes('functional')
    ? 'fnComponent.handlebars'
    : 'classComponent.handlebars';

  try {
    return await readFileAsync(`${config.templates}/${templateName}`);
  } catch (error) {
    return readFileAsync(`${config.crcf}/templates/${templateName}`);
  }
}

/**
 * Get the test template
 *
 * @param config
 * @returns {Promise|Promise<string | boolean>}
 */
async function getTestTemplate(config) {
  try {
    return await readFileAsync(`${config.templates}/test.handlebars`);
  } catch (error) {
    return readFileAsync(`${config.crcf}/templates/test.handlebars`);
  }
}

/**
 * Get the storybook stories template
 *
 * @param config
 * @returns {Promise|Promise<string | boolean>}
 */
async function getStorybookTemplate(config) {
  try {
    return await readFileAsync(`${config.templates}/stories.handlebars`);
  } catch (error) {
    return readFileAsync(`${config.crcf}/templates/stories.handlebars`);
  }
}

/**
 * Creates default React component
 *
 * @param {String} componentName - Component name
 * @param {Object} config
 * @returns {String}
 */
async function createReactComponent(componentName, config) {
  const name = stringHelper.componentNameWithoutSpecialCharacter(componentName);
  const file = getComponentTemplate(config);
  const template = Handlebars.compile(await file);

  return template({
    name,
    typescript: config.flags.includes('typescript'),
    native: config.flags.includes('reactnative'),
    proptypes: config.flags.includes('proptypes'),
    export: config.flags.includes('namedexports'),
  });
}

/**
 * Creates default test file for component
 *
 * @param {String} componentName - Component name
 * @param {Object} config
 * @returns {String}
 */
async function createReactComponentTest(componentName, config) {
  const componentNameUpperCase = stringHelper.componentNameWithoutSpecialCharacter(componentName);
  const file = getTestTemplate(config);
  const template = Handlebars.compile(await file);

  return template({
    name: componentNameUpperCase,
    nameLowerCase: componentName,
    uppercase: config.flags.includes('uppercase'),
    typescript: config.flags.includes('typescript'),
    native: config.flags.includes('reactnative'),
    proptypes: config.flags.includes('proptypes'),
    export: config.flags.includes('namedexports'),
  });
}

/**
 * Creates Stories for React component
 *
 * @param {String} componentName - Component name
 * @param {Object} config
 * @returns {String}
 */
async function createReactComponentStories(componentName, config) {
  const name = stringHelper.componentNameWithoutSpecialCharacter(componentName);
  const file = getStorybookTemplate(config);
  const template = Handlebars.compile(await file);

  return template({
    name,
    nameLowerCase: componentName,
    uppercase: config.flags.includes('uppercase'),
    typescript: config.flags.includes('typescript'),
    native: config.flags.includes('reactnative'),
    proptypes: config.flags.includes('proptypes'),
    export: config.flags.includes('namedexports'),
  });
}

/**
 * Creates default index file
 *
 * @param {String} componentName - Component name
 * @param {Object} config
 * @returns {String}
 */
function createIndex(componentName, config) {
  const name = config.flags.includes('uppercase')
    ? stringHelper.componentNameWithoutSpecialCharacter(componentName)
    : componentName;

  const exportedAs = config.flags.includes('namedexports') ? name : 'default';

  return `export { ${exportedAs} } from './${name}';\n`;
}

/**
 * Creates index file includes all folder
 *
 * @param {Array} folders - folders array
 * @returns {String}
 */
function createIndexForFolders(folders) {
  return `${folders
    .map(folderName => `import ${folderName} from './${folderName}' \n`)
    .join('')}export {
    ${folders
    .map((folderName, index) => {
      if (index === folders.length - 1) return folderName;

      return `${folderName}, \n`;
    })
    .join('')}
}`;
}

module.exports = {
  createReactComponent,
  createReactComponentTest,
  createReactComponentStories,
  createIndex,
  createIndexForFolders,
};
