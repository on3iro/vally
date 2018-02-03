[![Build Status](https://travis-ci.org/on3iro/vally.svg?branch=master)](https://travis-ci.org/on3iro/vally)
[![Coverage Status](https://coveralls.io/repos/github/on3iro/vally/badge.svg?branch=master)](https://coveralls.io/github/on3iro/vally?branch=master)
[![npm version](https://badge.fury.io/js/vally.svg)](https://badge.fury.io/js/vally)
[![Maintainability](https://api.codeclimate.com/v1/badges/62a915f14bfd69e6a10f/maintainability)](https://codeclimate.com/github/on3iro/vally/maintainability)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![api docs](https://img.shields.io/badge/docs-API-39CCCC.svg)](https://on3iro.github.io/vally)
[![GitHub](https://img.shields.io/badge/GitHub-vally-39CCCC.svg)](https://github.com/on3iro/vally)

# vally

**vally** is a simple ES6 form field validation library, that helps
to determine if field values inside a container element pass certain tests.


## Installation

```shell
npm i --save vally
```

You can either use the build from inide the `dist/` directory and include
it via `<script>`-tag or use `require` / `import`-syntax in your code.

```html
<html lang="en">
  <head></head>
  <body>
    <script>
      vally.isString(1) // => false
    </script>
  </body
  <script src="./vally.min.js"></script>
</html
```

or


```js
import { isString } from 'vally'

isString(1) // => false
```


## Usage

**vally** itself does only provide the helper functions needed to validate and
render an error class if a validation for a field fails.
Therefore you need to prepare your HTML in advance.
_(**Note:** I do plan to add
insertion of custom HTML-templates for advanced use cases in the future)_


### Example

```html
<html lang="en">
  <head></head>
  <body>
    <form class="js-my-container">
      <input type="text" name="name" id="js-name">
      <input type="text" name="mail" id="js-mail">
    </form>
  </body
</html
```

```js
import {
  validate,
  isNoneEmptyString,
  isEmail
} from 'vally'

const isValid = validate({
  containerSelector: '.js-my-container',
  fields: [
    {
      selector: '#js-name',
      validators: [ isNoneEmptyString ]
    },
    {
      selector: '#js-mail',
      validators: [ isEmail ]
    }
  ]
})
// if all validation checks pass => returns true
// else => returns false and an 'error' class is added to the respective <input>
```


## Versioning

We use [SemVer](http://semver.org/) for versioning.
