const prettier = require('prettier');

/**
 * Format string with prettier
 *
 * @param {String} str - String to format
 * @param {String} parser - Prettier options parser property
 * @returns {String} Prettier formatted string
 */
function formatPrettier(str, parser = 'babylon') {
  const prettierOptions = {
    printWidth: 100,
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    parser,
  };

  return prettier.format(str, prettierOptions);
}

module.exports = formatPrettier;
