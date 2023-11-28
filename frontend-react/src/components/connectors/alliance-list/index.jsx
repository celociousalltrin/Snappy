import React, { useEffect, useState } from "react";
import "./style.css";
import ConnectorsList from "../connectors-list";
import { MockConnectorsList } from "../../../utils/mock-common";
import { getAllianceConnectorList } from "../../../services/method";
import { responseMessage } from "../../../utils/response-message";
import { useSelector } from "react-redux";

const AllianceList = ({ activeTab }) => {
  const [list, setList] = useState([]);

  const { user_id } = useSelector((state) => state.user.data);

  const getConnectorList = async () => {
    try {
      const result = await getAllianceConnectorList(user_id);
      setList(result.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:14 ~ getConnectorList ~ err:", err);
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
      />
    </div>
  );
};

export default AllianceList;
