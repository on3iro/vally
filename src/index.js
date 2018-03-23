// @flow

import validate from './validate'
import validateNode from './validateNode'
import initWithBindings from './initWithBindings'
import createConfig from './createConfig'
import flattenAndMerge from './flattenAndMerge'

import {
  isEmail,
  isEmpty,
  isNoneEmptyString,
  isNumberString,
  isString
} from './validatorFns'

export {
  // validators
  isEmail,
  isEmpty,
  isNoneEmptyString,
  isNumberString,
  isString,
  // validation
  validateNode,
  validate,
  initWithBindings,
  // helpers
  createConfig,
  flattenFields
}
