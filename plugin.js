const { h } = require('vue')
const config = require ('./config')


module.exports = function install(app) {
  // Register icons as components

  const icons = require.context('@svgicons', false, /\.svg$/)
  
  icons.keys().forEach((fileName) => {
    console.log(fileName)
    const name = fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    const { content, attributes } = icons(fileName)

    app.component(config.prefix + name, {
      render() {
        return h('svg', {
          ...attributes,
          width: this.size,
          height: this.size,
          stroke: this.color,
          'stroke-width': this.stroke,
          innerHTML: content,
        })
      },
      props: {
        size: {
          type: Number,
          default: config.size,
        },
        stroke: {
          type: Number,
          default: config.stroke,
        },
        color: {
          type: String,
          default: config.color,
        },
      },
    })
  })
}
