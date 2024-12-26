import React from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {actionList} from './index.config';
import {LayoutHeader, LayoutWrapper} from 'components';

function WorkSpace() {
  const navigation = useNavigation();

  const JumpIntoPath = path => {
    navigation.navigate(path);
  };
  return (
    <LayoutWrapper>
      <LayoutHeader title="功能演示" hasBack={false} />

      <ScrollView
        style={styles.actionWrapper}
        showsVerticalScrollIndicator={false}>
        {actionList.map(item => {
          return (
            <TouchableOpacity
              key={item.path}
              style={styles.actionItem}
              onPress={() => JumpIntoPath(item.path)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </LayoutWrapper>
  );
}

const styles = StyleSheet.create({
  actionWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  actionItem: {
    margin: 'auto',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
  },
});

export default WorkSpace;
