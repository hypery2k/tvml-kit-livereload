describe('parse', function () {
  'use strict';

  var livereload = require('../index.js');

  it('should add live reload to application.js', function () {
    var result = livereload.prepareApplicationJS(__dirname + '/application.js', 'http://localhost:9001');
    expect(result).toEqual(`var liveReload = require('tvml-kit-livereload/lib/livereload');

App.onLaunch = function () {
  liveReload.connect();
  console.log('Loaded');
};

`);
  });
});
