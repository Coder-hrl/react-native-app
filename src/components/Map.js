import React, {useEffect, useRef, useState} from 'react';
import {View} from '@ant-design/react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

import {ajax} from 'config';

function Map({address, lat, lng, feature, boat = false}) {
  const webRef = useRef(null);
  const timer = useRef(null);
  const timer2 = useRef(null);

  const sendMessage = () => {
    if (lat && lng) {
      if (boat) {
        if (Array.isArray(lat) && Array.isArray(lng)) {
          webRef.current.injectJavaScript(
            `window.addBoatMarker('${JSON.stringify(lat)}','${JSON.stringify(
              lng,
            )}')`,
          );
        } else {
          webRef.current.injectJavaScript(
            `window.addBoatMarker('${JSON.stringify([lat])}', '${JSON.stringify(
              [lng],
            )}')`,
          );
        }
      } else {
        webRef.current.injectJavaScript(
          `window.addCurrentPosMarker([${lat},${lng}])`,
        );
      }
    }
  };

  const setPolylineAndMark = feature => {
    const _feature = JSON.parse(feature);

    webRef.current.injectJavaScript(
      `window.addPolyLine('${JSON.stringify(
        _feature.latLngs,
      )}','${JSON.stringify(_feature.markerData)}')`,
    );
  };

  const getFloatSrc = _data => {
    const {id, data} = _data;

    ajax({
      url: '/app/get-map-to-base64',
      type: 'get',
      data: data,
    }).then(res => {
      const base64Img = 'data:image/png;base64,' + res.data;

      webRef.current.injectJavaScript(`window.setSrc('${id}','${base64Img}')`);
    });
  };

  useEffect(() => {
    if (timer2.current) clearTimeout(timer2.current);
    timer2.current = setTimeout(() => {
      if (feature) {
        setPolylineAndMark(feature);
      }
    }, 500);

    return () => {
      if (timer2.current) clearTimeout(timer2.current);
    };
  }, [feature]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (lat && lng) {
        sendMessage();
      }
    }, 1000);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [address, lat, lng]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative'}}>
        <WebView
          originWhitelist={['*']}
          ref={webRef}
          allowFileAccess={true}
          geolocationEnabled={true}
          startInLoadingState={true}
          onMessage={event => {
            const _data = JSON.parse(event.nativeEvent.data);

            if (
              typeof _data == 'object' &&
              _data instanceof Object &&
              _data.id
            ) {
              getFloatSrc(_data);
            } else {
            }
          }}
          // onLoadEnd={() => {
          //   sendMessage();
          // }}
          source={{
            uri: 'file:///android_asset/map.html',
            baseUrl: 'file:///android_asset',
          }}
        />
      </View>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({});
