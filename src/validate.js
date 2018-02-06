// @flow

/**
  * @namespace validate
  */

import validateValue from './validateValue'

import type {
  Config
} from './types'

import {
  isEmpty
} from './validators'

/**
 * Finds a specified node inside a container and returns it.
 * If no selector is specified or the node could not be found, the fallback
 * node will be returned
 *
  * @function getTarget
  * @memberof validate
  * @private
  * @param {HTMLElement} container - Container to search in
  * @param {string} selector - querySelector compatible string
  * @param {HTMLElement} fallback - fallback node
  * @return {HTMLElement}
  */
const getTarget = (
  container: HTMLElement,
  selector: ?string,
  fallback: HTMLElement
) => {
  const tmpTarget = selector
    ? container.querySelector(selector)
    : null

  const target = tmpTarget || fallback

  return target
}

/**
 * Adds or removes a specified CSS class from a target element if the condition is true/false
 *
  * @function toggleErrorClass
  * @memberof validate
  * @private
  * @param {string} errCls - class to toggle. Default: 'error'
  * @param {boolean} isValid - condition which determines if class should be added or removed
  * @param {HTMLElement} target - target to toggle class on
  */
const toggleErrorClass = (
  errCls:string = 'error',
  isValid: boolean,
  target: HTMLElement
):void => {
  if (isValid) {
    target.classList.remove(errCls)
  } else {
    target.classList.add(errCls)
  }
}

/**
 * Collects all specified fields from inside a container element and applies each field to a set of validator functions. If validation fails on any field the function returns false. Otherwise it returns true.
 * If a field contains any validation error a specified error class is added to the specified element. If it does not contain errors the class is removed again.
 * Hidden fields are ignored.
 *
  * @function validate
  * @memberof validate
  * @param {Config} config - Configuration object
  * @param {string} config.containerSelector - querySelector compatible string. Used
  * to get the wrapping element to look for fields. Defaults to 'body'. (optional)
  * @param {Fields} config.fields - array of field objects
  * @param {Field} config.fields.field - a field object
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

  if (!container) {
    console.warn(`vally: The specified container "${containerSelector}" does not exist!`)
    return false
  }

  const formIsValid = fields.reduce((acc, f) => {
    const fieldNode = container.querySelector(f.selector)

    if (!fieldNode) {
      console.warn(`vally: The specified field "${f.selector}" does not exist!`)
      return false
    }

    const isHidden = fieldNode.offsetParent === null

    // FlowFixMes are necessary for easier mocking inside unit tests
    // We should fix this in the future, though...
    // $FlowFixMe
    const fieldVal = fieldNode.value
    const fieldIsEmpty = isEmpty(fieldVal)
    // $FlowFixMe
    const isRequired = fieldNode.required || false
    const fieldNotReqButEmpty = !isRequired && fieldIsEmpty // -> isValid

    // if there is no errorSelector specified we automatically
    // assume that the error class should be added to the input itself
    const errTarget = getTarget(container, f.errorSelector, fieldNode)

    const fieldIsValid = (
      isHidden ||
      fieldNotReqButEmpty ||
      validateValue(fieldVal, f.validators)
    )

    toggleErrorClass(f.errorClass, fieldIsValid, errTarget)

    return fieldIsValid && acc
  }, true)

  return formIsValid
}

export default validate