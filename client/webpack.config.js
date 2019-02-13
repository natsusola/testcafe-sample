const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const isDev = process.env.NODE_ENV !== 'production';

const hash = isDev ? '' : '[contenthash:8]';

const config = {
  mode: isDev ? 'development' : 'production',

  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
  },

  output: {
    filename: `js/[name].js?${hash}`,
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },

  devtool: isDev ? 'source-map' : '',

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
          },
        },
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [ '@babel/preset-env' ],
        },
      },

      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: [ '.js' ],
  },

  optimization: {
    minimize: !isDev,
  },

  plugins: [
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;