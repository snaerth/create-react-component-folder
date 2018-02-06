const stringHelper = require('../utils/stringHelper');

/**
 * Creates default react component
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createReactComponent(componentName) {
  const name = stringHelper.capitalizeFirstLetter(componentName);

  return `import React, { Component } from 'react';

class ${name} extends Component {
  render() {
    return (
      <div>
        ${name}
      </div>
    );
  }
}

export default ${name};
  `;
}

/**
 * Creates default react component with prop types
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createReactComponentWithProps(componentName) {
  const name = stringHelper.capitalizeFirstLetter(componentName);

  return `import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ${name} extends Component {
  render() {
    return (
      <div>
        ${name}
      </div>
    );
  }
}

${name}.propTypes = {

};

export default ${name};
  `;
}

/**
 * Creates default index file
 *
 * @param {String} componentName - Component name
 * @param {Boolean} upperCase - If true then capitalize first letter
 * @returns {String}
 */
function createIndex(componentName, upperCase) {
  return `export { default } from './${upperCase === true ? stringHelper.capitalizeFirstLetter(componentName) : componentName}';`;
}

/**
 * Creates default test file for component
 *
 * @param {String} componentName - Component name
 * @param {Boolean} upperCase - If true then capitalize first letter
 * @returns {String}
 */
function createTest(componentName, upperCase) {
  const componentNameUpperCase = stringHelper.capitalizeFirstLetter(componentName);

  return `import React from 'react';
import { shallow } from 'enzyme';
import ${componentNameUpperCase} from './${upperCase === true ? componentNameUpperCase : componentName}';

describe('<${componentNameUpperCase} />', () => {
  test('renders', () => {
    const wrapper = shallow(<${componentNameUpperCase} />);
    expect(wrapper).toMatchSnapshot();
  });
});
  `;
}

module.exports = {
  createReactComponent,
  createReactComponentWithProps,
  createIndex,
  createTest,
};
