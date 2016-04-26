module.exports = function (fileContents) {
  return `var liveReload = require('tvml-kit-livereload/lib/livereload');

${fileContents}
`;
};
