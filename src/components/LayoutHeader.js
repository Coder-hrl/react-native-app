import React from 'react';
import {Flex, View} from '@ant-design/react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import arrow from 'assets/images/zhankai.png';

function LayoutHeader({title, hasBack = true}) {
  return (
    <Flex
      justify={hasBack ? 'flex-start' : 'center'}
      style={styles.LayoutHeader}
      align="center">
      {hasBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FastImage source={arrow} style={styles.arrowImg} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.LayoutHeaderTitle}>{title}</View>
    </Flex>
  );
}

const styles = StyleSheet.create({
  LayoutHeader: {
    paddingBottom: 10,
    marginHorizontal: -20,
    backgroundColor: '#fff',
  },
  arrowImg: {
    width: 24,
    height: 24,
    marginRight: 14,
  },
  LayoutHeaderTitle: {
    fontSize: 18,
    color: '#34373a',
    fontWeight: '500',
  },
});

export default LayoutHeader;
