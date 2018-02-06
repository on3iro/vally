// @flow

import makeValidate from './makeValidate'
import type { Config } from './types'
import { debounce } from './helpers'

/**
  * Returns a function that initializes validation with the specified configuration.
  * When the returned function is called, an eventListener will be added for each
  * configured input field. This will in turn return an array of removeListener functions
  * you can invoke to get rid of the listeners later on.
  * Optionally you can add a callback function, that will be invoked after each validation.
  *
  * @function makeValidationWithBindings
  * @public
  * @param {Config} config
  * @param {string} [event=blur] - event to bind on
  * @param {Function} [callback] - function that gets invoked whenever a field fails validation.
  * @param {number} [debounceTime=0] - time to debounce events before the validation is called
  *   this function will receive and object { config: Config, isValid: boolean } as first argument.
  * @return {Function} () => Array<Function> - returns an initializer Function, which returns an array of removeEventListener functions
  */
const makeValidationWithBindings = ({
  containerSelector = 'body',
  fields,
  DOMStub
}: Config,
  event: string = 'blur',
  callbackFn: ?({ config: Config, isValid: boolean }) => any,
  debounceTime: number = 0
): Function => (): Array<() => void> => {
  const warnBaseStr = 'vally, makeValidationWithBindings():'

  const doc = DOMStub || window.document
  const container = doc.querySelector(containerSelector)

  if (!container) {
    console.warn(`${warnBaseStr} Container "${containerSelector}" could not be found!`)
    return []
  }

  const removeListeners = fields.map(f => {
    const fNode = container.querySelector(f.selector)

    if (!fNode) {
      console.warn(`${warnBaseStr} The field ${f.selector} could not be found!`)
      return () => undefined
    }

    const validateFn = makeValidate({
      containerSelector,
      fields: [ f ]
    }, callbackFn)

    const debouncedFn = debounce(validateFn, debounceTime)

    fNode.addEventListener(event, debouncedFn)

    return () => fNode.removeEventListener(event, debouncedFn)
  })

  return removeListeners
}

export default makeValidationWithBindings
