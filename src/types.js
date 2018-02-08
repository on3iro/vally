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

/**
  * Definition
  * @memberof types
  */
export type Definition = {|
  node: HTMLInputElement,
  validators: Array<Validator>
|}

/**
  * Fields
  * @memberof types
  */
export type Fields = Array<Definition>

export type Validation = {|
  isValid: boolean,
  node: HTMLInputElement,
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
