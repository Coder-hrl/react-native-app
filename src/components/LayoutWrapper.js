import {StyleSheet, StatusBar} from 'react-native';
import {View} from '@ant-design/react-native';

function LayoutWrapper({
  style,
  children,
  showBgc = true,
  translucent = true,
  statusBarBgc = 'transparent',
}) {
  const BGC = '#F3FAFF';
  return (
    <View
      style={{
        ...styles.layout,
        ...style,
        backgroundColor: showBgc ? BGC : '',
      }}>
      <StatusBar
        animated
        backgroundColor={statusBarBgc}
        barStyle="dark-content"
        translucent={translucent}
      />
      <View style={translucent ? styles.wrapper : {}}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    paddingBottom: 20,
    flex: 1,
  },
  wrapper: {
    marginTop: 36,
    flex: 1,
  },
});

export default LayoutWrapper;
