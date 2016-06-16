'use strict';

var fs = require('fs');
var path = require('path');
var libPath = path.join(__dirname, 'lib');
var livereload = require('./lib/livereload');
var uglifyJS = require('uglify-js');
var socket = require('socket.io');

var io;

function logDebug(msg, data) {
  if (console && console.debug) {
    console.debug(msg, data);
  }
}

function logError(msg, data) {
  if (data) {
    console.error(msg + ': ' + data);
  } else {
    console.error(msg);
  }
}

/**
 * Reads in a file from the filesystem
 * @param file object
 * @returns {*} file content as string
 */
function readFileContent(file) {
  var fileContents;
  try {
    fileContents = fs.readFileSync(file, 'utf8');
  } catch (e) {
    try {
      fileContents = filename;
    } catch (e) { // eslint-disable-line no-catch-shadow
      console.error(e);
      throw e;
    }
  }
  return fileContents;
}

/**
 * Updates the file content with the livereload init
 * @param fileContents content of the file as string
 * @param connectURL connection url of live reload
 * @returns {*} updated file content as string
 */
function updateFileContent(fileContents, connectURL) {
  var updatedFileContent,
    match = fileContents.match(/App.onLaunch = function \((.*)\) {/),
    options = match ? match[1] : false;
  if (options) {
    updatedFileContent = fileContents.replace(/App.onLaunch = function \((.*)\) {/, `App.onLaunch = function (${options}) {
  liveReload.connect('${connectURL}', App, ${options});`);
  } else {
    updatedFileContent = fileContents.replace(/App.onLaunch = function \((.*)\) {/, `App.onLaunch = function () {
  liveReload.connect('${connectURL}', App);`);
  }
  return updatedFileContent;
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
      socket.on('error', function (errorDetails) {
        logError('Could not create connection', errorDetails);
        throw new Error();
      });
    });
    // return io object
    cb(io);
  },
  prepareApplicationJS: function (filename, port) {
    var file = filename || 'application.js';
    var connectURL = 'http://localhost:' + (port || '9000');
    var updatedFileContent = updateFileContent(readFileContent(file), connectURL);

    // fill in app template
    var result = require('./lib/app.tmpl.js')(libPath, updatedFileContent); // eslint-disable-line
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
