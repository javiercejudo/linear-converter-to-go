/*jshint node:true */

'use strict';

var flow = require('lodash.flow');
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

Object.keys(asIs).forEach(function(fnName) {
  api[fnName] = asIs[fnName];
});

Object.keys(numerical).forEach(function(fnName) {
  api[fnName] = flow(numerical[fnName], Number);
});

Object.keys(presetNumerical).forEach(function(fnName) {
  api[fnName] = flow(presetNumerical[fnName], presetToNumbers);
});

api.PRESETS = PRESETS;

module.exports = api;
