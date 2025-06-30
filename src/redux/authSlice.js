import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const loadState = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return {
      token: token ? token : null,
      user: user ? JSON.parse(user) : null,
    };
  } catch (err) {
    console.error('Failed to load auth state', err);
    return {
      token: null,
      user: null,
    };
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem('token', state.token);
    localStorage.setItem('user', JSON.stringify(state.user));
  } catch (err) {
    console.warn('Failed to save auth state', err);
  }
};

const initialState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      saveState(state); // Save to localStorage
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
      saveState(state); // Save to localStorage
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      saveState(state); // Clear localStorage
    }
  }
});

export const { setToken, setUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;
