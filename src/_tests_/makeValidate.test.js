// @flow

import makeValidate from '../makeValidate'
import {
  isNumberString
} from '../validators'

import { makeSetUp } from './fixtures'

describe('makeValidate()', () => {
  const setUp = makeSetUp(makeValidate)

  it('should return pre-configured validate function', () => {
    // result is the validationFn
    const { result, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_string',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(result()).toBe(false)

    const fieldNode = DOMStub.body['.input_string']
    expect(fieldNode.classList.add).toHaveBeenCalledWith('error')
  })

  it('should return function with optional resultOnly parameter', () => {
    const { result, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_string',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(result(true)).toBe(false)

    const fieldNode = DOMStub.body['.input_string']
    expect(fieldNode.classList.add).not.toHaveBeenCalledWith('error')
  })
}) // end makeValidate()

describe('makeValidate() with callback', () => {
  const setUp = makeSetUp(makeValidate)

  it('should invoke callback', () => {
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
