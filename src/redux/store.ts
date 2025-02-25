import {configureStore} from '@reduxjs/toolkit';
import jokeReducer from './home/jokeSlices';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    jokes: jokeReducer,
  },
  middleware: getDefaultMiddleware =>
    __DEV__ ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
