/*jshint node:true */

'use strict';

var flow = require('lodash.flow');
var identity = require('lodash.identity');
var Decimal = require('arbitrary-precision')(require('floating-adapter'));
var lcApi = require('linear-converter')(Decimal);
var anyToAny = require('linear-preset-any-to-any')(Decimal);
var PRESETS = require('linear-presets').PRESETS;
var presetToNumbers = require('./util/presetToNumbers');

var apiTransforms = {
  convert: Number,
  invertConversion: presetToNumbers,
  composeConversions: presetToNumbers,
  getCoefficientA: Number,
  getCoefficientB: Number,
  equivalentConversions: identity
};

var api = {};
api.PRESETS = PRESETS;
api.conversion = anyToAny;

Object.keys(apiTransforms).forEach(function(fnName) {
  api[fnName] = flow(lcApi[fnName], apiTransforms[fnName]);
});

module.exports = api;
