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

  it('should add live reload to application.js with options', function () {
    var result = livereload.prepareApplicationJS(__dirname + '/applicationWithOptions.js', 'http://localhost:9001');
    expect(result).toEqual(`var liveReload = require('tvml-kit-livereload/lib/livereload');

App.onLaunch = function (options) {
  liveReload.connect();
  console.log('Loaded');
};

`);
  });
});
