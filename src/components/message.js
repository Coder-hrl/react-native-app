import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Toast, View, Flex, Modal} from '@ant-design/react-native';
import IconSet from './IconSet';

/**
 *
 * @param {params} text 提示文字
 * @param {params} footer 底部按钮
 * @param {params} title 标题
 * @param {params} cb 点击回调
 * @param {params} message 内容
 */
const ModalToast = ({
  text = '',
  footer = [{text: '确认', onPress: () => {}}],
  onBackHandler = true,
  title = '',
  message = '',
}) => {
  Modal.alert(
    title,
    message ? (
      message
    ) : (
      <View style={{fontSize: 16, color: '#333333'}}>{text}</View>
    ),
    footer,
    onBackHandler,
  );
};

const basicInfo = (color, type) => {
  return text => {
    Toast.info({
      content: (
        <Flex align="center">
          <IconSet style={[styles.messageIcon, {color}]} name={type} />
          <View style={styles.messageContent}>{text}</View>
        </Flex>
      ),
      mask: false,
      stackable: true,
      duration: 3,
    });
  };
};

const message = {
  success(text = '') {
    basicInfo('#00cc66', 'chenggong')(text);
  },
  error(text = '') {
    basicInfo('#ff5b4d', 'cuowu')(text);
  },
  warning(text = '') {
    basicInfo('#fab933', 'jinggao')(text);
  },
  info(text = '') {
    basicInfo('#e6e6e6', 'tishi')(text);
  },
  loading(text = 'Loading...') {
    Toast.loading(text, 0);
  },
};

const ConfirmToast = ({
  visible,
  title,
  loading,
  onCancel = () => {},
  onSubmit = () => {},
}) => {
  return (
    <Modal
      transparent
      style={{width: Dimensions.get('window').width * 0.8}}
      onClose={onCancel}
      bodyStyle={{
        padding: 0,
      }}
      footer={[
        {
          text: '取消',
          onPress: onCancel,
        },
        {
          text: '确认',
          onPress: onSubmit,
        },
      ]}
      maskClosable
      visible={visible}>
      <Text
        style={{
          fontSize: 18,
          color: '#333333',
          marginBottom: 9,
          textAlign: 'center',
        }}>
        提示
      </Text>
      <Text
        style={{
          fontSize: 30,
          color: '#333333',
          marginBottom: 40,
          marginTop: 10,
        }}>
        {title}
      </Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  messageIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  messageContent: {
    maxWidth: 320,
    color: '#fff',
  },
});

export {ModalToast, ConfirmToast, message};
