/**
 * Creates default react component
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createReactComponent(componentName) {
  return `import React, { Component } from 'react';

class ${componentName} extends Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default ${componentName};
  `;
}

/**
 * Creates default react component with prop types
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createReactComponentWithProps(componentName) {
  return `import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ${componentName} extends Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

${componentName}.propTypes = {

};

export default ${componentName};
  `;
}

/**
 * Creates default index file
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createIndex(componentName) {
  return `export { default } from './${componentName}';`;
}

/**
 * Creates default test file for component
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createTest(componentName) {
  return `import React from 'react';
import { shallow } from 'enzyme';

import ${componentName} from './${componentName}';

describe('<${componentName} />', () => {
  test('renders', () => {
    const wrapper = shallow(<${componentName} />);
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
