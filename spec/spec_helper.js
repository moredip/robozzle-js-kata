global._ = require('underscore');
global.r = require('robozzle');

global.stubFn = function stubFn(returnValue) {
  var fn = function () {
    fn.called = true;
    fn.args = arguments;
    return returnValue;
  };

  fn.called = false;

  return fn;
}
