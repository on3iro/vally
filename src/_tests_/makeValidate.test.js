// @flow

import makeValidate from '../makeValidate'
import {
  isString,
  isNumberString
} from '../validators'

import { makeSetUp } from './fixtures'

describe('makeValidate()', () => {
  const setUp = makeSetUp(makeValidate)

  it('should return pre-configured validate function', () => {
    // result is the validationFn
    const { result } = setUp({
      fields: [
        {
          selector: '.input_num-string',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(result()).toBe(true)
  })
}) // end makeValidate()

describe('makeValidate() with callback', () => {
  const setUp = makeSetUp(makeValidate)

  it('should not call callback if validation succeeds', () => {
    const callbackMock = jest.fn()
    const { result } = setUp({
      fields: [
        {
          selector: '.input_num-string',
          validators: [ isString, isNumberString ]
        }
      ]
    }, callbackMock)

    expect(result()).toBe(true)
    expect(callbackMock).not.toHaveBeenCalled()
  })

  it('should call callback if validation fails', () => {
    const callbackMock = jest.fn().mockReturnValue(false)
    const { result } = setUp({
      fields: [
        {
          selector: '.input_string',
          validators: [ isNumberString ]
        }
      ]
    }, callbackMock)

    expect(result()).toBe(false)
    expect(callbackMock).toHaveBeenCalled()
  })
}) // end validateWithCallback()
