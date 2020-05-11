const fs = require('fs');
const mkdirp = require('mkdirp');

/**
 * Native async / await for reading file in node
 * @param {String} path - fs.readFile path
 * @param {String} opts - fs.readFile options
 */
function readFileAsync(path, opts = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

/**
 * Native async / await for writing file in node
 * @param {String} path - fs.readFile path
 * @param {String} data - file content
 * @param {String} opts - fs.readFile options
 */
function writeFileAsync(path, data, opts = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

/**
 * Native async / await for reading directorys in node
 * @param {String} path - fs.readFile path
 */
function readDirAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, filenames) => {
      if (err) {
        return reject(err);
      }

      return resolve(filenames);
    });
  });
}

/**
 * Native async / await for checking if file exists in node
 * @param {String} path - fs.readFile path
 */
function existsSyncAsync(path) {
  return new Promise((resolve, reject) => {
    const exists = fs.existsSync(path);
    return !exists ? resolve(true) : reject(new Error(false));
  });
}

/**
 * Native async / await for creating directorys in node
 * @param {String} dir - directorys path
 */
function createDirectorys(dir) {
  return new Promise((resolve, reject) => {
    try {
      return fs.exists(dir, (exists) => {
        if (!exists) {
          return mkdirp(dir)
            .then(() => resolve(dir))
            .catch((err) => reject(err));
        }

        return resolve(dir);
      });
    } catch (error) {
      return reject(new Error(`Failed to create directory ${dir}`));
    }
  });
}

/**
 * Checks if path is directory
 *
 * @param {String} path - folder path
 * @returns {Boolean}
 */
function isDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        return reject(new Error(err));
      }

      return resolve(stats.isDirectory());
    });
  });
}

module.exports = {
  readFileAsync,
  writeFileAsync,
  readDirAsync,
  existsSyncAsync,
  createDirectorys,
  isDirectory,
};
