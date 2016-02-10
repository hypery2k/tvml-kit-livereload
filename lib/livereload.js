'use strict';
// socket.io-client requires the window object, and navigator.userAgent to be present.

var window = {},
  navigator = {userAgent: 'tvos'};

var io = require('socket.io-client');

/*
 import * as router from 'lib/router';
 */

function resume(lastLocation) {
  if (!lastLocation) {
    return;
  }

  //router.goTo(lastLocation);
}

module.exports = {
  connect: function (launchOptions, connectURL) {
    const socket = io(connectURL);


    socket.on('connect', () => console.debug('Live reload: connected'));
    socket.on('compile', () => console.debug('Live reload: compiling, prepare for reload'));

    // reload app on reload event
    socket.on('live-reload', () => {
      App.reload()//{when: 'now'}, {
      //lastLocation: router.getLocation()
      //});
    });

    if (launchOptions.reloadData) {
      resume(launchOptions.reloadData || {});
    }

  }
};
