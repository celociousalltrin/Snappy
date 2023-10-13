import React from "react";
import AllianceList from "./alliance-list";
import ExperimentalFeatures from "./experimental-features";
import DiscoverSearch from "./discover-search";

import "./style.css";

const DiscoverPanel = () => {
  return (
    <div className="me-5 pe-3 ms-2 row discover-container">
      <DiscoverSearch />
      <AllianceList />
      <ExperimentalFeatures />
    </div>
  );
};

export default DiscoverPanel;
