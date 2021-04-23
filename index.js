const path = require('path')
const config = require('./config')


module.exports = (api, options) => {
  const iconsfolder = path.resolve(config.path)

  api.chainWebpack(webpackChain => {
      
    webpackChain.module.rule('svg').exclude.add(iconsfolder)

    webpackChain.module
      .rule('svgicons')
      .test(/\.svg$/)
      .include.add(iconsfolder)
      .end()
      .use('svgicons')
      .loader(path.resolve(__dirname, './loader'))
  })


  api.configureWebpack({
    resolve: {
      extensions: ['.svg'],
      alias: {
        '@svgicons': iconsfolder
      }
    }
  })

}

module.exports.install = require('./plugin.js')
