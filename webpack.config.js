/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
  devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          experimentalFileCaching: true,
          transpileOnly: true,
        },
      },
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.(s*)css$/,
        use: [
          argv.mode === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        include: path.resolve(__dirname, 'src'),
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer:
      argv.mode === 'production'
        ? [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
        : [],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
      skipFirstNotification: true,
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, './src/html/index.html'),
      title: 'Phaser3 Typescript Boilerplate',
    }),
    new MiniCssExtractPlugin({
      filename: argv.mode === 'production' ? '[name].[hash].css' : '[name].css',
      chunkFilename:
        argv.mode === 'production' ? '[id].[hash].css' : '[id].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
});
