import React from "react";
import ConnectorsList from "../connectors-list";

import "./style.css";

import { MockConnectorsList } from "../../../utils/mock-common";

const FindConnectors = () => {
  return (
    <div>
      <ConnectorsList MockConnectorsList={MockConnectorsList} isAllianceList />
    </div>
  );
};

export default FindConnectors;
