// @flow

import validate from './validate'
import type { Config } from './types'

/**
  * Simple higher-order function for the purpose of convenience. Creates a preconfigured validate() function, that can be used throughout your app. In addition this provides a second errCallback parameter, that can pass in.
  * @function makeValidate
  * @memberof validation
  * @param {Config} config - See validate function for a detailed explanaition of the config object
  * @param {Function} errCallback - Callbackfunction that is invoked if validation fails, with the configuration as its first argument
  * @return {Function} - validate function
  */
const makeValidate = (
  config: Config,
  errCallback: ?Function
): Function => ():boolean => {
  const isValid = validate(config)

  if (isValid) return isValid

  if (errCallback) errCallback(config)

  return isValid
}

export default makeValidate
