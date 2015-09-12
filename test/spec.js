/*jshint node:true, mocha:true */

'use strict';

require('should');

var lc = require('../src/linear-converter-to-go');

describe('linear converter to go', function() {
  it('should convert returning native numbers', function() {
    lc.convert([[0, 1], [1, 4]], 5).should.be.exactly(16);
  });

  it('should have presets bundled', function() {
    var temp = lc.PRESETS.temperature;

    lc.convert(temp.celsiusToFahrenheit, 25).should.be.exactly(77);

    lc.PRESETS.should.have.properties([
      'metricPrefixes',
      'distance',
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
    lc.invertPreset([[0, 1], [0, 3]]).should.eql([[0, 3], [0, 1]]);
  });

  it('should compose presets returning scales with primitive numbers', function() {
    lc.composePresets([[0, 1], [0, 3]], [[0, 1], [1, 2]]).should.eql([[0, 1], [1, 4]]);
  });

  it('should calculate coefficients as primitive numbers', function() {
    lc.getCoefficientA([[0, 1], [1, 4]]).should.be.exactly(3);
    lc.getCoefficientB([[0, 1], [1, 4]]).should.be.exactly(1);
  });
});
