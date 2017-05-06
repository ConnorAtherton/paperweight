const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const SRC = path.resolve('./src')
const DEST = path.resolve('./dist')
const NAME = 'paperweight'

module.exports = {
  entry: {
    paperweight: `${SRC}/paperweight.ts`,
    demo: `${SRC}/demo.tsx`
  },

  module: {
    rules: [
      {
        include: SRC,
        loader: 'ts-loader',
        test: /\.tsx?$/,
      }, {
        include: SRC,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        }),
        test: /\.sass$/,
      }, {
        loader: require.resolve('file-loader') + '?name=assets/img/[name].[ext]',
        test: /resources\/img\/.*\.(svg|png)$/,
      },
    ],
  },

  output: {
    path: DEST,
    filename: '[name].js'
  },

  plugins: [
    new ExtractTextPlugin(`${NAME}.css`)
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
};