// @flow

import type { Fields, NestedFields } from './types'

export const flattenFields = (nestedFields: NestedFields): Fields =>
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

export const mergeFields = (fields: Fields): Fields => fields.reduce((acc, f, i, arr) => {
  const node = f.node

  const isFirstIteration = i === 0
  const next = i + 1
  const tail = isFirstIteration
    ? arr.slice(next)
    : acc.slice(next)

  if (!tail.length) return acc

  const duplicates = tail.filter(el => el.node === node)
  const validators = [
    ...f.validators,
    ...duplicates.reduce((vals, el) => {
      return [ ...vals, ...el.validators ]
    }, [])
  ]

  const head = isFirstIteration
    ? []
    : acc.slice(0, i)

  const rest = tail.filter(el => el.node !== node)

  return [ ...head, { node, validators }, ...rest ]
}, [])

const flattenAndMerge = (fields: NestedFields) => mergeFields(flattenFields(fields))

export default flattenAndMerge
