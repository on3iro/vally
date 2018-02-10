(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vally = {})));
}(this, (function (exports) { 'use strict';



var types = Object.freeze({

});

/**
  * Validates a single node by passing it to each of the specified validator
  * functions.
  * @param {HTMLInputElement | HTMLSelectElement} $0.node - Element to validate
  * @param {Array<Validator>} $0.validators - Contains objects each representing
  * a single validator. A validator should always have an 'fn'-property with
  * a function of the type (val: any) => boolean. You can specify other properties
  * on the object as needed.
  * @return {{ isValid: boolean, node: ?HTMLElement, validator: ?Validator }}
  */
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

/**
  * Validates a list of HTMLInput/HTMLSelect elements and returns the result of
  * the validation. Each element value will be piped through the specified list
  * of validator functions. If validation fails at any point, it will be represented
  * inside the respective validation object.
  * @function validate
  * @public
  * @param {Array<Field>} $0.fields - an array of Field definitions
  * @return {{ isValid: boolean, validations: Array<Validation> }
  *   - the general 'isValid' property determines if the set of fields as a whole validated successfully
  *   - each validation represents a single field { isValid: boolean, node: ?HTMLElement, validator: ?Validator }
  *   - if validation.isValid is false, the failing validator will be returned, so that it is possible to react
  *   on a specific failing validator
  */
var validate = function validate(_ref) {
  var fields = _ref.fields;

  var validations = fields.map(function (f) {
    if (!f.node) {
      console.warn('vally, validate: passed node is undefined! Please check your field definitions.');

      return {
        isValid: false,
        node: f.node,
        validator: null
      };
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

/**
 * Adds an eventListener to each given node. The listener is wrapped
 * with a debounce function and will invoke the callback when the specified
 * event is triggered.
 * An array of removeEventListener functions is returned, so listeners could
 * be removed if necesseary.
 *
  * @function initWithBindings
  * @param $0.fields - Array of field definitions
  * @param event - event to be bound on
  * @param callback - Function to invoke when event is triggered on node
  * @param debounceTime - time to debounce callback invocation (in ms)
  * @return {Array<() => node.removeEventListener()>} - RemoveListeners
  */
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

/**
  * This is just a simple helper/wrapper function to automatically fetch
  * single nodes and return a valid configuration. Instead of directly
  * passing in the nodes, the configuration will expect a selector-string
  * for each of the specified fields. Behind the scenes createConfig will
  * then invoke document.querySelector(selector) and add it to the returned
  * config. If a node cannot be found, a console warning is emitted and the
  * field will be skipped.
  * @param specs - Specifications that describe each field and their corresponding Validators
  * @return {Config} a valid vally config to use with vally.validate, vally.initWithBindings etc.
  */
var createConfig = function createConfig(specs) {
  // $FlowFixMe
  return {
    fields: specs.reduce(function (acc, spec) {
      var node = document.querySelector(spec.selector);

      if (!(node && (node.mock || node instanceof HTMLInputElement || node instanceof HTMLSelectElement))) {
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
exports.types = types;

Object.defineProperty(exports, '__esModule', { value: true });

})));
