// @flow

const nodeFactory = (display: '' | 'none' = ''): {
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
