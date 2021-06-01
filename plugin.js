const { h } = require('vue')
const config = require ('./config')


module.exports = function install(app) {
  // Register icons as components

  const icons = require.context('@svgicons', false, /\.svg$/)
  
  icons.keys().forEach((fileName) => {
    console.log(fileName)
    const name = fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    const source = icons(fileName)
    console.log(source)
    app.component(config.prefix + name, source.default)
  })
}
