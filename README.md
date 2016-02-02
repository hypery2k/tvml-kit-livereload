# TVML LiveReload

[![Build Status](https://travis-ci.org/hypery2k/tvml-kit-livereload.svg?branch=master)](https://travis-ci.org/hypery2k/tvml-kit-livereload) [![npm version](https://badge.fury.io/js/tvml-kit-livereload.svg)](http://badge.fury.io/js/tvml-kit-livereload) [![Dependency Status](https://david-dm.org/hypery2k/tvml-kit-livereload.svg)](https://david-dm.org/hypery2k/tvml-kit-livereload) [![devDependency Status](https://david-dm.org/hypery2k/tvml-kit-livereload/dev-status.svg)](https://david-dm.org/hypery2k/tvml-kit-livereload#info=devDependencies) 

> A simple livereload for TVML-based JavaScript-Apps on tvOS

## Installation

```
npm install tvml-kit-livereload --save-dev
```

## Usage

Mainly used for integration in other Tools, like Grunt or WebPack

```
var port = 9000;
var livereload = require('tvml-kit-livereload');
// start server
livereload.start(9000, function(io){
  // add reload function in app
  livereload.prepareApplicationJS(__dirname + '/application.js', 'http://localhost:9001', function (updateAppJS) {
    // write updated application.js back
  });
  // bind reload, e.g. in WebPack or watch
  livereload.reload();
});
```
