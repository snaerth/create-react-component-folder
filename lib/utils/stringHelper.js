/**
 * Capitalize first letter in string
 * @param {String} string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Removes special characters from string makes every camel case character uppercase
 *
 * @param {String} str - String to transform
 * @returns {String}
 */

function componentNameWithoutSpecialCharacter(str) {
  return str
    .split('-')
    .map(capitalizeFirstLetter)
    .join('');
}

module.exports = {
  capitalizeFirstLetter,
  componentNameWithoutSpecialCharacter,
};
