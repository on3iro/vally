### Config

| property             | type           | default      | required     | description                                                                                |
| :------------------- | -------------- | :----------: | :----------: | :----------------------------------------------------------------------------------------- |
| containerSelector    | string         | `'body'`     | -            | `querySelector` compatible string. Used to get the wrapping element to look for fields.    |
| fields               | Array<Field>   | `[]`         | yes          |                                                                                            |
| DOMStub :warning:    | Object         | -            | -            | This is a dev-only feature used for unit-tests - do not use this in production!            |


### Field

| property        | type               | default       | required     | description                                                                                                                                                    |
| --------------- | ------------------ | :-----------: | :----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector        | string             | -             | yes          | `querySelector` compatible string. Used to get the input node.                                                                                                 |
| errorSelector   | string             | -             | -            | `querySelector` compatible string. Used to get the element to add the `errorClass` to. If no class is specified the `<input>` field it self will be targeted   |
| errorClass      | string             | `'error'`     | -            | CSS class to add to the specified DOM element.                                                                                                                 |
| validators      | Array<Validator>   | -             | yes          | Array of Validator functions                                                                                                                                   |

### Validators

Whenever _vally_ is run each input value will consequtively be applied to each of its validator functions.
A validation function should always look like this:

```js
type Validator = (any) => boolean
```

Predefined validators can be found inside the API-documentation.
