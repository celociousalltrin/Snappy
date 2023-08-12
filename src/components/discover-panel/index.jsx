import React from "react";
import MutualFriends from "./mutual-friends";
import ExperimentalFeatures from "./experimental-features";
import DiscoverSearch from "./discover-search";

import "./style.css";

const DiscoverPanel = () => {
  return (
    <div className="me-5 pe-3 ms-2 position-sticky top-0">
      <DiscoverSearch />
      <MutualFriends />
      <ExperimentalFeatures />
    </div>
  );
};

export default DiscoverPanel;
