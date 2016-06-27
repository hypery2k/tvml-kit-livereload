# TVML LiveReload

[![Build Status](https://travis-ci.org/hypery2k/tvml-kit-livereload.svg?branch=master)](https://travis-ci.org/hypery2k/tvml-kit-livereload) [![npm version](https://badge.fury.io/js/tvml-kit-livereload.svg)](http://badge.fury.io/js/tvml-kit-livereload) [![Code Climate](https://codeclimate.com/github/hypery2k/tvml-kit-livereload/badges/gpa.svg)](https://codeclimate.com/github/hypery2k/tvml-kit-livereload) [![Issue Count](https://codeclimate.com/github/hypery2k/tvml-kit-livereload/badges/issue_count.svg)](https://codeclimate.com/github/hypery2k/tvml-kit-livereload) [![Dependency Status](https://david-dm.org/hypery2k/tvml-kit-livereload.svg)](https://david-dm.org/hypery2k/tvml-kit-livereload) [![devDependency Status](https://david-dm.org/hypery2k/tvml-kit-livereload/dev-status.svg)](https://david-dm.org/hypery2k/tvml-kit-livereload#info=devDependencies)

> A simple livereload for TVML-based JavaScript-Apps on tvOS

[![NPM](https://nodei.co/npm/tvml-kit-livereload.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/tvml-kit-livereload/)

> Feel free to **donate**
> 
> <a href='https://pledgie.com/campaigns/31915'><img alt='Click here to lend your support to: NPM packages and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/31915.png?skin_name=chrome' border='0' ></a>
> <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JYG6LVEHB59TL">
> <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"/>
> </img></a>
> Or donate [Bitcoins](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D):
> [![Bitcoin](https://martinreinhardt-online.de/bitcoin.png)](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D)
> 
> Also via [greenaddress](https://greenaddress.it/pay/GA3ZPfh7As3Gc2oP6pQ1njxMij88u/)

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
  var updateAppJS = livereload.prepareApplicationJS(__dirname + '/application.js');
  write updated application.js back
  // bind reload, e.g. in WebPack or watch
  livereload.reload();
});
```

## Thanks

Thanks to [joshhunt](https://github.com/joshhunt). [His project](https://github.com/joshhunt/tvos-au-vod) was base for this.

## License

MIT, Copyright 2016 Martin Reinhardt
