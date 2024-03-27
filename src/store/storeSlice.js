import {createSlice} from '@reduxjs/toolkit';

// 使用@reduxjs/toolkit精简rudex方法

const routeSlice = createSlice({
  name: 'route',
  initialState: {
    value: [{}],
  },
  reducers: {
    setRoute: (state, action) => {
      console.log(action);
      state.value = action.payload;
    },
  },
});

export const setRoute = routeSlice.actions.setRoute;
export const routeReducer = routeSlice.reducer;
