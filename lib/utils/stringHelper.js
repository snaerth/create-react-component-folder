/**
 * Capitalize first letter in string
 * @param {String} string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  capitalizeFirstLetter,
};
