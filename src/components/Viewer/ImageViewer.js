import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function ImageViewer({base64}) {
  return (
    <View style={styles.container}>
      <FastImage
        resizeMode="contain"
        source={{uri: `data:image/png;base64,${base64}`}}
        style={styles.img}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
});
