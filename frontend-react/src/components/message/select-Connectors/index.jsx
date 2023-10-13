import React from "react";
import ConnectorsList from "../../connectors/connectors-list";
import { MockConnectorsList } from "../../../utils/mock-common";

import "./style.css";

const SelectConnectors = () => {
  return (
    <div>
      <ConnectorsList MockConnectorsList={MockConnectorsList} isMessage />
    </div>
  );
};

export default SelectConnectors;
