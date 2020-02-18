const stringHelper = require('../utils/stringHelper');

/**
 * Creates default React component
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createReactComponent(componentName) {
  const name = stringHelper.componentNameWithoutSpecialCharacter(componentName);

  return `import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@lens-react/styles';

const Styled${name} = styled.div${``};

export default function ${name}(props) {
  const theme = useTheme();

  return (
    <Styled${name} theme={theme}>
    </Styled${name}>
  );
}

${name}.propTypes = {};

${name}.defaultProps = {};
`;
}

module.exports = createReactComponent;
