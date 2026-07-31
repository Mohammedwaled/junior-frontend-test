import "./Header.css";

function Header({onAddClick}) {  return (
    <div className="topbar">

      <div className="heading">
        <h1>Today's Tasks</h1>

        <p>
          Keep your priorities clear and get things done.
        </p>
      </div>


      <button

className="add-btn"

onClick={onAddClick}

>
+ Add Task
</button>

    </div>
  );
}

export default Header;