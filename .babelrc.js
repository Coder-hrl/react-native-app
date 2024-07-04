module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          pages: './src/pages',
          store: './src/store',
          config: './src/config',
          router: './src/router',
          components: './src/components',
          assets: './src/assets',
          fonts: './src/assets/fonts',
          url: './url.js',
        },
      },
    ],
    ['import', {libraryName: '@ant-design/react-native'}],
  ],
};
