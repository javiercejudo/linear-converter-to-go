/*jshint node:true */

'use strict';

var flow = require('lodash.flow');
var identity = require('lodash.identity');
var adapter = require('floating-adapter');
var arbitraryPrecision = require('arbitrary-precision');
var lcFactory = require('linear-converter');
var presetFactory = require('linear-preset-factory');
var presetToNumbers = require('./util/presetToNumbers');

var PRESETS = require('linear-presets').PRESETS;
var Decimal = arbitraryPrecision(adapter);
var lcApi = lcFactory(Decimal);

var apiTransforms = {
  equivalentConversions: identity,
  convert: Number,
  getCoefficientA: Number,
  getCoefficientB: Number,
  invertConversion: presetToNumbers,
  composeConversions: presetToNumbers
};

var api = {
  PRESETS: {}
};

Object.keys(apiTransforms).forEach(function(fnName) {
  api[fnName] = flow(lcApi[fnName], apiTransforms[fnName]);
});

Object.keys(PRESETS).forEach(function(name) {
  api.PRESETS[name] = presetFactory(PRESETS[name]);
});

module.exports = api;
