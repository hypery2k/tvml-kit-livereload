var path = require('path');
var libPath = path.join(__dirname, '../lib/');

describe('parse', function () {
  'use strict';

  var livereload = require('../index.js');

  it('should add live reload to application.js', function () {
    var result = livereload.prepareApplicationJS(__dirname + '/application.js', '9001');
    expect(result).toEqual(`var liveReload = require('${libPath}livereload');

App.onLaunch = function () {
  liveReload.connect('http://localhost:9001', App);
  console.log('Loaded');
};

`);
  });

  it('should add live reload to application.js with options', function () {
    var result = livereload.prepareApplicationJS(__dirname + '/applicationWithOptions.js', '9001');
    expect(result).toEqual(`var liveReload = require('${libPath}livereload');

App.onLaunch = function (options) {
  liveReload.connect('http://localhost:9001', App, options);
  console.log('Loaded');
};

`);
  });
});
