import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./style.css";
import AllianceList from "./alliance-list";
import FindConnectors from "./find-connectors";
import FansList from "./fans-list";
import { useLocation } from "react-router-dom";

const Connectors = () => {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState(
    state?.from ? state?.from : "alliances"
  );

  return (
    <div>
      <Tabs
        defaultActiveKey={state?.from ? state?.from : "alliances"}
        justify="true"
        variant="underline"
        className="tab-container mb-4"
        onSelect={(key) => setActiveTab(key)}
      >
        <Tab eventKey="alliances" title="Alliances">
          <AllianceList activeTab={activeTab} />
        </Tab>
        <Tab eventKey="fans" title="Fans">
          <FansList activeTab={activeTab} />
        </Tab>
        <Tab eventKey="find-connectors" title="Find Connectors">
          <FindConnectors activeTab={activeTab} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Connectors;
