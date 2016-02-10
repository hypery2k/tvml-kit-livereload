module.exports = function (fileContents) {
  return `var livereload = require('tvml-kit-livereload/lib/livereload');

${fileContents}
`;
};
