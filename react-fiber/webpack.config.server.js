// webpack.config.server.js
const path = require("path")
const nodeExternals = require("webpack-node-externals")

module.exports = {
  target: "node",
  mode: "development",
  entry: "./server.js",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: [nodeExternals()]
}
