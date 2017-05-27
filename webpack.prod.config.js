var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var Config = require('./package.json');

//var commonExtractTextPlugin = new ExtractTextPlugin('[name]_' + Config.version + '_[contenthash].css');

module.exports = {
  entry: {
    index: './components/index.js',
  },
  output: {
    path: './lib',
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: "umd",
    library: "ReactCore"
  },
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules'), './'],
    extensions: ['', '.web.js', '.js', '.json'],
    alias: {
      style: 'static/style'
    }
  },

  externals: [{
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }, {
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }, {
    'react-addons-css-transition-group': {
      root: 'ReactCSSTransitionGroup',
      commonjs2: 'react-addons-css-transition-group',
      commonjs: 'react-addons-css-transition-group',
      amd: 'react-addons-css-transition-group'
    }}
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.scss/,
        loader: 'style!css!autoprefixer!sass'
      }, {
        test: /\.css$/,
        loader: 'style!css!autoprefixer'
      }, {
        test: /\.(html)/,
        loader: 'raw'
      }, {
        test: /\.(png|jpg|gif)/,
        loaders: ['url?limit=8000'],
      }, {
        test: /\.json/,
        loaders: ['json'],
      },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?t=[0-9]*)?$/, loader: "file-loader?fonts/name=[name].[ext]" }
    ],
    noParse: [new RegExp('node_modules/localforage/dist/localforage.js')]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),

  ]
}
