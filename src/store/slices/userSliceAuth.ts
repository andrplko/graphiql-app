import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSlice {
  isAuth: boolean | undefined;
  userEmail: string | undefined | null;
}

const initialState: UserSlice = {
  isAuth: undefined,
  userEmail: undefined,
};

export const userSliceAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserSlice>) => {
      state.isAuth = action.payload.isAuth;
      state.userEmail = action.payload.userEmail;
    },
  },
});

export const { setUser } = userSliceAuth.actions;

export default userSliceAuth.reducer;
