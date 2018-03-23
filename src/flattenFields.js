// @flow

import type { Fields, NestedFields } from './types'

const flattenFields = (nestedFields: NestedFields): Fields =>
  nestedFields.reduce((acc, f) => {
    const { node } = f

    if (node instanceof Array) {
      const flattenedFields = node.map(n => {
        return {
          node: n,
          validators: f.validators
        }
      })

      return [ ...acc, ...flattenedFields ]
    }

    return [ ...acc, f ]
  }, [])

export default flattenFields
