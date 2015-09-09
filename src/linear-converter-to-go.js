/*jshint node:true */

'use strict';

var flow = require('lodash.flow');
var forOwn = require('for-own');
var adapter = require('floating-adapter');
var arbitraryPrecision = require('linear-arbitrary-precision');
var lcFactory = require('linear-converter');
var PRESETS = require('linear-presets').PRESETS;

var presetToNumbers = require('./util/presetToNumbers');

var Decimal = arbitraryPrecision(adapter);
var lcApi = lcFactory(Decimal);

var api = {};

var asIs = {
  equivalentPresets: lcApi.equivalentPresets
};

var numerical = {
  convert: lcApi.convert,
  getCoefficientA: lcApi.getCoefficientA,
  getCoefficientB: lcApi.getCoefficientB
};

var presetNumerical = {
  invertPreset: lcApi.invertPreset,
  composePresets: lcApi.composePresets
};

forOwn(asIs, function(fn, name) {
  api[name] = fn;
});

forOwn(numerical, function(fn, name) {
  api[name] = flow(fn, Number);
});

forOwn(presetNumerical, function(fn, name) {
  api[name] = flow(fn, presetToNumbers);
});

api.PRESETS = PRESETS;

module.exports = api;
