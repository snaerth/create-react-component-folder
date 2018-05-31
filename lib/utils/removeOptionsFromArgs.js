/**
 * Removes options values from node args
 *
 * @param {Array} args - Node CMD arguments
 * @returns {Array} args
 */
function removeOptionsFromArgs(args) {
  const temp = [];

  if (args.length > 0) {
    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];

      if (arg.charAt(0) !== '-') {
        temp.push(arg);
      }
    }
  }

  return temp;
}

module.exports = removeOptionsFromArgs;
