const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const packageData = require('../package.json')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle-[contenthash].js'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Product Calculator ' + packageData.version,
      template: path.resolve(__dirname, '../assets/index.html')
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: [
          // // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@Actions': path.resolve(__dirname, '../src/actions'),
      '@Components': path.resolve(__dirname, '../src/components'),
      '@Constants': path.resolve(__dirname, '../src/constants'),
      '@Containers': path.resolve(__dirname, '../src/containers'),
      '@Hocs': path.resolve(__dirname, '../src/hocs'),
      '@Reducers': path.resolve(__dirname, '../src/reducers'),
      '@Services': path.resolve(__dirname, '../src/services'),
      '@Utils': path.resolve(__dirname, '../src/utils'),
    },
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx', '.scss', '.css',],
  }
};