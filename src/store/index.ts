import { configureStore } from '@reduxjs/toolkit';

import userReducerAuth, { userSliceAuth } from './slices/userSliceAuth';

export const store = configureStore({
  reducer: {
    [userSliceAuth.name]: userReducerAuth,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
