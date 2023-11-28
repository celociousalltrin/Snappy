import React, { useEffect, useState } from "react";
import "./style.css";
import ConnectorsList from "../connectors-list";
import { MockConnectorsList } from "../../../utils/mock-common";
import { getFanConnectorList } from "../../../services/method";
import { responseMessage } from "../../../utils/response-message";
import { useSelector } from "react-redux";

const FansList = ({ activeTab }) => {
  const [list, setList] = useState([]);
  const { user_id } = useSelector((state) => state.user.data);

  const getConnectorData = async () => {
    try {
      const result = await getFanConnectorList(user_id);
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
      <ConnectorsList connecteduserList={list} isFansList />
    </div>
  );
};

export default FansList;
