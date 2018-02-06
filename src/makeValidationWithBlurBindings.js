// @flow

import makeValidationWithBindings from './makeValidationWithBindings.js'
import type { Config } from './types'

/**
  * Returns a function that initialilzes validation with the specified configuration.
  * An onBlur EventListener with a single field validation callback will be added to each respective input field.
  * Optionally you can add a callback function, that will be invoked after each validation.
  *
  * @function makeValidationWithBlurBindings
  * @deprecated
  * @memberof validation
  * @public
  * @param {Config} config - see validate function for detailed explaination of the config object
  * @param {Function} [callback] - function that gets invoked whenever a field fails validation.
  *   this function will receive and object { config: Config, isValid: boolean } as first argument.
  * @return {Function} () => Array<Function> - returns an initializer Function, which returns an array of removeEventListener functions
  */
const makeValidationWithBlurBindings = ({
  containerSelector = 'body',
  fields,
  DOMStub
}: Config,
  callbackFn: ?({ config: Config, isValid: boolean }) => any
): Function => (): Array<() => void> => {
  return makeValidationWithBindings(
    {
      containerSelector,
      fields,
      DOMStub
    },
    'blur',
    callbackFn
  )()
}

export default makeValidationWithBlurBindings
