import { useState } from "react";

import "./Dashboard.css";

import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskList from "../TaskList/TaskList";
import TaskSummary from "../TaskSummary/TaskSummary";
import Modal from "../Modal/Modal";


function Dashboard() {


  const [modalOpen,setModalOpen] = useState(false);



  return (

    <main className="main">


      <section className="content">


        



    <Header 
  onAddClick={()=>setModalOpen(true)}
/>

        <SearchBar />

        <TaskFilter />

        <TaskList />

        <TaskSummary />




        <Modal

          isOpen={modalOpen}

          onClose={()=>setModalOpen(false)}

        />



      </section>


    </main>

  );

}


export default Dashboard;