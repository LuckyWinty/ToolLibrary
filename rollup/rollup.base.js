const json = require('rollup-plugin-json')
const alias = require('rollup-plugin-alias')
const { eslint } = require('rollup-plugin-eslint')
const resolve = require('rollup-plugin-node-resolve') // help find node package
const commonjs = require('rollup-plugin-commonjs') // transform commonjs to esm
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const typescript = require('rollup-plugin-typescript')
const builtins = require('rollup-plugin-node-builtins')

module.exports = {
  external: [
    'react',
    'react-dom',
    'prop-types'
  ],
  plugins: [
    alias({
      resolve: ['.ts,.js'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    builtins(),
    resolve(),
    json(),
    typescript(),
    eslint({
      include: ['src/**/*.ts', 'src/**/*.js'],
    }),
    babel({
      runtimeHelpers: true,
      presets: ['es2015', '@babel/preset-react', 'react'],
      include: ['src/**/*.ts', 'src/**/*.js'], // only transpile our source code
      plugins: ['external-helpers'],
    }),
    commonjs({
      include: 'node_modules/**',
    })
  ],
}
