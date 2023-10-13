import React from "react";
import "./style.css";
import ConnectorsList from "../connectors-list";
import { MockConnectorsList } from "../../../utils/mock-common";

const FansList = () => {
  return (
    <div>
      <ConnectorsList MockConnectorsList={MockConnectorsList} isFansList />
    </div>
  );
};

export default FansList;
