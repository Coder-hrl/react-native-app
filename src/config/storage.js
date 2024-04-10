import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (name, value) => {
  return await AsyncStorage.setItem(name, JSON.stringify(value));
};

const getItem = async name => {
  return await AsyncStorage.getItem(name);
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

export {setItem, getItem, removeItem, clear, getAllKeys};
