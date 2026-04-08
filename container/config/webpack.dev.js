const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJsonDeps = require("../package.json").dependencies;

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:8080/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
      },
      shared: packageJsonDeps,
    }),
  ],
};

module.exports = merge(common, devConfig);
