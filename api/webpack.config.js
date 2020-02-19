const path = require('path');
const webpack = require('webpack');

module.exports = {
  // mode: 'development',
  entry: path.resolve(__dirname, '../client/src/index.js'),
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.(css)$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};