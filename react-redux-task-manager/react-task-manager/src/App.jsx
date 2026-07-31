import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";

import { fetchTasks } from "./redux/tasksSlice";

import "./App.css";


function App(){

const dispatch = useDispatch();


const [sidebarOpen,setSidebarOpen] = useState(false);



useEffect(()=>{

 dispatch(fetchTasks());

},[dispatch]);



return(

<div 
className={
sidebarOpen
? "app sidebar-open"
: "app"
}
>


<Sidebar

sidebarOpen={sidebarOpen}

setSidebarOpen={setSidebarOpen}

/>


<button
className={
 sidebarOpen 
 ? "mobile-menu open"
 : "mobile-menu"
}
onClick={()=>setSidebarOpen(!sidebarOpen)}
>

{
sidebarOpen
? "×"
: "☰"
}

</button>



<Dashboard/>


</div>

);


}


export default App;