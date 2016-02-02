module.exports = function (fileContents) {
  return `var livereload = require('livereload');

${fileContents}
`;
};
