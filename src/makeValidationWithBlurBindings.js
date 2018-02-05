// @flow

import makeValidate from './makeValidate'
import type { Config } from './types'

/**
  * Returns a function that initialilzes validation with the specified configuration.
  * An onBlur EventListener with a single field validation callback will be added to each respective input field.
  *
  * @function makeValidationWithBlurBindings
  * @memberof validation
  * @public
  * @param {Config} config - see validate fucntion for detailed explaination of the config object
  * @param {Function} errCallback - a callback function that gets called whenever a field fails validation
  * @return {Function} () => Array<Function> - returns a initializer Function, which returns an array of removeEventListener functions
  */
const makeValidationWithBlurBindings = ({
  containerSelector = 'body',
  fields,
  DOMStub
}: Config,
  errCallback: Function
): Function => (): Array<() => void> => {
  const warnBaseStr = 'vally, makeValidationWithBlurBindings():'

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

    const validateF = makeValidate({
      containerSelector,
      fields: [ f ]
    }, errCallback)

    fNode.addEventListener('blur', validateF)

    return () => fNode.removeEventListener('blur', validateF)
  })

  return removeListeners
}

export default makeValidationWithBlurBindings
