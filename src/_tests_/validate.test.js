// @flow

import {
  isString,
  isNumberString
} from '../validators'
import validate from '../validate'

import { makeSetUp } from './fixtures'

describe('validate()', () => {
  const setUp = makeSetUp(validate)

  it('should return false if container cannot be found', () => {
    const { result } = setUp({
      containerSelector: 'fooTainer'
    })

    expect(result).toBe(false)
  })

  it('should return false if a field cannot be found', () => {
    const { result } = setUp({
      fields: [
        {
          selector: '.input_missing',
          validators: [ isString ]
        }
      ]
    })

    expect(result).toBe(false)
  })

  it('should handle single field', () => {
    const { result } = setUp({
      fields: [{
        selector: '.input_string',
        validators: [ isString ]
      }]
    })

    expect(result).toBe(true)
  })

  it('should hanle multiple fields', () => {
    const { result } = setUp({
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

    expect(result).toBe(true)
  })

  it('should add default errorClass to fieldNode', () => {
    const { result, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_string',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(result).toBe(false)

    const fieldNode = DOMStub.body['.input_string']
    expect(fieldNode.classList.add).toHaveBeenCalledWith('error')
  })

  it('should add specified errorClass to fieldNode', () => {
    const { result, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_string',
          errorClass: 'ERROR',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(result).toBe(false)

    const fieldNode = DOMStub.body['.input_string']
    expect(fieldNode.classList.add).toHaveBeenCalledWith('ERROR')
  })

  it('should add errorClass to specified target node with errorSelector', () => {
    const { result, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_string',
          errorSelector: '.container_1',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(result).toBe(false)

    const containerNode = DOMStub.body['.container_1']
    expect(containerNode.classList.add).toHaveBeenCalledWith('error')
  })

  it('should remove error class if error is no longer present', () => {
    const { result, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_string',
          validators: [ isString ]
        }
      ]
    })

    expect(result).toBe(true)

    const fieldNode = DOMStub.body['.input_string']
    expect(fieldNode.classList.remove).toHaveBeenCalledWith('error')
  })

  it('should simply return true for hidden fields', () => {
    const { result } = setUp({
      fields: [
        {
          selector: '.input_hidden',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(result).toBe(true)
  })

  it('should handle isRequired flag === true and return false if field is empty', () => {
    const { result } = setUp({
      fields: [
        {
          selector: '.input_required_undefined',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(result).toBe(false)
  })

  it('should handle isRequired flag === false and skip other checks if field is empty', () => {
    const { result } = setUp({
      fields: [
        {
          selector: '.input_undefined',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(result).toBe(true)
  })
}) // end validate()
