const prettier = require('prettier');

const prettierOptions = {
  printWidth: 100,
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
};

/**
 * Format string with prettier
 *
 * @param {String} str - String to format
 * @returns {String} Prettier formatted string
 */
function formatPrettier(str) {
  return prettier.format(str, prettierOptions);
}

module.exports = {
  formatPrettier,
};
