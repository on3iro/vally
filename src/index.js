// @flow

import {
  validate,
  validateString,
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
  validateString
}

export {
  vally,
  isEmail,
  isNoneEmptyString,
  isNumberString,
  isString,
  makeValidate,
  validate,
  validateString
}
