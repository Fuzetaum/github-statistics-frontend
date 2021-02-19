const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', path.resolve('./', 'src')],
  output: {
    path: path.resolve('./', 'build'),
    filename: 'static/js/[name].[hash:base64:8].js',
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
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
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
          {
            loader: 'css-loader',
            options: {
              modules: false,
              camelCase: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: [path.resolve('./', 'src')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              camelCase: true,
              localIdentName: '[local]',
              minimize: true,
            },
          },
        ],
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
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./', 'public/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.BACKEND_URL': JSON.stringify('http://localhost:8080'),
    }),
  ],
  serve: {
    port: 8090,
    content: path.resolve('./', 'build'),
  },
};
