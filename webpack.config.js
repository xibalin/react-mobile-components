var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pxtorem = require('postcss-pxtorem');
var Config = require('./package.json');
var path = require('path');

var commonExtractTextPlugin = new ExtractTextPlugin('[name]_' + Config.version + '_[contenthash].css');

module.exports = {
  entry: {
    index: './demo/index.js',
    vendor: ['react', 'react-dom', 'lodash', 'superagent', 'superagent-prefix']
  },
  output: {
    path: './dist',
    filename: '[name]_[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules'), './'],
    extensions: ['', '.web.js', '.js', '.json'],
    alias: {
      style: 'static/style'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.scss/,
        loader: commonExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass'])
      }, {
        test: /\.css$/,
        loader: commonExtractTextPlugin.extract('style', ['css', 'autoprefixer'])
      }, {
        test: /\.(html)/,
        loader: 'raw'
      }, {
        test: /\.(png|jpg|gif)/,
        loaders: ['url?limit=1'],
      }, {
        test: /\.json/,
        loaders: ['json'],
      },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?t=[0-9]*)?$/, loader: "file-loader?fonts/name=[name].[ext]" }
    ],
    noParse: [new RegExp('node_modules/localforage/dist/localforage.js')]
  },
  devServer: {
    port: 7310,
    host: '0.0.0.0',
    historyApiFallback: {
      verbose: true,
      index: '/'
    },
    proxy: {
      '/v2/*': {
        target: 'http://api.douban.com',
        bypass: function (req, res) {
          req.headers['host'] = 'api.douban.com';
        }
      }
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    commonExtractTextPlugin,
    new HtmlWebpackPlugin({
      env: 'dev',
      filename: 'index.html',
      title: 'fe-components-demo',
      template: './demo/index_template.ejs',
      inject: true,
      chunks: ['index', 'vendor']
    })
  ]
};
