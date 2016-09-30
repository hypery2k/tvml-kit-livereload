var livereload = require('../index.js');

describe('api', function () {
  'use strict';

  it('should start and stop server', function (done) {
    livereload.start(9000, (io) => {
      expect(io).toBeDefined();
      livereload.stop();
      done()
    });
  });

  it('should handle filecontent as parameter', function (done) {
    let appJS = `App.onLaunch = function () {
  liveReload.connect('http://localhost:9000', App);
    }
`;
    let result = livereload.prepareApplicationJS(appJS);
    expect(result).toBeDefined();
    done();
  });
});
