import {
  isString,
  isNumberString
} from '../validators'

import {
  validate,
  validateString
} from '../validation'

describe('validateString()', () => {
  it('should handle a single validator, (CASE: is valid)', () => {
    expect(validateString('some string', [ isString ])).toBe(true)
    expect(validateString('22', [ isNumberString ])).toBe(true)
  })

  it('should handle a single validator, (CASE: is invalid)', () => {
    expect(validateString('some string', [ isNumberString ])).toBe(false)
    expect(validateString(22, [ isString ])).toBe(false)
  })

  it('should handle multiple validators, (CASE: is valid)', () => {
    expect(validateString('22', [ isString, isNumberString ])).toBe(true)
  })

  it('should handle multiple validators, (CASE: is valid)', () => {
    expect(validateString('somestring', [ isString, isNumberString ])).toBe(false)
  })
}) // end validateString()

describe('validate()', () => {
  function querySelector (sel) {
    return this[sel]
  }

  const nodeFactory = () => {
    return {
      querySelector,
      insertAdjacentHTML: jest.fn(),
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      },
      style: {
        display: ''
      }
    }
  }

  const setUp = (configOW) => {
    const document = nodeFactory()
    const body = {
      ...nodeFactory(),
      '.container_1': {
        ...nodeFactory()
      },
      '.input_1': {
        ...nodeFactory(),
        value: 'some string'
      },
      '.input_2': {
        ...nodeFactory(),
        value: '22'
      },
      '.input_3': {
        ...nodeFactory(),
        value: 'something',
        style: {
          display: 'none'
        }
      }
    }

    const DOMStub = {
      ...document,
      body
    }

    const config = {
      fields: [],
      DOMStub,
      ...configOW
    }

    const isValid = validate(config)

    return {
      DOMStub,
      isValid
    }
  }

  it('should handle single field', () => {
    const { isValid } = setUp({
      fields: [{
        selector: '.input_1',
        validators: [ isString ]
      }]
    })

    expect(isValid).toBe(true)
  })

  it('should hanle multiple fields', () => {
    const { isValid } = setUp({
      fields: [
        {
          selector: '.input_1',
          validators: [ isString ]
        },
        {
          selector: '.input_2',
          validators: [ isString, isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(true)
  })

  it('should add default errorClass to fieldNode', () => {
    const { isValid, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_1',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(false)

    const fieldNode = DOMStub.body['.input_1']
    expect(fieldNode.classList.add).toHaveBeenCalledWith('error')
  })

  it('should add specified errorClass to fieldNode', () => {
    const { isValid, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_1',
          errorClass: 'ERROR',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(false)

    const fieldNode = DOMStub.body['.input_1']
    expect(fieldNode.classList.add).toHaveBeenCalledWith('ERROR')
  })

  it('should add errorClass to specified target node with errorSelector', () => {
    const { isValid, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_1',
          errorSelector: '.container_1',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(false)

    const containerNode = DOMStub.body['.container_1']
    expect(containerNode.classList.add).toHaveBeenCalledWith('error')
  })

  it('should remove error class if error is no longer present', () => {
    const { isValid, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_1',
          validators: [ isString ]
        }
      ]
    })

    expect(isValid).toBe(true)

    const fieldNode = DOMStub.body['.input_1']
    expect(fieldNode.classList.remove).toHaveBeenCalledWith('error')
  })

  it('should simply return true for hidden fields', () => {
    const { isValid } = setUp({
      fields: [
        {
          selector: '.input_3',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(true)
  })

  it('should handle isRequired flag === true and return false if field is empty')

  it('should handle isRequired flag === false and skip other checks if field is empty')
}) // end validate()

describe('makeValidate()', () => {
  it('should return pre-configured validate function')
}) // end makeValidate()
