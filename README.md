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

<!-- vim-markdown-toc GFM -->

* [Installation](#installation)
* [Usage](#usage)
  * [Example](#example)
* [API](#api)
  * [Docs](#docs)
* [FAQ](#faq)
  * [How can i specify a field as _required_?](#how-can-i-specify-a-field-as-_required_)
  * [What happens to inputs that are not displayed?](#what-happens-to-inputs-that-are-not-displayed)
  * [How can I bind vally to certain events?](#how-can-i-bind-vally-to-certain-events)

<!-- vim-markdown-toc -->

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

## API

### Docs

Configuration and API details can be found here:

[![api docs](https://img.shields.io/badge/docs-API-39CCCC.svg)](https://on3iro.github.io/vally)

## FAQ

### How can i specify a field as _required_?

> Just use the regular _[required](https://developer.mozilla.org/de/docs/Web/HTML/Element/Input#attr-required)_-Attribute
> on your `<input>`.

### What happens to inputs that are not displayed?

> Inputs that are not displayed (i.e. if `display: none`, `type="hidden"` or `hidden=""` is set), are
> simply ignored by the validation.

### How can I bind vally to certain events?

> There are multiple ways to use _vally_.
> Case **1.** and **2.** give you the most control over when vally is called (i.e. by binding it on the submit event).
> Case **3.** handles the common case of validating on blur.
>
> 1.  Just call the `validate()`-function somewhere inside your event listener
> 2.  If you want to use a validate function with the same configuration on different parts of your code
>     create a pre-configured `validate()`-function by calling `makeValidate(config)`. This function can then
>     be used / passed around.
> 3.  You can use `makeValidationWithBlurBindings()` to create a function which initializes automatic validation for every field you specified to fire on the _blur_ event. This function also returns an array of `removeEventListeners` in case you want to get rid of
>     the listeners later on.
