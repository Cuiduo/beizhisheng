'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //仿真
  BASE_API: '"http://prod.bbwin.com.cn/proxy/bbwin-business-cs"',
  //生产
  // BASE_API: '"http://online.bbwin.com.cn/proxy/bbwin-business"',
})
