/**
 * Removes options values from node args
 *
 * @param {Array} args - Node CMD arguments
 * @returns {Array} args
 */
function removeOptionsFromArgs(args) {
  if (args.length > 0) {
    const temp = [];

    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];

      if (arg.charAt(0) !== '-') {
        temp.push(arg);
      }
    }

    args = temp;
  }

  return args;
}

module.exports = removeOptionsFromArgs;
