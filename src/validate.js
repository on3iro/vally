// @flow

import validateNode from './validateNode'

import type {
  Config,
  Result
} from './types'

import { isEmpty } from './validatorFns'

const validate = ({ fields }: Config): Result => {
  const validations = fields.map(f => {
    if (!f.node) {
      console.warn('vally, validate: passed node is undefined! Please check your field definitions.')
      console.trace()
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
