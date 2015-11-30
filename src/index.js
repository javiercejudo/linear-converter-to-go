/*jshint node:true */

'use strict';

var identity = require('lodash.identity');
var Decimal = require('arbitrary-precision')(require('floating-adapter'));
var lcApi = require('linear-converter')(Decimal);
var anyToAny = require('linear-preset-any-to-any')(Decimal);
var PRESETS = require('linear-presets').PRESETS;
var presetToNumbers = require('linear-preset-to-number');

var api = require('api-result-transformer')({
  convert: Number,
  invertConversion: presetToNumbers,
  composeConversions: presetToNumbers,
  getCoefficientA: Number,
  getCoefficientB: Number,
  equivalentConversions: identity
}, lcApi);

api.PRESETS = PRESETS;
api.conversion = anyToAny;

module.exports = api;
