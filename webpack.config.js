const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const SRC = path.resolve('./src')
const DEST = path.resolve('./dist')
const NAME = 'paperweight'

module.exports = {
  entry: [
    `${SRC}/index.ts`,
  ],

  module: {
    loaders: [
      {
        include: SRC,
        loader: 'ts-loader',
        test: /\.tsx?$/,
      }, {
        include: SRC,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: 'css!postcss!sass'
        }),
        test: /\.sass$/,
      }, {
        loader: require.resolve('file-loader') + '?name=assets/img/[name].[ext]',
        test: /resources\/img\/.*\.(svg|png)$/,
      },
    ],
  },

  output: {
    filename: `${NAME}.js`,
    path: DEST,
  },

  plugins: [
    new ExtractTextPlugin(`${NAME}.css`)
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
};