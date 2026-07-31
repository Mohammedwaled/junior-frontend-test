import "./Filters.css";

function Filters() {

  const filters = [
    "All",
    "High",
    "Medium",
    "Low"
  ];


  return (

    <div className="filters">

      {filters.map((filter,index)=>(
        
        <button
          key={filter}
          className={
            index === 0 
            ? "filter-btn active"
            : "filter-btn"
          }
        >

          {filter}

        </button>

      ))}


    </div>

  );
}


export default Filters;