import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./style.css";
import MutualFriends from "./mutual-friends";
import FindFriends from "./find-friends";

const Friends = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="mutual-friend"
        justify="true"
        variant="underline"
        className="tab-container mb-4"
      >
        <Tab eventKey="mutual-friend" title="Mutual Friends">
          <MutualFriends />
        </Tab>
        <Tab eventKey="find-friend" title="Find Friends">
          <FindFriends />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Friends;
