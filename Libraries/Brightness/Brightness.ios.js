/**
 * @providesModule Brightness
 * @flow
 */
'use strict';

var NativeBrightness = require('NativeModules').Brightness;
var invariant = require('invariant');

/**
 * High-level docs for the Brightness iOS API can be written here.
 */

var Brightness = {
  test: function() {
    NativeBrightness.test();
  }
};

module.exports = Brightness;
