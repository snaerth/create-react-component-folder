const logger = require('../logger');

/**
 * Validates command line arguments from user
 *
 * @param {Array} args - Node process args array
 * @param {Object} program - Commander program object
 * @returns {Boolean}
 */
function validateArguments(args, program) {
  if (args.length === 0) {
    logger.error("You didn't supply component name as an argument.");
    logger.log('Please try "crcf componentName" or "create-react-component-folder componentName"');
    return false;
  }

  if (args[0] === 'index') {
    logger.log();
    logger.error('You cannot name your component index');
    logger.log('Please choose a more descriptive name');
    logger.log();
    return false;
  }

  if (program.typescript && program.jsx) {
    logger.log();
    logger.error('You cannot have a JSX and Typescript option at the same time');
    return false;
  }

  if (program.typescript && program.reactnative) {
    logger.log();
    logger.error('You cannot have a React Native and Typescript option at the same time');
    return false;
  }

  if (program.jsx && program.reactnative) {
    logger.log();
    logger.error('You cannot have a React Native and JSX option at the same time');
    return false;
  }

  return true;
}

module.exports = validateArguments;
