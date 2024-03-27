module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/components',
            rootPathPrefix: 'components',
          },
          {
            rootPathSuffix: './src/assets',
            rootPathPrefix: 'assets',
          },
          {
            rootPathSuffix: './src/config',
            rootPathPrefix: 'confg',
          },
          {
            rootPathSuffix: './src/pages',
            rootPathPrefix: 'pages',
          },
          {
            rootPathSuffix: './src/router',
            rootPathPrefix: 'router',
          },
          {
            rootPathSuffix: './src/store',
            rootPathPrefix: 'store',
          },
        ],
      },
    ],
  ],
};
