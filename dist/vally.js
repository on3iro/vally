(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vally = {})));
}(this, (function (exports) { 'use strict';

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
 * Consecutively applies a value to each function of the validators array.
 * If any validator fails this returns false. Otherwise if all fns pass it returns
 * true.
 *
  * @function validateValue
  * @memberof validation
  * @param {any} value - value to validate
  * @param {Array<Validator>} validators - Array of Validator functions
  * @return {boolean}
  */


/**
  * @namespace validation
  */

var validateValue = function validateValue(val, validators) {
  return validators.reduce(function (acc, validator) {
    if (!acc) return acc;

    return validator(val);
  }, true);
};

/**
 * Finds a specified node inside a container and returns it.
 * If no selector is specified or the node could not be found, the fallback
 * node will be returned
 *
  * @function getTarget
  * @memberof validation
  * @private
  * @param {HTMLElement} container - Container to search in
  * @param {string} selector - querySelector compatible string
  * @param {HTMLElement} fallback - fallback node
  * @return {HTMLElement}
  */
var getTarget = function getTarget(container, selector, fallback) {
  var tmpTarget = selector ? container.querySelector(selector) : null;

  var target = tmpTarget || fallback;

  return target;
};

/**
 * Adds or removes a specified CSS class from a target element if the condition is true/false
 *
  * @function toggleErrorClass
  * @memberof validation
  * @private
  * @param {string} errCls - class to toggle. Default: 'error'
  * @param {boolean} isValid - condition which determines if class should be added or removed
  * @param {HTMLElement} target - target to toggle class on
  */
var toggleErrorClass = function toggleErrorClass() {
  var errCls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'error';
  var isValid = arguments[1];
  var target = arguments[2];

  if (isValid) {
    target.classList.remove(errCls);
  } else {
    target.classList.add(errCls);
  }
};

/**
 * Collects all specified fields from inside a container element and applies each field to a set of validator functions. If validation fails on any field the function returns false. Otherwise it returns true.
 * If a field contains any validation error a specified error class is added to the specified element. If it does not contain errors the class is removed again.
 * Hidden (display: "none") fields are ignored.
 *
  * @function validate
  * @memberof validation
  * @param {Config} config - Configuration object
  * @param {string} config.containerSelector - querySelector compatible string. Used
  * to get the wrapping element to look for fields. Defaults to 'body'. (optional)
  * @param {Array<Field>} config.fields - array of field objects
  * @param {Object} config.fields.field - a field object
  * @param {boolean} config.fields.field.isRequired - default: false
  * @param {string} config.fields.field.selector - querySelector compatible string. Used to get the input node. (Required)
  * @param {string} config.fields.field.errorSelector - querySelector compatible string. Used to get the element to add the errorClass to. Defaults to the input element itself. (optional)
  * @param {string} config.fields.field.errorClass - CSS class to add to the specified DOM element. Defaults to 'error'. (optional)
  * @param {Array<Validators>} config.fields.field.validators - Array of validator functions. Each function should take a single value as input and return a boolean. (Required)
  * @return {boolean}
  */
var validate = function validate(_ref) {
  var _ref$containerSelecto = _ref.containerSelector,
      containerSelector = _ref$containerSelecto === undefined ? 'body' : _ref$containerSelecto,
      fields = _ref.fields,
      DOMStub = _ref.DOMStub;

  var doc = DOMStub || window.document;
  var container = doc.querySelector(containerSelector);

  if (!container) {
    console.warn('vally: The specified container "' + containerSelector + '" does not exist!');
    return false;
  }

  var formIsValid = fields.reduce(function (acc, f) {
    if (!acc) return acc;

    var fieldNode = container.querySelector(f.selector);

    if (!fieldNode) {
      console.warn('vally: The specified field "' + f.selector + '" does not exist!');
      return false;
    }

    var isHidden = fieldNode.style.display === 'none';
    if (isHidden) return true;

    // $FlowFixMe
    var fieldVal = fieldNode.value;
    var fieldIsEmpty = isEmpty(fieldVal);

    if (f.isRequired && fieldIsEmpty) {
      return false;
    } else if (fieldIsEmpty) {
      return true;
    }

    // if there is no errorSelector specified we automatically
    // assume that the error class should be added to the input itself
    var errTarget = getTarget(container, f.errorSelector, fieldNode);
    var fieldIsValid = validateValue(fieldVal, f.validators);

    toggleErrorClass(f.errorClass, fieldIsValid, errTarget);

    return fieldIsValid;
  }, true);

  return formIsValid;
};

/**
  * Simple higher-order function for the purpose of convenience. Creates a preconfigured validate() function, that can be used throughout your app.
  * @function makeValidate
  * @memberof validation
  * @param {Config} config - See validate function for a detailed explanaition of the config object
  * @return {Function} - validate function
  */
var makeValidate = function makeValidate(config) {
  return function () {
    return validate(config);
  };
};

var vally = {
  validate: validate,
  isEmail: isEmail,
  isNoneEmptyString: isNoneEmptyString,
  isNumberString: isNumberString,
  isString: isString,
  makeValidate: makeValidate,
  validateValue: validateValue
};

exports.vally = vally;
exports.isEmail = isEmail;
exports.isNoneEmptyString = isNoneEmptyString;
exports.isNumberString = isNumberString;
exports.isString = isString;
exports.makeValidate = makeValidate;
exports.validate = validate;
exports.validateValue = validateValue;

Object.defineProperty(exports, '__esModule', { value: true });

})));
