module.exports = function (libPath, fileContents) {
  return `var liveReload = require('${libPath}/livereload');

${fileContents}
`;
};
