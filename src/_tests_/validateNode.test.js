// @flow

import { nodeFactory } from './fixtures'

import {
  isNoneEmptyString,
  isNumberString
} from '../validatorFns'

import validateNode from '../validateNode'

describe('validateNode()', () => {
  const nonEmptyValidator = {
    fn: isNoneEmptyString,
    type: 'NONE_EMPTY'
  }

  const numberValidator = {
    fn: isNumberString,
    type: 'NUMBER'
  }

  const noneEmptyNode = { ...nodeFactory(), value: 'some string' }

  it('should return { isValid: true, node, validator: null } if all tests pass', () => {
    // $FlowFixMe
    const result = validateNode({
      node: noneEmptyNode,
      validators: [ nonEmptyValidator ]
    })

    expect(result).toEqual({
      isValid: true,
      node: noneEmptyNode,
      validator: expect.anything()
    })
  })

  it('should return { isValid: false, node, config } if a test fails ', () => {
    // $FlowFixMe
    const result = validateNode({
      node: noneEmptyNode,
      validators: [ numberValidator, nonEmptyValidator ]
    })

    expect(result).toEqual({
      isValid: false,
      node: noneEmptyNode,
      validator: expect.anything()
    })
  })
}) // end validateNode()
