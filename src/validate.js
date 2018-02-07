// @flow

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
  * @param {Config} config - Configuration object
  * @param {boolean} [resultOnly=false] - If set to true no DOM-manipulation will occur and only the result will be returned
  * @return {boolean}
  */
const validate = ({
  containerSelector = 'body',
  fields,
  DOMStub
}:Config,
  resultOnly: boolean = false
) => {
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

    const fieldIsValid = (
      isHidden ||
      fieldNotReqButEmpty ||
      validateValue(fieldVal, f.validators)
    )

    if (!resultOnly) {
      // if there is no errorSelector specified we automatically
      // assume that the error class should be added to the input itself
      const errTarget = getTarget(container, f.errorSelector, fieldNode)

      toggleErrorClass(f.errorClass, fieldIsValid, errTarget)
    }

    return fieldIsValid && acc
  }, true)

  return formIsValid
}

export default validate
