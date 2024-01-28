import React from "react";

const SearchFilter = ({
  filterComplete,
  handleFilterChange,
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <div className="fixed top-0 z-50 flex flex-row-reverse p-4 right-10 ">
      <div className="mx-5 mt-3 filter">
        <label className="popup">
          <input type="checkbox" />
          <div className="burger" tabIndex="0">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="z-10 popup-window">
            <legend>Filter Tasks</legend>
            <ul>
              <li>
                <button onClick={() => handleFilterChange("all")}>
                  <span>All</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterChange("complete")}>
                  <span>Complete</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterChange("incomplete")}>
                  <span>Incomplete</span>
                </button>
              </li>
            </ul>
          </nav>
        </label>
      </div>

      <div className="searchmain">
        <div className="container">
          <input className="checkbox" type="checkbox" />
          <div className="mainbox">
            <div className="iconContainer">
              <svg
                viewBox="0 0 512 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="search_icon"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
              </svg>
            </div>
            <input
              className="search_input"
              placeholder="search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
