const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = function() {
  return {
    plugins: [
      new StylelintWebpackPlugin(),
    ],
  };
};
