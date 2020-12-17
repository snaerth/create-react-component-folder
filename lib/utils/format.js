const prettier = require('prettier');

/**
 * Format string with prettier
 *
 * @param {String} str - String to format
 * @param {String} parser - Prettier options parser property
 * @param {Object} optionsOverride - Prettier options override
 * @returns {String} Prettier formatted string
 */
function formatPrettier(str, parser = 'babel', optionsOverride) {
  const prettierOptions = {
    printWidth: 100,
    semi: true,
    trailingComma: 'es5',
    parser,
  };
  const opt = { ...prettierOptions, ...optionsOverride };

  return prettier.format(str, opt);
}

module.exports = formatPrettier;
