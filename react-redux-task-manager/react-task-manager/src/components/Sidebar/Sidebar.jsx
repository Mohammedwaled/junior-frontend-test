import { useDispatch, useSelector } from "react-redux";

import { setFilter } from "../../redux/tasksSlice";

import "./Sidebar.css";
import sidebarData from "./sidebarData";


function Sidebar() {

  const dispatch = useDispatch();


  const tasks = useSelector(
    state => state.tasks.tasks
  );

const activeFilter = useSelector(
  state => state.tasks.filter
);


  const counts = {

    all:
    tasks.length,


    today:
    tasks.length,


    important:
    tasks.filter(
      task => task.priority === "high"
    ).length,


    completed:
    tasks.filter(
      task => task.completed
    ).length

  };




  const handleClick = (label)=>{


  if(label === "All Tasks"){
    dispatch(setFilter("all"));
}

if(label === "Today"){
    dispatch(setFilter("today"));
}

if(label === "Important"){
    dispatch(setFilter("high"));
}

if(label === "Completed"){
    dispatch(setFilter("completed"));
}


if(label === "High"){

dispatch(setFilter("high"));

setSidebarOpen(false);

}

  };




  return (
    <aside className="sidebar">


    <div className="brand-row">

  <h1 className="brand">
    Task Manager
  </h1>


  

</div>




      <div className="profile">


        <div className="avatar">
          M
        </div>



        <div>

          <strong>
            User
          </strong>

          <span>
            Stay productive
          </span>


        </div>


      </div>





      <nav className="nav">


        {sidebarData.map((item)=>(


          <button

            className={
  (item.key === "all" && activeFilter === "all") ||
(item.key === "today" && activeFilter === "today")||
  (item.key === "important" && activeFilter === "high") ||
  (item.key === "completed" && activeFilter === "completed")
    ? "nav-item active"
    : "nav-item"
}

            key={item.id}

            onClick={()=>handleClick(item.label)}

          >


            <span className="nav-icon">

              {item.icon}

            </span>



            <span className="nav-label">

              {item.label}

            </span>




            <span className="count">


              {
                counts[item.key]
              }


            </span>



          </button>


        ))}



      </nav>




      <div className="tip">


        <div className="tip-icon">
          ▥
        </div>


        <div>

          <strong>
            Stay productive!
          </strong>


          <span>
            You're doing great. Keep moving forward 💪
          </span>


        </div>


      </div>



    </aside>
  );

}


export default Sidebar;