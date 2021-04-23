const SVGO = require('svgo')

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
  const match2 = [
    ...match[1].matchAll(
      /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g
    ),
  ]
  const attributes = {}
  match2.forEach((arg) => {
    attributes[arg[1]] = arg[2]
  })

  return `module.exports=${JSON.stringify({
    attributes,
    content: match[2],
  })}`
}

module.exports = SvgIconLoader
