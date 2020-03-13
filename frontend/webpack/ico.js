module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.ico$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                limit: 256,
              },
            },
          ],
        },
      ]
    },
  };
};
