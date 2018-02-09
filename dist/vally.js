(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vally = {})));
}(this, (function (exports) { 'use strict';

var validateNode = function validateNode(_ref) {
  var node = _ref.node,
      validators = _ref.validators;
  return validators.reduce(function (acc, validator) {
    if (!acc.isValid) return acc;

    var val = node.value;
    var isValid = validator.fn(val);

    return {
      isValid: isValid,
      node: node,
      validator: validator
    };
  }, {
    isValid: true,
    node: node,
    validator: null
  });
};

// private validators //

/**
 * Returns false if val is not a string. Tests if matches regex.
 *
  * @function testRegex
  * @memberof validators
  * @private
  * @param {string} val - value to test
  * @param {RegExp} re - regex to test with
  * @return {boolean}
  */
var testRegex = function testRegex(val, re) {
  if (!isString(val)) return false;

  return re.test(val);
};

/**
  * @function isUndefined
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */


/**
  * @namespace validators
  */

var isUndefined = function isUndefined(val) {
  return val === undefined;
};

/**
  * @function isNull
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */


/**
  * @function isNil
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */


/**
  * @function isNumber
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */


// public validators //

/**
 * Validates if a value is undefined or its length === 0
 *
  * @function isEmpty
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
var isEmpty = function isEmpty(val) {
  return isUndefined(val) || val.length === 0;
};

/**
  * @function isString
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
var isString = function isString(val) {
  return typeof val === 'string';
};

/**
  * @function isNoneEmptyString
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
var isNoneEmptyString = function isNoneEmptyString(val) {
  return isString(val) && val.length > 0;
};

/**
  * @function isNumberString
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
var isNumberString = function isNumberString(val) {
  var re = /^\d+$/;

  return testRegex(val, re);
};

/**
  * @function isEmail
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
var isEmail = function isEmail(val) {
  var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return testRegex(val, re);
};

var validate = function validate(_ref) {
  var fields = _ref.fields;

  var validations = fields.map(function (f) {
    if (!f.node) {
      console.warn('vally, validate: passed node is undefined! Please check your field definitions.');
      console.trace();
    }

    var isHidden = f.node.offsetParent === null || f.node.style.display === 'none';
    var isRequired = f.node.required || false;
    var val = f.node.value;
    var fieldNotReqButEmpty = !isRequired && isEmpty(val);

    if (isHidden || fieldNotReqButEmpty) return { isValid: true, node: f.node, validator: null };

    return validateNode(f);
  });

  var isValid = validations.reduce(function (acc, r) {
    if (!acc) return acc;

    return r.isValid;
  }, true);

  return {
    isValid: isValid,
    validations: validations
  };
};

/**
  * @namespace helpers
  * @private
  */

/**
 * Reduces multiple function calls, which are fired in quick succession to
 * a single function call (i.e. to reduce function calls on scroll events.
 * @function debounce
 * @memberof helpers
 * @private
 * @param {function} fn - Function to debounce
 * @param {number} time - Time to wait until function is called - will be reset
 * on every invocation of the debounced function in the given timeframe.
 * @return {function} Debounced function
  */
var debounce = function debounce(fn, time) {
  var timeout = void 0;
  // Has to be a 'real' function, not an arrow function, to preserve
  // context of 'this'
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var callback = function callback() {
      return fn.apply(_this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(callback, time);
  };
};

var initWithBindings = function initWithBindings(_ref, event, callback) {
  var fields = _ref.fields;
  var debounceTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return fields.map(function (f) {
    var validateFn = function validateFn() {
      return validate({ fields: [f] });
    };
    var handler = function handler(e) {
      var result = validateFn();
      callback(e, result);
    };

    var debouncedHandler = debounce(handler, debounceTime);

    f.node.addEventListener(event, debouncedHandler);

    return function () {
      return f.node.removeEventListener(event, debouncedHandler);
    };
  });
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var createConfig = function createConfig(specs) {
  return {
    fields: specs.reduce(function (acc, spec) {
      var node = document.querySelector(spec.selector);

      if (!(node && (node instanceof HTMLInputElement || node instanceof HTMLSelectElement))) {
        console.warn('vally, createConfig: node with selector "' + spec.selector + '" could not be found!');

        return acc;
      }

      return [].concat(toConsumableArray(acc), [{
        node: node,
        validators: spec.validators
      }]);
    }, [])
  };
};

exports.isEmail = isEmail;
exports.isEmpty = isEmpty;
exports.isNoneEmptyString = isNoneEmptyString;
exports.isNumberString = isNumberString;
exports.isString = isString;
exports.validateNode = validateNode;
exports.validate = validate;
exports.initWithBindings = initWithBindings;
exports.createConfig = createConfig;

Object.defineProperty(exports, '__esModule', { value: true });

})));
