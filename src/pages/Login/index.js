import React from 'react';
import {StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {View, Flex} from '@ant-design/react-native';

import {LayoutWrapper, Input, Button, IconSet, message} from 'components';
import {useSetState, useBoolean} from 'ahooks';
import {setAjaxHeader, setItem} from 'config';

function Login({navigation = () => {}}) {
  const [loginForm, setLoginForm] = useSetState({
    password: '',
    username: '',
  });

  const [isShowPassword, {setTrue: showPassword, setFalse: hidePassword}] =
    useBoolean(true);

  const hideOrAppearPassword = () => {
    if (isShowPassword) {
      hidePassword();
    } else {
      showPassword();
    }
  };

  const login = () => {
    if (!loginForm.username) {
      message.info('请输入账号！');
      return;
    }
    if (!loginForm.password) {
      message.info('请输入密码！');
      return;
    }

    setAjaxHeader('token');
    setItem('token', 'token').then(res => {
      navigation.navigate('Home');
    });
  };
  return (
    <LayoutWrapper showBgc={false} style={styles.loginWrapper}>
      <View style={styles.LeftIntroWrapper}>
        <View style={styles.introduceTip}>Hey,</View>
        <View style={styles.introduceTip}>Welcome to CoderhApp!</View>
      </View>
      <View style={styles.rightIntroWrapper}>
        <View style={styles.introduceTip}>Login,</View>
        <View style={styles.introduceTip}>And Enjoy Yourself!</View>
      </View>

      <View style={styles.mainAction}>
        <View style={styles.welcomeText}>您好</View>
        <Flex align="center">
          <View style={styles.welcomeTip}>欢迎使用演示平台</View>
        </Flex>

        <KeyboardAvoidingView style={styles.LoginAction}>
          <Flex style={styles.inputContainer}>
            <Flex>
              <IconSet style={styles.icon} name="zhanghao" />
            </Flex>

            <Input
              value={loginForm.username}
              style={styles.input}
              placeholder="请输入账号"
              maxLength={10}
              onChangeText={username => setLoginForm({username})}
            />
          </Flex>
          <Flex style={styles.inputContainer}>
            <Flex>
              <IconSet style={styles.icon} name="mima" />
            </Flex>
            <Input
              value={loginForm.password}
              style={styles.input}
              placeholder="请输入密码"
              maxLength={20}
              // 安全输入，密码不可见
              secureTextEntry={isShowPassword}
              onChangeText={password => setLoginForm({password})}
            />
            <TouchableOpacity
              style={styles.passwordIconWrapper}
              onPress={hideOrAppearPassword}>
              <IconSet
                style={styles.passwordIcon}
                name={!isShowPassword ? 'xianshimima' : 'line-bukejian2'}
              />
            </TouchableOpacity>
          </Flex>
        </KeyboardAvoidingView>
        <Button type="large" style={styles.loginButton} onPress={login}>
          登录
        </Button>
      </View>

      <View style={styles.bottomText}>
        此项目仅供Coderh学习记录所用，请勿用于商业用途。
      </View>
    </LayoutWrapper>
  );
}

const styles = StyleSheet.create({
  LeftIntroWrapper: {
    marginTop: 60,
    marginBottom: 20,
    width: '90%',
  },
  rightIntroWrapper: {
    marginBottom: 20,
    width: '90%',
    alignItems: 'flex-end',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  loginWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  welcomeTip: {
    fontSize: 16,
    marginTop: 5,
    color: '#333333',
  },
  mainAction: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    borderColor: '#ececec',
    borderWidth: 1,
    padding: 20,
  },
  input: {
    flex: 1,
  },
  LoginAction: {
    marginTop: 16,
  },
  inputContainer: {
    marginTop: 10,
    position: 'relative',
  },
  bottomText: {
    width: 200,
    color: '#999999',
    textAlign: 'center',
    marginTop: '40%',
  },
  passwordIcon: {
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: '#8cc9bf',
  },
  passwordIconWrapper: {
    position: 'absolute',
    right: 10,
  },
  introduceTip: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fcce83',
  },
});

export default Login;
