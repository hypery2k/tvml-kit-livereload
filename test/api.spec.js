describe('api', function () {
  'use strict';

  var livereload = require('../index.js');

  it('should start and stop server', function (done) {
    livereload.start(9000, (io) => {
      expect(io).toBeDefined();
      livereload.stop();
      done()
    });
  });
});
