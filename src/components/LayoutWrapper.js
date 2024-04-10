import {StyleSheet, StatusBar} from 'react-native';
import {View} from '@ant-design/react-native';

import WaterMark from './WaterMark';

function LayoutWrapper({children, statusBarBgc = 'transparent'}) {
  return (
    <View style={styles.layout}>
      <StatusBar
        animated
        backgroundColor={statusBarBgc}
        barStyle="dark-content"
      />
      <View>{children}</View>
      <WaterMark />
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
});

export default LayoutWrapper;
