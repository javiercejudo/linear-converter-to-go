/*jshint node:true */

'use strict';

var arrayToNumbers = require('./arrayToNumbers');

module.exports = function presetToNumbers(preset) {
  return preset.map(arrayToNumbers);
};
