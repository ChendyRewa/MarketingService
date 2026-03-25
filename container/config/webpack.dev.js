const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJsonDeps = require('../package.json').dependencies;

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: packageJsonDeps
        })
    ]
}

module.exports = merge(common,devConfig);