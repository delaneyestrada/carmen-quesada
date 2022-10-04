const path = require('path');
const config = require('./webpack.config');
const { merge } = require('webpack-merge');
const _require = (id) =>
  require(require.resolve(id, { paths: [require.main.path] }));
const HtmlWebPackPlugin = _require('html-webpack-plugin');

let merged = merge(config, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      filename: './index.html',
      favicon: 'src/img/favicon.ico',
    }),
    new HtmlWebPackPlugin({
      template: 'src/about.html',
      filename: './about.html',
      favicon: 'src/img/favicon.ico',
    }),
    new HtmlWebPackPlugin({
      template: 'src/media.html',
      filename: './media.html',
      favicon: 'src/img/favicon.ico',
    }),
    new HtmlWebPackPlugin({
      template: 'src/teaching-philosophy.html',
      filename: './teaching-philosophy.html',
      favicon: 'src/img/favicon.ico',
    }),
    new HtmlWebPackPlugin({
      template: 'src/student-portal.html',
      filename: './student-portal.html',
      favicon: 'src/img/favicon.ico',
    }),
    new HtmlWebPackPlugin({
      template: 'src/student-gallery.html',
      filename: './student-gallery.html',
      favicon: 'src/img/favicon.ico',
    }),
    new HtmlWebPackPlugin({
      template: 'src/contact.html',
      filename: './contact.html',
      favicon: 'src/img/favicon.ico',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});

module.exports = merged;
