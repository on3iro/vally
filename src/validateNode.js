// @flow

import type {
  Definition,
  Validation
} from './types'

/**
  * Validates a single node by passing it to each of the specified validator
  * functions.
  * @param {HTMLInputElement | HTMLSelectElement} $0.node - Element to validate
  * @param {Array<Validator>} $0.validators - Contains objects each representing
  * a single validator. A validator should always have an 'fn'-property with
  * a function of the type (val: any) => boolean. You can specify other properties
  * on the object as needed.
  * @return {{ isValid: boolean, node: ?HTMLElement, validator: ?Validator }}
  */
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
