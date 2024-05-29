import React from 'react';

import {StyleSheet} from 'react-native';
import {View, Flex} from '@ant-design/react-native';

export const RenderAction = ({title = '', notop, children, style}) => {
  return (
    <View style={[styles.renderDetail, notop ? {marginTop: 0} : {}, style]}>
      {title ? <View style={styles.DetailTitle}>{title}</View> : null}
      <View>{children}</View>
    </View>
  );
};

export const RenderItem = ({title, value}) => {
  return (
    <>
      <Flex style={styles.DetailItem} justify="between" align="start">
        <View style={styles.DetailLabel}>{title}</View>

        <View style={styles.DetailValue}>{value}</View>
      </Flex>
    </>
  );
};

const styles = StyleSheet.create({
  renderDetail: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 20,
  },
  DetailTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#030816',
    marginBottom: 5,
  },
  DetailItem: {
    marginTop: 10,
    minHeight: 30,
  },
  DetailLabel: {
    fontSize: 14,
    color: '#73787c',
    width: 100,
  },
  DetailValue: {
    flex: 1,
    fontSize: 14,
    color: '#030816',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
});
