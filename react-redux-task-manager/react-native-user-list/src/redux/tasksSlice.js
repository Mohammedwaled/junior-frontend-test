import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "tasks";


// ===============================
// Load Tasks From AsyncStorage
// ===============================
export const loadTasksFromStorage = createAsyncThunk(
  "tasks/loadTasksFromStorage",
  async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  }
);


// ===============================
// Fetch Tasks From API
// ===============================
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {

      console.log("Fetching tasks...");


      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );


      console.log("Status:", response.status);


      if (!response.ok) {
        throw new Error(
          `HTTP Error ${response.status}`
        );
      }


      const data = await response.json();


      console.log(
        "Users received:",
        data.length
      );


      return data.map((user, index) => ({

        id: user.id,

        title: user.name,

        email: user.email,

        company:
          user.company?.name || "",

        city:
          user.address?.city || "",


        priority:
          index % 3 === 0
            ? "high"
            : index % 3 === 1
            ? "medium"
            : "low",


        completed: false,

      }));


    } catch (error) {


      console.log(
        "FETCH ERROR:",
        error.message
      );


      return rejectWithValue(
        error.message
      );

    }
  }
);



// ===============================
// Initial State
// ===============================
const initialState = {

  tasks: [],

  filter: "all",

  search: "",

  loading: false,

  error: null,

};



// ===============================
// Slice
// ===============================
const tasksSlice = createSlice({

  name: "tasks",

  initialState,


  reducers: {


    saveTasks: () => {},



    addTask: (state, action) => {

      state.tasks.unshift(
        action.payload
      );

    },



    deleteTask: (state, action) => {

      state.tasks =
        state.tasks.filter(
          task =>
            task.id !== action.payload
        );

    },



    toggleTask: (state, action) => {

      const task =
        state.tasks.find(
          task =>
            task.id === action.payload
        );


      if(task){

        task.completed =
          !task.completed;

      }

    },



    editTask: (state, action) => {

      const {
        id,
        title,
        priority
      } = action.payload;



      const task =
        state.tasks.find(
          task =>
            task.id === id
        );



      if(task){

        task.title = title;

        task.priority = priority;

      }

    },



    setFilter: (state, action)=>{

      state.filter =
        action.payload;

    },



    setSearch: (state, action)=>{

      state.search =
        action.payload;

    },


  },



  extraReducers:(builder)=>{


    builder


    // Load Storage
    .addCase(
      loadTasksFromStorage.fulfilled,
      (state, action)=>{

        state.tasks =
          action.payload;

      }
    )



    .addCase(
      loadTasksFromStorage.rejected,
      (state, action)=>{

        state.error =
          action.error.message;

      }
    )



    // Fetch API

    .addCase(
      fetchTasks.pending,
      (state)=>{

        state.loading = true;

        state.error = null;

      }
    )



    .addCase(
      fetchTasks.fulfilled,
      (state, action)=>{


        state.loading = false;


        if(state.tasks.length === 0){

          state.tasks =
            action.payload;

        }


      }
    )



    .addCase(
      fetchTasks.rejected,
      (state, action)=>{


        state.loading = false;


        state.error =
          action.payload ||
          "Failed to fetch tasks";


      }
    );


  },


});





export const {

  addTask,

  deleteTask,

  toggleTask,

  editTask,

  setFilter,

  setSearch,

  saveTasks,

} = tasksSlice.actions;



export default tasksSlice.reducer;