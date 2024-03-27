import {View, Text} from 'react-native';

// import styles from './index.scss';

function LayoutWrapper({children, navigation}) {
  return (
    <View>
      <View>{children}</View>
    </View>
  );
}

export default LayoutWrapper;
