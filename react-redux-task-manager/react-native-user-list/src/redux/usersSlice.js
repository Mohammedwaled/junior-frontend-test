import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'users';

// ─── AsyncStorage Hydration Thunk ───────────────────────────────────────────
export const loadUsersFromStorage = createAsyncThunk(
  'users/loadUsersFromStorage',
  async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
);

// ─── API Fetch Thunk ────────────────────────────────────────────────────────
// Uses XMLHttpRequest for guaranteed compatibility with React Native Hermes
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            const mapped = data.map((user) => ({
              id: user.id,
              name: user.name,
              email: user.email,
              address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
            }));
            resolve(mapped);
          } catch (e) {
            reject(new Error('Failed to parse users data'));
          }
        } else {
          reject(new Error('Failed to fetch users'));
        }
      };
      xhr.onerror = () => {
        reject(new Error('Network error: Failed to fetch users'));
      };
      xhr.send();
    });
  }
);

// ─── Initial State ──────────────────────────────────────────────────────────
const initialState = {
  users: [],
  search: '',
  loading: false,
  error: null,
};

// ─── Slice ──────────────────────────────────────────────────────────────────
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    // loadUsersFromStorage
    builder
      .addCase(loadUsersFromStorage.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loadUsersFromStorage.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // fetchUsers
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (state.users.length === 0) {
          state.users = action.payload;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearch } = usersSlice.actions;
export default usersSlice.reducer;
