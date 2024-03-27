import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {useNavigation} from '@react-navigation/native';
import {TabBar} from 'components';
import routes from './router.config';

const Stack = createStackNavigator();

const StartPage = () => {
  return (
    <View>
      <Text>启动页</Text>
    </View>
  );
};

function Router() {
  const navigation = useNavigation();

  useEffect(() => {
    // navigation.navigate('Login');
  }, []);

  return (
    <View>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        onNavigationStateChange={e => {
          console.log(e);
        }}>
        <Stack.Screen name="Start" component={StartPage}></Stack.Screen>
        <Stack.Screen name="Home" component={TabBar}></Stack.Screen>
        {routes.map(item => {
          return (
            <Stack.Screen
              name={item.name}
              component={item.component}
              key={item.name}></Stack.Screen>
          );
        })}
      </Stack.Navigator>
    </View>
  );
}

export default Router;
