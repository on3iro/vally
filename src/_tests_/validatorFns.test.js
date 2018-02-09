// @flow

import {
  isEmail,
  isEmpty,
  isNil,
  isNoneEmptyString,
  isNull,
  isNumber,
  isNumberString,
  isString,
  isUndefined,
  testRegex
} from '../validatorFns'

describe('testRegex()', () => {
  it('should return false if val is no string', () => {
    // $FlowFixMe
    expect(testRegex(2, /./)).toBe(false)
  })

  it('should return true if regex found in string', () => {
    expect(testRegex('hi', /^hi/g)).toBe(true)
  })

  it('should return false if regex is not found in string', () => {
    expect(testRegex('ho', /^hi/g)).toBe(false)
  })
}) // end testRegex

describe('isUndefined()', () => {
  it('should return true if value is undefined', () => {
    expect(isUndefined(undefined)).toBe(true)
  })

  it('should return false on anything else', () => {
    expect(isUndefined(2)).toBe(false)
    expect(isUndefined('')).toBe(false)
    expect(isUndefined('string')).toBe(false)
  })
}) // end isUndefined()

describe('isNumber()', () => {
  it('should return true for any number', () => {
    expect(isNumber(2)).toBe(true)
    expect(isNumber(2.5)).toBe(true)
  })

  it('should return false on anything else', () => {
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber('')).toBe(false)
    expect(isNumber('string')).toBe(false)
  })
}) // end isNumber()

describe('isNull()', () => {
  it('should return true if  value is null', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should return false on anything else', () => {
    expect(isNull(undefined)).toBe(false)
    expect(isNull('')).toBe(false)
    expect(isNull('string')).toBe(false)
    expect(isNull(2)).toBe(false)
  })
}) // end isNull()

describe('isNil()', () => {
  it('should return true if value is undefined', () => {
    expect(isNil(undefined)).toBe(true)
  })

  it('should return true if value is null', () => {
    expect(isNil(null)).toBe(true)
  })

  it('should return false on anything else', () => {
    expect(isNil('')).toBe(false)
    expect(isNil('test')).toBe(false)
    expect(isNil(1)).toBe(false)
  })
}) // end isNil()

describe('isEmpty()', () => {
  it('should return true if value is undefined', () => {
    expect(isEmpty(undefined)).toBe(true)
  })

  it('should return true if value.length is zero', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('should return false if value is anything else', () => {
    expect(isEmpty('Kerze')).toBe(false)
    expect(isEmpty(1)).toBe(false)
  })
}) // end isEmpty()

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
