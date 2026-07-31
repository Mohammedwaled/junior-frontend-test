import { useSelector } from "react-redux";
import { toggleTask, deleteTask } from "../../redux/tasksSlice";
import TaskCard from "../TaskCard/TaskCard";

import "./TaskList.css";


function TaskList(){


const {
 tasks,
 loading,
 error,
 filter,
 search

}=useSelector(
state=>state.tasks
);



if(loading){

return(

<div className="empty">
Loading tasks...
</div>

);

}



if(error){

return(

<div className="empty">
{error}
</div>

);

}



if(tasks.length===0){

return(

<div className="empty">
No tasks available
</div>

);

}

let filteredTasks = tasks;

if(search){

filteredTasks =
filteredTasks.filter(task=>

task.title
.toLowerCase()
.includes(
search.toLowerCase()
)

);

}


if(filter === "high"){

  filteredTasks = filteredTasks.filter(
    task => task.priority === "high"
  );

}


if(filter === "medium"){

filteredTasks = filteredTasks.filter(
    task => task.priority === "medium"
  );

}


if(filter === "low"){

filteredTasks = filteredTasks.filter(
    task => task.priority === "low"
  );

}


if(filter === "completed"){

filteredTasks = filteredTasks.filter(
    task => task.completed
  );

}

return(

<div className="task-list">

{

filteredTasks.map(task=>(

<TaskCard

key={task.id}

task={task}

/>

))

}

</div>

);


}


export default TaskList;