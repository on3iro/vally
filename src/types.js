// @flow

/**
  * @namespace types
  */

/**
  * Validator
  * @memberof types
  */
export type Validator = (val:any) => boolean

/**
  * Field
  * @memberof types
  */
export type Field = {|
  selector: string,
  errorSelector?: string,
  errorClass?: string,
  validators: Array<Validator>
|}

/**
  * Fields
  * @memberof types
  */
export type Fields = Array<Field>

/**
  * ContainerSelector
  * @memberof types
  */
export type ContainerSelector = string

/**
  * Stub
  * @memberof types
  * @private
  */
type Stub = Document | Object

/**
  * Config
  * @memberof types
  */
export type Config = {|
  containerSelector?: ContainerSelector,
  fields: Fields,
  DOMStub?: Stub
|}
