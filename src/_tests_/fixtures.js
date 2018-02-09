// @flow

function querySelector (sel: string) {
  return this[sel]
}

const nodeFactory = (display: '' | 'none' = ''): {
  mock: boolean,
  querySelector: Function,
  insertAdjacentHTML: Function,
  addEventListener: Function,
  removeEventListener: Function,
  style: {
    display: string
  },
  classList: {
    add: Function,
    remove: Function
  }
} => {
  return {
    mock: true,
    querySelector,
    insertAdjacentHTML: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    style: { display },
    classList: {
      add: jest.fn(),
      remove: jest.fn()
    }
  }
}

export {
  nodeFactory
}
