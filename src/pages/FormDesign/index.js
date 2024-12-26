import React from 'react';
import {View} from '@ant-design/react-native';
import {LayoutWrapper, LayoutHeader} from 'components';

function FormDesign() {
  return (
    <LayoutWrapper>
      <LayoutHeader title="表单设计" hasBack={false} />
      <View>表单设计</View>
    </LayoutWrapper>
  );
}

export default FormDesign;
