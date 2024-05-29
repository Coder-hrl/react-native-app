import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '@ant-design/react-native';
import Pdf from 'react-native-pdf';

export default function PdfViewer({base64}) {
  return (
    <View style={styles.container}>
      <Pdf
        source={{
          uri: `data:application/pdf;base64,${base64}`,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
});
