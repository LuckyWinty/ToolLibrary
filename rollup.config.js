const devConfig = require('./rollup/rollup.dev.config')
const prodConfig = require('./rollup/rollup.prod.config')

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
