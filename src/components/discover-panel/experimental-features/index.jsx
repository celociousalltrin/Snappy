import React from "react";
import DiscoverFacts from "./discover-facts";
import DiscoverJokes from "./discover-jokes";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ExperimentalFeatures = () => {
  return (
    <div className="discover_container mt-5">
      <Tabs defaultActiveKey="jokes">
        <Tab eventKey="jokes" title="Jokes">
          <DiscoverJokes />
        </Tab>
        <Tab eventKey="facts" title="Facts">
          <DiscoverFacts />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ExperimentalFeatures;
