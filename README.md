[![Build Status](https://travis-ci.org/on3iro/vally.svg?branch=master)](https://travis-ci.org/on3iro/vally)
[![Coverage Status](https://coveralls.io/repos/github/on3iro/vally/badge.svg?branch=master)](https://coveralls.io/github/on3iro/vally?branch=master)
[![npm version](https://badge.fury.io/js/vally.svg)](https://badge.fury.io/js/vally)
[![Maintainability](https://api.codeclimate.com/v1/badges/62a915f14bfd69e6a10f/maintainability)](https://codeclimate.com/github/on3iro/vally/maintainability)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![api docs](https://img.shields.io/badge/docs-API-39CCCC.svg)](https://on3iro.github.io/vally)
[![GitHub](https://img.shields.io/badge/GitHub-vally-39CCCC.svg)](https://github.com/on3iro/vally)

# vally

**vally** is a simple ES6, zero-dependency form field validation library, that helps
to determine if `<input>`-values pass certain tests.
The library just provides a set of useful helper functions. Most of the DOM-manipulation
and validation handling still lies in the hands of the user to ensure as much
flexibility as possible.


<!-- vim-markdown-toc GFM -->

* [Installation](#installation)
* [API](#api)
  * [Docs](#docs)
* [FAQ](#faq)
  * [Why not just use HTML5 validation?](#why-not-just-use-html5-validation)
  * [How can i specify a field as _required_?](#how-can-i-specify-a-field-as-_required_)
  * [What happens to inputs that are not displayed?](#what-happens-to-inputs-that-are-not-displayed)
  * [How can I bind vally to certain events?](#how-can-i-bind-vally-to-certain-events)
  * [Why does vally ship so few validator functions?](#why-does-vally-ship-so-few-validator-functions)
  * [How can I use a validator function with multiple arguments?](#how-can-i-use-a-validator-function-with-multiple-arguments)
    * [Example:](#example)
* [Examples](#examples)
  * [Simple Example](#simple-example)
  * [Complex example](#complex-example)
    * [index.html](#indexhtml)
    * [config.js](#configjs)
    * [index.js](#indexjs)

<!-- vim-markdown-toc -->


## Installation

```shell
npm i --save vally
```

You can either use the build from inside the `dist/` directory and include
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


## API

### Docs

Configuration and API details can be found here:

[API docs](https://on3iro.github.io/vally)


## FAQ

### Why not just use HTML5 validation?

> HTML5 validation sometimes is a bit lacking when it comes to customizability
> and validating with custom constraints. That's not to say it is bad - especially
> since it is now supported by all [major browsers](https://caniuse.com/#feat=form-validation).
> In fact it is good practice to still use HTML5 type constraints on your fields
> (i.e. `type="number"`) in conjunction with **vally** to provide the best possible experience to your users.


### How can i specify a field as _required_?

> Just use the regular _[required](https://developer.mozilla.org/de/docs/Web/HTML/Element/Input#attr-required)_-Attribute
> on your `<input>`. This will ensure that **vally** actually validates the element if the input is empty.
> You still have to specify validator functions to provide the actual validation functionality.
> I.e. if the field should not be empty use `isNoneEmptyString()`.


### What happens to inputs that are not displayed?

> Inputs that are not displayed (i.e. if `display: none`, `type="hidden"` or `hidden=""` is set), are
> simply ignored by the validation.


### How can I bind vally to certain events?

> **vally** leaves most of the DOM-manipulation to the user. For simple bindings (i.e. for 'keyup'-events)
> however you can use `initWithBindings()`. For detailed explaination have a look at our examples below.


### Why does vally ship so few validator functions?

> Because validators in **vally** are simple functions it is very
> easy to either write them yourself our just use a library like
> [validator.js](https://github.com/chriso/validator.js/).
> Providing only a basic set of functions keeps the footprint of the library small.


### How can I use a validator function with multiple arguments?

> If you need multiple arguments (like some [validator.js](https://github.com/chriso/validator.js/). functions need additional configuration) you can simply
> partially apply the function and return a validator function.

#### Example:

```js
const isLessThan = (num: number) => (val: any):boolean => { /* actual implementation */ }
```


## Examples

### Simple Example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Simple submit</title>
    <style>
      input {
        outline: none;
        box-shadow: none;
      }

      .error {
        background: red;
      }
    </style>
  </head>
  <body>
    <form class="myform" action="" method="">
      <label for="number">Some number:</label>
      <input id="number" type="text" name="number">

      <label for="mail">Mail*:</label>
      <input id="mail" type="text" name="email" required>

      <label for="custom">Custom (start with 'T')*:</label>
      <input id="custom" type="text" name="custom">

      <button id="submit" type="submit">Submit</button>
    </form>

<script src="vally.min.js"></script>

<script>

const mail = document.getElementById('mail')
const number = document.getElementById('number')
const submit = document.getElementById('submit')
const custom = document.getElementById('custom')

if (mail && number && submit && custom) {
  submit.addEventListener('click', (e) => {
    e.preventDefault()

    // Simple custom validator function which ensures, that the value
    // starts with the character 'T'
    const startsWithT = (val) => val.charAt(0) === 'T'

    const result = vally.validate({
      fields: [
        {
          node: mail,
          validators: [ { fn: vally.isEmail } ]
        },
        {
          node: number,
          validators: [ { fn: vally.isNumberString } ]
        },
        {
          node: custom,
          validators: [ { fn: startsWithT }]
        }
      ]
    })

    // Set 'error' class to each invalid input
    result.validations.map(v => {
      if (!v.isValid) {
        v.node.classList.add('error')
      } else {
        v.node.classList.remove('error')
      }
    })
  })
}

</script>

  </body>
</html>
```


### Complex example

The following example shows how **vally** can be used to use the same configuration
to manually validate on the `submit` event and also bind it to
fire on `keyup` triggered by individual inputs.


#### index.html

Lets use almost the same markup as before... . This time we ship **vally** bundled together
with our other js resources in `main.bundle.js`, though. We also want to insert
custom error messages into the DOM depending on which validator for a field failed.
There are a lot of ways to achieve this. In this case we simply put hidden divs
below each input and toggle their `display` on validation.
Of course we also insert our custom messages into them.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Simple submit</title>
    <style>
      input {
        outline: none;
        box-shadow: none;
      }

      .error {
        background: red;
      }

      .hidden {
        display: none;
      }
    </style>
  </head>
  <body>
    <form class="myform" action="" method="">
      <label for="number">Some number:</label>
      <input id="number" type="text" name="number">
      <div id="number-error" class="hidden"></div>

      <label for="mail">Mail(*):</label>
      <input id="mail" type="text" name="email" required>
      <div id="mail-error" class="hidden"></div>

      <label for="custom">Number below 10(*):</label>
      <input id="custom" type="text" name="custom" required>
      <div id="custom-error" class="hidden"></div>

      <button id="submit" type="submit">Submit</button>
    </form>

    <script src='./main.bundle.js'></script>
  </body>
</html>
```


#### config.js

We separate our configuraion from the actual validation logic, to make everything
a bit more maintainable.

```js
// config.js

import {
  createConfig,
  isEmail,
  isNoneEmptyString,
  isNumberString
} from 'vally'

// Custom validator
// Because we need another parameter for our function to specify the threshold,
// we simply curry our validator function. The actual invokation to get a
// real validator function would look like this: isLessThan(10)
const isLessThan = (num: number) => (val: any): boolean => {
  if (isNumberString(val)) return false

  return parseInt(val) < num
}

// Because we only want to fetch DOM-elements via document.querySelector
// we can use the createConfig helper function to create a valid configuration.
// Therefore we specify our specs with selectors, which in turn are used to
// fetch the actual DOM nodes
const specs = [
  {
    selector: '#mail',
    validators: [
      {
        fn: isNoneEmptyString,
        errorSelector: 'mail-error',
        msg: 'Please enter a value.'
      },
      {
        fn: isEmail,
        errorSelector: 'mail-error',
        msg: 'Please enter a valid email address.'
      }
    ]
  },
  {
    selector: '#number',
    validators: [{
      fn: isNumberString,
      errorSelector: 'number-error',
      msg: 'Please enter a number.'
    }]
  },
  {
    selector: '#custom',
    validators: [
      {
        fn: isNoneEmptyString,
        errorSelector: 'custom-error',
        msg: 'Please enter a value.'
      },
      {
        fn: isLessThan(10),
        errorSelector: 'custom-error',
        msg: 'Please enter a number smaller than ten.'
      }
    ]
  }
]

export config = createConfig(specs)
```

#### index.js

Here we will define our actual validation logic.

```js
// index.js

import {
  initWithBindings,
  validate
} from 'vally'

import { config } from './config'

// Our callback will recieve a result object and act on its field validations
const callback = (e: Event, { validations }: { validations: Valiations }): void => {
  validations.forEach(v => {
    const msgNode = document.getElementById(v.validator.errorSelector)

    if (v.isValid) {
      v.node.classList.remove('error')

      // Hide msg
      if (msgNode ) msgNode.classList.add('hidden')
    } else {
      v.node.classList.add('error')

      // Show error msg
      if (msgNode) {
        msgNode.classList.remove('hidden')
        msgNode.innerHTML = v.validator.msg
      }
    }
  })
}

// Create a pre-configured partially applied validate function that we can use
// on our submit button. We technically don't need to do this
// as we only need to validate on submit. But in a real-world application you might
// need to re-use your validate function
// and this makes it easier.
const validateForm = () => validate(config)

const init = () => {
  // Bind our callback to the keyup event on each individual field
  initWithBindings(config, 'keyup', callback, 100)

  // Bind our validate function to our submit button
  const btnSubmit = document.getElementById('submit')
  if (!btnSubmit) return

  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()

    const result = validateForm()

    if (result.isValid) {
      // logic to send our form
    } else {
      // React to our validation result
      callback(e, result)
    }

  })
}

init()
```
