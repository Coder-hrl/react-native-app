import React, {useState, useEffect} from 'react';
import {Flex, View} from '@ant-design/react-native';
import {ajax} from 'config';
import {TouchableOpacity, StyleSheet} from 'react-native';

import PdfViewer from './PdfViewer';
import ImageViewer from './ImageViewer';
import LayoutWrapper from '../LayoutWrapper';
import zhankai from 'assets/images/zhankai.png';
import FastImage from 'react-native-fast-image';

function Viewer({route}) {
  const {fileName, file_url, type} = route?.params;

  const [base64, setBase64] = useState('');

  const getFileBase64 = () => {
    return new Promise((resolve, reject) => {
      ajax({
        url: '/app/get-file-base64',
        type: 'post',
        data: {
          file_url,
        },
      }).then(res => {
        if (res.code === 20000) {
          resolve(res.data[0]);
        } else {
          message.error('文件获取错误！');
        }
      });
    });
  };
  useEffect(() => {
    (async () => {
      const base64Content = await getFileBase64(file_url);
      setBase64(base64Content);
    })();
  }, [file_url]);

  return (
    <>
      <LayoutWrapper>
        <Flex style={styles.LayoutHeader} justify="between" align="center">
          <Flex align="center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FastImage source={zhankai} style={styles.zhankaiImg} />
            </TouchableOpacity>
            <View
              ellipsizeMode="middle"
              numberOfLines={1}
              style={styles.LayoutHeaderTitle}>
              {fileName}
            </View>
          </Flex>
        </Flex>
        {base64 ? (
          <>
            {type === 'pdf' ? (
              <PdfViewer base64={base64} />
            ) : type === 'image' ? (
              <ImageViewer base64={base64} />
            ) : null}
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View> loading...</View>
          </View>
        )}
      </LayoutWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  LayoutHeader: {
    marginTop: 20,
    marginBottom: 4,
  },
  zhankaiImg: {
    width: 24,
    height: 24,
    marginRight: 14,
  },
  LayoutHeaderTitle: {
    fontSize: 24,
    flex: 1,
    color: '#34373a',
    fontWeight: '500',
  },
});

export default Viewer;
