import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './combinReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
