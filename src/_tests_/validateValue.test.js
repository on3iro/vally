// @flow

import {
  isString,
  isNumberString
} from '../validators'

import validateValue from '../validateValue'

describe('validateValue()', () => {
  it('should handle a single validator, (CASE: is valid)', () => {
    expect(validateValue('some string', [ isString ])).toBe(true)
    expect(validateValue('22', [ isNumberString ])).toBe(true)
  })

  it('should handle a single validator, (CASE: is invalid)', () => {
    expect(validateValue('some string', [ isNumberString ])).toBe(false)
    expect(validateValue(22, [ isString ])).toBe(false)
  })

  it('should handle multiple validators, (CASE: is valid)', () => {
    expect(validateValue('22', [ isString, isNumberString ])).toBe(true)
  })

  it('should handle multiple validators, (CASE: is invalid)', () => {
    expect(validateValue('somestring', [ isString, isNumberString ])).toBe(false)
  })

  it('should handle case where other tests are skipped after first invalid case', () => {
    expect(validateValue('somestring', [ isNumberString, isString ])).toBe(false)
  })
}) // end validateValue()
