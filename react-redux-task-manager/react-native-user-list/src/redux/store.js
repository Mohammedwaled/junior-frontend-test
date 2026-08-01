import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tasksReducer from "./tasksSlice";

const STORAGE_KEY = "tasks";


export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});


// يمنع الحفظ قبل تحميل البيانات القديمة
let canSave = false;


export const startSaving = () => {
  canSave = true;
};


store.subscribe(async () => {

  if (!canSave) return;


  try {

    const tasks = store.getState().tasks.tasks;


    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );


    console.log(
      "Saved:",
      tasks.length
    );


  } catch (error) {

    console.log(
      "Save Error:",
      error
    );

  }

});