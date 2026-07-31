import { useEffect } from "react";

import { useDispatch } from "react-redux";

import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";

import { fetchTasks } from "./redux/tasksSlice";

import "./App.css";


function App(){

const dispatch = useDispatch();


useEffect(()=>{

 dispatch(fetchTasks());

},[dispatch]);



return(

<div className="app">

<Sidebar/>

<Dashboard/>

</div>

);


}


export default App;