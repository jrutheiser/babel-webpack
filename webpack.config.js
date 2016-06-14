var webpack = require('webpack');
var path = require('path');

var isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },

  entry: path.join(__dirname, 'app/app.js'),

  devtool: isProduction ? 'source-map' : 'eval',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: isProduction ? [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['require', 'export', '$super'],
      },
      compress: {
        warnings: false
      }
    })
  ] : [],

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  }
};
