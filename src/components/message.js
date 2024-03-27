import React from 'react';
import {View, Text, Dimensions, Toast, Modal} from 'react-native';
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
      <Text style={{fontSize: dp2px(26), color: '#333333'}}>{text}</Text>
    ),
    footer,
    onBackHandler,
  );
};

const Message = {
  suscess(text = '') {
    Toast.info({
      content: (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconSet
            style={{color: '#00cc66', fontSize: 20, marginRight: 5}}
            name="duihao"
          />
          <Text style={{color: '#fff'}}>{text}</Text>
        </View>
      ),
      mask: false,
      stackable: true,
      duration: 1.5,
    });
  },
  error(text = '') {
    Toast.info({
      content: (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconSet
            style={{color: '#ff5b4d', fontSize: 20, marginRight: 5}}
            name="jingshitishi"
          />
          <Text style={{color: '#fff'}}>{text}</Text>
        </View>
      ),
      mask: false,
      stackable: true,
      duration: 3,
    });
  },
  warning(text = '') {
    Toast.info({
      content: (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconSet
            style={{color: '#fab933', fontSize: 20, marginRight: 5}}
            name="jingshitishi"
          />
          <Text style={{color: '#fff'}}>{text}</Text>
        </View>
      ),
      mask: false,
      stackable: true,
      duration: 1.5,
    });
  },
};

const AffirmToast = ({
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
          fontSize: dp2px(30),
          color: '#333333',
          marginBottom: dp2px(40),
          marginTop: dp2px(10),
        }}>
        {title}
      </Text>
    </Modal>
  );
};

Message.confirm = AffirmToast;

export {ModalToast, Message};
