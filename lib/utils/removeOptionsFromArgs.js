/**
 * Removes options values from node args
 *
 * @param {Array} args - Node CMD arguments
 * @param {Array} argsWithValues
 * @returns {Array} args
 */
function removeOptionsFromArgs(args, argsWithValues = []) {
  const temp = [];

  if (args.length > 0) {
    args.reduce((previous, current) => {
      if (current.charAt(0) !== '-' && !argsWithValues.includes(previous)) {
        temp.push(current);
      }

      return current;
    }, '');
  }

  return temp;
}

module.exports = removeOptionsFromArgs;
