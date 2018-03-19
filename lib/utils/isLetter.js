/**
 * Matches only alphabetic character
 *
 * @param {String} str
 * @param {Boolean}
 */
function isLetter(str) {
  return str.length === 1 && str.match(/[A-z]/i);
}

module.exports = isLetter;
