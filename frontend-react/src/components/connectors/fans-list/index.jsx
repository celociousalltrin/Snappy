import React, { useEffect, useState } from "react";
import "./style.css";
import ConnectorsList from "../connectors-list";
import { MockConnectorsList } from "../../../utils/mock-common";
import { getFanConnectorList } from "../../../services/method";
import { responseMessage } from "../../../utils/response-message";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FansList = ({ activeTab }) => {
  const [list, setList] = useState([]);
  const { user_id } = useSelector((state) => state.user.data);
  const [isApiExecuted, setApiExecuted] = useState(false);
  const { sec_id } = useParams();

  const getConnectorData = async () => {
    try {
      const result = await getFanConnectorList(sec_id ? sec_id : user_id);
      setList(result.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:14 ~ getConnectorList ~ err:", err);
    } finally {
      setApiExecuted(true);
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
        isApiExecuted={isApiExecuted}
      />
    </div>
  );
};

export default FansList;
