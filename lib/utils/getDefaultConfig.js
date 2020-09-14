const { cosmiconfigSync } = require('cosmiconfig');

const explorerSync = cosmiconfigSync('crcf');

/**
 * Fetches saved configs
 * @return {Object}
 */
function getDefaultConfig() {
  const results = explorerSync.search();
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
