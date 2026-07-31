import { useDispatch } from "react-redux";

import { setSearch } from "../../redux/tasksSlice";

import "./SearchBar.css";


function SearchBar(){


const dispatch = useDispatch();



return(

<div className="search-wrap">


<span className="search-icon">
⌕
</span>



<input

className="search"

type="search"

placeholder="Search tasks..."

onChange={(e)=>
dispatch(setSearch(e.target.value))
}

/>


</div>

);


}


export default SearchBar;