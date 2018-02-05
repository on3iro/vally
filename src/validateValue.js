// @flow

import type {
  Validator
} from './types'

/**
 * Consecutively applies a value to each function of the validators array.
 * If any validator fails this returns false. Otherwise if all fns pass it returns
 * true.
 *
  * @function validateValue
  * @param {any} value - value to validate
  * @param {Array<Validator>} validators - Array of Validator functions
  * @return {boolean}
  */
const validateValue = (
  val: any,
  validators: Array<Validator>
):boolean => validators.reduce((acc, validator) => {
  if (!acc) return acc

  return validator(val)
}, true)

export default validateValue
