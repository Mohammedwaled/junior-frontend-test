import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  addTask,
  editTask
} from "../../redux/tasksSlice";

import "./Modal.css";


function Modal({isOpen, onClose, editData}) {


  const dispatch = useDispatch();



  const [title,setTitle] = useState(
    editData ? editData.title : ""
  );


  const [priority,setPriority] = useState(
    editData ? editData.priority : "medium"
  );



  if(!isOpen) return null;




  const handleSubmit = (e)=>{

    e.preventDefault();



    if(!title.trim()) return;



    if(editData){


      dispatch(
        editTask({

          id: editData.id,

          title,

          priority

        })
      );


    }

    else{


      dispatch(
        addTask({

          id: Date.now(),

          title,

          priority,

          completed:false

        })
      );


    }



    onClose();


  };





  return (

    <div className="modal-backdrop">


      <div className="modal">


        <div className="modal-head">


          <h2>

            {
              editData
              ? "Edit Task"
              : "Add New Task"
            }

          </h2>



          <button

            className="close"

            onClick={onClose}

          >

            ×

          </button>


        </div>





        <form onSubmit={handleSubmit}>


          <div className="field">


            <label>
              Task title
            </label>



            <input

              value={title}

              onChange={(e)=>
                setTitle(e.target.value)
              }

              placeholder="e.g. Finish React coding test"

            />


          </div>






          <div className="field">


            <label>
              Priority
            </label>



            <select

              value={priority}

              onChange={(e)=>
                setPriority(e.target.value)
              }

            >


              <option value="high">
                High
              </option>


              <option value="medium">
                Medium
              </option>


              <option value="low">
                Low
              </option>


            </select>


          </div>







          <div className="modal-actions">



            <button

              type="button"

              className="btn-secondary"

              onClick={onClose}

            >

              Cancel

            </button>





            <button

              type="submit"

              className="btn-primary"

            >

              {
                editData
                ? "Save Changes"
                : "Add Task"
              }


            </button>




          </div>



        </form>



      </div>



    </div>

  );

}


export default Modal;