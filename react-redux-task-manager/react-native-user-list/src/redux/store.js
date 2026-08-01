import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usersReducer from './usersSlice';

const STORAGE_KEY = 'users';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

let lastUsersState = [];

store.subscribe(async () => {
  const state = store.getState();
  const users = state.users.users;

  if (users !== lastUsersState && users.length > 0) {
    lastUsersState = users;
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users to AsyncStorage:', error);
    }
  }
});