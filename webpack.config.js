const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

function here (subPath) {
  return path.join(__dirname, subPath)
}

module.exports = {
  entry: here('src/main.js'),
  output: {
    path: here('dist'),
    filename: 'page.[hash:7].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      here('src'),
      here('node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/img/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(bin)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'data/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {}
    }),
    new ExtractTextPlugin('assets/css/[name].[hash:7].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: here('index.html'),
      inject: true
    }) //,
    // new CopyWebpackPlugin([
    //   {from: 'presentation/css', to: 'css'},
    //   {from: 'presentation/examples', to: 'examples'},
    //   {from: 'presentation/iframe', to: 'iframe'},
    //   {from: 'presentation/img', to: 'img'},
    //   {from: 'presentation/js', to: 'js'},
    //   {from: 'presentation/lib', to: 'lib'},
    //   {from: 'presentation/plugin', to: 'plugin'},
    //   {from: 'presentation/slides', to: 'slides'}
    // ])
  ]
}
