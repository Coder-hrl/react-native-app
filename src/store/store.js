import {configureStore} from '@reduxjs/toolkit';
import {routeReducer, TabReducer, UserReducer} from './storeSlice';

const store = configureStore({
  reducer: {
    route: routeReducer,
    tab: TabReducer,
    user: UserReducer,
  },
});

export default store;
