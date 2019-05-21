const Handlebars = require('handlebars');
const classComponentTemplate = require('../../templates/classComponent');
const functionalComponentTemplate = require('../../templates/fnComponent');
const stringHelper = require('../utils/stringHelper');

function normalImports() {
  return "import React, { Component } from 'react';";
}

function reactNativeImports() {
  return `import React, { Component } from 'react';
  import { View, Text } from 'react-native';`;
}

function typescriptImports() {
  return "import * as React from 'react';";
}

function getImports(config) {
  switch (config) {
    case config.includes('reactnative'):
      return reactNativeImports();
    case config.includes('typescript'):
      return typescriptImports();
    default:
      return normalImports();
  }
}

function getTemplate(config) {
  return config.includes('functional')
    ? functionalComponentTemplate
    : classComponentTemplate;
}

/**
 * Creates default React component
 *
 * @param {String} componentName - Component name
 * @param {Array} config
 * @returns {String}
 */
function createReactComponent(componentName, config) {
  const name = stringHelper.componentNameWithoutSpecialCharacter(componentName);
  const template = Handlebars.compile(getTemplate(config));
  return template({
    name,
    imports: getImports(config),
    typescript: config.includes('typescript'),
    native: config.includes('reactnative'),
    proptypes: config.includes('proptypes'),
    export: config.includes('namedexports'),
  });
}

/**
 * Creates default index file
 *
 * @param {String} componentName - Component name
 * @param {Boolean} upperCase - If true then capitalize first letter
 * @returns {String}
 */
function createIndex(componentName, upperCase) {
  return `export { default } from './${
    upperCase === true
      ? stringHelper.componentNameWithoutSpecialCharacter(componentName)
      : componentName
  }';
  `;
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

/**
 * Creates default test file for component
 *
 * @param {String} componentName - Component name
 * @param {Boolean} upperCase - If true then capitalize first letter
 * @param {Boolean} isTypeScript - Boolean check for Typescript
 * @returns {String}
 */
function createTest(componentName, upperCase, isTypeScript) {
  const componentNameUpperCase = stringHelper.componentNameWithoutSpecialCharacter(componentName);

  return `import ${isTypeScript ? '* as' : ''} React from 'react';
import { shallow } from 'enzyme';
import ${componentNameUpperCase} from './${
  upperCase === true ? componentNameUpperCase : componentName
}';

describe('<${componentNameUpperCase} />', () => {
  test('renders', () => {
    const wrapper = shallow(<${componentNameUpperCase} />);
    expect(wrapper).toMatchSnapshot();
  });
});
`;
}

/**
 * Creates Stories for React component
 *
 * @param {String} componentName - Component name
 * @param {Boolean} upperCase - If true then capitalize first letter
 * @param {Boolean} isTypeScript - Boolean check for Typescript
 * @returns {String}
 */
function createReactComponentStories(componentName, upperCase, isTypeScript) {
  const componentNameUpperCase = stringHelper.capitalizeFirstLetter(componentName);
  const componentNameWithoutSpecialCharacter = stringHelper.componentNameWithoutSpecialCharacter(
    componentName,
  );
  return `import ${isTypeScript ? '* as' : ''} React from 'react';
import { storiesOf } from '@storybook/react';
import ${componentNameWithoutSpecialCharacter} from './${componentName}';
storiesOf('${componentNameUpperCase}', module).add('${componentNameUpperCase}', () => (
    <div>
      <${componentNameWithoutSpecialCharacter}  />
    </div>
))
`;
}

module.exports = {
  createReactComponent,
  createIndex,
  createIndexForFolders,
  createTest,
  createReactComponentStories,
};
