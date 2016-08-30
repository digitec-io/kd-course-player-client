var config = {
  entry: {
    'kd-course-player': './src/index.js',
    'kd-course-player.angular': './src/kd-course-player.angular.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  externals: [
    {
      window: 'window',
      angular: 'angular',
    }
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  }
};
module.exports = config;
