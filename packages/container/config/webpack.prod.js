const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJSON = require("../package.json");
const commonConfig = require("./webpack.common");

const DOMAIN = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "containerModule",
      remotes: {
        marketingModule: `marketingModule@/marketing/remoteEntry.js`,
        authModule: `authModule@/auth/remoteEntry.js`,
        dashboardModule: `dashboardModule@/dashboard/remoteEntry.js`,
      },
      shared: packageJSON.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
