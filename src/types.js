// @flow

/**
  * @namespace types
  */

export type ValidatorFn = (val:any) => boolean

/**
  * Validator
  * @memberof types
  */
export type Validator = {
  fn: ValidatorFn,
  type?: string
}

export type Node = HTMLInputElement | HTMLSelectElement

/**
  * Definition
  * @memberof types
  */
export type Definition = {|
  node: Node,
  validators: Array<Validator>
|}

/**
  * Fields
  * @memberof types
  */
export type Fields = Array<Definition>

export type Validation = {|
  isValid: boolean,
  node: Node,
  validator: ?Validator
|}

export type Result = {|
  isValid: boolean,
  validations: Array<Validation>
|}

/**
  * Config
  * @memberof types
  */
export type Config = {|
  fields: Fields
|}
