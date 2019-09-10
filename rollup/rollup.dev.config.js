const serve = require('rollup-plugin-serve')
const path = require('path')
const baseConf = require('./rollup.base')

const componentName = process.env.COMPONENT
const port = process.env.PORT || 8088
const componentType = process.env.COMPONENT_TYPE || 'js'

module.exports = {
  input: path.resolve(__dirname, `../src/${componentName}/index.${componentType}`),
  output: {
    file: path.resolve(__dirname, `../src/${componentName}/examples/index.js`),
    format: 'umd',
    name: `${componentName}`,
    sourceMap: 'inline',
  },
  plugins: [
    ...baseConf.plugins,
    serve({
      port,
      contentBase: ['examples'],
    })
  ],
}
