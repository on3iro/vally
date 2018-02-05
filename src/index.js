// @flow

import {
  validate,
  validateValue,
  makeValidate,
  makeValidationWithBlurBindings
} from './validation'

import {
  isEmail,
  isEmpty,
  isNoneEmptyString,
  isNumberString,
  isString
} from './validators'

const vally = {
  isEmail,
  isEmpty,
  isNoneEmptyString,
  isNumberString,
  isString,
  makeValidate,
  makeValidationWithBlurBindings,
  validate,
  validateValue
}

export {
  vally,
  isEmail,
  isEmpty,
  isNoneEmptyString,
  isNumberString,
  isString,
  makeValidate,
  makeValidationWithBlurBindings,
  validate,
  validateValue
}
