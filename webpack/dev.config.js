const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.resolve('./', 'src')],
  output: {
    path: path.resolve('./', 'build'),
    filename: 'main.js',
    publicPath: '/',
    library: 'library',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.resolve('./', 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|svg)$/,
        include: path.resolve('./', 'src/assets'),
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        exclude: [path.resolve('./', 'node_modules')],
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        exclude: [path.resolve('./', 'node_modules')],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.css/,
        exclude: [path.resolve('./', 'src')],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.jsx', '.json'],
  },
  context: path.resolve(__dirname, '../'),
  target: 'web',
  devServer: {
    contentBase: '../build',
    compress: false,
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./', 'public/index.html'),
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.BACKEND_URL': JSON.stringify('http://localhost:8080'),
    }),
  ],
};
