// @flow

import validateNode from './validateNode'

import type {
  Config,
  Result
} from './types'

import { isEmpty } from './validatorFns'

const flattenFields = (fields) => fields.reduce((acc, f) => {
  if (Array.isArray(f.node)) {
    console.log(acc)
    const flattenedFields = f.node.map(n => {
      return {
        node: n,
        validators: f.validators
      }
    })

    return [ ...acc, ...flattenedFields ]
  }

  return [ ...acc, f ]
}, [])

/**
  * Validates a list of HTMLInput/HTMLSelect elements and returns the result of
  * the validation. Each element value will be piped through the specified list
  * of validator functions. If validation fails at any point, it will be represented
  * inside the respective validation object.
  *
  * @function validate
  * @public
  * @param {Object} config
  * @param {Array<Field>} config.fields - an array of Field definitions
  * @return {Result}
  *   - the general 'isValid' property determines if the set of fields as a whole validated successfully
  *   - each validation represents a single field { isValid: boolean, node: ?HTMLElement, validator: ?Validator }
  *   - if validation.isValid is false, the failing validator will be returned, so that it is possible to react
  *   on a specific failing validator
  */
const validate = ({ fields }: Config): Result => {
  const flattenedFields = flattenFields(fields)
  const validations = flattenedFields.map(f => {
    if (!f.node) {
      console.warn('vally, validate: passed node is undefined! Please check your field definitions.')

      return {
        isValid: false,
        node: f.node,
        validator: null
      }
    }

    const isHidden = f.node.offsetParent === null || f.node.style.display === 'none'
    const isRequired = f.node.required || false
    const val = f.node.value
    const fieldNotReqButEmpty = !isRequired && isEmpty(val)

    if (isHidden || fieldNotReqButEmpty) return { isValid: true, node: f.node, validator: null }

    return validateNode(f)
  })

  const isValid = validations.reduce((acc, r) => {
    if (!acc) return acc

    return r.isValid
  }, true)

  return {
    isValid,
    validations
  }
}

export default validate
