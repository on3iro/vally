// @flow

import makeValidate from './makeValidate'
import type { Config } from './types'
import { debounce } from './helpers'

const makeValidationWithBindings = ({
  containerSelector = 'body',
  fields,
  DOMStub
}: Config,
  event: string,
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
