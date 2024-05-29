import {message} from 'components';
import {Platform} from 'react-native';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';

async function checkPermission(PERMISSIONS) {
  let flag = false;
  if (Platform.OS === 'android') {
    const result = await check(PERMISSIONS);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        message.error('在设备不支持此功能');
        break;
      case RESULTS.DENIED:
        message.error('权限被拒绝，无法使用该功能');
        break;
      case RESULTS.LIMITED:
        message.error('权限被限制，部分功能可能无法使用');
        break;
      case RESULTS.GRANTED:
        flag = true;
        break;
      case RESULTS.BLOCKED:
        message.error('权限被禁止，部分功能可能无法使用');
        break;
    }

    return flag;
  }
}

async function requestPermission(PERMISSIONS) {
  if (Platform.OS === 'android') {
    try {
      await request(PERMISSIONS);

      const result = await checkPermission(PERMISSIONS);

      return result;
    } catch (err) {
      console.warn(err);
    }
  }
}

export const requestCamera = async () => {
  return await requestPermission(PERMISSIONS.ANDROID.CAMERA);
};
export const requestWrite = async () => {
  return await requestPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
};
