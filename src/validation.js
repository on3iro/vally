// @flow

/**
  * @namespace validation
  */

import type {
  Config,
  Validator
} from './types'

/**
 * Consecutively applies a string to each function of the validators array.
 * If any validator fails this returns false. Otherwise if all fns pass it returns
 * true.
 *
  * @function validateString
  * @memberof validation
  * @param {string} str - String to validate
  * @param {Array<Validator>} validators - Array of Validator functions
  * @return {boolean}
  */
const validateString = (
  str: string,
  validators: Array<Validator>
):boolean => validators.reduce((acc, validator) => {
  if (!acc) return acc

  return validator(str)
}, true)

/**
 * Collects all specified fields from inside a container element and applies each field to a set of validator functions. If validation fails on any field the function returns false. Otherwise it returns true.
 * If a field contains any validation error a specified error class is added to the specified element. If it does not contain errors the class is removed again.
 *
  * @function validate
  * @memberof validation
  * @param {Config} config - Configuration object
  * @param {string} config.containerSelector - querySelector compatible string. Used
  * to get the wrapping element to look for fields. Defaults to 'body'. (optional)
  * @param {Array<Field>} config.fields - array of field objects
  * @param {Object} config.fields.field - a field object
  * @param {string} config.fields.field.selector - querySelector compatible string. Used to get the input node. (Required)
  * @param {string} config.fields.field.errorSelector - querySelector compatible string. Used to get the element to add the errorClass to. Defaults to the input element itself. (optional)
  * @param {string} config.fields.field.errorClass - CSS class to add to the specified DOM element. Defaults to 'error'. (optional)
  * @param {Array<Validators>} config.fields.field.validators - Array of validator functions. Each function should take a single value as input and return a boolean. (Required)
  * @return {boolean}
  */
const validate = ({
  containerSelector = 'body',
  fields,
  DOMStub
}:Config) => {
  const doc = DOMStub || window.document
  const container = doc.querySelector(containerSelector)

  const defaultErrorClass = 'error'

  if (!container) {
    console.warn(`vally: The specified container "${containerSelector}" does not exist!`)
    return false
  }

  const formIsValid = fields.reduce((acc, f) => {
    if (!acc) return acc

    const fieldNode = container.querySelector(f.selector)

    if (!fieldNode) {
      console.warn(`vally: The specified field "${f.selector}" does not exist!`)
      return false
    }

    // $FlowFixMe
    const fieldVal = fieldNode.value
    if (!fieldVal) {
      console.warn(`vally: The specified field "${f.selector}" does not seem to be a valid <input> element. Can't access "value"!`)

      return false
    }

    // if there is no errorSelector specified we automatically
    // assume that the error class should be added to the input itself
    const errTarget = f.errorSelector
      ? container.querySelector(f.errorSelector)
      : null

    const target = errTarget || fieldNode

    const errorCls = f.errorClass || defaultErrorClass

    const fieldIsValid = validateString(fieldVal, f.validators)

    if (!fieldIsValid) {
      target.classList.add(errorCls)
    } else {
      target.classList.remove(errorCls)
    }

    return fieldIsValid
  }, true)

  return formIsValid
}

/**
  * Simple higher-order function for the purpose of convenience. Creates a preconfigured validate() function, that can be used throughout your app.
  * @function makeValidate
  * @memberof validation
  * @param {Config} config - See validate function for a detailed explanaition of the config object
  * @return {Function} - validate function
  */
const makeValidate = (config: Config) => () => validate(config)

export {
  validate,
  validateString,
  makeValidate
}
