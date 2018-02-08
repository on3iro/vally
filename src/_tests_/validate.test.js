// @flow

import {
  isNoneEmptyString,
  isNumberString
} from '../validatorFns'

import {
  nodeFactory
} from './fixtures'

import validate from '../validate'

describe.only('validate()', () => {
  const nonEmptyValidator = {
    fn: isNoneEmptyString,
    type: 'NONE_EMPTY'
  }

  const numberValidator = {
    fn: isNumberString,
    type: 'NUMBER'
  }

  const noneEmptyNode = { ...nodeFactory(), value: 'some string' }
  const numberNode = { ...nodeFactory(), value: '8' }
  const emptyStrNode = { ...nodeFactory(), value: '', required: true }

  it('should return isValid: true if all fields succeed', () => {
    const result = validate({
      fields: [
        {
          // $FlowFixMe
          node: noneEmptyNode,
          validators: [ nonEmptyValidator ]
        },
        {
          // $FlowFixMe
          node: numberNode,
          validators: [ numberValidator ]
        }
      ]
    })

    expect(result.isValid).toBe(true)
  })

  it('should return isValid: false if any validation fails', () => {
    const result = validate({
      fields: [
        {
          // $FlowFixMe
          node: noneEmptyNode,
          validators: [ nonEmptyValidator ]
        },
        {
          // $FlowFixMe
          node: emptyStrNode,
          validators: [ nonEmptyValidator ]
        },
        {
          // $FlowFixMe
          node: numberNode,
          validators: [ numberValidator ]
        }
      ]
    })

    expect(result.isValid).toBe(false)

    const failingResult = result.validations.find(v => !v.isValid)
    // $FlowFixMe
    expect(failingResult.validator.type).toBe('NONE_EMPTY')
  })
}) // end validate()
