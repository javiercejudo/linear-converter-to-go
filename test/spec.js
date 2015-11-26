/*jshint node:true, mocha:true */

'use strict';

require('should');

var lc = require('../src/');

describe('linear converter to go', function() {
  it('should convert returning native numbers', function() {
    lc.convert([[0, 1], [1, 4]], 5).should.be.exactly(16);
  });

  it('should have presets bundled', function() {
    var temp = lc.PRESETS.temperature.conversions;
    var cToF = lc.conversion(temp, 'celsius', 'fahrenheit');

    lc.convert(cToF, 0).should.be.exactly(32);
    lc.convert(cToF, 1).should.be.exactly(33.8);
    lc.convert(cToF, 25).toFixed(3).should.be.exactly('77.000');

    lc.PRESETS.should.have.properties([
      'metricPrefixes',
      'length',
      'mass',
      'time',
      'electricCurrent',
      'temperature',
      'temperatureDifference',
      'amountOfSubstance',
      'luminousIntensity',
      'velocity',
      'volume',
      'area',
      'angle',
      'digitalInformation'
    ]);
  });

  it('should invert presets', function() {
    lc.invertConversion([[0, 1], [0, 3]]).should.eql([[0, 3], [0, 1]]);
  });

  it('should compose presets returning scales with primitive numbers', function() {
    lc.composeConversions([[0, 1], [0, 3]], [[0, 1], [1, 2]]).should.eql([[0, 1], [1, 4]]);
  });

  it('should be able to test for equavalence', function() {
    lc.equivalentConversions(
      [[0, 10], [10, 20]],
      [[430245.1, -44.5], [430255.1, -34.5]]
    ).should.be.exactly(true);

    lc.equivalentConversions(
      [[0, 1], [0, 2]],
      [[0, 1], [0, 3]]
    ).should.be.exactly(false);

    lc.equivalentConversions(
      [[0, 1], [1, 3]],
      [[0, 1], [2, 4]]
    ).should.be.exactly(false);
  });

  it('should calculate coefficients as primitive numbers', function() {
    lc.getCoefficientA([[0, 1], [1, 4]]).should.be.exactly(3);
    lc.getCoefficientB([[0, 1], [1, 4]]).should.be.exactly(1);
  });
});
