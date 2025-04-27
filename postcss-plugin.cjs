const { readFile } = require('fs').promises
const postcss = require('postcss')

// esbuild Plugin to process css files with postcss
const postcssPlugin = ({ plugins = [] } = {}) => {
  return {
    name: 'postcss',
    setup(build) {
      build.onLoad({ filter: /\.css$/ }, async (args) => {
        const raw = await readFile(args.path, 'utf8')
        const source = await postcss(plugins).process(raw.toString(), {
          from: args.path,
        })
        return {
          contents: source.css,
          loader: 'css',
        }
      })
    },
  }
}

module.exports = postcssPlugin
