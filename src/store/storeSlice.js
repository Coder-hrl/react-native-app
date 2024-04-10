import {createSlice} from '@reduxjs/toolkit';

// 使用@reduxjs/toolkit精简rudex方法

const routeSlice = createSlice({
  name: 'route',
  initialState: {
    value: [],
  },
  reducers: {
    setRoute: (state, action) => {
      state.value = action.payload;
    },
  },
});

const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    value: 'Home',
  },
  reducers: {
    setTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      name: 'coder_h',
      tel: '1526663256',
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const setRoute = routeSlice.actions.setRoute;
export const routeReducer = routeSlice.reducer;

export const setTab = tabSlice.actions.setTab;
export const TabReducer = tabSlice.reducer;

export const setUser = userSlice.actions.setUser;
export const UserReducer = userSlice.reducer;
