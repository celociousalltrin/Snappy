import React from "react";
import "./style.css";
import ConnectorsList from "../connectors-list";
import { MockConnectorsList } from "../../../utils/mock-common";

const AllianceList = () => {
  return (
    <div>
      <ConnectorsList MockConnectorsList={MockConnectorsList} isAllianceList />
    </div>
  );
};

export default AllianceList;
