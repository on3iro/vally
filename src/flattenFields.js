// @flow

import type { Fields, NestedFields } from './types'

const flattenFields = (nestedFields: NestedFields): Fields =>
  nestedFields.reduce((acc, f) => {
    const { nodeDef } = f

    if (nodeDef instanceof Array) {
      const flattenedFields = nodeDef.map(node => {
        return {
          node,
          validators: f.validators
        }
      })

      return [ ...acc, ...flattenedFields ]
    }

    return [ ...acc, {
      node: nodeDef,
      validators: f.validators
    } ]
  }, [])

export default flattenFields
