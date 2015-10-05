/*jshint node:true */

'use strict';

var flow = require('lodash.flow');
var forOwn = require('for-own');
var adapter = require('floating-adapter');
var arbitraryPrecision = require('arbitrary-precision');
var lcFactory = require('linear-converter');
var presetFactory = require('linear-preset-factory');

var PRESETS = require('linear-presets').PRESETS;

Object.keys(PRESETS).forEach(function(name) {
  PRESETS[name] = presetFactory(PRESETS[name]);
});

var presetToNumbers = require('./util/presetToNumbers');

var Decimal = arbitraryPrecision(adapter);
var lcApi = lcFactory(Decimal);

var api = {};

var asIs = {
  equivalentConversions: lcApi.equivalentConversions
};

var numerical = {
  convert: lcApi.convert,
  getCoefficientA: lcApi.getCoefficientA,
  getCoefficientB: lcApi.getCoefficientB
};

var presetNumerical = {
  invertConversion: lcApi.invertConversion,
  composeConversions: lcApi.composeConversions
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
