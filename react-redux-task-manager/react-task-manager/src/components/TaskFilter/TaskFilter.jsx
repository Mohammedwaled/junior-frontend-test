import { useDispatch, useSelector } from "react-redux";

import { setFilter } from "../../redux/tasksSlice";

import "./TaskFilter.css";


function TaskFilter(){


const dispatch = useDispatch();


const activeFilter =
useSelector(
state=>state.tasks.filter
);



const filters=[
"all",
"high",
"medium",
"low"
];



return(

<div className="filters">

{

filters.map(filter=>(

<button

key={filter}

onClick={()=>dispatch(setFilter(filter))}

className={
activeFilter === filter
? "filter-btn active"
: "filter-btn"
}

>

{
filter.charAt(0).toUpperCase()
+
filter.slice(1)

}

</button>

))

}

</div>

);


}


export default TaskFilter;