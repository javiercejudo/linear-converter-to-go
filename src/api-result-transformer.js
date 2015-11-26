/*jshint node:true */

'use strict';

var flow = require('lodash.flow');

module.exports = function apiResultTransformer(apiTransforms, apiIn) {
  return Object.keys(apiTransforms).reduce(function(apiOut, fnName) {
    apiOut[fnName] = flow(apiIn[fnName], apiTransforms[fnName]);

    return apiOut;
  }, {});
};
