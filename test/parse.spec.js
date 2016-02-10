describe('parse', function () {
  'use strict';

  var livereload = require('../index.js');

  it('should add live reload to application.js', function (done) {
    livereload.prepareApplicationJS(__dirname + '/application.js', 'http://localhost:9001', (result)=> {
      expect(result).toEqual(`var livereload = require('tvml-kit-livereload/lib/livereload');

App.onLaunch = function () {
  liveReload.connect();
  console.log('Loaded');
};

`);
      done();
    });
  });
});
