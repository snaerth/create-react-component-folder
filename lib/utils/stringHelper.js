var _ = require('lodash');

/**
 * Capitalize first letter in string
 * @param {String} string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 *Capatalize every first letter in component name
 *button-click --> Button-Click for Stroy book
 * @param {*} string
 * @returns
 */
function componentNameWithoutSpecialCharacter(string){
  var filenameslist=_.split(string,'-');
  var upperCase=filenameslist.map(function(filename) {
     return filename.toUpperCase(); 
  });
  var joinName=upperCase.map(function(elem){return elem;}).join("");;  
  return joinName;
}
module.exports = {
  capitalizeFirstLetter,
  componentNameWithoutSpecialCharacter,
};
