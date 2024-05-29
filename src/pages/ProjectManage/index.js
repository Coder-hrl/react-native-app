import React from 'react';
import {View} from '@ant-design/react-native';
import {LayoutWrapper, LayoutHeader} from 'components';

function ProjectManage() {
  return (
    <LayoutWrapper>
      <LayoutHeader title="订单管理" hasBack={false} />
      <View>订单管理</View>
    </LayoutWrapper>
  );
}

export default ProjectManage;
