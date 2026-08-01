import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


// ─── AsyncStorage key ────────────────────────────────────────────────────────
const STORAGE_KEY = 'tasks';


// ─── Persistence helpers ─────────────────────────────────────────────────────
// Web equivalent: JSON.parse(localStorage.getItem("tasks"))
// AsyncStorage is async, so we expose this as a thunk called on app boot.

export const loadTasksFromStorage = createAsyncThunk(
  'tasks/loadTasksFromStorage',
  async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
);


// ─── API thunk ────────────────────────────────────────────────────────────────
// Identical to the web version.
// Only populates tasks when the store is empty (localStorage / AsyncStorage takes priority).

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            const mapped = data.map((user, index) => ({
              id:       user.id,
              title:    user.name,
              email:    user.email,
              company:  user.company ? user.company.name : '',
              city:     user.address ? user.address.city : '',
              priority:
                index % 3 === 0
                  ? 'high'
                  : index % 3 === 1
                  ? 'medium'
                  : 'low',
              completed: false,
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


// ─── Initial state ────────────────────────────────────────────────────────────
// Web version read localStorage synchronously here.
// In React Native, AsyncStorage is async — initial state starts empty.
// The loadTasksFromStorage thunk populates it on app mount before fetchTasks runs.

const initialState = {
  tasks:   [],
  filter:  'all',
  search:  '',
  loading: false,
  error:   null,
};


// ─── Slice ────────────────────────────────────────────────────────────────────
// All reducers are identical to the web version.
// localStorage calls inside saveTasks have been removed —
// persistence is now handled by the store subscriber in store.js.

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,

  reducers: {

    // Web: saveTasks wrote to localStorage directly inside the reducer.
    // In React Native, this reducer is kept for API parity but does nothing —
    // the store subscriber handles async writes to AsyncStorage.
    saveTasks: () => {},

    // Web: state.tasks.unshift(action.payload)
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },

    // Web: state.tasks.filter(task => task.id !== action.payload)
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        task => task.id !== action.payload
      );
    },

    // Web: task.completed = !task.completed
    toggleTask: (state, action) => {
      const task = state.tasks.find(
        task => task.id === action.payload
      );
      if (task) {
        task.completed = !task.completed;
      }
    },

    // Web: task.title = title; task.priority = priority
    editTask: (state, action) => {
      const { id, title, priority } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.title    = title;
        task.priority = priority;
      }
    },

    // Web: state.filter = action.payload
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // Web: state.search = action.payload
    setSearch: (state, action) => {
      state.search = action.payload;
    },

  },


  // ─── Extra reducers (async thunks) ─────────────────────────────────────────

  extraReducers: (builder) => {

    // ── loadTasksFromStorage ─────────────────────────────────────────────────
    // Populates tasks from AsyncStorage on app boot.
    // Replaces the synchronous localStorage.getItem in the web's initialState.

    builder
      .addCase(loadTasksFromStorage.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(loadTasksFromStorage.rejected, (state, action) => {
        // If AsyncStorage read fails, keep empty array — fetchTasks will load from API.
        state.error = action.error.message;
      });


    // ── fetchTasks ───────────────────────────────────────────────────────────
    // Identical logic to the web version.

    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        // Web: if(state.tasks.length === 0) — only populate if no persisted data
        if (state.tasks.length === 0) {
          state.tasks = action.payload;
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.error.message;
      });

  },

});


export const {
  saveTasks,
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  setFilter,
  setSearch,
} = tasksSlice.actions;

export default tasksSlice.reducer;
