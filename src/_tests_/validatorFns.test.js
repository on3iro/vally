// @flow

import {
  isEmail,
  isString,
  isNumberString,
  isNoneEmptyString
} from '../validatorFns'

describe('isEmail()', () => {
  it('should return true for "test@test.de"', () => {
    expect(isEmail('test@test.de')).toBe(true)
  })

  it('should return false for "test"', () => {
    expect(isEmail('test')).toBe(false)
  })
}) // end isEmail()

describe('isNumberString()', () => {
  it('should return true for "8"', () => {
    expect(isNumberString('8')).toBe(true)
  })

  it('should return false for "foo"', () => {
    expect(isNumberString('foo')).toBe(false)
  })
}) // end isNumberString()

describe('isNoneEmptyString()', () => {
  it('should return true for "foo"', () => {
    expect(isNoneEmptyString('foo')).toBe(true)
  })

  it('should return false for ""', () => {
    expect(isNoneEmptyString('')).toBe(false)
  })
}) // end isNoneEmptyString()

describe('isString()', () => {
  it('should return true for "foo"', () => {
    expect(isString('foo')).toBe(true)
  })

  it('should return false for 8', () => {
    expect(isString(8)).toBe(false)
  })
}) // end isString()
