import { useState } from "react";

import { useDispatch } from "react-redux";

import { 
  toggleTask,
  deleteTask
} from "../../redux/tasksSlice";

import Modal from "../Modal/Modal";

import "./TaskCard.css";

function TaskCard({task}) {


  const dispatch = useDispatch();

const [editOpen,setEditOpen] = useState(false);

  return (

    <article 
      className={
        task.completed 
        ? "task-card completed" 
        : "task-card"
      }
    >


    <button 
  className={
    task.completed
    ? "checkbox completed"
    : "checkbox"
  }

  onClick={()=>
    dispatch(toggleTask(task.id))
  }

>
  {task.completed && "✓"}

</button>



      <div className="task-main">


        <h3 className="task-title">
          {task.title}
        </h3>



        <div className="meta">

          <span>
            Today
          </span>


          <span className="dot">
            •
          </span>


          <span>
            {
              task.completed
              ? "Completed"
              : "Open"
            }
          </span>


        </div>


      </div>




      <div 
        className={`priority ${task.priority}`}
      >

        {
          task.priority.charAt(0).toUpperCase()
          +
          task.priority.slice(1)
        }

      </div>




      <div className="actions">


      <button 

className="icon-btn edit"

onClick={()=>setEditOpen(true)}

>

✎

</button>



        <button 
 className="icon-btn delete"

 onClick={()=>
  dispatch(deleteTask(task.id))
 }

>

⌫

</button>


      </div>

{
editOpen &&

<Modal

isOpen={editOpen}

onClose={()=>setEditOpen(false)}

editData={task}

/>

}
    </article>

  );

}


export default TaskCard;