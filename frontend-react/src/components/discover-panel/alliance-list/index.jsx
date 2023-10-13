import React from "react";
import "./style.css";

//! Mock Data
import { MockConnectorsList } from "../../../utils/mock-common";
import { useNavigate } from "react-router-dom";
import ConnectorsList from "../../connectors/connectors-list";

const AllianceList = () => {
  const navigate = useNavigate();
  return (
    <div className="discover_container mt-5">
      <h4 className="text-center pt-4 mb-3">Alliances</h4>
      <ConnectorsList
        MockConnectorsList={MockConnectorsList}
        isDiscoverAlliance
        length={3}
      />
      <div className="pt-2 pb-1">
        <p
          className="text-primary text-center cursor-pointer"
          onClick={() => {
            navigate("/connectors");
            window.scrollTo(0, 0);
          }}
        >
          show more
        </p>
      </div>
    </div>
  );
};

export default AllianceList;
