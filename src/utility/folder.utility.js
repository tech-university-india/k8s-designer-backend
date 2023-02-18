const util = require('util');
const fs = require('fs');

function doesFolderExist(resolvedFolderPath) {
  const exists = util.promisify(fs.access);
  const doesFolderExist = exists(resolvedFolderPath);
  return doesFolderExist;
}

module.exports = {
  doesFolderExist
};