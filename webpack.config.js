var path = require('path');
var nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: './src/main.ts',
  externals: [nodeExternals()],
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
    {
      test: /\.ts$/,
      enforce: 'pre',
      use: [
          {
              loader: 'tslint-loader',
              options: { 
              }
          }
      ]
  }]
  },
  mode: "production",
  resolve: {
    extensions: [ '.ts' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: "node"
};