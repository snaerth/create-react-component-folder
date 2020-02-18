const logger = require('../logger');

/**
 * Validates command line arguments from user
 *
 * @param {Array} args - Node process args array
 * @returns {Boolean}
 */
function validateArguments(args) {
  if (args.length === 0) {
    logger.error("You didn't supply component name as an argument.");
    logger.log('Please try "crac componentName" or "create-react-component-folder componentName"');
    return false;
  }

  if (args[0] === 'index') {
    logger.log();
    logger.error('You cannot name your component index');
    logger.log('Please choose a more descriptive name');
    logger.log();
    return false;
  }

  return true;
}

module.exports = validateArguments;
