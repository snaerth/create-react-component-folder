const isWin = process.platform === 'win32';
const lastSlash = isWin ? '\\' : '/';

/**
 * Gets component name from string
 *
 * @param {String} name - Component name or path
 * @returns {String}
 */
function getComponentName(name) {
  let start = 0;

  if (name.lastIndexOf('/') !== -1) {
    start = name.lastIndexOf('/');
  } else {
    start = name.lastIndexOf(lastSlash);
  }

  return name.substring(start + 1, name.length);
}

/**
 * Gets parent folder path for component
 *
 * @param {String} componentPath - Path with component name
 * @returns {String}
 */
function getComponentParentFolder(componentPath) {
  if (componentPath !== -1) {
    return componentPath.substring(0, componentPath.lastIndexOf(lastSlash) + 1);
  }

  return componentPath;
}

module.exports = {
  getComponentName,
  getComponentParentFolder,
};
