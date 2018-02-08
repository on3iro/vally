// @flow

/**
  * @namespace validators
  */

import type { ValidatorFn } from './types'

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
export const isUndefined: ValidatorFn = (val:any):boolean => val === undefined

/**
  * @function isNull
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */
export const isNull:ValidatorFn = (val:any):boolean => val === null

/**
  * @function isNil
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */
export const isNil:ValidatorFn = (val:any):boolean => isUndefined(val) && isNull(val)

/**
  * @function isNumber
  * @memberof validators
  * @private
  * @param {string} val
  * @return {boolean}
  */
export const isNumber:ValidatorFn = (val:any):boolean => typeof val === 'number'

// public validators //

/**
 * Validates if a value is undefined or its length === 0
 *
  * @function isEmpty
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isEmpty:ValidatorFn = (val:any):boolean => isUndefined(val) || val.length === 0

/**
  * @function isString
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isString:ValidatorFn = (val:any):boolean => typeof val === 'string'

/**
  * @function isNoneEmptyString
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isNoneEmptyString:ValidatorFn = (val:any):boolean => isString(val) && val.length > 0

/**
  * @function isNumberString
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isNumberString:ValidatorFn = (val:any):boolean => {
  const re = /^\d+$/

  return testRegex(val, re)
}

/**
  * @function isEmail
  * @memberof validators
  * @param {string} val
  * @return {boolean}
  */
export const isEmail:ValidatorFn = (val:any):boolean => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  return testRegex(val, re)
}
