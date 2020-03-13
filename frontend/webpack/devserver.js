const path = require('path');

module.exports = function() {
  return {
    devServer: {
      open: true,
      hot: true,
      inline: true,
      port: 3001,
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'src')
    },
  };
};
