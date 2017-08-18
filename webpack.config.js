const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',

  output: {
    filename: 'build.js',
    path: __dirname,
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index_template.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    contentBase: __dirname,
    host: '0.0.0.0',
    port: 8080,
    hot: true,
  },
};
