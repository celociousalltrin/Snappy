import React, { useEffect, useState } from "react";
import "./style.css";
import ConnectorsList from "../connectors-list";
import { MockConnectorsList } from "../../../utils/mock-common";
import { getFanConnectorList } from "../../../services/method";
import { responseMessage } from "../../../utils/response-message";

const FansList = ({ activeTab }) => {
  const [list, setList] = useState([]);

  const getConnectorData = async () => {
    try {
      const result = await getFanConnectorList();
      setList(result.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:14 ~ getConnectorList ~ err:", err);
    }
  };
  useEffect(() => {
    if (activeTab === "fans") {
      getConnectorData();
    }
  }, [activeTab]);
  return (
    <div>
      <ConnectorsList
        connecteduserList={list}
        isFansList
        fansCB={(id) => setList((prev) => prev.filter((o) => o._id !== id))}
      />
    </div>
  );
};

export default FansList;
