// @flow

import type {
  Config,
  Result
} from './types'

import { debounce } from './helpers'

import validate from './validate'

type RemoveListeners = Array<() => void>

/**
 * Adds an eventListener to each given node. The listener is wrapped
 * with a debounce function and will invoke the callback when the specified
 * event is triggered.
 * An array of removeEventListener functions is returned, so listeners could
 * be removed if necesseary.
 *
  * @function initWithBindings
  * @param {Object} config
  * @param {Array<Field>} config.fields - Array of field definitions
  * @param {string} event - event to be bound to
  * @param {(e: Event, res: Result) => any} callback - Function to invoke when event is triggered on node
  * @param {number} [debounceTime=0] - time to debounce callback invocation (in ms)
  * @return {Array} - RemoveListeners
  */
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
