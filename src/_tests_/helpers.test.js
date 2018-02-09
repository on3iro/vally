// @flow

import {
  debounce
} from '../helpers'

jest.useFakeTimers()

describe('debounce()', () => {
  it('should call correct function after correct amount of time', () => {
    debounce(() => {}, 1000)()

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000)
  })
}) // end debounce()
