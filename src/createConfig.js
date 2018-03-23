// @flow

import type { Validator, Config } from './types'

/**
  * This is just a simple helper/wrapper function to automatically fetch
  * single nodes and return a valid configuration. Instead of directly
  * passing in the nodes, the configuration will expect a selector-string
  * for each of the specified fields. Behind the scenes createConfig will
  * then invoke document.querySelector(selector) and add it to the returned
  * config. If a node cannot be found, a console warning is emitted and the
  * field will be skipped.
  * @param specs - Specifications that describe each field and their corresponding Validators
  * @return {Config} a valid vally config to use with vally.validate, vally.initWithBindings etc.
  */
const createConfig = (specs: Array<{
  selector: string,
  validators: Array<Validator>
}>
): Config => {
  // $FlowFixMe
  return {
    fields: specs.reduce((acc, spec) => {
      const node = document.querySelector(spec.selector)

      if (!node) {
        console.warn(`vally, createConfig: node with selector "${spec.selector}" could not be found!`)

        return acc
      }

      // $FlowFixMe
      const { mock } = node
      const isInputOrSelect = (
        node instanceof HTMLInputElement ||
        node instanceof HTMLSelectElement
      )

      if (!mock && !isInputOrSelect) {
        console.warn(`vally, createConfig: node with selector "${spec.selector}" is not a valid input/select Element!`)

        return acc
      }

      return [ ...acc, {
        node,
        validators: spec.validators
      } ]
    }, [])
  }
}

export default createConfig
