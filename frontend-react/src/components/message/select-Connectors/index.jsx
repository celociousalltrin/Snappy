import React from "react";

import { MockConnectorsList } from "../../../utils/mock-common";
import ConnectorsList from "../../connectors/connectors-list";

import "./style.css";

const SelectConnectors = () => {
  return (
    <div>
      <ConnectorsList connecteduserList={MockConnectorsList} isMessage />
    </div>
  );
};

export default SelectConnectors;
