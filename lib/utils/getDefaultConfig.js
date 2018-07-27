const cosmiconfig = require('cosmiconfig');

const explorer = cosmiconfig('crcf');

/**
* Fetches saved configs
* @param {Boolean}
*/
function getDefaultConfig() {
 return explorer.searchSync();
}

module.exports = getDefaultConfig;
