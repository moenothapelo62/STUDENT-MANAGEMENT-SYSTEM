// Import three icon components from the "react-icons/lu" library
// These are small SVG icons (search, filter, sort) used inside the UI
import { LuSearch, LuFilter, LuArrowUpDown } from "react-icons/lu";

// Create a React component called "StudentSearchFilter"
// A component is a reusable piece of UI (like a search bar area)
// The curly braces { } here destructure the "props" (data passed in from the parent)
function StudentSearchFilter({
  search,                   
  onSearchChange,            
  statusFilter,              
  onStatusFilterChange,      
  sortBy,                    
  onSortChange,              
}) {
  return (
    // A wrapper div with two CSS classes for styling
    <div className="search-filter glass">

      <div className="input-wrapper">
        <LuSearch className="input-icon" size={18} />
        
        // Text input where user types to search students 
        <input
          type="text"                                       
          className="search-input"                          
          placeholder="Search by name or email..."          
          value={search}                                    
          onChange={(e) => onSearchChange(e.target.value)}  
        />
      </div>

      // STATUS FILTER DROPDOWN 
      <div className="input-wrapper">
        <LuFilter className="input-icon" size={18} />
        
        <select
          className="filter-select"
          value={statusFilter}                                       
          onChange={(e) => onStatusFilterChange(e.target.value)}     
        >
          <option value="all">All Students</option>                  
          <option value="enrolled">Enrolled Only</option>           
          <option value="not-enrolled">Not Enrolled Only</option>    
        </select>
      </div>

     // SORT DROPDOWN 
      <div className="input-wrapper">
        <LuArrowUpDown className="input-icon" size={18} />
        
        <select
          className="filter-select"
          value={sortBy}                                     
          onChange={(e) => onSortChange(e.target.value)}     
        >
          <option value="id">Sort by ID</option>             
          <option value="name">Sort by Name</option>        
          <option value="age">Sort by Age</option>           
          <option value="course">Sort by Course</option>     
        </select>
      </div>

    </div>
  );
}

export default StudentSearchFilter;