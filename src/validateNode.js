// @flow

import type {
  Definition,
  Validation
} from './types'

const validateNode = ({ node, validators }: Definition): Validation =>
  validators.reduce((acc, validator) => {
    if (!acc.isValid) return acc

    const val = node.value
    const isValid = validator.fn(val)

    return {
      isValid,
      node,
      validator
    }
  }, {
    isValid: true,
    node,
    validator: null
  })

export default validateNode
