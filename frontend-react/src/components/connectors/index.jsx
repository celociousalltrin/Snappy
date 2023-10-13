import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./style.css";
import AllianceList from "./alliance-list";
import FindConnectors from "./find-connectors";
import FansList from "./fans-list";

const Connectors = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="alliances"
        justify="true"
        variant="underline"
        className="tab-container mb-4"
      >
        <Tab eventKey="alliances" title="Alliances">
          <AllianceList />
        </Tab>
        <Tab eventKey="fans" title="Fans">
          <FansList />
        </Tab>
        <Tab eventKey="find-connectors" title="Find Connectors">
          <FindConnectors />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Connectors;
