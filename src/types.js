// @flow

/**
  * @module types
  * @private
  */

export type ValidatorFn = (val:any) => boolean

export type Validator = {
  fn: ValidatorFn,
  type?: string
}

export type Node = HTMLInputElement | HTMLSelectElement

export type Definition = {|
  node: Node,
  validators: Array<Validator>
|}

export type Fields = Array<Definition>

export type NestedFields = Array<{|
  node: Node | Array<Node>,
  validators: Array<Validator>
|}>

export type Validation = {|
  isValid: boolean,
  node: Node,
  validator: ?Validator
|}

export type Result = {|
  isValid: boolean,
  validations: Array<Validation>
|}

export type Config = {|
  fields: Fields
|}
