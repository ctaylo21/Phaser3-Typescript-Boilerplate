/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env, argv) => ({
  devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
      },
      {
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
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
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
    new ForkTsCheckerWebpackPlugin({
      async: true,
      useTypescriptIncrementalApi: false,
      measureCompilationTime: true,
      memoryLimit: 4096,
    }),
    new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
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
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
});
