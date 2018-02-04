// @flow

import {
  validate,
  validateValue,
  makeValidate
} from './validation'

import {
  isEmail,
  isEmpty,
  isNoneEmptyString,
  isNumberString,
  isString
} from './validators'

const vally = {
  validate,
  isEmail,
  isEmpty,
  isNoneEmptyString,
  isNumberString,
  isString,
  makeValidate,
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
  validate,
  validateValue
}
