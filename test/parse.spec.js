var path = require('path'),
  libPath = path.join(__dirname, '../lib/'),
  livereload = require('../index.js');

describe('parse', function () {
  'use strict';

  it('should add live reload to application.js', function () {
    var applicationJS = path.resolve(__dirname, 'application.js');
    var result = livereload.prepareApplicationJS(applicationJS, '9001');
    expect(result).toEqual(`var liveReload = require('${libPath}livereload');

App.onLaunch = function () {
  liveReload.connect('http://localhost:9001', App);
  console.log('Loaded');
};

`);
  });

  it('should add live reload to application.js with options', function () {
    var applicationJS = path.resolve(__dirname, 'applicationWithOptions.js');
    var result = livereload.prepareApplicationJS(applicationJS, '9001');
    expect(result).toEqual(`var liveReload = require('${libPath}livereload');

App.onLaunch = function (options) {
  liveReload.connect('http://localhost:9001', App, options);
  console.log('Loaded');
};

`);
  });
});
