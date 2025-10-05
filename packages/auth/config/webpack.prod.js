const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJSON = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/auth/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "authModule",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthBootstrapper": "./src/bootstrap-app",
      },
      shared: packageJSON.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
