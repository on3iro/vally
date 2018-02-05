import {
  // validators
  isEmail,
  isEmpty,
  isNoneEmptyString,
  isNumberString,
  isString,
  // validation
  validateValue,
  makeValidate,
  validate,
  makeValidationWithBlurBindings
} from '../index'

describe('index', () => {
  it('should export isEmail', () => {
    expect(typeof isEmail).toBe('function')
  })

  it('should export isEmpty', () => {
    expect(typeof isEmpty).toBe('function')
  })

  it('should export isNoneEmptyString', () => {
    expect(typeof isNoneEmptyString).toBe('function')
  })

  it('should export isNumberString', () => {
    expect(typeof isNumberString).toBe('function')
  })

  it('should export isString', () => {
    expect(typeof isString).toBe('function')
  })

  it('should export validateValue', () => {
    expect(typeof validateValue).toBe('function')
  })

  it('should export makeValidate', () => {
    expect(typeof makeValidate).toBe('function')
  })

  it('should export validate', () => {
    expect(typeof validate).toBe('function')
  })

  it('should export makeValidationWithBlurBindings', () => {
    expect(typeof makeValidationWithBlurBindings).toBe('function')
  })
})
