module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(ttf|eot|woof|woof2)$/i,
          exclude: /\/node_modules\//,
          use: {
            loader: 'url-loader',
            options: {
              outputPath: 'assets/fonts',
              name: '[name].[ext]',
              limit: 1024,
            },
          },
        },
      ]
    },
  };
};
