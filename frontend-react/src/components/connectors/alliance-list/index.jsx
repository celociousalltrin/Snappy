import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { responseMessage } from "../../../utils/response-message";

import ConnectorsList from "../connectors-list";

import "./style.css";

import { getAllianceConnectorList } from "../../../services/method";

const AllianceList = ({ activeTab }) => {
  const [list, setList] = useState([]);
  const [isApiExecuted, setApiExecuted] = useState(false);
  const { user_id } = useSelector((state) => state.user.data);

  const getConnectorList = async () => {
    try {
      const result = await getAllianceConnectorList(user_id);
      setList(result.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:14 ~ getConnectorList ~ err:", err);
    } finally {
      setApiExecuted(true);
    }
  };
  useEffect(() => {
    if (activeTab === "alliances") {
      getConnectorList();
    }
  }, [activeTab]);

  return (
    <div>
      <ConnectorsList
        connecteduserList={list}
        isAllianceList
        allianceCB={(id) => setList((prev) => prev.filter((o) => o._id !== id))}
        isApiExecuted={isApiExecuted}
      />
    </div>
  );
};

export default AllianceList;
