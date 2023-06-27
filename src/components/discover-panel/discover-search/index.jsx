import React, { useState } from "react";

const DiscoverSearch = () => {
  const [searchText, setSearchText] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert(`${searchText} is the search word`);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="search"
        onKeyDown={handleKeyDown}
        name="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default DiscoverSearch;
