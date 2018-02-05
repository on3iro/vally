// @flow

function querySelector (sel: string) {
  return this[sel]
}

const nodeFactory = (): {
  querySelector: Function,
  insertAdjacentHTML: Function,
  addEventListener: Function,
  removeEventListener: Function,
  classList: {
    add: Function,
    remove: Function
  }
} => {
  return {
    querySelector,
    insertAdjacentHTML: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    classList: {
      add: jest.fn(),
      remove: jest.fn()
    }
  }
}

const makeSetUp = (callbackFn: Function) => (configOW: Object, errCallback: ?Function) => {
  const document = nodeFactory()
  const body = {
    ...nodeFactory(),
    '.container_1': {
      ...nodeFactory()
    },
    '.input_string': {
      ...nodeFactory(),
      value: 'some string'
    },
    '.input_num-string': {
      ...nodeFactory(),
      value: '22'
    },
    '.input_hidden': {
      ...nodeFactory(),
      value: 'something',
      offsetParent: null
    },
    '.input_undefined': {
      ...nodeFactory(),
      value: undefined
    },
    '.input_required_undefined': {
      ...nodeFactory(),
      value: undefined,
      required: true
    }
  }

  const DOMStub = {
    ...document,
    body
  }

  const config = {
    fields: [],
    DOMStub,
    ...configOW
  }

    // $FlowFixMe
  const result = callbackFn(config, errCallback)

  return {
    DOMStub,
    result
  }
}

export {
  makeSetUp
}
