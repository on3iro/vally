// @flow

import validate from './validate'
import type { Config } from './types'

/**
  * Simple higher-order function for the purpose of convenience. Creates a preconfigured validate() function, that can be used throughout your app. In addition this provides an optional callback parameter. The callback function will be invoked after each call to the validate() function and will receive and object { config: Config, isValid: boolean } as its first argument.
  * @function makeValidate
  * @memberof validation
  * @param {Config} config - See validate function for a detailed explanaition of the config object
  * @param {Function} [callbackFn] - function that is invoked after each call to the validation and receives an object { config: Config, isValid: boolean } as its first argument
  * @return {Function} - validate function
  */
const makeValidate = <T: Config>(
  config: T,
  callbackFn: ?({ config: T, isValid: boolean }) => any
): Function => ():boolean => {
  const isValid = validate(config)

  if (callbackFn) callbackFn({ config, isValid })

  return isValid
}

export default makeValidate
