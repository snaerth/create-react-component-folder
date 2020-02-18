const stringHelper = require('../utils/stringHelper');

/**
 * Creates Unit Test for React Component
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createSpecFile(componentName) {
  const name = stringHelper.componentNameWithoutSpecialCharacter(componentName);

  return `import React from 'react';
import { shallow } from 'enzyme';
import ${name} from './${name}';

describe('${name}', () => {
  let wrapper;
  const props = {};
  
  it('should render', () => {
    wrapper = shallow(<${name} {...props} />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
  `;
}

module.exports = createSpecFile;
