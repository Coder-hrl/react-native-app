import React from 'react';
import {removeItem} from 'config';
import {
  LayoutWrapper,
  Button,
  RenderAction,
  RenderItem,
  LayoutHeader,
  ModalToast,
} from 'components';

import logo from 'assets/images/start.png';

function Mine() {
  const navigation = useNavigation();
  const [account, setAccount] = useSetState({
    username: 'coderh',
    job: '管理员',
    loginTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  });
  const loginOut = () => {
    ModalToast({
      text: '确认要退出登录吗？',
      title: '提示',
      footer: [
        {
          text: '取消',
          onPress: () => {
            return false;
          },
        },
        {
          text: '确认',
          onPress: () => {
            removeItem('token').then(res => {
              navigation.navigate('Login');
            });
          },
        },
      ],
    });
  };

  function Mine({navigation, StyleComputed, SingleComputed}) {
    return (
      <LayoutWrapper>
        <LayoutHeader title="我的" hasBack={false} />
        <RenderAction title="我的信息">
          <FastImage
            source={logo}
            style={styles.avatar}
            resizeMode={FastImage.resizeMode.contain}
          />
          <RenderItem title="用户名" value={account.username} />
          <RenderItem title="职位" value={account.job} />
          <RenderItem title="登录时间" value={account.loginTime} />
        </RenderAction>

        <Button onPress={loginOut} type="large">
          退出登录
        </Button>
      </LayoutWrapper>
    );
  }

  const styles = StyleSheet.create({
    avatar: {
      width: 100,
      height: 100,
    },
  });
}
export default Mine;
