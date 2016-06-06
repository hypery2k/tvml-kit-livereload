'use strict';
// socket.io-client requires the window object, and navigator.userAgent to be present.

var window = global;
window.navigator = {userAgent: 'tvos'};

var io = require('socket.io-client');

function resume(lastLocation) {
  if (!lastLocation) {
    return;
  }
}

function logDebug(msg) {
  if (console && console.debug) {
    console.debug(msg);
  }
}

module.exports = {
  connect: function (connectURL, app, launchOptions) {
    var socket = io(connectURL);

    socket.on('connect', function () {
      logDebug('Live reload: connected');
    });
    socket.on('compile', function () {
      logDebug('Live reload: compiling, prepare for reload');
    });

    // reload app on reload event
    socket.on('live-reload', function () {
      app.reload();
    });

    if (launchOptions && launchOptions.reloadData) {
      resume(launchOptions.reloadData || {});
    }

  }
};
