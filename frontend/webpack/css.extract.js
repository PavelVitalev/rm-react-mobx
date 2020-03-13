const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'

          ]
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'style/styles.css' }),
      new OptimizeCSSAssetsPlugin()
    ],
  };
};
