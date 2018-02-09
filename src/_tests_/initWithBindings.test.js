// @flow

import {
  isNoneEmptyString,
  isNumberString
} from '../validatorFns'

import {
  nodeFactory
} from './fixtures'

import initWithBindings from '../initWithBindings'

describe('initWithBindings()', () => {
  const nonEmptyValidator = {
    fn: isNoneEmptyString,
    type: 'NONE_EMPTY'
  }

  const numberValidator = {
    fn: isNumberString,
    type: 'NUMBER'
  }

  it('should return array with removeListeners and call eventListeners', () => {
    const noneEmptyNode = { ...nodeFactory(), value: 'some string' }
    const numberNode = { ...nodeFactory(), value: '8' }

    const removeListeners = initWithBindings({
      fields: [
        {
          // $FlowFixMe
          node: noneEmptyNode,
          validators: [ nonEmptyValidator ]
        },
        {
          // $FlowFixMe
          node: numberNode,
          validators: [ numberValidator ]
        }
      ]
    }, 'keyup', (e, res) => null, 50)

    expect(removeListeners.length).toBe(2)
    expect(noneEmptyNode.addEventListener).toHaveBeenCalledWith('keyup', expect.anything())
    expect(numberNode.addEventListener).toHaveBeenCalledWith('keyup', expect.anything())
  })
}) // end initWithBindings()
