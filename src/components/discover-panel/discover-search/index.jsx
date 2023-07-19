import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./style.css";

const DiscoverSearch = ({ isFriend }) => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert(`${searchText} is the search word`);
      setSearchText("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className={isFriend && "ms-3 row"}>
      <div
        className={`${
          isFocused ? "discover-search__focused" : "discover_container"
        } ${isFriend && "col-md-8"}`}
      >
        <span className="ms-2">{<FaSearch />}</span>
        <input
          type="text"
          placeholder={isFriend ? "Search Friend" : "Search"}
          onKeyDown={handleKeyDown}
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {isFriend && (
        <div className="col-md-2 d-flex align-self-center ms-1">
          <button className="btn btn-outline-secondary">Search</button>
        </div>
      )}
    </div>
  );
};

export default DiscoverSearch;
