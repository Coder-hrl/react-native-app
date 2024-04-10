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
          images: './src/assets/images',
          fonts: './src/assets/fonts',
          AjaxMode: './AjaxMode.js',
        },
      },
    ],
    ['import', {libraryName: '@ant-design/react-native'}],
  ],
};

// http://gitlab.yisa.com.cn:10130/huangrl/haigang_app.git
