import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./style.css";

const DiscoverSearch = () => {
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
    <div
      className={`${
        isFocused ? "discover-search__focused" : "discover_container"
      }`}
    >
      <span className="ms-2">{<FaSearch />}</span>
      <input
        type="text"
        placeholder="search"
        onKeyDown={handleKeyDown}
        name="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default DiscoverSearch;
