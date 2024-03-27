import {configureStore} from '@reduxjs/toolkit';
import {routeReducer} from './storeSlice';

const store = configureStore({
  reducer: {
    route: routeReducer,
  },
});

export default store;
