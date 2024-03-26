import React, {useEffect, useState, useRef} from 'react';
import {Provider} from 'react-redux';
import {BackHandler} from 'react-native';
import {message} from '@components';
import Router from '@router';
import store from '@store';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const navigationRef = useRef();

  const [lastBackPressed, setLastBackPressed] = useState('');

  const rootRoute = ['Login', 'Home', '/']; // 不退出,返回上一页配置内容
  const cantRoute = ['Work', 'dayPages', 'FinancialList']; // 不做任何处理 由自己当前页处理
  // 一般都为webView

  const handleBackPress = () => {
    const navigation = navigationRef.current;

    let routeName = navigation.getCurrentRoute();

    if (cantRoute.includes(routeName.name)) {
      return;
    }

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
    message.info({
      content: '再次返回退出应用',
      mask: false,
    }); //提示再次按返回触发
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  }, [lastBackPressed]);

  useEffect(() => {
    return function () {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      window.navigation = null;
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
