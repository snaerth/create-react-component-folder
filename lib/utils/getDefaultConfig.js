const { cosmiconfigSync } = require('cosmiconfig');

const explorer = cosmiconfigSync('crcf');

/**
 * Fetches saved configs
 * @return {Object}
 */
function getDefaultConfig() {
  return explorer.search();
}

module.exports = getDefaultConfig;
