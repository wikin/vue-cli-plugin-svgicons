const path = require('path')
const config = require('./config')


module.exports = (api, options) => {
  const iconsfolder = path.resolve(config.path)


  api.chainWebpack(webpackChain => {
      
    webpackChain.module.rule('svg').exclude.add(iconsfolder)
    webpackChain.module.rule('eslint').exclude.add(iconsfolder)

    // clone vue rule to svgicons
    const baseRule = webpackChain.module.rules.get('vue');
    const newRule = webpackChain.module.rule('svgicons').merge(baseRule.entries());
    baseRule.uses.values().forEach((use) => {
      newRule.use(use.name).merge(use.entries());
    });
  

    webpackChain.module
      .rule('svgicons')
        .test(/\.svg$/)
        .include
          .add(iconsfolder)
          .end()
        .use('svgicons')
          .loader(path.resolve(__dirname, './loader'))
          .end()
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
