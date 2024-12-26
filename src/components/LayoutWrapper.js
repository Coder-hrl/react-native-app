import {StyleSheet, StatusBar} from 'react-native';
import {View} from '@ant-design/react-native';

function LayoutWrapper({
  style,
  children,
  showBgc = true,
  translucent = true,
  statusBarBgc = 'transparent',
}) {
  return (
    <View
      style={{
        ...styles.layout,
      }}>
      <StatusBar
        animated
        backgroundColor={statusBarBgc}
        barStyle="dark-content"
        translucent={translucent}
      />
      <View
        style={
          translucent
            ? [
                styles.wrapper,
                {backgroundColor: showBgc ? '#fff' : 'transparent'},
                style,
              ]
            : {}
        }>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  wrapper: {
    marginTop: 36,
    paddingVertical: 0,
    flex: 1,
  },
});

export default LayoutWrapper;
