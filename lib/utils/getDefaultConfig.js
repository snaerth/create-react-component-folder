const cosmiconfig = require('cosmiconfig');

const explorer = cosmiconfig('crcf');

/**
 * Fetches saved configs
 * @return {Object}
 */
function getDefaultConfig() {
  return explorer.searchSync();
}

module.exports = getDefaultConfig;
