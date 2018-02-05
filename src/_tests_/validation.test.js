// @flow

import {
  isString,
  isNumberString
} from '../validators'

import {
  validate,
  validateValue,
  makeValidate,
  makeValidationWithBlurBindings
} from '../validation'

// Helpers
function querySelector (sel) {
  return this[sel]
}

const nodeFactory = () => {
  return {
    querySelector,
    insertAdjacentHTML: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    classList: {
      add: jest.fn(),
      remove: jest.fn()
    }
  }
}

// Test suites

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

describe('validate()', () => {
  const setUp = (configOW) => {
    const document = nodeFactory()
    const body = {
      ...nodeFactory(),
      '.container_1': {
        ...nodeFactory()
      },
      '.input_string': {
        ...nodeFactory(),
        value: 'some string'
      },
      '.input_num-string': {
        ...nodeFactory(),
        value: '22'
      },
      '.input_hidden': {
        ...nodeFactory(),
        value: 'something',
        offsetParent: null
      },
      '.input_undefined': {
        ...nodeFactory(),
        value: undefined
      },
      '.input_required_undefined': {
        ...nodeFactory(),
        value: undefined,
        required: true
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

    // $FlowFixMe
    const isValid = validate(config)

    return {
      DOMStub,
      isValid
    }
  }

  it('should return false if container cannot be found', () => {
    const { isValid } = setUp({
      containerSelector: 'fooTainer'
    })

    expect(isValid).toBe(false)
  })

  it('should return false if a field cannot be found', () => {
    const { isValid } = setUp({
      fields: [
        {
          selector: '.input_missing',
          validators: [ isString ]
        }
      ]
    })

    expect(isValid).toBe(false)
  })

  it('should handle single field', () => {
    const { isValid } = setUp({
      fields: [{
        selector: '.input_string',
        validators: [ isString ]
      }]
    })

    expect(isValid).toBe(true)
  })

  it('should hanle multiple fields', () => {
    const { isValid } = setUp({
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

    expect(isValid).toBe(true)
  })

  it('should add default errorClass to fieldNode', () => {
    const { isValid, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_string',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(false)

    const fieldNode = DOMStub.body['.input_string']
    expect(fieldNode.classList.add).toHaveBeenCalledWith('error')
  })

  it('should add specified errorClass to fieldNode', () => {
    const { isValid, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_string',
          errorClass: 'ERROR',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(false)

    const fieldNode = DOMStub.body['.input_string']
    expect(fieldNode.classList.add).toHaveBeenCalledWith('ERROR')
  })

  it('should add errorClass to specified target node with errorSelector', () => {
    const { isValid, DOMStub } = setUp({
      fields: [
        {
          selector: '.input_string',
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
          selector: '.input_string',
          validators: [ isString ]
        }
      ]
    })

    expect(isValid).toBe(true)

    const fieldNode = DOMStub.body['.input_string']
    expect(fieldNode.classList.remove).toHaveBeenCalledWith('error')
  })

  it('should simply return true for hidden fields', () => {
    const { isValid } = setUp({
      fields: [
        {
          selector: '.input_hidden',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(true)
  })

  it('should handle isRequired flag === true and return false if field is empty', () => {
    const { isValid } = setUp({
      fields: [
        {
          selector: '.input_required_undefined',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(false)
  })

  it('should handle isRequired flag === false and skip other checks if field is empty', () => {
    const { isValid } = setUp({
      fields: [
        {
          selector: '.input_undefined',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(isValid).toBe(true)
  })
}) // end validate()

describe('makeValidate()', () => {
  const setUp = (configOW) => {
    const document = nodeFactory()
    const body = {
      ...nodeFactory(),
      '.container_1': {
        ...nodeFactory()
      },
      '.input_num-string': {
        ...nodeFactory(),
        value: '22'
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

    // $FlowFixMe
    const validateFn = makeValidate(config)

    return {
      DOMStub,
      validateFn
    }
  }

  it('should return pre-configured validate function', () => {
    const { validateFn } = setUp({
      fields: [
        {
          selector: '.input_num-string',
          validators: [ isNumberString ]
        }
      ]
    })

    expect(validateFn()).toBe(true)
  })
}) // end makeValidate()

describe('makeValidationWithBlurBindings()', () => {
  const setUp = (configOW) => {
    const document = nodeFactory()
    const body = {
      ...nodeFactory(),
      '.container_1': {
        ...nodeFactory()
      },
      '.input_string': {
        ...nodeFactory(),
        value: 'some string'
      },
      '.input_num-string': {
        ...nodeFactory(),
        value: '22'
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

    // $FlowFixMe
    const initValidation = makeValidationWithBlurBindings(config)

    return {
      DOMStub,
      initValidation
    }
  }

  it('should return empty array, if the specified container cannot be found', () => {
    const { initValidation } = setUp({
      containerSelector: 'barTainer'
    })

    const removeListeners = initValidation()
    expect(removeListeners.length).toBe(0)
  })

  it('should call addEventListener for each field and return removeListeners array', () => {
    const { DOMStub, initValidation } = setUp({
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

    const removeListeners = initValidation()
    expect(removeListeners.length).toBe(2)

    expect(DOMStub.body['.input_string'].addEventListener).toHaveBeenCalledWith('blur', expect.anything())
    expect(DOMStub.body['.input_num-string'].addEventListener).toHaveBeenCalledWith('blur', expect.anything())
  })
}) // end makeValidationWithBlurBindings()
