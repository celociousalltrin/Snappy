import React from "react";
import MutualFriends from "./mutual-friends";
import ExperimentalFeatures from "./experimental-features";
import DiscoverSearch from "./discover-search";

const DiscoverPanel = () => {
  return (
    <div>
      <DiscoverSearch />
      <MutualFriends />
      <ExperimentalFeatures />
    </div>
  );
};

export default DiscoverPanel;
