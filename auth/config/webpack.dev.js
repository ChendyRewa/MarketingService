const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJsonDeps = require("../package.json").dependencies;

const devConfig = {
  mode: "development",
  devServer: {
    port: 8082,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:8082/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      shared: packageJsonDeps,
    }),
  ],
};

module.exports = merge(common, devConfig);
