// @flow

import {
  isNoneEmptyString,
  isNumberString
} from '../validatorFns'

import createConfig from '../createConfig'

describe('createConfig()', () => {
  const nonEmptyValidator = {
    fn: isNoneEmptyString,
    type: 'NONE_EMPTY'
  }

  const numberValidator = {
    fn: isNumberString,
    type: 'NUMBER'
  }

  const noneEmptyNode = '<input class="noneEmptyNode" value="some string">'
  const numberNode = '<input class="numberNode" value="8">'
  const emptyStrNode = '<input class="emptyStrNode" value="" required>'

  const setUp = (specOW) => {
    if (document && document.body) {
      document.body.innerHTML = `
        ${noneEmptyNode}
        ${numberNode}
        ${emptyStrNode}
      `
    }

    const spec = specOW || [{
      selector: '.noneEmptyNode',
      validators: [ nonEmptyValidator ]
    }, {
      selector: '.numberNode',
      validators: [ numberValidator ]
    }, {
      selector: '.emptyStrNode',
      validators: [ nonEmptyValidator ]
    }]

    const config = createConfig(spec)

    return {
      config
    }
  }

  it('should return valid config with nodes', () => {
    const { config } = setUp()

    expect(config.fields.length).toBe(3)
    expect(config).toMatchSnapshot()
  })

  it('should skip spec if node cannot be found', () => {
    const { config } = setUp([{
      selector: '.noneEmptyNode',
      validators: [ nonEmptyValidator ]
    }, {
      selector: '.doesNotExist',
      validators: [ nonEmptyValidator ]
    }, {
      selector: '.numberNode',
      validators: [ numberValidator ]
    }, {
      selector: '.emptyStrNode',
      validators: [ nonEmptyValidator ]
    }])

    expect(config.fields.length).toBe(3)
    expect(config).toMatchSnapshot()
  })
}) // end createConfig()
