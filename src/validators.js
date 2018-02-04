// @flow

/**
  * @namespace validators
  */

import type { Validator } from './types'

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
const testRegex = (val:string, re:RegExp) => {
  if (!isString(val)) return false

  return re.test(val)
}

/**
  * @function isUndefined
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */
export const isUndefined: Validator = (val:any):boolean => val === undefined

/**
  * @function isNull
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */
export const isNull:Validator = (val:any):boolean => val === null

/**
  * @function isNil
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */
export const isNil:Validator = (val:any):boolean => isUndefined(val) && isNull(val)

/**
  * @function isNumber
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */
export const isNumber:Validator = (val:any):boolean => typeof val === 'number'

// public validators //

/**
  * @function isEmpty
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isEmpty:Validator = (val:any):boolean => isUndefined(val) || val.length === 0

/**
  * @function isString
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isString:Validator = (val:any):boolean => typeof val === 'string'

/**
  * @function isNoneEmptyString
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isNoneEmptyString:Validator = (val:any):boolean => isString(val) && val.length > 0

/**
  * @function isNumberString
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isNumberString:Validator = (val:any):boolean => {
  const re = /^\d+$/

  return testRegex(val, re)
}

/**
  * @function isEmail
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isEmail:Validator = (val:any):boolean => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  return testRegex(val, re)
}
