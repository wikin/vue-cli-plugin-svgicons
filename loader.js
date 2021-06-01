const SVGO = require('svgo')
const config = require ('./config')

async function SvgIconLoader(source) {
  const svgo = new SVGO({
    plugins: [
      { removeTitle: true },
      { removeViewBox: false },
      { removeDimensions: true },
      { removeAttrs: { attrs: '(stroke|stroke-width)' } },
    ],
  })
  const { data } = await svgo.optimize(source)

  const match = data.match(/^<svg([^>]*)>(.*)<\/svg>$/)
  
  const props = {
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
  }

  return `
<template>
  <svg${match[1]}
    :width="size"
    :height="size"
    :stroke="color"
    :stroke-width="stroke"
  >${match[2]}</svg>
</template>

<script>
  export default {
    props: ${JSON.stringify(props)},
  }
</script>`
}

module.exports = SvgIconLoader
