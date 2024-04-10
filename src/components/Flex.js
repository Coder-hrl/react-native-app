import {View} from '@ant-design/react-native';
import {StyleSheet} from 'react-native';

function Center({children, flexDirection = 'column'}) {
  return <View style={{...styles.Center, flexDirection}}>{children}</View>;
}

const styles = StyleSheet.create({
  Center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Center};
