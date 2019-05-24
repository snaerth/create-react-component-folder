const cosmiconfig = require('cosmiconfig');

const explorer = cosmiconfig('crcf');

/**
 * Fetches saved configs
 * @return {Object}
 */
function getDefaultConfig() {
  const results = explorer.searchSync();
  let config = { flags: [], output: '' };
  if (results) {
    results.config.forEach((item) => {
      if (typeof item === 'object') {
        config = {
          ...config,
          ...item,
        };
      } else {
        config.flags.push(item);
      }
    });
  }

  return config;
}

module.exports = getDefaultConfig;
