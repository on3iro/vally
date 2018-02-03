/* eslint-disable flowtype/require-valid-file-annotation */

import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'

const env = process.env.NODE_ENV

const config = {
  output: {
    format: 'umd'
  },
  name: 'vally',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    uglify({})
  )
}

export default config
