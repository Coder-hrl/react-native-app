import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (name, value) => {
  let _value;
  if (typeof value === 'string') {
    _value = value;
  } else {
    _value = JSON.stringify(value);
  }
  return await AsyncStorage.setItem(name, _value);
};

const getItem = async name => {
  return await AsyncStorage.getItem(name);
};

const getObjItem = async name => {
  const objStr = await AsyncStorage.getItem(name);
  if (objStr) {
    return JSON.parse(objStr);
  } else {
    return null;
  }
};

const removeItem = async name => {
  return await AsyncStorage.removeItem(name);
};

const clear = async () => {
  return await AsyncStorage.clear();
};

const getAllKeys = async () => {
  return await AsyncStorage.getAllKeys();
};

export {setItem, getItem, removeItem, clear, getAllKeys, getObjItem};
