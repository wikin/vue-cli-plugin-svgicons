const { optimize } = require('svgo')
const { getOptions } = require('loader-utils')

async function SvgIconLoader(source) {
  const config = getOptions(this)
  const { data } = await optimize(source,{
    plugins: [
      'preset-default',
      { name: 'removeViewBox', params: { active: false } },
      { name: 'removeDimensions', params: { active: true } },
      { name: 'removeXMLNS', params: { active: true } },
      { name: 'removeAttrs', params: { attrs: '(stroke|stroke-width)' } },
    ],
  })

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
