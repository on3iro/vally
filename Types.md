# Types

Vally's documentation makes heavy use of types.
If certain parameters or return values are unclear, please refer to this section.

## ValidatorFn

A function that checks if a value passes certain tests

```js
type ValidatorFn = (val: any) => boolean
```


## Node

```js
type Node = HTMLInputElement | HTMLSelectElement
```


## Validator

The validator object should always at least contain a valid `ValidatorFn`.
You can add any other properties you might need for later evaluation.

```js
type Validator = {
  fn: ValidatorFn,
  type?: string
}
```


## Definition

A field definition. Should always contain a node to validate and an array
of its validators.

```js
type Definition = {|
  node: Node,
  validators: Array<Validator>
|}
```


## Fields

```js
type Fields = Array<Definition>
```


## Config

Currently only holds FieldDefinitions. Might be enhanced in the future.

```js
type Config = {|
  fields: Fields
|}
```


## Validation

A validation represents the validation result of a single node.
If validation fails at any point, `validator` will be the `Validator`-object
that failed the test.

```js
type Validation = {|
  isValid: boolean,
  node: Node,
  validator: ?Validator
|}
```


## Result

Result of the validation of all field definitions (from a single function call).
If any field failed, the whole validation is marked as invalid.

```js
type Result = {|
  isValid: boolean,
  validations: Array<Validation>
|}
```
