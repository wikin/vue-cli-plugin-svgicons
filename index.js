const path = require('path')
const loaderDefaults = require('./loaderDefaults')

module.exports = (api, webpackOptions) => {
  const options = {...loaderDefaults, ...(webpackOptions.pluginOptions||{}).svgicons}
  const iconsfolder = path.resolve(options.path)

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
          .options(options)
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
