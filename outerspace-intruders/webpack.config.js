const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    contentBase: 'build'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
