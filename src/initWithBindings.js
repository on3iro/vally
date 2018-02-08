// @flow

import type {
  Config,
  Result
} from './types'

import { debounce } from './helpers'

import validate from './validate'

type RemoveListeners = Array<() => void>

const initWithBindings = (
  { fields }: Config,
  event: string,
  callback: (e: Event, res: Result) => any,
  debounceTime: number = 0
): RemoveListeners =>
  fields.map(f => {
    const validateFn = () => validate({ fields: [ f ] })
    const handler = (e) => {
      const result = validateFn()
      callback(e, result)
    }

    const debouncedHandler = debounce(handler, debounceTime)

    f.node.addEventListener(event, debouncedHandler)

    return () => f.node.removeEventListener(event, debouncedHandler)
  })

export default initWithBindings
