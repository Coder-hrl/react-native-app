import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {View, Platform, Dimensions} from 'react-native';
import React, {memo, useRef, useEffect, useState} from 'react';

const WaterMark = () => {
  const markRef = useRef();
  const user = useSelector(state => state?.user?.value);

  const [renderName, setRenderName] = useState(user.name);

  const renderTextJs = function (user) {
    let arr = [];
    if (user.name) {
      arr = [
        `${user.name}`,
        `${user.tel}`,
        dayjs().format('YYYY/MM/DD HH:mm:ss'),
      ];
    } else {
      arr = ['', '', ''];
    }

    return `
		// 参数
		// str---水印文本  用来展示的文字
		// id---唯一ID     当前水印区域的唯一标识，用于区分多个区域水印
		// dom---DOM元素类名 传入类名则为区域水印，否则全屏水印
		const setWatermark = (strArr, id, dom) => {
			// 如果页面上已经存在该ID的水印元素，则先移除
			if (document.getElementById(id) !== null) document.body.removeChild(document.getElementById(id));
			// 创建一个canvas元素，用于绘制水印
			const can = document.createElement('canvas');
			// 设置canvas的宽度和高度
			can.width = 180;
			can.height = 120;
			// 获取canvas的2d绘图上下文
			const cans = can.getContext('2d');
			// 旋转绘图上下文，设置水印的倾斜角度
			cans.rotate((-20 * Math.PI) / 180);
			// 设置水印文本的字体样式和大小
			cans.font = '14px KaiTi';
			// 设置水印文本的颜色和透明度
			cans.fillStyle = 'rgba(200, 200, 200, 0.50)';
			// 设置水印文本的基线对齐方式
			cans.textBaseline = 'middle';

			// 在canvas上绘制水印文本
			cans.fillText(strArr[0], 20, 60);
			cans.fillText(strArr[1], 20, 80);
			cans.fillText(strArr[2], 20, 100);


			// 创建一个变量用于接收DOM
			let div;
			// 如果传入了dom参数，则获取该类名的DOM元素，将水印添加到该元素上
			if (dom) {
				div = document.querySelector('.' + dom);
			}
			// 设置div元素的ID，用于后续识别和移除水印
			div.id = id;
			// 设置div元素不参与鼠标事件，避免影响页面其他元素的交互
			div.style.pointerEvents = 'none';
			// 设置div元素的z-index层级非常高，确保其显示在页面其他元素之上
			div.style.zIndex = '10000000';

			// 设置div元素的背景为水印图片，并设置为重复显示，从而铺满整个页面
			div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
			// 返回水印元素的ID，可用于后续移除水印
			return id;
		  };
			setWatermark(${JSON.stringify(arr)}, 11, 'box');
	`;
  };

  useEffect(() => {
    if (user.name && user.name !== renderName) {
      setRenderName(user.name);
      markRef.current.reload();
    }
  }, [user]);

  return (
    <View
      pointerEvents="none"
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width + 20,
        position: 'absolute',
        left: -20,
        bottom: 0,
        top: 0,
        right: 0,
        backgroundColor: 'transparent',
      }}>
      <WebView
        ref={markRef}
        injectedJavaScript={renderTextJs(user)}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width + 20,
          backgroundColor: 'transparent',
        }}
        scalesPageToFit={Platform.OS !== 'ios'}
        originWhitelist={['*']}
        useWebKit={true} // ios使用最新webkit内核渲染
        allowUniversalAccessFromFileURLs={true}
        geolocationEnabled={true}
        mixedContentMode={'always'}
        scrollEnabled={false}
        javaScriptEnabled={true}
        onMessage={event => {}}
        source={{
          html: `<!DOCTYPE html>
								<html lang="en">
									<head>
										<meta charset="UTF-8" />
										<meta name="viewport" content="width=device-width, initial-scale=1.0" />
										<title>Watermark</title>
									</head>
									<body>
										<div class="box"></div>
									</body>

									<style>
										.box {
											height: 1000px;
											width: 1000px;
											overflow: hidden;
											background-color:transparent !important;
										}
									</style>
								</html>`,
        }}
      />
    </View>
  );
};

export default memo(WaterMark);
