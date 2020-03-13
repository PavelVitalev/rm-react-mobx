module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/i,
          exclude: /\/node_modules\//,
          use: {
            loader: 'babel-loader'
          }
        },
      ]
    },
  };
};
