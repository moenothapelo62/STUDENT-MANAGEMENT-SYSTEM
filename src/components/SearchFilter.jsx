import { LuSearch, LuFilter, LuArrowUpDown } from "react-icons/lu";

function SearchFilter({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="search-filter glass">
      <div className="input-wrapper">
        <LuSearch className="input-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

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

export default SearchFilter;
