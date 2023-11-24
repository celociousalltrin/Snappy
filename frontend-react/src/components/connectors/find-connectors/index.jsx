import React, { useEffect, useState } from "react";
import ConnectorsList from "../connectors-list";
import { getConnectorList } from "../../../services/method";

import "./style.css";

import { MockConnectorsList } from "../../../utils/mock-common";
import { responseMessage } from "../../../utils/response-message";

const FindConnectors = ({ activeTab }) => {
  const [list, setList] = useState([]);

  const getConnectorData = async () => {
    try {
      const result = await getConnectorList();
      setList(result.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:14 ~ getConnectorList ~ err:", err);
    }
  };
  useEffect(() => {
    if (activeTab === "find-connectors") {
      getConnectorData();
    }
  }, [activeTab]);
  return (
    <div>
      <ConnectorsList connecteduserList={list} isConnectorList />
    </div>
  );
};

export default FindConnectors;
