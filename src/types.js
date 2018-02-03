// @flow

export type Validator = (val:any) => boolean

export type Field = {|
  selector: string,
  errorSelector?: string,
  errorClass?: string,
  validators: Array<Validator>
|}

export type Fields = Array<Field>

export type ContainerSelector = string

type Stub = Document | Object

export type Config = {|
  containerSelector?: ContainerSelector,
  fields: Fields,
  DOMStub?: Stub
|}
