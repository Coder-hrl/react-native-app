import {
  init,
  Geolocation,
  setLocationMode,
} from 'react-native-amap-geolocation';
import {useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {message} from 'components';
import {mapkey} from './app.config';

function useGetCoords(reOrient) {
  const [coords, setCoords] = useState(null);

  const locationInit = async () => {
    try {
      const systemVersion = DeviceInfo.getSystemVersion();

      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );

      if (systemVersion.split('.')[0] >= 10) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        );
      }

      await init({
        android: mapkey,
      });
    } catch (error) {
      console.log('object', error);
    }
  };

  const getMylocation = async () => {
    locationInit()
      .then(() => {
        setLocationMode('Hight_Accuracy');

        Geolocation.getCurrentPosition(
          res => {
            setCoords(res.location);
            message.success('定位成功');
          },
          err => {
            message.error(
              '用户定位授权失败，请检查系统定位权限会否打开，或重试',
            );
          },
        );
      })
      .catch(() => {
        resolve();
      });
  };

  useEffect(() => {
    getMylocation();
  }, [reOrient]);

  return coords;
}

export default useGetCoords;
