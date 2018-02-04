// @flow

import {
  validate,
  validateValue,
  makeValidate
} from './validation'

import {
  isEmail,
  isNoneEmptyString,
  isNumberString,
  isString
} from './validators'

const vally = {
  validate,
  isEmail,
  isNoneEmptyString,
  isNumberString,
  isString,
  makeValidate,
  validateValue
}

export {
  vally,
  isEmail,
  isNoneEmptyString,
  isNumberString,
  isString,
  makeValidate,
  validate,
  validateValue
}
