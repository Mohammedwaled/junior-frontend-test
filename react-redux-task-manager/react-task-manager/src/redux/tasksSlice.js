import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// API
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );


    if(!response.ok){

      throw new Error("Failed to fetch users");

    }


    const data = await response.json();


    return data.map((user,index)=>({

      id:user.id,

      title:user.name,

      email:user.email,

      company:user.company.name,

      city:user.address.city,


      priority:
        index % 3 === 0
        ? "high"
        : index % 3 === 1
        ? "medium"
        : "low",


      completed:false

    }));

  }
);



const initialState = {

  tasks: [],

  filter:"all",
  search:"",
  loading:false,

  error:null

};



const tasksSlice = createSlice({

  name:"tasks",

  initialState,


  reducers:{


    addTask:(state,action)=>{

      state.tasks.unshift(action.payload);

    },


    deleteTask:(state,action)=>{

      state.tasks =
      state.tasks.filter(
        task => task.id !== action.payload
      );

    },


    toggleTask:(state,action)=>{

      const task =
      state.tasks.find(
        task => task.id === action.payload
      );


      if(task){

        task.completed =
        !task.completed;

      }

    },


    editTask:(state,action)=>{

      const {
        id,
        title,
        priority

      } = action.payload;



      const task =
      state.tasks.find(
        task => task.id === id
      );


      if(task){

        task.title = title;

        task.priority = priority;

      }

    },


  setFilter:(state,action)=>{

  state.filter = action.payload;

},


setSearch:(state,action)=>{

  state.search = action.payload;

}
    


  },



  extraReducers:(builder)=>{


    builder


    .addCase(fetchTasks.pending,(state)=>{

      state.loading = true;

      state.error = null;

    })



    .addCase(fetchTasks.fulfilled,(state,action)=>{

      state.loading = false;

      state.tasks = action.payload;

    })



    .addCase(fetchTasks.rejected,(state,action)=>{

      state.loading = false;

      state.error = action.error.message;

    });


  }


});





export const {

  addTask,

  deleteTask,

  toggleTask,

  editTask,

  setFilter,
  setSearch,

} = tasksSlice.actions;




export default tasksSlice.reducer;