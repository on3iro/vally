import {
  // validators
  isEmail,
  isEmpty,
  isNoneEmptyString,
  isNumberString,
  isString,
  // validation
  validateNode,
  validate
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

  it('should export validateNode', () => {
    expect(typeof validateNode).toBe('function')
  })

  it('should export validate', () => {
    expect(typeof validate).toBe('function')
  })
})
