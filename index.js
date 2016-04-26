'use strict';

var fs = require('fs');
var livereload = require('./lib/livereload');
var uglifyJS = require('uglify-js');
var socket = require('socket.io');

var io;

function logDebug(msg, data) {
  if (console && console.debug) {
    console.debug(msg, data);
  }
}

module.exports = {
  start: function (port, cb) {
    io = socket(port || 9000);
    io.serveClient(false);
    io.on('connection', function (socket) {
      logDebug('socket.io connection');

      socket.on('event', function (data) {
        logDebug('socket.io data:', data);
      });

      socket.on('disconnect', function () {
        logDebug('socket.io disconnect');
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
    var updatedFileContent
    var match = fileContents.match(/App.onLaunch = function \((.*)\) {/);
    var options = match ? match[1] : false;
    if (options) {
      updatedFileContent = fileContents.replace(/App.onLaunch = function \((.*)\) {/, `App.onLaunch = function (${options}) {
  liveReload.connect('${connectURL}', App, ${options});`);
    } else {
      updatedFileContent = fileContents.replace(/App.onLaunch = function \((.*)\) {/, `App.onLaunch = function () {
  liveReload.connect('${connectURL}', App);`);
    }
    // fill in app template
    var result = require('./lib/app.tmpl.js')(updatedFileContent);
    // return result
    return result;
  },
  reload: function () {
    if (io) {
      io.emit('live-reload');
    }
  },
  stop: function () {
    if (io) {
      io.close();
    }
  }
};
