const stringHelper = require('../utils/stringHelper');

/**
 * Creates Storybook stories file
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createStories(componentName) {
  const name = stringHelper.componentNameWithoutSpecialCharacter(componentName);

  return `import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import ${name} from './${name}';

const stories = storiesOf('Core/${name}', module);

stories.addDecorator(withInfo);
stories.addDecorator(withKnobs);

stories.add('Examples', () => (
  <${name} />
));
`;
}

module.exports = createStories;
