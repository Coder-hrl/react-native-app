import {Provider} from 'react-redux';
import React, {useEffect, useState, useRef} from 'react';
import {BackHandler, DevSettings, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import {Provider as AntdProvider} from '@ant-design/react-native';

import Router from 'router';
import store from 'store';
import {message} from 'components';

const App = () => {
  const navigationRef = useRef();

  const [lastBackPressed, setLastBackPressed] = useState('');

  const rootRoute = ['Login', 'Home', '/']; // 不退出,返回上一页配置内容
  // 一般都为webView

  const connectToRemoteDebugger = debug => {
    NativeDevSettings.setIsDebuggingRemotely(debug);
  };

  const handleBackPress = () => {
    const navigation = navigationRef.current;

    let routeName = navigation.getCurrentRoute();

    if (!rootRoute.includes(routeName.name)) {
      navigation.goBack();
      return true;
    }

    if (
      navigation.isFocused() &&
      lastBackPressed &&
      lastBackPressed + 2000 >= Date.now()
    ) {
      //最近2秒内按过back键，表示用户想退出应用。
      BackHandler.exitApp();
      return true;
    }

    let date = Date.now();
    setLastBackPressed(date);
    message.warning('再次返回退出应用'); //提示再次按返回触发
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  }, [lastBackPressed]);

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('debug', () => {
        connectToRemoteDebugger(true);
      });

      DevSettings.addMenuItem('stop debug', () => {
        connectToRemoteDebugger(false);
      });

      // 根据字符串匹配来忽略日志信息
      LogBox.ignoreLogs(['Warning: ...']);
    }
    return function () {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      window.navigation = null;
    };
  }, []);

  return (
    <AntdProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Router />
        </NavigationContainer>
      </Provider>
    </AntdProvider>
  );
};

export default App;
