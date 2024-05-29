import React from 'react';
import {View} from '@ant-design/react-native';
import {LayoutHeader, LayoutWrapper} from 'components';

function WorkSpace() {
  return (
    <LayoutWrapper>
      <LayoutHeader title="订单管理" hasBack={false} />

      <View>工作台</View>
    </LayoutWrapper>
  );
}

export default WorkSpace;
