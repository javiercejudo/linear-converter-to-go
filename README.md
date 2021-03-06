# linear-converter-to-go

[![Build Status](https://travis-ci.org/javiercejudo/linear-converter-to-go.svg)](https://travis-ci.org/javiercejudo/linear-converter-to-go)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/linear-converter-to-go/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/linear-converter-to-go?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/linear-converter-to-go/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/linear-converter-to-go)

Zero configuration [linear converter](https://github.com/javiercejudo/linear-converter)
with floating precision.

## Install

    npm i linear-converter-to-go

## Usage

See [live playground](https://tonicdev.com/javiercejudo/linear-converter-to-go/5.0.0).

```js
var lc = require('linear-converter-to-go');
var temp = lc.PRESETS.temperature.conversions;
var cToF = lc.conversion(temp, 'celsius', 'fahrenheit');

lc.convert(cToF, 25).toFixed(3); // => '77.000'

// f(x) = 3x + 1
lc.convert([[0, 1], [1, 4]], 5); // => 16
```

Unlike *linear-converter*, *linear-converter-to-go* always returns primitive numbers.

See [CodePen example](http://codepen.io/javiercejudo/pen/ojjroJ?editors=101).

For more documentation, see [linear-converter](https://github.com/javiercejudo/linear-converter).

## Related projects

- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter.
- [linear-presets](https://github.com/javiercejudo/linear-presets): linear presets for common units.
