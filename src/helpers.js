// @flow

/**
  * @namespace helpers
  * @private
  */

/**
 * Reduces multiple function calls, which are fired in quick succession to
 * a single function call (i.e. to reduce function calls on scroll events.
 * @function debounce
 * @memberof helpers
 * @private
 * @param {function} fn - Function to debounce
 * @param {number} time - Time to wait until function is called - will be reset
 * on every invocation of the debounced function in the given timeframe.
 * @return {function} Debounced function
  */
export const debounce = (fn: Function, time: number): Function => {
  let timeout
  // Has to be a 'real' function, not an arrow function, to preserve
  // context of 'this'
  return function (...args: Array<mixed>) {
    const callback = () => fn.apply(this, args)
    clearTimeout(timeout)
    timeout = setTimeout(callback, time)
  }
}
