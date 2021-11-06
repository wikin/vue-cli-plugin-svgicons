const pluginDefaults = require ('./pluginDefaults')


module.exports = function install(app, pluginOptions) {
  // Register icons as components
  const options = {...pluginDefaults, ...pluginOptions} 
  const icons = require.context('@svgicons', false, /\.svg$/)
  
  icons.keys().forEach((fileName) => {
    const name = fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    const source = icons(fileName)
    app.component(options.prefix + name, source.default)
  })
}
