// @flow

import type { Validator, Config } from './types'

const createConfig = (specs: Array<{
  selector: string,
  validators: Array<Validator>
}>
): Config => {
  // $FlowFixMe
  return {
    fields: specs.reduce((acc, spec) => {
      const node = document.querySelector(spec.selector)

      if (!(
        node &&
        (
          node.mock ||
          (node instanceof HTMLInputElement || node instanceof HTMLSelectElement)
        )
      )) {
        console.warn(`vally, createConfig: node with selector "${spec.selector}" could not be found!`)

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
