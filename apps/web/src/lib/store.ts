import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import eventSlice, { theEventSlice } from './features/event/eventSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      event: eventSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
