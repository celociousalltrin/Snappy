import React from "react";
import DiscoverNews from "./discover-news";
import DiscoverJokes from "./discover-jokes";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ExperimentalFeatures = () => {
  return (
    <div className="discover_container mt-5">
      <Tabs defaultActiveKey="news">
        <Tab eventKey="news" title="News">
          <DiscoverNews />
        </Tab>
        <Tab eventKey="jokes" title="Jokes">
          <DiscoverJokes />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ExperimentalFeatures;
