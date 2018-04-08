const npmview = require('npmview');
const semver = require('semver');
const chalk = require('chalk');
const packageJson = require('../../package.json');

/**
 *
 * @param {String} version - Npm newest version
 * @param {String} pkgVersion - Package.json version
 */
function printMessage(version, pkgVersion) {
  /* eslint-disable-next-line no-console */
  return console.log(`
  ${chalk.yellow('╭───────────────────────────────────────────────╮')}
  ${chalk.yellow('│                                               │')}
  ${chalk.yellow(`│       ${chalk.whiteBright('Update available')} ${chalk.gray(pkgVersion)}${chalk.whiteBright(' → ')}${chalk.green(version)}        │`)}
  ${chalk.yellow(`│   ${chalk.whiteBright('Run')} ${chalk.cyan('npm i -g create-react-component-folder')}  │`)}
  ${chalk.yellow(`│               ${chalk.whiteBright('to update package')}               │`)}
  ${chalk.yellow('│                                               │')}
  ${chalk.yellow('╰───────────────────────────────────────────────╯')}
  `);
}

/**
 * Checks npm version to package.json version
 * If version is greater, then print message for
 * user in console to update package.
 */
function checkVersion() {
  return new Promise((resolve) => {
    // Get local package name and version from package.json
    const pkgName = packageJson.name;
    const pkgVersion = packageJson.version;

    // get latest version on npm
    npmview(pkgName, (err, version) => {
      // compare to local version
      if (semver.gt(version, pkgVersion)) {
        // remote version on npm is newer than current version
        printMessage(version, pkgVersion);
      }

      return resolve();
    });
  });
}

module.exports = checkVersion;
