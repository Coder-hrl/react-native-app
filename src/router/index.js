import React, {useEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {View} from '@ant-design/react-native';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {useNavigation} from '@react-navigation/native';
import {Center, TabBar} from 'components';
import routes from './router.config';
import FastImage from 'react-native-fast-image';

import start from 'assets/images/start.png';
import {getItem} from 'config';

const Stack = createStackNavigator();

const StartPage = () => {
  const navigation = useNavigation();

  // 假登录
  const jumpLogin = () => {
    navigation.navigate('Login');
  };

  const jumpHome = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    getItem('token').then(res => {
      if (res) {
        jumpHome();
      } else {
        jumpLogin();
      }
    });
  }, []);

  return (
    <Center>
      <FastImage
        source={start}
        style={styles.bannerIcon}
        onError={err => console.log(err)}
      />
      <TouchableOpacity onPress={jumpLogin} style={styles.entryIcon}>
        <View style={styles.entryText}>立即进入</View>
      </TouchableOpacity>
    </Center>
  );
};

function Router() {
  useEffect(() => {}, []);

  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      onNavigationStateChange={e => {
        console.log(e);
      }}>
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="Home" component={TabBar} />
      {routes.map(item => {
        return (
          <Stack.Screen
            name={item.name}
            component={item.component}
            key={item.name}
          />
        );
      })}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  entryIcon: {
    marginTop: 20,
    width: 160,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#D9ECFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerIcon: {
    width: 160,
    height: 160,
  },
  entryText: {
    fontSize: 20,
  },
});

export default Router;
