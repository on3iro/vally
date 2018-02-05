// @flow

import {
  isString,
  isNumberString
} from '../validators'

import { makeSetUp } from './fixtures'
import makeValidationWithBlurBindings from '../makeValidationWithBlurBindings'

describe('makeValidationWithBlurBindings()', () => {
  const setUp = makeSetUp(makeValidationWithBlurBindings)

  it('should return empty array, if the specified container cannot be found', () => {
    const { result } = setUp({
      containerSelector: 'barTainer'
    })

    const removeListeners = result()
    expect(removeListeners.length).toBe(0)
  })

  it('should call addEventListener for each field and return removeListeners array', () => {
    const { DOMStub, result } = setUp({
      fields: [
        {
          selector: '.input_string',
          validators: [ isString ]
        },
        {
          selector: '.input_num-string',
          validators: [ isString, isNumberString ]
        }
      ]
    })

    const removeListeners = result()
    expect(removeListeners.length).toBe(2)

    expect(DOMStub.body['.input_string'].addEventListener).toHaveBeenCalledWith('blur', expect.anything())
    expect(DOMStub.body['.input_num-string'].addEventListener).toHaveBeenCalledWith('blur', expect.anything())
  })
}) // end makeValidationWithBlurBindings()
