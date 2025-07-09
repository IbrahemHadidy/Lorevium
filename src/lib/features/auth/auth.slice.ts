import type { User } from '@/lib/types/models/user';
import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  readonly isInitialized: boolean;
  readonly user: User | null;
}

const initialState: InitialState = {
  isInitialized: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const initializeAuth = createAction('auth/initializeAuth');

export const { setInitialized, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
