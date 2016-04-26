'use strict';

var fs = require('fs');
var livereload = require('./lib/livereload');
var uglifyJS = require('uglify-js');
var socket = require('socket.io');

var io;

module.exports = {
  start: function (port, cb) {
    io = socket(port || 9000);
    io.serveClient(false);
    io.on('connection', function (socket) {
      console.debug('socket.io connection');

      socket.on('event', function (data) {
        console.debug('socket.io data:', data);
      });

      socket.on('disconnect', function () {
        console.debug('socket.io disconnect');
      });
    });
    // return io object
    cb(io);
  },
  prepareApplicationJS: function (filename, port) {
    var file = filename || 'application.js';
    var connectURL = 'http://localhost:' + (port || '9000');

    var fileContents;
    try {
      fileContents = fs.readFileSync(file, 'utf8');
    } catch (e) {
      try {
        fileContents = filename;
      } catch (e) {
        console.error(err);
        throw err;
      }
    }
    // TODO use uglify-js for sourcemap
    var options = fileContents.match(/App.onLaunch = function \((.*)\) {/)[1];
    var updatedFileContent = fileContents.replace(/App.onLaunch = function \((.*)\) {/, `App.onLaunch = function (${options}) {
  liveReload.connect();`);
    // fill in app template
    var result = require('./lib/app.tmpl.js')(updatedFileContent);
    // return result
    return result;
  },
  reload: function () {
    io.emit('live-reload');
  },
  stop: function () {
    io.close();
  }
};
