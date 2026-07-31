import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";


export const store = configureStore({

  reducer: {

    tasks: tasksReducer,

  },


});


store.subscribe(()=>{

  const tasks =
  store.getState().tasks.tasks;


  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );


});